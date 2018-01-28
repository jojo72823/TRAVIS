/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 * 
 */
function get_id_indicators_js() {
    var var_tmp;
    $.ajax({
        url: 'php/accessFonctions.php',
        data: {fonction: 'get_id_indicators', data_print: name_indicators},
        type: 'POST',
        async: false,
        dataType: 'json',
        success: function (objetJson) {
            if (objetJson != null) {
                var_tmp = objetJson;
            } else {
                alert("erreur get_id_indicators! ");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("get_id_indicators failed " + errorThrown);
        }
    });
    return var_tmp;
}

function save_element() {

    $.ajax({
        url: 'php/accessFonctions.php',
        data: {fonction: 'save_element', id_panel: panel_select, class_size_element: "null", type_content: "TAB_POLAR", tab_indicators: id_indicators},
        type: 'POST',
        async: false,
        dataType: 'json',
        success: function (objetJson) {
            if (objetJson != null) {

            } else {
                alert("erreur save_element! ");
            }
        },
        cache: false
    });
}

function save_users_selected_js(user_selected,cpt_users_selected){

    $.ajax({
        url: 'php/accessFonctions.php',
        data: {fonction: 'save_user_selected_php',user_selected : user_selected, cpt_users_selected:cpt_users_selected, id_panel: panel_select, type_content: "TAB_POLAR"},
        type: 'POST',
        async: false,
        dataType: 'json',
        success: function (objetJson) {
            if (objetJson != null) {

            } else {
                alert("erreur save_user_selected_php! ");
            }
        },
        cache: false
    });

}

function get_new_id_chart() {

    var var_tmp;
    $.ajax({
        url: 'php/accessFonctions.php',
        data: {fonction: 'get_id_chart'},
        type: 'POST',
        async: false,
        dataType: 'json',
        success: function (objetJson) {
            if (objetJson != null) {
                var_tmp = objetJson;
            } else {
                alert("erreur getPanel! ");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("getPanel failed " + errorThrown);
        }
    });
    return var_tmp;

}

