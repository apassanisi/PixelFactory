#!/usr/bin/env node

/**
 * PixelFactory Theme Builder
 * 
 * Builds theme files from a base theme + variant overrides
 * Reduces file duplication and makes maintenance easier
 * 
 * Usage: node scripts/build-themes.js
 */

const fs = require('fs');
const path = require('path');

const THEME_DIR = path.join(__dirname, '../themes');
const BASE_THEME = path.join(THEME_DIR, 'Editor.json');

/**
 * Merge base theme with variant overrides
 */
function mergeThemes(base, overrides) {
  return {
    ...base,
    ...overrides,
    colors: {
      ...base.colors,
      ...(overrides.colors || {})
    },
    tokenColors: [
      ...(base.tokenColors || []),
      ...(overrides.tokenColors || [])
    ]
  };
}

/**
 * Build PixelFactory.json (Dark + Syntax)
 */
function buildPixelFactoryDark() {
  const base = JSON.parse(fs.readFileSync(BASE_THEME, 'utf8'));
  const syntaxPath = path.join(THEME_DIR, 'tokenColors.json');
  
  if (!fs.existsSync(syntaxPath)) {
    console.log('⚠️  tokenColors.json not found - skipping build');
    return;
  }
  
  const syntax = JSON.parse(fs.readFileSync(syntaxPath, 'utf8'));
  const merged = mergeThemes(base, {
    name: 'PixelFactory Dark',
    uiTheme: 'vs-dark',
    tokenColors: syntax.tokenColors || []
  });
  
  fs.writeFileSync(
    path.join(THEME_DIR, 'PixelFactory.json'),
    JSON.stringify(merged, null, 2)
  );
  console.log('✓ Built PixelFactory.json');
}

/**
 * Build PixelFactory-Studio.json from base + overrides
 */
function buildStudio() {
  const base = JSON.parse(fs.readFileSync(BASE_THEME, 'utf8'));
  const syntaxPath = path.join(THEME_DIR, 'tokenColors.json');
  
  if (!fs.existsSync(syntaxPath)) {
    console.log('⚠️  tokenColors.json not found - skipping build');
    return;
  }
  
  const syntax = JSON.parse(fs.readFileSync(syntaxPath, 'utf8'));
  const studioOverrides = {
    name: 'PixelFactory Studio',
    uiTheme: 'vs-dark',
    colors: {
      // Add any studio-specific color overrides here
      'editor.selectionBackground': '#3a3a3a'
    },
    tokenColors: syntax.tokenColors || []
  };
  
  const merged = mergeThemes(base, studioOverrides);
  
  fs.writeFileSync(
    path.join(THEME_DIR, 'PixelFactory-Studio.json'),
    JSON.stringify(merged, null, 2)
  );
  console.log('✓ Built PixelFactory-Studio.json');
}

/**
 * Run build process
 */
function build() {
  console.log('🏗️  Building PixelFactory themes...\n');
  
  try {
    buildPixelFactoryDark();
    buildStudio();
    console.log('\n✅ Theme build complete!\n');
  } catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  build();
}

module.exports = { mergeThemes, buildPixelFactoryDark, buildStudio };
