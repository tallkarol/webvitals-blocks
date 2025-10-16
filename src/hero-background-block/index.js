/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import Edit from './edit';
import save from './save';
import metadata from './block.json';
import './style.scss';
import './editor.scss';

/**
 * Register the Hero Background Block.
 */
registerBlockType( metadata.name, {
	edit: Edit,
	save,
} );
