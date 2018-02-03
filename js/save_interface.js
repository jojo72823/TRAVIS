
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

function save_element(panel_select, type_element,array_id_indicators_element) {

    switch (type_element) {
        case "TAB_POLAR":
            $.ajax({
                url: 'php/accessFonctions.php',
                data: {fonction: 'save_element_polar', id_panel: panel_select, class_size_element: "null", type_element: type_element, array_id_indicators_element: array_id_indicators_element},
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
            break;

        case "TAB_SPIDER":
            $.ajax({
                url: 'php/accessFonctions.php',
                data: {fonction: 'save_element_spider', id_panel: panel_select, class_size_element: "null", type_element: type_element,  array_id_indicators_element: array_id_indicators_element},
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
            break;

        default:

            break;
    }


}

function save_users_selected_js(user_selected, cpt_users_selected) {

    $.ajax({
        url: 'php/accessFonctions.php',
        data: {fonction: 'save_user_selected_php', user_selected: user_selected, cpt_users_selected: cpt_users_selected, id_panel: panel_select, type_element: "TAB_POLAR"},
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

