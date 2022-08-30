<?php 

define('FNUGG_AUTOMPLETE_URL', 'https://api.fnugg.no/suggest/autocomplete/');
define('FNUGG_SEARCH_URL', 'https://api.fnugg.no/search/');

/**
* Main class for Fnugg Gutenberg Block
*/
class FnuggBlock {
    private static $instance;
    public function __construct() {
        // Init
        add_action('rest_api_init', array($this, 'rest_api_getdata'));
        //add_action( 'wp_ajax_nopriv_get_data', array( $this, 'get_data') );
        //add_action( 'wp_ajax_get_data', array( $this, 'get_data') );
        add_action( 'wp_footer', array($this, 'enqueueAssets'));
        add_action('init', 'register_fnugg_block');
    } 

    public static function get_instance() {
        if ( self::$instance == null ) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    /* using the rest api as suggested */
    public function rest_api_getdata() {
        register_rest_route( 'fnugg/v1', '/location/(?P<name>([a-zA-Z]|%20)+)', array(
                'methods'  => 'GET',
                'callback' => array($this, "get_location_data")
            )
        );
    }

    public function get_location_data( $data ) {
        $location = $data['name'];
        return $this->get_data($location);
    }

    /*
    * Enqueue necessary assets
    */ 
    public function enqueueAssets() {
        $handle = 'fnugg';
            // removed the override - only includes if needed
            wp_enqueue_script('jquery-core', 'https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js', array(), null, true);
            wp_register_script($handle, WP_PLUGIN_URL . '/fnugg/js/scripts.js', array ('jquery'), false, false ); // dependency added
            // replaced for json api endpoint
            wp_localize_script($handle, 'object_name', [
                'fnugg_get_data' => site_url('wp-json/fnugg/v1')
            ]);
            //wp_localize_script($handle, 'object_name', [
            //    'ajax_url' => admin_url('admin-ajax.php')
            //]);
            wp_enqueue_script($handle);
    } 
    
    
    /*
    * Get the data to widget
    */
    public function get_data($location = '') {
        if($location === ''){
            die();
        }
        //Filter the data from the REST response and return only the required fields
        $json = get_transient('rest_api_response_transient_'.sanitize_title(urldecode($location)));
        if ( false === $json ) {
            $sourceFields = array('images.image_16_9_m',
                                'conditions.current_report.top.condition_description',
                                'conditions.combined.top.symbol.fnugg_id',
                                'conditions.current_report.top.last_updated',
                                'conditions.current_report.top.temperature.value',
                                'conditions.combined.top.symbol.name',
                                'conditions.combined.top.wind.mps',
                                'conditions.combined.top.wind.speed',
                                'conditions.combined.top.wind.degree');
            $data = array(
                'q' => urldecode($location),
                'sourceFields' => implode(',', $sourceFields)
            ); 
            $query_url = FNUGG_SEARCH_URL.'?'.http_build_query($data);
            $response = wp_remote_get($query_url);
            try {
                $json = $response['body'];
                $json = json_decode($json,true);
                $json['WP_PLUGIN_URL'] = WP_PLUGIN_URL; 
                $json['request_url'] = $data;
                $json = json_encode($json,true); 

                //Using Wordpress transients to store the API response for 5 minutes
                set_transient( 'rest_api_response_transient_'.sanitize_title(urldecode($location)), $json, 5*MINUTE_IN_SECONDS );
            } catch ( Exception $ex ) {
                $json = null;
            } 
        }
        echo $json;
        die();
    }
}
FnuggBlock::get_instance();
