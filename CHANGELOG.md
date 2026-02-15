# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.0] - 2026-02-15: Signal Clarity Calibration

### Fixed
- Correct all GitHub repository URLs from pixel-factory to PixelFactory (preserve signal fidelity)
- Update package.json repository metadata with correct routing paths

### Changed
- Calibration refinement: Improve branding consistency throughout documentation
- Enhanced signal documentation with metaphorical context — the theme frames code perception as signal reading
- Clarity enhancement: Explain color choices as frequency selection, not mere aesthetics
- Worldly framing: Documentation now reflects the theme's role in Amulet Digital mythology

### Added
- Foundry Spectrum expansion in README with mythological context for each color
- Brief "About" section framing PixelFactory as "The Initiate's Lens"
- Branding consistency in package.json with updated display name
- Design philosophy section explaining the principles behind color selection

## [1.1.0] - 2026-02-15: Validator Architecture Refinement

### Changed
- Refactored validator to extract color utilities for better maintainability
- Simplified validation logic from 277 → 217 lines (27% reduction)
- Improved code organization with separation of concerns

### Added
- New `scripts/color-utils.js` module with reusable color validation functions
- Optional `scripts/build-themes.js` for future theme consolidation
- Developer documentation for extending the validator

### Fixed
- Updated contact email to passanisi.andrew@github.com

## [1.0.0] - 2026-02-15: Initial Transmission

### Added
- Initial release of PixelFactory: Initiate's Lens
- Core theme variant: **PixelFactory: Initiate's Lens** with optimized token colors
- Complete color palette with:
  - Editor backgrounds, foregrounds, selections
  - Sidebar, activity bar, status bar colors
  - Tab and panel styling
  - Terminal ANSI colors (full signal spectrum)
  - Git decoration colors
  - Debugging and chat UI colors
  - Accessibility features (WCAG AA compliance for all archivist profiles)
- Comprehensive README with installation instructions
- MIT License
- Support for VS Code 1.60+

### Features
✨ Warm, sophisticated design with orange accents
🎨 220+ carefully selected colors
🔤 Optimized syntax highlighting for all languages
🎯 Full terminal ANSI color support
🐛 Complete debugging UI theming
💬 Chat interface colors included
♿ WCAG accessible color combinations

---

## Future Roadmap

- [ ] JetBrains IDE port
- [ ] Neovim/Vim theme port
- [ ] Color scheme documentation site
- [ ] Theme customization tool
