<?php
/**
 * Plugin Name: WebVitals Blocks
 * Plugin URI: https://github.com/tallkarol/webvitals-blocks
 * Description: Custom WordPress VIP compliant Gutenberg Blocks that provide boosted performance in Core Web Vitals tests using srcset for backgrounds.
 * Version: 1.0.0
 * Author: Your Name
 * License: GPL-2.0-or-later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: webvitals-blocks
 * Requires at least: 6.0
 * Requires PHP: 7.4
 *
 * @package WebVitalsBlocks
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Register all blocks in the plugin.
 */
function webvitals_blocks_register_blocks() {
	// Register Hero Background Block with render callback.
	register_block_type(
		__DIR__ . '/build/hero-background-block',
		array(
			'render_callback' => 'webvitals_blocks_render_hero_background',
		)
	);
}
add_action( 'init', 'webvitals_blocks_register_blocks' );

/**
 * Render callback for Hero Background Block.
 * Injects responsive srcset into the background image for optimal performance.
 *
 * @param array  $attributes Block attributes.
 * @param string $content Block content.
 * @return string Rendered block HTML.
 */
function webvitals_blocks_render_hero_background( $attributes, $content ) {
	$background_image_id = isset( $attributes['backgroundImageId'] ) ? intval( $attributes['backgroundImageId'] ) : 0;

	// If no background image, return content as-is.
	if ( empty( $background_image_id ) ) {
		return $content;
	}

	// Get responsive background data.
	$responsive_bg = webvitals_blocks_get_responsive_background(
		$background_image_id,
		array( 'medium', 'large', 'full' )
	);

	// If we have srcset data, inject it into the content.
	if ( ! empty( $responsive_bg['srcset'] ) ) {
		// Add inline script to set background image with srcset support.
		$script = sprintf(
			'<script>
			(function() {
				var bgImageId = %d;
				var srcset = "%s";
				var sizes = "%s";
				var defaultSrc = "%s";
				
				// Wait for DOM to be ready
				if (document.readyState === "loading") {
					document.addEventListener("DOMContentLoaded", applyResponsiveBackground);
				} else {
					applyResponsiveBackground();
				}
				
				function applyResponsiveBackground() {
					var bgElements = document.querySelectorAll(".hero-background-image[data-bg-image-id=\"" + bgImageId + "\"]");
					bgElements.forEach(function(element) {
						// Create a temporary image to leverage browser srcset selection
						var img = document.createElement("img");
						img.srcset = srcset;
						img.sizes = sizes;
						img.src = defaultSrc;
						
						// Set loading to eager for above-the-fold hero images
						img.loading = "eager";
						
						// Apply the selected source as background
						img.addEventListener("load", function() {
							element.style.backgroundImage = "url(" + img.currentSrc + ")";
						});
					});
				}
			})();
			</script>',
			esc_js( $background_image_id ),
			esc_js( $responsive_bg['srcset'] ),
			esc_js( $responsive_bg['sizes'] ),
			esc_js( $responsive_bg['src'] )
		);

		// Append script to content.
		$content .= $script;
	}

	return $content;
}

/**
 * Generate responsive srcset for background images.
 *
 * @param int   $image_id The attachment ID.
 * @param array $sizes Array of image sizes to include in srcset.
 * @return array Array containing srcset and sizes data.
 */
function webvitals_blocks_get_responsive_background( $image_id, $sizes = array( 'medium', 'large', 'full' ) ) {
	if ( empty( $image_id ) ) {
		return array(
			'srcset' => '',
			'sizes'  => '',
			'src'    => '',
		);
	}

	$srcset_array = array();
	$default_src  = wp_get_attachment_image_url( $image_id, 'full' );

	foreach ( $sizes as $size ) {
		$image_url = wp_get_attachment_image_url( $image_id, $size );
		if ( $image_url ) {
			$image_meta = wp_get_attachment_metadata( $image_id );
			if ( isset( $image_meta['sizes'][ $size ]['width'] ) ) {
				$width          = $image_meta['sizes'][ $size ]['width'];
				$srcset_array[] = esc_url( $image_url ) . ' ' . $width . 'w';
			} elseif ( 'full' === $size && isset( $image_meta['width'] ) ) {
				$width          = $image_meta['width'];
				$srcset_array[] = esc_url( $image_url ) . ' ' . $width . 'w';
			}
		}
	}

	return array(
		'srcset' => implode( ', ', $srcset_array ),
		'sizes'  => '100vw',
		'src'    => esc_url( $default_src ),
	);
}
