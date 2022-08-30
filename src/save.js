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
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save(props) {
	const { 
		attributes: {
			location,
		},
		setAttributes
	} = props;

	/* this don't work. the solution can be server side rendering (also benefits from saves 1 request) 
	var defLocation;
	fetch( `http://localhost/mundopao/wp-json/fnugg/v1/location/${location}`, {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
			},
	}).then (function (response) {
		this.defLocation = response.json()
	})
	.then(function (json) { 
		this.defLocation = JSON.parse(json.result);    
	})
	.catch(function (error) { 
	})
	console.log(this.defLocation);
	*/


	return (
		<div { ...useBlockProps.save() }>
			<div className='widget'>
				<div className='title'>{ location }</div>
				<div className='content loading'>
					<div className='featured_image'>
						
						<img src=""></img>
						<div className='current_report'>
							<div className='condition_description'>{ __(`DAGENS FORHOLD`) }</div>
							<div className='last_updated'>{ __(`Oppdatert: `) }</div>
						</div> 
					</div>
					<div className='combined'>
						<div className='symbol'><img src=""/><span></span></div> 
						<div className='temperature'>10º</div>
						<div className='wind'>
							<span class="mps">
								<img style="" src=""/>
								<span class="mpsval"></span>
								<span>m/s</span> 
							</span>
							<span class="speed"></span>
						</div>
						<div className='snow'><img src=""/><span>Deilig varsno</span></div> 
					</div>
				</div>
			</div>
		</div>
	); 
}
