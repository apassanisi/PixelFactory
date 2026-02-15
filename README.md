<div align="center">
  <h2 align="center">🎨 PixelFactory</h2>
  <p align="center"><strong>The Initiate's Lens — Signal Calibration Protocol</strong></p>
  <p align="center">A warm, sophisticated color theme for VS Code built around signal frequency principles.
    <br />
<a href="https://marketplace.visualstudio.com/items?itemName=apassanisi.pixel-factory"><strong>View on Marketplace »</strong></a>
  </p>

[![VS Code Marketplace](https://img.shields.io/visual-studio-marketplace/v/apassanisi.pixel-factory?style=flat-square&label=VS%20Code&color=007ACC)](https://marketplace.visualstudio.com/items?itemName=apassanisi.pixel-factory)
[![Installs](https://img.shields.io/visual-studio-marketplace/i/apassanisi.pixel-factory?style=flat-square&color=FF8F2E)](https://marketplace.visualstudio.com/items?itemName=apassanisi.pixel-factory)
[![Rating](https://img.shields.io/visual-studio-marketplace/r/apassanisi.pixel-factory?style=flat-square&color=FFD700)](https://marketplace.visualstudio.com/items?itemName=apassanisi.pixel-factory)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](https://github.com/apassanisi/PixelFactory/blob/main/LICENSE)

</div>

## Design Philosophy

Color is a communication tool. PixelFactory organizes syntax and UI around a **signal frequency system**—each color serves a distinct purpose in guiding attention and preserving information through long coding sessions.

Think of it as a **signal calibration device**: Ember Orange marks active transmissions, Sage Green preserves encoded data, Steel Gray provides neutral ground. Together they form a cohesive visual language engineered for readability and visual comfort.

✨ **Warm, Sophisticated** — Deep dark backgrounds with warm accent colors  
🎨 **Comprehensive** — 220+ colors across all UI elements  
🔤 **Optimized Syntax** — Support for 15+ languages  
♿ **Accessible** — WCAG AA compliant contrast ratios

## Installation

1. Open Extensions (<kbd>Ctrl+Shift+X</kbd> / <kbd>Cmd+Shift+X</kbd>)
2. Search for "PixelFactory" and click **Install**
3. Open Command Palette (<kbd>Ctrl+Shift+P</kbd>) and select a **PixelFactory** theme

## Preview

### Editor & Syntax
![PixelFactory - Editor Preview](images/preview-editor.png)

### Terminal Colors
![PixelFactory - Terminal Preview](images/preview-terminal.png)

## The Foundry Spectrum

Colors organized as signal frequencies—each serves a distinct purpose in guiding attention and preserving information.

**Primary Frequencies:**  
Void Black `#121212` · Ember Orange `#FF8F2E` · Steel Gray `#798283` · Sage Green `#8A9E78`

**Accent Signals:**  
Golden Yellow `#FFC62F` · Mauve `#CF7F8F` · Bronze `#7f7b66`

**Diagnostic Frequencies:**  
Error `#C71B00` · Warning `#FFC62F` · Success `#A6E22E`

## Customization

Override any color in `settings.json`:

```json
{
  "workbench.colorCustomizations": {
    "[PixelFactory Studio]": {
      "editor.background": "#0a0a0a"
    }
  }
}
```

## File Structure

```
PixelFactory/
├── package.json                  # Extension metadata
├── README.md                     # Documentation
├── CONTRIBUTING.md              # Contribution guidelines
├── LICENSE                       # MIT License
├── themes/
│   ├── Editor.json              # Base UI colors
│   └── PixelFactory-Studio.json  # Complete theme with syntax highlighting
├── scripts/
│   └── validate-theme.js        # Theme validation script
└── images/
    └── icon.png                 # Theme icon
```

## Contributing

Contributions welcome! Please fork the repository, create a feature branch, make your changes to the theme files, and run `npm test` before submitting a pull request.

## Changelog

### 1.2.0 (February 2026)
- Signal refinement: Enhanced accessibility with improved contrast ratios
- Transmission clarity: Updated secondary text colors for better visibility
- Line calibration: Improved line highlight visibility for better pattern tracking

### 1.0.0 (Initial Release)
- PixelFactory Studio theme calibration
- 220+ colors with comprehensive coverage
- Full terminal ANSI signal support
- Debugging and chat UI theming

## Support

Have questions or feedback?

- **Issues:** [GitHub Issues](https://github.com/apassanisi/PixelFactory/issues)
- **Email:** passanisi.andrew@github.com
- **GitHub:** [apassanisi](https://github.com/apassanisi)

## License

MIT © 2026 apassanisi

---

**Made with care by [apassanisi](https://github.com/apassanisi)**

**Code reads better in color.** 🎨
