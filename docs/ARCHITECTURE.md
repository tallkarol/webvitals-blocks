# Technical Architecture

This document provides a technical overview of the WebVitals Blocks plugin architecture and implementation details.

## Project Structure

```
webvitals-blocks/
├── build/                          # Production-ready built files (committed to repo)
│   └── hero-background-block/
│       ├── block.json             # Block metadata
│       ├── index.asset.php        # WordPress asset dependencies
│       ├── index.css              # Editor styles (minified)
│       ├── index.js               # Block JavaScript (minified)
│       └── style-index.css        # Frontend styles (minified)
├── docs/                           # Documentation
│   ├── USAGE.md                   # User guide
│   ├── WORDPRESS_VIP_COMPLIANCE.md # VIP compliance guide
│   └── ARCHITECTURE.md            # This file
├── src/                            # Source files
│   └── hero-background-block/
│       ├── block.json             # Block configuration
│       ├── edit.js                # Editor component
│       ├── editor.scss            # Editor-only styles
│       ├── index.js               # Block registration
│       ├── save.js                # Save/render component
│       └── style.scss             # Frontend and editor styles
├── package.json                    # Node dependencies
├── webvitals-blocks.php           # Main plugin file
├── .gitignore                     # Git ignore rules
├── LICENSE                        # GPL-2.0 license
└── README.md                      # Project overview
```

## Block Architecture

### Block Registration Flow

1. **PHP Side** (`webvitals-blocks.php`):
   - Plugin loads and hooks into `init` action
   - `register_block_type()` registers the block from built files
   - Render callback (`webvitals_blocks_render_hero_background`) intercepts output
   - PHP generates responsive srcset data
   - JavaScript is injected to apply srcset to background

2. **JavaScript Side** (built from `src/`):
   - `index.js` imports and registers the block
   - `edit.js` provides the editor interface
   - `save.js` generates the saved HTML structure

### Data Flow

```
User selects image in editor
    ↓
Image ID stored in block attributes
    ↓
Block saved with data-bg-image-id attribute
    ↓
PHP render callback intercepts on frontend
    ↓
wp_get_attachment_metadata() retrieves image sizes
    ↓
Generate srcset string with multiple image sizes
    ↓
Inject JavaScript with srcset data
    ↓
Browser selects optimal image size
    ↓
Apply as CSS background-image
```

## Core Components

### 1. Main Plugin File (webvitals-blocks.php)

**Key Functions:**

- `webvitals_blocks_register_blocks()`: Registers all blocks with WordPress
- `webvitals_blocks_render_hero_background()`: Server-side render callback
- `webvitals_blocks_get_responsive_background()`: Generates srcset data

**Render Callback Logic:**

```php
function webvitals_blocks_render_hero_background( $attributes, $content ) {
    // 1. Extract background image ID from attributes
    // 2. Generate srcset using wp_get_attachment_metadata()
    // 3. Create inline script with srcset data
    // 4. Append script to block content
    // 5. Return modified content
}
```

### 2. Block Configuration (block.json)

**Schema Version:** API Version 3 (WordPress 6.0+)

**Key Attributes:**

- `backgroundImageId` (number): WordPress attachment ID
- `backgroundImageUrl` (string): Direct image URL (fallback)
- `minHeight` (string): CSS height value
- `contentAlign` (string): Flexbox alignment value
- `overlayOpacity` (number): 0-1 range for overlay transparency
- `overlayColor` (string): Hex color for overlay

### 3. Editor Component (edit.js)

**Structure:**

```javascript
Edit Component
├── InspectorControls (Sidebar)
│   ├── Background Settings Panel
│   │   └── MediaUpload Component
│   ├── Layout Settings Panel
│   │   ├── Height SelectControl
│   │   └── Alignment SelectControl
│   └── Overlay Settings Panel
│       ├── Opacity RangeControl
│       └── Color ColorPicker
└── Block Preview (Editor Canvas)
    ├── Background Layer (CSS)
    ├── Overlay Layer (conditional)
    └── Content Layer (InnerBlocks)
```

**Key Features:**

- Real-time preview of background image
- Visual overlay adjustment
- Support for nested blocks via InnerBlocks

### 4. Save Component (save.js)

**Output Structure:**

```html
<div class="hero-background-block" 
     data-bg-image-id="{id}"
     data-bg-image-url="{url}">
  <div class="hero-background-image" 
       style="background-image: url(...)"></div>
  <div class="hero-background-overlay"></div>
  <div class="hero-background-content">
    <!-- InnerBlocks content -->
  </div>
</div>
```

**Data Attributes:**

- `data-bg-image-id`: Used by PHP to identify image
- `data-bg-image-url`: Fallback URL for no-JS scenarios

## Srcset Implementation

### Why Background Images Need Special Handling

CSS `background-image` doesn't support srcset natively. This plugin bridges that gap.

### Implementation Strategy

**Problem:** CSS background images can't use `<img srcset="...">`

**Solution:** Three-phase approach

1. **Save Phase** (save.js):
   - Store image ID in data attribute
   - Add fallback background-image in inline style

2. **Render Phase** (PHP):
   - Intercept block output server-side
   - Generate srcset string from WordPress image metadata
   - Inject JavaScript with srcset data

3. **Client Phase** (JavaScript):
   - Create temporary `<img>` element with srcset
   - Let browser select optimal image via `currentSrc`
   - Apply selected image as CSS background-image

### Code Example

