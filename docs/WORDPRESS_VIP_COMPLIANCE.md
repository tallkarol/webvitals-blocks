# WordPress VIP Compliance Guide

This document outlines how the WebVitals Blocks plugin adheres to WordPress VIP coding standards and best practices.

## WordPress VIP Standards Compliance

### ✅ No File System Writes

The plugin does not write to the file system at runtime. All configuration is stored in the WordPress database using the standard block attributes system.

### ✅ Proper Escaping and Sanitization

All user-generated content is properly escaped:

- **PHP**: Uses `esc_url()`, `esc_js()`, and `esc_attr()` functions
- **JavaScript**: Uses WordPress i18n functions and React's built-in XSS protection

```php
// Example from webvitals-blocks.php
'srcset' => implode( ', ', $srcset_array ),
'src'    => esc_url( $default_src ),
```

### ✅ WordPress Core Functions

The plugin leverages WordPress core functions rather than custom implementations:

- `wp_get_attachment_image_url()` - For retrieving image URLs
- `wp_get_attachment_metadata()` - For image metadata
- `register_block_type()` - For block registration
- WordPress block editor components for UI

### ✅ Efficient Database Queries

No custom database queries are used. All data access goes through WordPress APIs:

- Block attributes stored via Gutenberg's standard mechanism
- Media data accessed via WordPress attachment functions
- No direct database queries (`$wpdb` not used)

### ✅ WordPress Coding Standards

The code follows WordPress PHP and JavaScript coding standards:

- **PHP**: WordPress-Core coding standards
- **JavaScript**: @wordpress/eslint-plugin used for linting
- **CSS**: stylelint with WordPress-specific rules

### ✅ Object Cache Compatibility

The plugin is fully compatible with object caching:

- Uses WordPress transients and cache groups appropriately
- No file-based caching
- All data requests use WordPress APIs that support object caching

### ✅ No External API Dependencies

The plugin does not make external API calls:

- All image processing is done locally using WordPress functions
- No CDN dependencies (though compatible with CDNs)
- No third-party service integrations

## Core Web Vitals Optimization

### Largest Contentful Paint (LCP)

- **Responsive Images**: Uses srcset to serve appropriately sized images
- **Eager Loading**: Hero images are loaded with priority for above-the-fold content
- **Optimal Formats**: Leverages WordPress image optimization

### Cumulative Layout Shift (CLS)

- **Explicit Dimensions**: Block has defined minimum height to prevent layout shift
- **CSS-based Layout**: Uses flexbox for stable layouts
- **Reserved Space**: Background container maintains space during image load

### First Input Delay (FID)

- **Minimal JavaScript**: Only essential JS for srcset implementation
- **Non-blocking Scripts**: Scripts execute after content is visible
- **Efficient Event Handlers**: Uses native browser APIs

## Security Best Practices

### Input Validation

All block attributes are validated through block.json schema.

### Output Escaping

All dynamic output is properly escaped in PHP using WordPress escaping functions.

### Content Security Policy (CSP) Compatible

- No inline styles or scripts (except for the controlled srcset implementation)
- Compatible with strict CSP policies
- Uses nonce-based script execution when available

## Performance Features

### Asset Loading

- **Conditional Loading**: Scripts only load when block is present
- **Minified Assets**: Production builds are minified
- **CSS Splitting**: Editor and frontend styles are separate

### Image Optimization Strategy

1. **Multiple Sizes**: Generates medium, large, and full sizes
2. **Responsive Selection**: Browser chooses optimal size via srcset
3. **Lazy Loading Support**: Compatible with WordPress native lazy loading
4. **WebP Support**: Works with WordPress WebP generation plugins

## Testing

### Validation

Run the following commands to validate compliance:

```bash
# JavaScript linting
npm run lint:js

# CSS linting
npm run lint:css

# Build production assets
npm run build
```

## Deployment

### Requirements

- WordPress 6.0 or higher
- PHP 7.4 or higher
- WordPress VIP environment (recommended)

### Installation on WordPress VIP

1. Add plugin to `plugins/` directory
2. Run `npm install && npm run build` locally
3. Commit built files in `build/` directory
4. Deploy via VIP deployment process
5. Activate via WP-CLI or admin panel

## Maintenance

### Updates

Keep dependencies updated:

```bash
npm run packages-update
```

### Monitoring

Monitor Core Web Vitals using:

- Google PageSpeed Insights
- Google Search Console
- Chrome User Experience Report (CrUX)
