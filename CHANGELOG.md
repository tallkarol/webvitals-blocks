# Changelog

All notable changes to the WebVitals Blocks plugin will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-10-16

### Added

#### Core Features
- Hero Background Block with responsive background images
- Automatic srcset generation for background images
- WordPress VIP compliant implementation
- Core Web Vitals optimized performance

#### Block Features
- Background image upload and selection via Media Library
- Configurable minimum height (300px, 400px, 500px, 600px, 100vh)
- Vertical content alignment (top, center, bottom)
- Customizable overlay with opacity control (0-1)
- Color picker for overlay color
- Support for inner blocks (headings, paragraphs, buttons, etc.)
- Wide and full alignment support
- Real-time preview in block editor

#### Technical Features
- Server-side rendering with PHP callback
- Responsive image srcset generation using WordPress APIs
- Proper image size selection based on viewport
- Eager loading for above-the-fold hero images
- CSS-based layout with flexbox
- Minimal JavaScript footprint
- Compatible with object caching (Redis, Memcached)

#### Development Tools
- Built with @wordpress/scripts
- ESLint configuration with WordPress standards
- Stylelint for CSS/SCSS
- Prettier code formatting
- Hot reload development mode
- Production build optimization

#### Documentation
- Comprehensive README with installation and usage
- WordPress VIP Compliance Guide
- Detailed Usage Guide
- Technical Architecture Documentation
- Quick Reference Guide
- Code examples and best practices

### Technical Details

#### Dependencies
- @wordpress/scripts ^26.0.0
- @wordpress/block-editor ^12.0.0
- @wordpress/blocks ^12.0.0
- @wordpress/components ^25.0.0
- @wordpress/element ^5.0.0
- @wordpress/i18n ^4.0.0

#### Compatibility
- WordPress 6.0+
- PHP 7.4+
- Node.js 16+ (for development)
- Modern browsers (Chrome, Firefox, Safari, Edge)

#### Performance Metrics
- Optimized for Largest Contentful Paint (LCP)
- Minimal Cumulative Layout Shift (CLS)
- Fast First Input Delay (FID)
- Average image weight < 200KB with optimization

### WordPress VIP Compliance
- ✅ No file system writes
- ✅ Proper escaping and sanitization
- ✅ Uses WordPress core functions
- ✅ Efficient database queries
- ✅ WordPress coding standards
- ✅ Object cache compatible
- ✅ No external API dependencies

### Notes

This is the initial release of WebVitals Blocks. The plugin provides a solid foundation for creating performant hero sections with responsive background images.

The implementation focuses on:
- WordPress VIP compliance
- Core Web Vitals optimization
- Developer experience
- User-friendly interface
- Comprehensive documentation

Future releases will add more block types and features while maintaining the same focus on performance and compliance.

---

## Release Types

- **Major** (x.0.0) - Breaking changes, major new features
- **Minor** (0.x.0) - New features, backwards compatible
- **Patch** (0.0.x) - Bug fixes, minor improvements

## Upgrade Notes

### From Development Version

If upgrading from a development version:
1. Backup your site
2. Run `npm install` to update dependencies
3. Run `npm run build` to rebuild assets
4. Clear WordPress caches
5. Test the block functionality

## Future Roadmap

### Planned for 1.1.0
- [ ] Video background support
- [ ] Additional block variations
- [ ] More height presets
- [ ] Gradient overlay option
- [ ] Animation effects

### Planned for 1.2.0
- [ ] Parallax scrolling effect
- [ ] Multiple background layers
- [ ] Art direction support (different images per breakpoint)
- [ ] WebP format optimization

### Planned for 2.0.0
- [ ] Additional block types
- [ ] Block patterns library
- [ ] Advanced customization options
- [ ] Extended WordPress VIP features

## Support

For questions, issues, or contributions:
- GitHub Issues: https://github.com/tallkarol/webvitals-blocks/issues
- Documentation: See docs/ directory

## License

GPL-2.0-or-later - See LICENSE file for details
