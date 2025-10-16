# Usage Guide

This guide will help you get started with the WebVitals Blocks plugin and create performant hero sections.

## Quick Start

### 1. Install the Plugin

```bash
# In your WordPress plugins directory
git clone https://github.com/tallkarol/webvitals-blocks.git
cd webvitals-blocks
npm install
npm run build
```

Activate the plugin through WordPress admin or via WP-CLI:

```bash
wp plugin activate webvitals-blocks
```

### 2. Add a Hero Background Block

1. Open the WordPress block editor (Gutenberg)
2. Click the **+** button to add a new block
3. Search for "Hero Background"
4. Click to insert the block

## Block Configuration

### Background Image

The most important feature of the Hero Background Block is its optimized background image handling.

**To add a background image:**

1. With the block selected, open the sidebar settings panel
2. Under "Background Settings", click **Select Image**
3. Choose an image from the Media Library or upload a new one
4. The plugin will automatically generate responsive srcset variants

**Image Requirements:**

- Recommended minimum size: 1920×1080 pixels
- Supported formats: JPG, PNG, WebP
- For best performance, use already optimized images

### Layout Settings

**Minimum Height:**

Choose from preset height options:
- **300px** - Compact hero
- **400px** - Default hero (recommended)
- **500px** - Medium hero
- **600px** - Large hero
- **100vh** - Full viewport height

**Content Alignment:**

Position your content vertically:
- **Top** - Align content to the top of the block
- **Center** - Center content vertically (default)
- **Bottom** - Align content to the bottom

### Overlay Settings

Add a semi-transparent overlay to improve text readability:

**Overlay Opacity:**
- Range: 0 (no overlay) to 1 (fully opaque)
- Default: 0.3
- Recommended: 0.3-0.5 for most images

**Overlay Color:**
- Click the color picker to choose a color
- Default: Black (#000000)
- Dark colors generally work best

### Adding Content

The Hero Background Block supports inner blocks, allowing you to add any WordPress block inside:

**Default Content:**
- Heading (H1)
- Paragraph

**You can also add:**
- Buttons
- Multiple headings
- Lists
- Images
- Any other Gutenberg block

**Example structure:**

```
Hero Background Block
├── Heading: "Welcome to Our Site"
├── Paragraph: "Discover amazing products"
└── Buttons
    ├── Button: "Learn More"
    └── Button: "Contact Us"
```

## Best Practices

### Image Optimization

1. **Upload High-Quality Images**
   - Start with high-resolution images (1920×1080 or larger)
   - WordPress will generate smaller versions automatically

2. **Use Appropriate File Formats**
   - JPEG for photographs
   - PNG for graphics with transparency
   - WebP when available (WordPress 5.8+)

3. **Compress Before Upload**
   - Use tools like ImageOptim, TinyPNG, or Squoosh
   - Target: < 200KB for JPEG images

### Core Web Vitals Tips

**Largest Contentful Paint (LCP):**
- Use the hero block near the top of the page
- Keep image file sizes under 200KB
- The plugin automatically uses eager loading for hero images

**Cumulative Layout Shift (CLS):**
- Set an appropriate minimum height
- Don't change heights after page load
- The plugin reserves space to prevent layout shift

**First Input Delay (FID):**
- Minimal JavaScript is loaded
- No heavy interactions required

### Accessibility

**For better accessibility:**

1. **Add Alt Text** to your background images
   - Open the image in the Media Library
   - Add descriptive alt text
   - The plugin will automatically use it

2. **Ensure Text Contrast**
   - Use overlay settings to improve readability
   - Test with browser DevTools (Lighthouse accessibility audit)

3. **Keyboard Navigation**
   - All controls are keyboard accessible
   - Test with Tab key navigation

## Examples

### Example 1: Simple Hero

```
Hero Background Block
├── Settings:
│   ├── Background: hero-image.jpg
│   ├── Min Height: 500px
│   ├── Overlay: 0.4 opacity, black
│   └── Alignment: Center
└── Content:
    ├── Heading: "Welcome to Our Store"
    └── Paragraph: "Find the perfect products for you"
```

### Example 2: Call-to-Action Hero

```
Hero Background Block
├── Settings:
│   ├── Background: cta-background.jpg
│   ├── Min Height: 100vh
│   ├── Overlay: 0.5 opacity, navy blue
│   └── Alignment: Center
└── Content:
    ├── Heading: "Limited Time Offer"
    ├── Paragraph: "Save 50% on all products"
    └── Button: "Shop Now"
```

### Example 3: Minimal Hero

```
Hero Background Block
├── Settings:
│   ├── Background: minimal-bg.jpg
│   ├── Min Height: 400px
│   ├── Overlay: 0.2 opacity, black
│   └── Alignment: Bottom
└── Content:
    └── Heading: "Simple. Elegant. Powerful."
```

## Troubleshooting

### Images Not Loading

**Check:**
- Image is properly uploaded to Media Library
- File permissions are correct
- Browser console for errors

**Solution:**
- Re-upload the image
- Clear browser cache
- Check WordPress media settings

### Srcset Not Generated

**Check:**
- WordPress has write permissions to uploads directory
- Image regeneration plugins are not conflicting

**Solution:**
- Regenerate thumbnails using WP-CLI:
  ```bash
  wp media regenerate --yes
  ```

### Poor Performance

**Check:**
- Image file size (should be < 200KB)
- Number of hero blocks on page (limit to 1-2)
- CDN configuration

**Solution:**
- Optimize images before upload
- Use a CDN for image delivery
- Enable browser caching

## Advanced Usage

### Custom Image Sizes

Add custom image sizes in your theme's `functions.php`:

```php
function mytheme_custom_image_sizes() {
    add_image_size( 'hero-mobile', 768, 576, true );
    add_image_size( 'hero-tablet', 1024, 768, true );
    add_image_size( 'hero-desktop', 1920, 1080, true );
}
add_action( 'after_setup_theme', 'mytheme_custom_image_sizes' );
```

Then regenerate thumbnails:

```bash
wp media regenerate --yes
```

### Custom Styling

Override block styles in your theme:

```css
/* Make hero full width */
.hero-background-block {
    width: 100vw;
    margin-left: calc(50% - 50vw);
}

/* Custom text styling */
.hero-background-content h1 {
    font-size: 3rem;
    font-weight: 900;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .hero-background-content h1 {
        font-size: 2rem;
    }
}
```

## Performance Monitoring

### Measure Core Web Vitals

1. **Google PageSpeed Insights**
   - Visit: https://pagespeed.web.dev/
   - Enter your page URL
   - Check LCP, FID, and CLS scores

2. **Chrome DevTools**
   - Open DevTools (F12)
   - Go to Lighthouse tab
   - Run audit on page with hero block

3. **Google Search Console**
   - View Core Web Vitals report
   - Monitor field data over time

### Target Metrics

Aim for these scores:

- **LCP**: < 2.5s (Good)
- **FID**: < 100ms (Good)
- **CLS**: < 0.1 (Good)

## Support

For issues or questions:

1. Check the [WordPress VIP Compliance Guide](./WORDPRESS_VIP_COMPLIANCE.md)
2. Review the [README](../README.md)
3. Open an issue on GitHub
