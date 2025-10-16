# Quick Reference

Quick commands and common tasks for working with WebVitals Blocks.

## Installation

```bash
git clone https://github.com/tallkarol/webvitals-blocks.git
cd webvitals-blocks
npm install
npm run build
```

## Development Commands

```bash
# Start development mode (watch for changes)
npm start

# Build for production
npm run build

# Lint JavaScript
npm run lint:js

# Lint CSS
npm run lint:css

# Format code
npm run format

# Update WordPress packages
npm run packages-update
```

## WordPress CLI

```bash
# Activate plugin
wp plugin activate webvitals-blocks

# Deactivate plugin
wp plugin deactivate webvitals-blocks

# Regenerate image sizes
wp media regenerate --yes

# Check plugin status
wp plugin status webvitals-blocks
```

## File Locations

| Purpose | Location |
|---------|----------|
| Main plugin file | `webvitals-blocks.php` |
| Block source | `src/hero-background-block/` |
| Built files | `build/hero-background-block/` |
| Documentation | `docs/` |
| Dependencies | `package.json` |

## Block Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| backgroundImageId | number | 0 | WordPress attachment ID |
| backgroundImageUrl | string | "" | Image URL (fallback) |
| backgroundImageAlt | string | "" | Alt text for accessibility |
| minHeight | string | "400px" | Minimum block height |
| contentAlign | string | "center" | Vertical alignment |
| overlayOpacity | number | 0.3 | Overlay transparency (0-1) |
| overlayColor | string | "#000000" | Overlay color (hex) |

## PHP Functions

```php
// Get responsive background data
$bg_data = webvitals_blocks_get_responsive_background(
    $image_id,
    array( 'medium', 'large', 'full' )
);

// Returns array:
// [
//     'srcset' => 'image-768w.jpg 768w, image-1024w.jpg 1024w',
//     'sizes'  => '100vw',
//     'src'    => 'image-full.jpg'
// ]
```

## CSS Classes

| Class | Purpose |
|-------|---------|
| `.hero-background-block` | Main container |
| `.hero-background-image` | Background image layer |
| `.hero-background-overlay` | Overlay layer |
| `.hero-background-content` | Content container |

## Customization Examples

### Add Custom Image Size

```php
// functions.php
add_image_size( 'hero-mobile', 768, 576, true );
add_image_size( 'hero-desktop', 1920, 1080, true );
```

### Override Block Styles

```css
/* style.css */
.hero-background-block {
    border-radius: 8px;
}

.hero-background-content h1 {
    font-size: 3rem;
}
```

### Filter Background Sizes

```php
// functions.php
add_filter( 'webvitals_blocks_bg_sizes', function( $sizes ) {
    return array( 'thumbnail', 'medium', 'large', 'full' );
} );
```

## Performance Targets

| Metric | Target | Good |
|--------|--------|------|
| LCP | < 2.5s | ✅ |
| FID | < 100ms | ✅ |
| CLS | < 0.1 | ✅ |
| Image Size | < 200KB | Recommended |

## Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ⚠️ IE11 (with fallback)

## Common Issues & Fixes

### Issue: Build fails

```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Issue: Images not loading

```bash
# Regenerate thumbnails
wp media regenerate --yes

# Check file permissions
ls -la wp-content/uploads/
```

### Issue: Linting errors

```bash
# Auto-fix JavaScript issues
npm run lint:js -- --fix

# Format code
npm run format
```

## Testing Checklist

- [ ] Block appears in inserter
- [ ] Image upload works
- [ ] Background displays correctly
- [ ] Overlay settings work
- [ ] Inner blocks function
- [ ] Responsive images load
- [ ] Mobile display correct
- [ ] No console errors
- [ ] Lighthouse score > 90

## Support & Documentation

- [README](../README.md) - Project overview
- [USAGE.md](./USAGE.md) - User guide
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Technical details
- [WORDPRESS_VIP_COMPLIANCE.md](./WORDPRESS_VIP_COMPLIANCE.md) - VIP compliance

## Quick Tips

1. **Always build before committing**: `npm run build`
2. **Test on mobile devices**: Use Chrome DevTools device mode
3. **Optimize images first**: Compress before uploading
4. **Use proper alt text**: For accessibility
5. **Monitor performance**: Check Core Web Vitals regularly

## Version Info

- **Node.js**: 16+ required
- **WordPress**: 6.0+ required
- **PHP**: 7.4+ required
- **Block API**: Version 3

## License

GPL-2.0-or-later - See [LICENSE](../LICENSE) for details
