/**
 * WordPress dependencies
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

/**
 * Save component for Hero Background Block.
 * This component is responsible for rendering the block on the frontend.
 * It uses data attributes to enable PHP to inject responsive srcset.
 *
 * @param {Object} props            Block props.
 * @param {Object} props.attributes Block attributes.
 * @return {JSX.Element} Save component.
 */
export default function save( { attributes } ) {
	const {
		backgroundImageId,
		backgroundImageUrl,
		minHeight,
		contentAlign,
		overlayOpacity,
		overlayColor,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: 'hero-background-block',
		style: {
			minHeight,
			alignItems: contentAlign,
		},
		'data-bg-image-id': backgroundImageId || '',
		'data-bg-image-url': backgroundImageUrl || '',
	} );

	return (
		<div { ...blockProps }>
			{ backgroundImageUrl && (
				<div
					className="hero-background-image"
					style={ {
						backgroundImage: `url(${ backgroundImageUrl })`,
						backgroundSize: 'cover',
						backgroundPosition: 'center',
					} }
					data-bg-image-id={ backgroundImageId }
					role="img"
					aria-label={ attributes.backgroundImageAlt || '' }
				/>
			) }
			{ overlayOpacity > 0 && (
				<div
					className="hero-background-overlay"
					style={ {
						backgroundColor: overlayColor,
						opacity: overlayOpacity,
					} }
				/>
			) }
			<div className="hero-background-content">
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
