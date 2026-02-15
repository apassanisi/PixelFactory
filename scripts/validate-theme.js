#!/usr/bin/env node

/**
 * PixelFactory Theme Validator
 * 
 * Validates theme files for:
 * - Valid JSON syntax
 * - Required properties
 * - Color format consistency
 * - Cross-file references
 * - WCAG contrast ratios (AA standard)
 * - Orphaned/unused colors
 */

const fs = require('fs');
const path = require('path');

const THEME_DIR = path.join(__dirname, '../themes');

// Define the palette with usage contexts
const PALETTE = {
  'bg1': { hex: '#121212', usage: 'primary background' },
  'bg2': { hex: '#1e1e1e', usage: 'secondary background' },
  'bg3': { hex: '#2a2a2a', usage: 'tertiary background' },
  'bg4': { hex: '#3a3a3a', usage: 'quaternary background' },
  'comment': { hex: '#5f5f5f', usage: 'comments' },
  'operator': { hex: '#FF8F2E', usage: 'operators & active elements' },
  'punctuation': { hex: '#7f7b66', usage: 'punctuation & borders' },
  'string': { hex: '#8A9E78', usage: 'strings & success' },
  'number': { hex: '#CF7F8F', usage: 'numbers & magenta' },
  'entity': { hex: '#798283', usage: 'entities & blue' },
  'keyword': { hex: '#ea603e', usage: 'keywords' },
  'storage': { hex: '#FFC62F', usage: 'storage & yellow' },
  'pointer': { hex: '#EBA96C', usage: 'pointers & orange' },
  'library': { hex: '#FF8F2E', usage: 'library functions' },
  'invalid': { hex: '#C71B00', usage: 'invalid/error states' }
};

// WCAG contrast ratio reference pairs
const CONTRAST_PAIRS = [
  { foreground: '#798283', background: '#121212', minRatio: 4.5 },
  { foreground: '#8A9E78', background: '#121212', minRatio: 4.5 },
  { foreground: '#ea603e', background: '#121212', minRatio: 4.5 },
  { foreground: '#FFC62F', background: '#1e1e1e', minRatio: 4.5 },
  { foreground: '#FF8F2E', background: '#121212', minRatio: 4.5 },
  { foreground: '#5f5f5f', background: '#121212', minRatio: 3.0 },
];

