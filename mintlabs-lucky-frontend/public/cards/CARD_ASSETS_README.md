# Card Assets - Casino-Lite Card System

This directory contains all visual assets for the Lucky.mintloop.dev casino-lite card rendering system.

## Folder Structure

```text
public/cards/
  themes/
    classic/
      background.png       # Card face background (3:4 aspect ratio)
      back.png            # Card back pattern
      suits/
        hearts.svg        # Red heart suit icon
        diamonds.svg      # Red diamond suit icon
        clubs.svg         # Black club suit icon
        spades.svg        # Black spade suit icon
    kawaii/
      background.png
      back.png
      suits/
        hearts.svg
        diamonds.svg
        clubs.svg
        spades.svg
    mintloop/
      background.png
      back.png
      suits/
        hearts.svg
        diamonds.svg
        clubs.svg
        spades.svg
    pixel/
      background.png
      back.png
      suits/
        hearts.svg
        diamonds.svg
        clubs.svg
        spades.svg
```

## Asset Specifications

### Background Images
- **Format**: PNG or WebP (PNG recommended for compatibility)
- **Aspect Ratio**: 3:4 (portrait orientation)
- **Recommended Size**: 300×400px or 600×800px (higher for retina)
- **Purpose**: Card face background (behind rank/suit icons)
- **Style**: Solid color, gradient, pattern, or texture

### Back Images
- **Format**: PNG or WebP
- **Aspect Ratio**: 3:4 (portrait orientation)
- **Recommended Size**: 300×400px or 600×800px
- **Purpose**: Card back pattern (face-down cards)
- **Style**: Repeating pattern, logo, or decorative design

### Suit Icons
- **Format**: SVG (preferred) or PNG
- **Recommended Size**: 64×64px minimum for PNG, scalable for SVG
- **Purpose**: Suit symbols (♠ ♥ ♦ ♣)
- **Color**: Red for hearts/diamonds, black for clubs/spades (or theme-specific)
- **Style**: Match theme aesthetic (classic, cute, pixelated, etc.)

## Naming Conventions

### Theme Folder Names
- Use lowercase, hyphen-separated names
- Examples: `classic`, `kawaii`, `mintloop`, `pixel-retro`

### Asset File Names
- **Background**: `background.png` (or `.webp`)
- **Back**: `back.png` (or `.webp`)
- **Suit Icons**: `hearts.svg`, `diamonds.svg`, `clubs.svg`, `spades.svg`

**⚠️ Critical**: File names must match exactly (case-sensitive) for CardView to load them.

## Adding a New Theme

### Step 1: Create Theme Folder
```bash
mkdir -p public/cards/themes/your-theme-name/suits
```

### Step 2: Add Assets
Place your 4 suit icons, background, and back images in the theme folder:
- `suits/hearts.svg`
- `suits/diamonds.svg`
- `suits/clubs.svg`
- `suits/spades.svg`
- `background.png`
- `back.png`

### Step 3: Register Theme in `src/config/decks.ts`

#### Add Suit Set (if using custom icons):
```typescript
const SUIT_SETS: Record<string, SuitSet> = {
  // ... existing suit sets
  'your-theme': {
    id: 'your-theme',
    label: 'Your Theme Suits',
    icons: {
      spades: '/cards/themes/your-theme/suits/spades.svg',
      hearts: '/cards/themes/your-theme/suits/hearts.svg',
      diamonds: '/cards/themes/your-theme/suits/diamonds.svg',
      clubs: '/cards/themes/your-theme/suits/clubs.svg',
    },
  },
};
```

#### Add Deck Theme:
```typescript
const DECK_THEMES: Record<string, DeckTheme> = {
  // ... existing themes
  'your-theme-deck': {
    id: 'your-theme-deck',
    label: 'Your Theme Name',
    suitSetId: 'your-theme', // References suit set above
    background: 'bg-gradient-to-br from-blue-50 to-blue-100', // Or reference image
    rankFontClass: 'font-serif',
    cardFrameClass: 'rounded-lg border-2 border-blue-300 shadow-md',
    backPattern: 'bg-gradient-to-br from-blue-700 to-blue-900', // Or reference image
  },
};
```

### Step 4: Using Images Instead of CSS Classes

If using image assets for background/back:

```typescript
const DECK_THEMES: Record<string, DeckTheme> = {
  'your-theme-deck': {
    id: 'your-theme-deck',
    label: 'Your Theme Name',
    suitSetId: 'your-theme',
    background: 'bg-[url(/cards/themes/your-theme/background.png)] bg-cover',
    rankFontClass: 'font-serif text-white', // Adjust for contrast
    cardFrameClass: 'rounded-lg border-2 border-gray-300 shadow-md',
    backPattern: 'bg-[url(/cards/themes/your-theme/back.png)] bg-cover',
  },
};
```

