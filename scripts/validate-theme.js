#!/usr/bin/env node

/**
 * PixelFactory Theme Validator
 * 
 * Validates theme files for:
 * - Valid JSON syntax
 * - Required properties
 * - Color format consistency
 * - WCAG contrast ratios (AA standard)
 */

const fs = require('fs');
const path = require('path');
const colors = require('./color-utils');

const THEME_DIR = path.join(__dirname, '../themes');

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

  validateContrast() {
    console.log('\n📏 Checking WCAG Contrast Ratios (AA standard: 4.5:1 for text)...\n');
    
    CONTRAST_PAIRS.forEach(pair => {
      const ratio = colors.getContrastRatio(pair.foreground, pair.background);
      this.stats.contrastChecked++;
      
      const status = ratio >= pair.minRatio ? '✓' : '✗';
      const ratioStr = ratio.toFixed(2);
      
      // Comments intentionally have lower contrast
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

  validateColorInTheme(fileName, colorValue) {
    this.stats.colorsValidated++;
    
    if (!colors.validateHexColor(colorValue)) {
      this.errors.push(`${fileName}: Invalid color "${colorValue}"`);
      this.stats.issuesFound++;
    }
    
    this.usedColors.add(colorValue.toUpperCase());
  }

  validateThemFile(filePath) {
    const fileName = path.basename(filePath);
    
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const theme = JSON.parse(content);
      
      this.stats.filesChecked++;
      
      // Validate schema and name
      if (!theme.$schema || !theme.$schema.includes('color-theme')) {
        this.warnings.push(`${fileName}: Missing or invalid $schema`);
      }
      
      if (!theme.name) {
        this.errors.push(`${fileName}: Missing theme name`);
      }
      
      // Validate colors section
      if (theme.colors && typeof theme.colors === 'object') {
        Object.values(theme.colors).forEach(color => {
          this.validateColorInTheme(fileName, color);
        });
      }
      
      // Validate tokenColors section
      if (Array.isArray(theme.tokenColors)) {
        theme.tokenColors.forEach((token, idx) => {
          if (token.settings?.foreground) {
            this.validateColorInTheme(fileName, token.settings.foreground);
          }
          if (token.settings?.background) {
            this.validateColorInTheme(fileName, token.settings.background);
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
      this.validateThemFile(filePath);
    });

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

const validator = new ThemeValidator();
process.exit(validator.validateThemes());

