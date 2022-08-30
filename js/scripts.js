jQuery(document).ready(($) => {

    var ajax_url = object_name.fnugg_get_data;

    $('.wp-block-create-block-fnugg').each(function(){
        let w = $(this);
        $.ajax({
            type: "GET", 
            url: ajax_url + '/location/' + w.find('.title').text(),
            beforeSend: function(){ 
                
            },
            success: function(data){
                let arr = data;  
                let hits = arr.hits.hits[0];

                /* replaced element creation for element update */
                w.find('.featured_image img').attr('src',hits._source.images.image_16_9_m);

                w.find('.last_updated').text(w.find('.last_updated').text() + hits._source.conditions.current_report.top.last_updated.replace('T',' - ').replace('Z',''));

                w.find('.temperature').text(hits._source.conditions.current_report.top.temperature.value+'°');
                
                w.find('.symbol img').attr('src', `${arr.WP_PLUGIN_URL}/fnugg/img/fnugg-weather-icons/resort-weather-blue-${hits._source.conditions.combined.top.symbol.fnugg_id}.svg`);
                w.find('.symbol span').text(hits._source.conditions.combined.top.symbol.name);

                w.find('.wind .mps img').attr('style',`transform: rotate(${hits._source.conditions.combined.top.wind.degree}deg)`)
                                        .attr('src',`${arr.WP_PLUGIN_URL}/fnugg/img/navigation.png`);
                w.find('.wind .mpsval').text(hits._source.conditions.combined.top.wind.mps);
                w.find('.wind .speed').text(hits._source.conditions.combined.top.wind.speed); 
                
                w.find('.snow img').attr('src',`${arr.WP_PLUGIN_URL}/fnugg/img/road.png`);
                w.find('.snow span').text(hits._source.conditions.current_report.top.condition_description);
                
                //console.log (arr);
            }
        }).done((data) =>{
            w.find('.content').removeClass('loading');
        });
    });
});
