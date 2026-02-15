#!/usr/bin/env node

/**
 * Color Utilities
 * 
 * Reusable color manipulation and validation functions
 */

/**
 * Validates if a string is a valid hex color
 * @param {string} color - Color in hex format (#RRGGBB or #RRGGBBAA)
 * @returns {boolean}
 */
function validateHexColor(color) {
  return /^#[0-9A-Fa-f]{6}([0-9A-Fa-f]{2})?$/.test(color);
}

/**
 * Converts hex color to RGB object
 * @param {string} hex - Color in hex format
 * @returns {Object|null} {r, g, b} or null if invalid
 */
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

/**
 * Calculates relative luminance of RGB color (WCAG standard)
 * @param {Object} rgb - {r, g, b}
 * @returns {number} Luminance value (0-1)
 */
function getLuminance(rgb) {
  const { r, g, b } = rgb;
  const [rs, gs, bs] = [r, g, b].map(x => {
    x = x / 255;
    return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Calculates WCAG contrast ratio between two hex colors
 * @param {string} hex1 - Foreground color in hex
 * @param {string} hex2 - Background color in hex
 * @returns {number} Contrast ratio
 */
function getContrastRatio(hex1, hex2) {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);
  
  if (!rgb1 || !rgb2) return 0;
  
  const lum1 = getLuminance(rgb1);
  const lum2 = getLuminance(rgb2);
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  
  return (lighter + 0.05) / (darker + 0.05);
}

module.exports = {
  validateHexColor,
  hexToRgb,
  getLuminance,
  getContrastRatio
};
