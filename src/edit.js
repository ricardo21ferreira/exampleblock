/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor. 
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/** 
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */

import { RichText } from '@wordpress/block-editor';


export default function Edit(props) {

	const {
		attributes: {
			location
		},
		setAttributes,
	} = props;


	const autoConfigs = [
		{
			name: "Autocomplete", 
			triggerPrefix: "/",
			isDebounced: true,
			// The option data 
			options(search) {
				if (search) {
					return fetch( `https://api.fnugg.no/suggest/autocomplete/?q=${search}`, {
						method: 'GET',
						headers: {
							'Accept': 'application/json',
						},
					}).then (function (response) {
						return response.json()
					})
					.then(function (json) { 
						return json.result;   
					})
					.catch(function (error) { 

					})
				}
				return [];
			},
			getOptionLabel: option => (
				<span>
					<span className="location" >{ option.name }</span>
				</span>
			),
			getOptionKeywords: option => [ option.name ],
			getOptionCompletion: option => [ option.name ]
		} 
	];  
	return (
		<div { ...useBlockProps() }>
			
			<div className='widget'>
				<div className='title hint'>
					<span className='location'>Location: </span>
					<RichText
						autocompleters={ autoConfigs } 
						value={ location }  
						onChange={ ( val ) => { 
							setAttributes( { location: val } );
						} }
						placeholder={ __(`Type here the location (type "/" for autocomplete)...`) }
					/>
				</div>
				<div className='content'>
					<div className='featured_image'>
						<img src="https://fnugg.no/app/uploads/sites/79/2018/08/Daniel-Tengs-Visitfonna-600x338.jpg"></img>
						<div className='current_report'>
							<div className='condition_description'>{ __(`DAGENS FORHOLD`) }</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	) 
}
