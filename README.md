<div align="center">
  <h2 align="center">🎨 PixelFactory</h2>
  <p align="center">A warm, cohesive color theme for VS Code with sophisticated syntax highlighting and comprehensive UI colors
    <br />
<a href="https://marketplace.visualstudio.com/items?itemName=apassanisi.pixel-factory" style=""><strong>View on Marketplace »</strong></a>

  <div style="max-width: 600px;">

[![VS Code Marketplace](https://img.shields.io/visual-studio-marketplace/v/apassanisi.pixel-factory?style=flat-square&label=VS%20Code%20Marketplace&color=007ACC)](https://marketplace.visualstudio.com/items?itemName=apassanisi.pixel-factory)
[![Installs](https://img.shields.io/visual-studio-marketplace/i/apassanisi.pixel-factory?style=flat-square&color=FF8F2E)](https://marketplace.visualstudio.com/items?itemName=apassanisi.pixel-factory)
[![Rating](https://img.shields.io/visual-studio-marketplace/r/apassanisi.pixel-factory?style=flat-square&color=FFD700)](https://marketplace.visualstudio.com/items?itemName=apassanisi.pixel-factory)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](https://github.com/apassanisi/PixelFactory/blob/main/LICENSE)

  </div>
  </p>
<small>Built with:</small>
<br/>
<img src="https://img.shields.io/badge/-VS%20Code%20Theme-2b2b2b?logo=visual-studio-code&style=flat-square" alt="Badge">
<img src="https://img.shields.io/badge/JavaScript-2b2b2b?logo=javascript&style=flat-square" alt="Badge">
<img src="https://img.shields.io/badge/Accessibility-2b2b2b?logo=&style=flat-square" alt="Badge">
</div>

## About the Design

PixelFactory is built on the principle that color is a communication tool. When reading code, your eyes follow visual hierarchy—keywords stand out, strings anchor, comments fade to background. This theme treats that hierarchy as a *signal and response system*.

Each color in the spectrum serves a specific function: to guide your attention, to organize information, to indicate status. We use the metaphor of "signal frequencies" not as fantasy, but as a practical framework for thinking about color purpose. Warm orange marks active regions. Sage green preserves data. Steel gray provides neutral ground. Together, they form a coherent visual language.

The result is a theme that's genuinely useful for long coding sessions—readable, consistent, and clean.

## Features

✨ **Warm, Sophisticated Design**
- Deep dark backgrounds (`#121212`, `#1e1e1e`) reduce eye strain
- Warm orange accent color (`#FF8F2E`) for interactive elements
- Muted, complementary syntax colors for optimal readability

🎨 **Comprehensive Color Coverage**
- 220+ carefully selected colors for every UI element
- Full terminal ANSI color support
- Consistent git decoration colors
- Complete debugging and chat UI theming

🔤 **Optimized Syntax Highlighting**
- Support for 15+ languages (TypeScript, Python, Rust, Go, Vue, and more)
- Comments: Muted gray for reduced prominence
- Strings: Sage green for clarity
- Keywords: Warm red for language structure
- Operations: Bright orange for visual prominence

♿ **Accessibility First**
- WCAG AA compliant contrast ratios (4.5:1 for body text)
- Recently enhanced for improved secondary text visibility
- Tested with accessibility tools and color blindness simulators

## Usage

| Use                         | Command                          |
| --------------------------- | -------------------------------- |
| Validate theme              | `npm run validate`               |
| Test theme                  | `npm test`                       |
| Package for publication     | `npm run package`                |
| Publish to Marketplace      | `npm run publish`                |

## Installation

### Via VS Code Marketplace
1. Open Extensions (<kbd>Ctrl+Shift+X</kbd> / <kbd>Cmd+Shift+X</kbd>)
2. Search for "PixelFactory"
3. Click **Install**
4. Open Command Palette (<kbd>Ctrl+Shift+P</kbd>)
5. Type "Color Theme" and select **PixelFactory Studio**

### Via CLI
```bash
code --install-extension apassanisi.pixel-factory
```

## Preview

### Editor & Syntax
![PixelFactory - Editor Preview](images/preview-editor.png)

### Terminal Colors
![PixelFactory - Terminal Preview](images/preview-terminal.png)

## 🎨 Recommended Companions

**Enhance your PixelFactory experience with these complementary tools:**

### Icon Theme
- **[Gruvbox Material Icons](https://marketplace.visualstudio.com/items?itemName=JonathanHarty.gruvbox-material-icon-theme)** by JonathanHarty (112K+ installs)
  - Warm, earthy tones that pair beautifully with PixelFactory's color palette
  - Comprehensive icon coverage for all file types

### Font
- **[Basis33](https://www.dafont.com/basis33.font)** on DaFont
  - Clean, monospace font designed for coding
  - Excellent readability at any size

```json
{
  "editor.fontFamily": "'Basis33', 'Courier New', monospace",
  "editor.fontSize": 14,
  "editor.lineHeight": 1.6
}
```

## The Foundry Spectrum

The color palette is organized around a visual communication system. Think of colors as "frequencies"—each serves a distinct purpose in organizing information and guiding your attention through code.

### Core Frequencies (Backgrounds)
| Frequency | Hex | Purpose | Expression |
|---|---|---|---|
| **Primary** | `#121212` | Main workspace | Editor, panels, activity bar |
| **Secondary** | `#1e1e1e` | Interactive layer | Sidebars, status areas, panels |
| **Tertiary** | `#2a2a2a` | Emphasis state | Selections, active elements, focus |
| **Quaternary** | `#3a3a3a` | Interaction feedback | Hover states, modal backgrounds |

### Active Transmissions (Syntax)
| Frequency | Hex | Purpose | Applied to |
|---|---|---|---|
| **Ember Orange** | `#FF8F2E` | Call to action, movement | Operators, punctuation, active UI |
| **Sage Green** | `#8A9E78` | Data, stability, success | Strings, imports, confirmed states |
| **Steel Gray** | `#798283` | Foundation, neutral ground | Base text, default values |
| **Mauve** | `#CF7F8F` | Constants, structural integrity | Numbers, constants, immutables |
| **Golden** | `#FFC62F` | Declaration, structure | Keywords, storage, emphasis |
| **Warm Red** | `#ea603e` | Language fundamentals | Keywords, control flow |

### Diagnostic Frequencies (Feedback)
| State | Hex | Meaning | Usage |
|---|---|---|---|
| **Error** | `#C71B00` | Requires immediate attention | Errors, critical warnings |
| **Caution** | `#FFC62F` | Potential issue | Warnings, deprecations |
| **Success** | `#A6E22E` | Confirmed change | Insertions, added lines |
| **Deletion** | `#F85931` | Removed content | Deleted lines, removals |

## Customization

Override colors in your `settings.json`:

```json
{
  "workbench.colorCustomizations": {
    "[PixelFactory Studio]": {
      "editor.background": "#0a0a0a",
      "editor.foreground": "#a0a0a0"
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

## Design Philosophy

PixelFactory is engineered around practical principles that enhance both usability and visual comfort:

1. **Warmth Reduces Cognitive Load** — Orange and warm tones are less fatiguing to the eyes during extended focus
2. **Color Hierarchy** — Color intensity and saturation reflect information priority; secondary details receive less visual emphasis
3. **Coherence Over Contrast** — Colors work as a unified system rather than competing for attention
4. **Accessibility as Foundation** — WCAG AA compliance isn't optional; clear contrast benefits all readers
5. **Purpose-Driven Colors** — Every color choice serves readability or functional feedback; no decoration

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Make your changes to the JSON theme files
4. Run `npm test` to validate signal integrity
5. Submit a pull request

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
