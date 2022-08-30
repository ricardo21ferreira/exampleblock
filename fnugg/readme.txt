=== Fnugg ===
Contributors:      The WordPress Contributors
Tags:              block
Tested up to:      6.0
Stable tag:        0.1.0
License:           GPL-2.0-or-later
License URI:       https://www.gnu.org/licenses/gpl-2.0.html

== Description ==

Create a WordPress plugin that enables a user in the administration panel to insert a
block in a post / page to present data from a ski resort using the Fnugg API
(https://api.fnugg.no/).
Your plugin should be displayed as a Gutenberg block the post/ page editor where
you allow the user to search for a resort with autocomplete (example queries below):
https://api.fnugg.no/suggest/autocomplete/?q=fonna
To be able to fetch the resort details requires another service call:
https://api.fnugg.no/search?q=fonna

== Installation ==

This section describes how to install the plugin and get it working.

e.g.

1. Upload the plugin files to the `/wp-content/plugins/fnugg` directory, or install the plugin through the WordPress plugins screen directly.
2. Activate the plugin through the 'Plugins' screen in WordPress
3. Add Fnugg Widget in gutenberg editor.
4. Type the location (enter "/" for searching with autocomplete)
5. Save the Post.


== Frequently Asked Questions ==

= what methods were used to call the api ? =
1) To do the Autocomplete functionality in backoffice i used the "Autocomplete" attributes from Gutenberg blocks and fetch method from Javascript.
2) To get the data for the widget i used the built in WP function (wp_remote_get) -> class.fnugg.php 

= How long did it take to make this block ? =
9 hours.

= Can I have multiple widgets on the same page? ? =
Yes.


== Changelog ==

= 0.1.0 =
* Release


== Screenshots ==

- Example: https://prnt.sc/2sPfuOhmUbFK


== Arbitrary section ==

- Gutenberg Block created using "create-guten-block" from "https://github.com/ahmadawais/create-guten-block"

- Wind icon navigation is not present in fnugg API api documentation, I put one to replace it. Same with road icon.

- Filtered data from the REST response and returned only the required fields. -> class.fnugg.php // get_data()

- Used Wordpress transients to store the REST API response for 5 minutes (for each location).


== How to rebuild the block ==

- Created using node 12.20.0
- open_file_folder Browse: cd fnugg 
- recycle Run: npm start — For development.
- package Run: npm run build — For production build.
- eject_button Run: npm run eject — To customize, update, and maintain all by yourself.