### Step 5: Test Theme
- Build: `npm run build`
- Verify cards render correctly in all games (Blackjack, High-Card, etc.)
- Test all 3 sizes: sm, md, lg
- Verify contrast (rank/suit icons readable)

## Design Guidelines

### Visual Consistency
- All 4 suit icons should have similar line weight and style
- Background should not interfere with rank/suit legibility
- Back pattern should clearly distinguish face-down cards

### Color Theory
- **Hearts & Diamonds**: Traditionally red (or warm hues in themed decks)
- **Clubs & Spades**: Traditionally black (or cool hues in themed decks)
- **Contrast**: Ensure rank text and suit icons are readable on background

### Theme Cohesion
Each theme should have a clear visual identity:
- **Classic**: Traditional playing card aesthetics (serif font, simple suits)
- **Kawaii**: Pastel colors, rounded shapes, cute embellishments
- **MintLoop**: Brand colors (mint green), division logos as suits
- **Pixel**: 8-bit retro, low-res sprite art, CRT-like effects

## Fallback Behavior

If assets fail to load:
- CardView falls back to **Emoji Deck** (♠️ ♥️ ♦️ ♣️)
- No external assets required for emoji fallback
- Always available as universal backup

## Performance Considerations

### Optimization
- **SVG**: Preferred for suit icons (scalable, small file size)
- **PNG**: Compress with tools like TinyPNG or ImageOptim
- **WebP**: Use for backgrounds/backs if browser support is acceptable
- **Lazy Loading**: Consider for large theme libraries

### File Size Targets
- Suit SVGs: <10 KB each (ideally <5 KB)
- Background PNG: <50 KB (compressed)
- Back PNG: <50 KB (compressed)
- Total theme: <250 KB (all 6 assets combined)

## Legal & Licensing

### Casino-Lite Compliance
All card assets must comply with Lucky.mintloop.dev casino-lite disclaimers:
- ⚠️ **No real-world casino branding** (trademarked card backs, casino logos)
- ⚠️ **No licensed IP** (Disney characters, sports teams, etc.)
- ⚠️ **Fictional only**: All designs are decorative, not for gambling

### Asset Sources
- **Custom-designed**: Original artwork by MintLoop team
- **Public domain**: Verified public domain sources (pre-1928 works, CC0)
- **Licensed**: Properly licensed assets with attribution in `/CREDITS.md`

### Attribution
If using third-party assets, add credit to `/CREDITS.md`:
```markdown
## Card Assets
- **Classic Theme Suits**: Public domain playing card designs (pre-1920)
- **Kawaii Theme**: Original artwork by [Artist Name], licensed under CC BY 4.0
```

## Troubleshooting

### Assets Not Loading
1. **Check file paths**: Assets must be in `public/cards/themes/{theme-name}/`
2. **Verify file names**: Exact match required (`hearts.svg`, not `Hearts.svg`)
3. **Check file permissions**: Files must be readable by build process
4. **Inspect browser console**: Look for 404 errors or CORS issues

### Theme Not Appearing in Selector
1. **Registered in `decks.ts`?**: Theme must be in `DECK_THEMES` object
2. **Valid suit set ID?**: `suitSetId` must reference existing `SUIT_SETS` entry
3. **Rebuild required**: Run `npm run build` after adding theme

### Cards Rendering Incorrectly
1. **Aspect ratio issues**: Background images should be 3:4 ratio
2. **Contrast problems**: Adjust `rankFontClass` or background color
3. **Overflow issues**: CardView uses `overflow-hidden` to clip content
4. **Browser caching**: Hard refresh (Cmd+Shift+R) to clear old assets

## Maintenance

### Quarterly Review
- **Audit file sizes**: Ensure themes stay under performance targets
- **Test cross-browser**: Verify SVG compatibility (Safari, Firefox, Chrome)
- **Update documentation**: Reflect any new themes or asset conventions

### When Deprecating Themes
1. Leave assets in place (for historical game renders)
2. Remove from `DECK_THEMES` object in `decks.ts`
3. Add deprecation notice to this README

---

## Contact

Questions or issues with card assets?
- Create issue in GitHub repo: `MintLoop/mintlabs-lucky-api`
- Tag with label: `casino-lite-assets`
- Reference this README in issue description
