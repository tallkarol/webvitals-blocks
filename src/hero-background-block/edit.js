/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
	useBlockProps,
	InnerBlocks,
} from '@wordpress/block-editor';
import {
	PanelBody,
	Button,
	RangeControl,
	SelectControl,
	ColorPicker,
} from '@wordpress/components';

/**
 * Edit component for Hero Background Block.
 *
 * @param {Object}   props               Block props.
 * @param {Object}   props.attributes    Block attributes.
 * @param {Function} props.setAttributes Function to update attributes.
 * @return {JSX.Element} Edit component.
 */
export default function Edit( { attributes, setAttributes } ) {
	const {
		backgroundImageId,
		backgroundImageUrl,
		minHeight,
		contentAlign,
		overlayOpacity,
		overlayColor,
	} = attributes;

	const blockProps = useBlockProps( {
		className: 'hero-background-block',
		style: {
			minHeight,
			alignItems: contentAlign,
			backgroundImage: backgroundImageUrl
				? `url(${ backgroundImageUrl })`
				: 'none',
			backgroundSize: 'cover',
			backgroundPosition: 'center',
			position: 'relative',
		},
	} );

	const onSelectImage = ( media ) => {
		setAttributes( {
			backgroundImageId: media.id,
			backgroundImageUrl: media.url,
			backgroundImageAlt: media.alt,
		} );
	};

	const onRemoveImage = () => {
		setAttributes( {
			backgroundImageId: 0,
			backgroundImageUrl: '',
			backgroundImageAlt: '',
		} );
	};

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Background Settings', 'webvitals-blocks' ) }
				>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={ onSelectImage }
							allowedTypes={ [ 'image' ] }
							value={ backgroundImageId }
							render={ ( { open } ) => (
								<>
									<Button
										onClick={ open }
										variant="primary"
										style={ { marginBottom: '10px' } }
									>
										{ backgroundImageId
											? __(
													'Change Image',
													'webvitals-blocks'
											  )
											: __(
													'Select Image',
													'webvitals-blocks'
											  ) }
									</Button>
									{ backgroundImageId && (
										<Button
											onClick={ onRemoveImage }
											variant="secondary"
											isDestructive
										>
											{ __(
												'Remove Image',
												'webvitals-blocks'
											) }
										</Button>
									) }
								</>
							) }
						/>
					</MediaUploadCheck>
				</PanelBody>

				<PanelBody
					title={ __( 'Layout Settings', 'webvitals-blocks' ) }
				>
					<SelectControl
						label={ __( 'Minimum Height', 'webvitals-blocks' ) }
						value={ minHeight }
						options={ [
							{ label: '300px', value: '300px' },
							{ label: '400px', value: '400px' },
							{ label: '500px', value: '500px' },
							{ label: '600px', value: '600px' },
							{ label: '100vh', value: '100vh' },
						] }
						onChange={ ( value ) =>
							setAttributes( { minHeight: value } )
						}
					/>

					<SelectControl
						label={ __( 'Content Alignment', 'webvitals-blocks' ) }
						value={ contentAlign }
						options={ [
							{
								label: __( 'Top', 'webvitals-blocks' ),
								value: 'flex-start',
							},
							{
								label: __( 'Center', 'webvitals-blocks' ),
								value: 'center',
							},
							{
								label: __( 'Bottom', 'webvitals-blocks' ),
								value: 'flex-end',
							},
						] }
						onChange={ ( value ) =>
							setAttributes( { contentAlign: value } )
						}
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Overlay Settings', 'webvitals-blocks' ) }
				>
					<RangeControl
						label={ __( 'Overlay Opacity', 'webvitals-blocks' ) }
						value={ overlayOpacity }
						onChange={ ( value ) =>
							setAttributes( { overlayOpacity: value } )
						}
						min={ 0 }
						max={ 1 }
						step={ 0.1 }
					/>

					<div style={ { marginBottom: '8px' } }>
						<label htmlFor="overlay-color-picker">
							{ __( 'Overlay Color', 'webvitals-blocks' ) }
						</label>
					</div>
					<ColorPicker
						id="overlay-color-picker"
						color={ overlayColor }
						onChangeComplete={ ( value ) =>
							setAttributes( { overlayColor: value.hex } )
						}
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
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
					<InnerBlocks
						template={ [
							[
								'core/heading',
								{
									level: 1,
									placeholder: __(
										'Add heading…',
										'webvitals-blocks'
									),
								},
							],
							[
								'core/paragraph',
								{
									placeholder: __(
										'Add description…',
										'webvitals-blocks'
									),
								},
							],
						] }
					/>
				</div>
			</div>
		</>
	);
}