```javascript
// Injected by PHP render callback
var img = document.createElement("img");
img.srcset = "image-768w.jpg 768w, image-1024w.jpg 1024w, image-1920w.jpg 1920w";
img.sizes = "100vw";

img.addEventListener("load", function() {
    // Browser has selected optimal image
    element.style.backgroundImage = "url(" + img.currentSrc + ")";
});
```

## Performance Optimizations

### 1. Asset Loading Strategy

**Editor Only:**
- `index.css` (editor styles)
- Full React components

**Frontend Only:**
- `style-index.css` (frontend styles)
- Minimal srcset JavaScript (inline)

**Conditional Loading:**
- Scripts only load when block is present on page
- Handled automatically by WordPress block system

### 2. Image Size Generation

**Default Sizes Used:**
- `medium` (typically 768px)
- `large` (typically 1024px)
- `full` (original size)

**Why These Sizes:**
- Cover mobile (< 768px)
- Cover tablet (768-1024px)
- Cover desktop (> 1024px)

### 3. Caching Strategy

**WordPress Integration:**
- `wp_get_attachment_metadata()` uses WordPress object cache
- No custom caching needed
- Compatible with Redis, Memcached

### 4. Loading Priority

**Hero Images:**
- Use `loading="eager"` attribute
- No lazy loading (above-the-fold content)
- Prioritized in browser loading queue

## Browser Compatibility

### Modern Browsers (Fully Supported)

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Fallback for Older Browsers

- Original `background-image` URL remains in place
- If JavaScript fails, fallback image still displays
- Progressive enhancement approach

## WordPress VIP Specific Considerations

### Why Built Files Are Committed

WordPress VIP doesn't support build processes on deployment:
- Node.js not available in production
- `npm install` cannot be run
- Built files must be in repository

### File System Constraints

VIP environments are read-only except for uploads:
- No file writes at runtime
- All configuration via database
- Image processing uses WordPress APIs only

### Caching Strategy

VIP uses aggressive object caching:
- Plugin compatible with Memcached
- No custom caching implementation
- Relies on WordPress core cache APIs

## Extending the Plugin

### Adding New Image Sizes

```php
// In theme's functions.php
add_action( 'after_setup_theme', function() {
    add_image_size( 'hero-mobile', 768, 576, true );
    add_image_size( 'hero-desktop', 1920, 1080, true );
});

// Then regenerate existing images
// wp media regenerate --yes
```

### Customizing Srcset Sizes

Modify `webvitals_blocks_get_responsive_background()` in `webvitals-blocks.php`:

```php
$responsive_bg = webvitals_blocks_get_responsive_background(
    $background_image_id,
    array( 'hero-mobile', 'hero-desktop', 'full' )  // Custom sizes
);
```

### Adding New Blocks

1. Create new directory in `src/`
2. Add block.json, index.js, edit.js, save.js
3. Register in `webvitals-blocks.php`
4. Run `npm run build`

## Testing Strategy

### Linting

```bash
npm run lint:js    # ESLint with WordPress rules
npm run lint:css   # Stylelint with WordPress rules
npm run format     # Prettier formatting
```

### Manual Testing Checklist

- [ ] Block appears in inserter
- [ ] Image upload works
- [ ] Preview shows background correctly
- [ ] Saved block renders on frontend
- [ ] Srcset is generated and applied
- [ ] Responsive images load correctly
- [ ] Overlay settings work
- [ ] Inner blocks function properly

### Performance Testing

Use Chrome DevTools Lighthouse:
- Target LCP < 2.5s
- Target CLS < 0.1
- Target FID < 100ms

## Security Considerations

### Input Validation

All attributes validated via block.json schema:
- Type checking (number, string, etc.)
- Default values provided
- WordPress sanitization on save

### Output Escaping

PHP functions used:
- `esc_url()` for URLs
- `esc_js()` for JavaScript strings
- `esc_attr()` for HTML attributes

### XSS Prevention

- React automatically escapes output
- No `dangerouslySetInnerHTML` used
- User input never executed as code

## Maintenance

### Dependency Updates

```bash
# Update WordPress packages
npm run packages-update

# Check for security vulnerabilities
npm audit

# Update specific package
npm update @wordpress/scripts
```

### Building for Production

```bash
# Clean build
rm -rf build/
npm run build

# Verify output
ls -la build/hero-background-block/
```

## Future Enhancements

### Potential Features

1. **Video Backgrounds**: Support for video with fallback image
2. **Parallax Effect**: Optional parallax scrolling
3. **Animation Controls**: Fade-in, slide-in effects
4. **Multiple Breakpoints**: More granular responsive control
5. **WebP Support**: Automatic WebP srcset when available
6. **Art Direction**: Different images for different screen sizes

### Plugin Architecture

The modular structure supports adding new blocks:
- Each block is self-contained
- Shared utilities can be extracted
- Build system scales to multiple blocks

## Troubleshooting

### Common Issues

**Build Fails:**
- Check Node.js version (16+)
- Clear `node_modules` and reinstall
- Check for syntax errors in source files

**Images Not Displaying:**
- Verify WordPress image sizes exist
- Check browser console for errors
- Confirm image ID is valid

**Srcset Not Working:**
- Check that PHP render callback is executing
- Verify JavaScript is not blocked
- Inspect network tab for image requests

## Resources

- [WordPress Block Editor Handbook](https://developer.wordpress.org/block-editor/)
- [WordPress VIP Documentation](https://docs.wpvip.com/)
- [Core Web Vitals Guide](https://web.dev/vitals/)
- [Responsive Images](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)
