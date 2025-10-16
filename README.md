# WebVitals Blocks

Custom WordPress VIP compliant Gutenberg Blocks that provide boosted performance in Google Core Web Vitals tests.

## Features

- **WordPress VIP Compliant**: Follows all WordPress VIP coding standards and best practices
- **Responsive Background Images**: Uses srcset for optimal image loading across different screen sizes
- **Core Web Vitals Optimized**: 
  - Lazy loading support
  - Responsive image selection
  - Minimal JavaScript footprint
  - CSS-based styling for performance
- **Gutenberg Native**: Built with modern WordPress block development tools
- **Customizable**: Rich controls for background, overlay, and layout settings

## Blocks Included

### Hero Background Block

A performant hero section block with responsive background images using srcset for optimal Core Web Vitals scores.

**Features:**
- Responsive background images with automatic srcset generation
- Customizable overlay with opacity and color controls
- Flexible content alignment (top, center, bottom)
- Multiple height options
- Support for wide and full alignments
- Inner blocks support for adding any content

## Installation

### Prerequisites

- WordPress 6.0 or higher
- PHP 7.4 or higher
- Node.js 16+ and npm (for development)

### Install from Source

1. Clone this repository into your WordPress plugins directory:
```bash
cd wp-content/plugins/
git clone https://github.com/tallkarol/webvitals-blocks.git
cd webvitals-blocks
```

2. Install dependencies:
```bash
npm install
```

3. Build the blocks:
```bash
npm run build
```

4. Activate the plugin in WordPress admin panel

## Development

### Setup

```bash
npm install
```

### Build for Production

```bash
npm run build
```

### Development Mode (with hot reload)

```bash
npm start
```

### Linting

```bash
# Lint JavaScript
npm run lint:js

# Lint CSS
npm run lint:css

# Format code
npm run format
```

## Usage

### Adding the Hero Background Block

1. Open the WordPress block editor
2. Click the `+` button to add a new block
3. Search for "Hero Background Block"
4. Click to add the block to your page

### Configuring the Block

**Background Settings:**
- Click "Select Image" to choose a background image
- The image will automatically generate responsive srcset variants

**Layout Settings:**
- **Minimum Height**: Choose from preset heights or full viewport height
- **Content Alignment**: Align content to top, center, or bottom

**Overlay Settings:**
- **Overlay Opacity**: Adjust the darkness of the overlay (0-1)
- **Overlay Color**: Choose the overlay color

### Adding Content

The Hero Background Block supports inner blocks, allowing you to add:
- Headings
- Paragraphs
- Buttons
- Any other Gutenberg block

## Performance Features

### Responsive Images with Srcset

The block automatically generates srcset attributes for background images, allowing browsers to:
- Select the optimal image size based on viewport width
- Reduce bandwidth usage on mobile devices
- Improve Core Web Vitals scores (LCP, CLS)

### Image Size Strategy

The plugin generates three image sizes by default:
- **Medium**: For mobile devices (typically 768px)
- **Large**: For tablets (typically 1024px)
- **Full**: For desktop displays

### Loading Strategy

- Hero images use eager loading (above-the-fold optimization)
- JavaScript-based srcset implementation for background images
- CSS-based fallback for no-JS scenarios

## WordPress VIP Compliance

This plugin follows WordPress VIP standards:
- ✅ No file system writes
- ✅ Proper escaping and sanitization
- ✅ Uses WordPress core functions
- ✅ Efficient database queries
- ✅ Follows WordPress coding standards
- ✅ Compatible with object cache
- ✅ No external API dependencies

## Browser Support

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

## Contributing

Contributions are welcome! Please follow WordPress coding standards and include tests for new features.

## License

GPL-2.0-or-later

## Credits

Built with [@wordpress/scripts](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-scripts/) and WordPress block development best practices.

