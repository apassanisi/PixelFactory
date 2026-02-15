#!/usr/bin/env node

/**
 * Generate minimal PNG files for PixelFactory marketplace
 * Uses pre-computed PNG data for simplicity
 */

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const imagesDir = path.join(__dirname, '../images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Theme colors
const COLORS = {
  bg1: [0x12, 0x12, 0x12],      // #121212
  bg2: [0x1e, 0x1e, 0x1e],      // #1e1e1e
  operator: [0xFF, 0x8F, 0x2E],  // #FF8F2E
  string: [0x8A, 0x9E, 0x78],    // #8A9E78
  keyword: [0xea, 0x60, 0x3e],   // #ea603e
  storage: [0xFF, 0xC6, 0x2F],   // #FFC62F
  entity: [0x79, 0x82, 0x83],    // #798283
  number: [0xCF, 0x7F, 0x8F],    // #CF7F8F
};

function createPNG(width, height, colorFn) {
  // PNG signature
  const pngSignature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR chunk (image header)
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;    // bit depth
  ihdr[9] = 2;    // color type (RGB)
  ihdr[10] = 0;   // compression method
  ihdr[11] = 0;   // filter method
  ihdr[12] = 0;   // interlace method

  let png = Buffer.concat([
    pngSignature,
    createChunk('IHDR', ihdr)
  ]);

  // Create image data
  const imageData = [];
  for (let y = 0; y < height; y++) {
    imageData.push(0); // filter type for this scanline
    for (let x = 0; x < width; x++) {
      const [r, g, b] = colorFn(x, y, width, height);
      imageData.push(r, g, b);
    }
  }

  // Compress data
  const compressed = zlib.deflateSync(Buffer.from(imageData));
  png = Buffer.concat([png, createChunk('IDAT', compressed)]);

  // IEND chunk
  png = Buffer.concat([png, createChunk('IEND', Buffer.alloc(0))]);

  return png;
}

function createChunk(type, data) {
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length, 0);

  const typeBuffer = Buffer.from(type, 'ascii');
  const crcData = Buffer.concat([typeBuffer, data]);
  const crc = calculateCRC(crcData);

  const crcBuffer = Buffer.alloc(4);
  crcBuffer.writeUInt32BE(crc, 0);

  return Buffer.concat([length, typeBuffer, data, crcBuffer]);
}

function calculateCRC(data) {
  let crc = 0xFFFFFFFF;
  for (let i = 0; i < data.length; i++) {
    crc ^= data[i];
    for (let j = 0; j < 8; j++) {
      crc = (crc >>> 1) ^ ((crc & 1) ? 0xEDB88320 : 0);
    }
  }
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

function interpolateColor(color1, color2, ratio) {
  return [
    Math.floor(color1[0] + (color2[0] - color1[0]) * ratio),
    Math.floor(color1[1] + (color2[1] - color1[1]) * ratio),
    Math.floor(color1[2] + (color2[2] - color1[2]) * ratio)
  ];
}

console.log('Generating PixelFactory theme images...');

try {
  // Create Icon (128x128 gradient from dark to orange)
  console.log('Creating icon.png...');
  const iconPng = createPNG(128, 128, (x, y, w, h) => {
    const ratio = (x + y) / (w + h);
    return interpolateColor(COLORS.bg1, COLORS.operator, ratio);
  });
  fs.writeFileSync(path.join(imagesDir, 'icon.png'), iconPng);
  console.log('✓ Created icon.png');

  // Create Editor Preview (800x600 with dark background)
  console.log('Creating preview-editor.png...');
  const editorPng = createPNG(800, 600, (x, y) => {
    // Create vertical gradient with multiple colors
    const section = Math.floor((y / 600) * 5);
    const colors = [COLORS.bg1, COLORS.bg2, COLORS.keyword, COLORS.string, COLORS.bg1];
    return colors[section] || COLORS.bg1;
  });
  fs.writeFileSync(path.join(imagesDir, 'preview-editor.png'), editorPng);
  console.log('✓ Created preview-editor.png');

  // Create Syntax Preview (800x400 with color blocks)
  console.log('Creating preview-syntax.png...');
  const syntaxPng = createPNG(800, 400, (x, y, w, h) => {
    // Create color palette display
    const blockNum = Math.floor((x / w) * 4);
    const colors = [COLORS.string, COLORS.keyword, COLORS.storage, COLORS.operator];
    return colors[blockNum] || COLORS.bg2;
  });
  fs.writeFileSync(path.join(imagesDir, 'preview-syntax.png'), syntaxPng);
  console.log('✓ Created preview-syntax.png');

  // Create Terminal Preview (800x300)
  console.log('Creating preview-terminal.png...');
  const terminalPng = createPNG(800, 300, (x, y) => {
    // Horizontal color bands
    const band = Math.floor((x / 800) * 6);
    const termColors = [
      COLORS.entity,
      COLORS.string,
      COLORS.keyword,
      COLORS.storage,
      COLORS.operator,
      COLORS.number
    ];
    return termColors[band] || COLORS.bg1;
  });
  fs.writeFileSync(path.join(imagesDir, 'preview-terminal.png'), terminalPng);
  console.log('✓ Created preview-terminal.png');

  console.log('\n✅ All preview images generated successfully!');
  console.log('📁 Images created in: images/');
  console.log('\nNote: For best marketplace presentation, consider replacing these with:');
  console.log('  - Actual VS Code screenshots showing the theme');
  console.log('  - Code samples with proper syntax highlighting');
  console.log('  - Side-by-side comparisons with other themes');

} catch (error) {
  console.error('❌ Error generating images:', error.message);
  process.exit(1);
}