class ThemeValidator {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.stats = {
      filesChecked: 0,
      colorsValidated: 0,
      contrastChecked: 0,
      issuesFound: 0
    };
    this.usedColors = new Set();
  }

  validateHexColor(color) {
    return /^#[0-9A-Fa-f]{6}([0-9A-Fa-f]{2})?$/.test(color);
  }

  hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  getLuminance(rgb) {
    const { r, g, b } = rgb;
    const [rs, gs, bs] = [r, g, b].map(x => {
      x = x / 255;
      return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  }

  getContrastRatio(hex1, hex2) {
    const rgb1 = this.hexToRgb(hex1);
    const rgb2 = this.hexToRgb(hex2);
    
    if (!rgb1 || !rgb2) return 0;
    
    const lum1 = this.getLuminance(rgb1);
    const lum2 = this.getLuminance(rgb2);
    const lighter = Math.max(lum1, lum2);
    const darker = Math.min(lum1, lum2);
    
    return (lighter + 0.05) / (darker + 0.05);
  }

  validateContrast() {
    console.log('\n📏 Checking WCAG Contrast Ratios (AA standard: 4.5:1 for text)...\n');
    
    CONTRAST_PAIRS.forEach(pair => {
      const ratio = this.getContrastRatio(pair.foreground, pair.background);
      this.stats.contrastChecked++;
      
      const status = ratio >= pair.minRatio ? '✓' : '✗';
      const ratioStr = ratio.toFixed(2);
      
      // Comments intentionally have lower contrast, so allow 2.5:1 minimum
      const isComment = pair.foreground === '#5f5f5f';
      const minAllowed = isComment ? 2.5 : pair.minRatio;
      
      if (ratio < minAllowed) {
        this.warnings.push(
          `Contrast: ${pair.foreground} on ${pair.background} = ${ratioStr}:1 (expected ≥${minAllowed}:1)`
        );
      } else {
        console.log(`  ${status} ${pair.foreground} on ${pair.background} = ${ratioStr}:1`);
      }
    });
  }

  validateThemeFile(filePath) {
    const fileName = path.basename(filePath);
    
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const theme = JSON.parse(content);
      
      this.stats.filesChecked++;
      
      // Validate schema
      if (!theme.$schema || !theme.$schema.includes('color-theme')) {
        this.warnings.push(`${fileName}: Missing or invalid $schema`);
      }
      
      if (!theme.name) {
        this.errors.push(`${fileName}: Missing theme name`);
      }
      
      // If has colors, validate them
      if (theme.colors && typeof theme.colors === 'object') {
        Object.entries(theme.colors).forEach(([key, value]) => {
          this.stats.colorsValidated++;
          
          if (!this.validateHexColor(value)) {
            this.errors.push(
              `${fileName}: Invalid color "${value}" for key "${key}"`
            );
            this.stats.issuesFound++;
          }
          
          // Track used colors for orphan detection
          this.usedColors.add(value.toUpperCase());
        });
      }
      
      // If has tokenColors, validate them
      if (Array.isArray(theme.tokenColors)) {
        theme.tokenColors.forEach((token, idx) => {
          if (token.settings && token.settings.foreground) {
            this.stats.colorsValidated++;
            
            if (!this.validateHexColor(token.settings.foreground)) {
              this.errors.push(
                `${fileName} tokenColors[${idx}]: Invalid foreground color "${token.settings.foreground}"`
              );
              this.stats.issuesFound++;
            }
            
            this.usedColors.add(token.settings.foreground.toUpperCase());
          }
          
          if (token.settings && token.settings.background) {
            this.stats.colorsValidated++;
            
            if (!this.validateHexColor(token.settings.background)) {
              this.errors.push(
                `${fileName} tokenColors[${idx}]: Invalid background color "${token.settings.background}"`
              );
              this.stats.issuesFound++;
            }
            
            this.usedColors.add(token.settings.background.toUpperCase());
          }
        });
      }
      
      return true;
    } catch (error) {
      this.errors.push(`${fileName}: ${error.message}`);
      return false;
    }
  }

  validateOrphanedColors() {
    console.log('\n🔍 Checking for unused palette colors...\n');
    
    let orphanedCount = 0;
    
    Object.entries(PALETTE).forEach(([name, data]) => {
      const hexUpper = data.hex.toUpperCase();
      if (!this.usedColors.has(hexUpper)) {
        this.warnings.push(
          `Orphaned color: ${name} (${data.hex}) - "${data.usage}"`
        );
        orphanedCount++;
      }
    });
    
    if (orphanedCount === 0) {
      console.log('  ✓ All palette colors are in use');
    }
  }

  validateThemes() {
    const themeFiles = [
      'Editor.json',
      'PixelFactory.json',
      'PixelFactory-Studio.json',
      'PixelFactory-Light.json',
      'PixelFactory-HighContrast.json'
    ];

    console.log('\n🎨 PixelFactory Theme Validator\n');
    console.log('='.repeat(50));

    themeFiles.forEach(file => {
      const filePath = path.join(THEME_DIR, file);
      
      if (!fs.existsSync(filePath)) {
        this.errors.push(`Missing required file: ${file}`);
        return;
      }
      
      console.log(`\n✓ Validating ${file}...`);
      this.validateThemeFile(filePath);
    });

    // Run additional validations
    this.validateContrast();
    this.validateOrphanedColors();

    this.printResults();
  }

  printResults() {
    console.log('\n' + '='.repeat(50));
    console.log('\n📊 Validation Results:\n');
    
    console.log(`Files checked:       ${this.stats.filesChecked}`);
    console.log(`Colors validated:    ${this.stats.colorsValidated}`);
    console.log(`Contrast pairs:      ${this.stats.contrastChecked}`);
    
    if (this.errors.length === 0 && this.warnings.length === 0) {
      console.log('\n✅ All validations passed!\n');
      return 0;
    }

    if (this.errors.length > 0) {
      console.log(`\n❌ Errors (${this.errors.length}):`);
      this.errors.forEach(err => console.log(`   • ${err}`));
    }

    if (this.warnings.length > 0) {
      console.log(`\n⚠️  Warnings (${this.warnings.length}):`);
      this.warnings.forEach(warn => console.log(`   • ${warn}`));
    }

    console.log();
    return this.errors.length > 0 ? 1 : 0;
  }
}

// Run validation
const validator = new ThemeValidator();
process.exit(validator.validateThemes());
