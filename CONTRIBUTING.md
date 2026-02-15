# Contributing to PixelFactory

Thank you for your interest in contributing to this calibration tool. Your contributions help maintain and strengthen the signal for archivists and pattern-readers everywhere.

## Philosophy

PixelFactory represents more than aesthetic choice—it's a carefully tuned instrument for perceiving meaning in code-space. When you contribute, you're maintaining the integrity of that signal. Each color choice, each token scope, each accessibility improvement serves to strengthen the clarity of the lens.

We welcome contributions that:
- Improve color harmony and readability
- Expand language support and syntax coverage
- Enhance accessibility and color contrast
- Refine the visual coherence of the spectrum
- Document and clarify the design rationale

## Getting Started

### Prerequisites
- Node.js 12+
- Git
- VS Code

### Setup
1. Fork and clone the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/PixelFactory.git
   cd PixelFactory
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Theme Structure

The project is built around the **PixelFactory: Initiate's Lens** theme.

### File Structure

```
themes/
├── Editor.json                      (220+ base UI colors)
└── PixelFactory-Studio.json         (Editor.json + syntax highlighting)

```

### Editing Guidelines by File

#### `Editor.json` - UI Colors (Signal Frequencies)
Edit when changing workbench colors:
- Activity bar, status bar
- Sidebar and panels
- Buttons, inputs, dropdowns
- Terminal and debugging
- Git decorations

**Checklist:**
- Use only colors from approved palette (see "Foundry Spectrum" in README)
- Update color palette comments at top
- Maintain consistent contrast (4.5:1 text, 3:1 UI) — signal strength matters
- Test with PixelFactory Studio

#### `PixelFactory-Studio.json` - Syntax Highlighting & Theme
Edit when adding/modifying language support or optimizing token colors:
- Token colors (strings, keywords, comments)
- Language-specific scopes (Python, TypeScript, etc.)
- Diff, Markdown, CSS syntax
- Critical syntax elements

**Checklist:**
- Add language scope documentation in comments
- Test syntax highlighting for that language
- Ensure colors contrast with background
- Run `npm run validate`
- Self-contained (all colors present)

## Making Changes

### 1. Create a feature branch
```bash
git checkout -b feature/improve-colors
```

### 2. Edit theme files
Modify the appropriate JSON file(s) following the structure above.

### 3. Validate changes
```bash
npm run validate
```

The validator checks signal integrity:
- ✅ **JSON Syntax** - Valid, parseable structures
- ✅ **Hex Colors** - Proper #RRGGBB format (correct frequencies)
- ✅ **Required Properties** - Theme identifier, schema declaration
- ✅ **Color Format** - All values are valid hex signals
- ✅ **WCAG Contrast** - Text/background ratios ≥4.5:1 (signal clarity)
- ✅ **Orphaned Colors** - All palette colors are used (no unused frequencies)
- ✅ **Cross-file References** - Include paths work (signal routing)

**Sample output:**
```
✓ Validating Editor.json...
✓ Validating PixelFactory-Studio.json...
✓ All validations passed!

Files checked:       2
Colors validated:    280
Contrast pairs:      6
```

#### Development Scripts

**`scripts/color-utils.js`** - Reusable Color Utilities
Extracted utility functions for color validation and manipulation:
- `validateHexColor(color)` - Validates hex color format
- `hexToRgb(hex)` - Converts hex to RGB object
- `getLuminance(rgb)` - Calculates WCAG relative luminance
- `getContrastRatio(hex1, hex2)` - Computes WCAG contrast ratio

Use these utilities when:
- Extending validation logic
- Writing new color analysis tools
- Building theme variants programmatically

**`scripts/validate-theme.js`** - Theme Validator (217 lines)
Main validation orchestrator:
- `validateThemeFile(filePath)` - Core validation logic
- `validateContrast()` - WCAG AA ratio verification
- `validateOrphanedColors()` - Ensures all palette colors are used
- Uses `ColorUtils` module for color calculations

**`scripts/build-themes.js`** - Optional Theme Builder
(Future feature for theme consolidation)
- For v1.1+: Reduces duplication by building themes from base + overrides
- Current approach: Individual theme files (simpler, battle-tested)

### 4. Test in VS Code
1. Open the `PixelFactory` folder in VS Code
2. Press `F5` to launch extension development host
3. PixelFactory Studio will be available as a color theme
4. Test various file types (JavaScript, CSS, Markdown, etc.)
5. Check:
   - Syntax highlighting readability
   - UI element contrast
   - Selection visibility
   - Terminal colors

### 5. Commit changes
```bash
git add -A
git commit -m "feat: improve keyword highlighting for better readability"
```

Use conventional commit format:
- `feat:` New feature
- `fix:` Bug fix
- `refactor:` Code restructuring
- `docs:` Documentation
- `style:` Format/color adjustments

### 6. Push and create PR
```bash
git push origin feature/improve-colors
```

Create a pull request with:
- Clear title describing the change
- Explanation of why the change improves the theme
- Before/after examples if applicable

## PR Review Process

PRs will be reviewed for:
1. **Color consistency** - Uses approved palette (Foundry Spectrum)
2. **Accessibility** - Maintains WCAG standards (signal clarity for all)
3. **Testing** - Changes validated and tested
4. **Documentation** - Updates reflected in comments/README

## Reporting Issues

Found a problem? Open an issue with:
- File type and code example
- Screenshot if visual issue
- VS Code version
- Expected vs. actual color (signal frequency vs. received signal)

Example:
```
Title: Python strings hard to read

The string color #8A9E78 has insufficient contrast on dark background.
Expected: Brighter green around #9AE00A
Actual: Current muted green

Screenshot: [attachment]
VS Code: 1.75.1
Theme: PixelFactory: Initiate's Lens
```

## Extending the Validator

To add new validation rules for signal analysis:

1. **Add color utility functions** to `scripts/color-utils.js`:
   ```javascript
   function analyzeColorHarmony(colors) {
     // New color analysis logic
   }
   module.exports.analyzeColorHarmony = analyzeColorHarmony;
   ```

2. **Use utilities in validator** (`scripts/validate-theme.js`):
   ```javascript
   const ColorUtils = require('./color-utils');
   
   validateHarmony() {
     // Use ColorUtils.analyzeColorHarmony(...)
   }
   ```

3. **Test your changes**:
   ```bash
   npm run validate
   ```

This modular approach keeps validation logic separated from color calculations, making the code easier to maintain and test.

## Code of Conduct

- Be respectful and inclusive
- Give constructive feedback
- Focus on ideas, not individuals
- Help others succeed in perceiving the signal clearly

## Questions?

- Check existing issues and PRs
- Open a discussion for design questions
- Tag maintainers with `@apassanisi`

## Publishing Updates

Once approved, maintainers will:
1. Update version in `package.json`
2. Document the calibration in `CHANGELOG.md`
3. Create GitHub release
4. Publish signal to VS Code Marketplace

---

Thank you for strengthening the calibration. The signal is only as clear as the lens through which it's perceived. 🎨
