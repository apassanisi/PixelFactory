# Contributing to PixelFactory

Thank you for your interest in contributing! This guide explains how to contribute to the PixelFactory theme.

## Getting Started

### Prerequisites
- Node.js 12+
- Git
- VS Code

### Setup
1. Fork and clone the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/pixel-factory.git
   cd pixel-factory
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Theme Structure

The project includes four theme variants:

### Theme Variants

#### 1. **PixelFactory Dark** (`PixelFactory.json`)
Editor colors + comprehensive syntax highlighting. Recommended for most users.
- **Best for**: Full experience with consistent design
- **Features**: All token colors, language-specific scopes

#### 2. **PixelFactory Studio** (`PixelFactory-Studio.json`)
Self-contained variant with targeted token color optimizations.
- **Best for**: Guaranteed consistent colors out of the box
- **Features**: Final optimizations, complete monolithic theme

#### 3. **PixelFactory Light** (`PixelFactory-Light.json`)
Light theme variant with warm light backgrounds and accessible colors.
- **Best for**: Users preferring light mode
- **Features**: Full syntax highlighting, WCAG compliant

#### 4. **PixelFactory High Contrast** (`PixelFactory-HighContrast.json`)
Maximum contrast variant for accessibility and visibility.
- **Best for**: Users with low vision, high visibility needs
- **Features**: Pure contrast colors, enhanced readability

### File Structure

```
themes/
├── Editor.json                      (220+ base UI colors)
├── PixelFactory.json                (Editor.json + syntax)
├── PixelFactory-Studio.json         (Self-contained theme)
├── PixelFactory-Light.json          (Light mode variant)
└── PixelFactory-HighContrast.json   (High contrast variant)

```

### Editing Guidelines by File

#### `Editor.json` - UI Colors
Edit when changing workbench colors:
- Activity bar, status bar
- Sidebar and panels
- Buttons, inputs, dropdowns
- Terminal and debugging
- Git decorations

**Checklist:**
- Use only colors from approved palette
- Update color palette comments at top
- Maintain consistent contrast (4.5:1 text, 3:1 UI)
- Test in all 4 theme variants

#### `PixelFactory.json` - Syntax Highlighting
Edit when adding/modifying language support:
- Token colors (strings, keywords, comments)
- Language-specific scopes (Python, TypeScript, etc.)
- Diff, Markdown, CSS syntax

**Checklist:**
- Add language scope documentation in comments
- Test syntax highlighting for that language
- Ensure colors contrast with background
- Run `npm run validate`

#### `PixelFactory-Studio.json` - Enhanced Variant
Edit when optimizing token colors:
- Critical syntax elements
- Override specific token colors
- Ensure consistency across all scopes

**Checklist:**
- Self-contained (all colors present)
- Maintain color harmony
- Test in isolation (no includes)

#### `PixelFactory-Light.json` - Light Mode
Edit when adding UI colors to Editor.json:
- Mirror changes to light backgrounds
- Invert contrast relationships
- Test visibility on light backgrounds

**Checklist:**
- Maintain WCAG AA standards
- Use inverted values from dark theme
- Test readability on white backgrounds

#### `PixelFactory-HighContrast.json` - Accessibility
Edit when modifying critical colors:
- Increase saturation for visibility
- Maximize contrast ratios
- Test with colorblindness simulators

**Checklist:**
- Maintain 7:1+ contrast where possible
- Use highly saturated colors
- Test with World Wide Web Consortium standards

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

The validator checks:
- ✅ **JSON Syntax** - Valid, parseable JSON
- ✅ **Hex Colors** - Proper #RRGGBB format
- ✅ **Required Properties** - Theme name, schema
- ✅ **Color Format** - All values are valid hex
- ✅ **WCAG Contrast** - Text/background ratios ≥4.5:1
- ✅ **Orphaned Colors** - All palette colors are used
- ✅ **Cross-file References** - Include paths work

**Sample output:**
```
✓ Validating Editor.json...
✓ Validating PixelFactory.json...
✓ Validating PixelFactory-Studio.json...
✓ All validations passed!

Files checked:       4
Colors validated:    280
Contrast pairs:      6
```

### 4. Test in VS Code
1. Open the `pixel-factory` folder in VS Code
2. Press `F5` to launch extension development host
3. Switch to your modified theme
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
1. **Color consistency** - Uses approved palette
2. **Accessibility** - Maintains WCAG standards
3. **Testing** - Changes validated and tested
4. **Documentation** - Updates reflected in comments/README

## Reporting Issues

Found a problem? Open an issue with:
- Theme variant affected (PixelFactory Dark / Studio / Light / High Contrast)
- File type and code example
- Screenshot if visual issue
- VS Code version
- Expected vs. actual color

Example:
```
Title: Python strings hard to read

The string color #8A9E78 has insufficient contrast on dark background.
Expected: Brighter green around #9AE00A
Actual: Current muted green

Screenshot: [attachment]
VS Code: 1.75.1
Theme: PixelFactory Studio
```

## Code of Conduct

- Be respectful and inclusive
- Give constructive feedback
- Focus on ideas, not individuals
- Help others succeed

## Questions?

- Check existing issues and PRs
- Open a discussion for design questions
- Tag maintainers with `@apassanisi`

## Publishing Updates

Once approved, maintainers will:
1. Update version in `package.json`
2. Update `CHANGELOG.md`
3. Create GitHub release
4. Publish to VS Code Marketplace

---

Thank you for making PixelFactory better! 🎨
