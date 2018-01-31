/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var indicators;

function delete_graph_js(number, panel_select) {
    $.ajax({
        url: 'php/accessFonctions.php',
        data: {fonction: 'delete_graph_php', p_panel_select: panel_select, p_number: number},
        type: 'POST',
        async: false,
        dataType: 'json',
        success: function (objetJson) {
            alert("->" + objetJson);
        },
    });
}



function get_nb_messages_read() {
    var var_tmp;
    $.ajax({
        url: 'php/accessFonctions.php',
        data: {fonction: 'nb_messages_read'},
        type: 'POST',
        async: false,
        dataType: 'json',
        success: function (objetJson) {
            if (objetJson != null) {
                var_tmp = objetJson;
            } else {
                alert("erreur nb_messages_read! ");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("get_nb_messages_read failed " + errorThrown);
        }
    });
    return var_tmp;
}

function get_nb_messages_sent() {
    var var_tmp;
    $.ajax({
        url: 'php/accessFonctions.php',
        data: {fonction: 'nb_messages_sent'},
        type: 'POST',
        async: false,
        dataType: 'json',
        success: function (objetJson) {
            if (objetJson != null) {
                var_tmp = objetJson;
            } else {
                alert("erreur nb_messages_sent! ");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("get_nb_messages_sent failed " + errorThrown);
        }
    });
    return var_tmp;
}
function get_nb_files_upload() {
    var var_tmp;
    $.ajax({
        url: 'php/accessFonctions.php',
        data: {fonction: 'nb_files_upload'},
        type: 'POST',
        async: false,
        dataType: 'json',
        success: function (objetJson) {
            if (objetJson != null) {
                var_tmp = objetJson;
            } else {
                alert("erreur get_nb_files_upload! ");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("get_nb_files_upload failed " + errorThrown);
        }
    });
    return var_tmp;
}
function get_nb_files_download() {
    var var_tmp;
    $.ajax({
        url: 'php/accessFonctions.php',
        data: {fonction: 'nb_files_download'},
        type: 'POST',
        async: false,
        dataType: 'json',
        success: function (objetJson) {
            if (objetJson != null) {
                var_tmp = objetJson;
            } else {
                alert("erreur get_nb_files_download! ");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("get_nb_files_download failed " + errorThrown);
        }
    });
    return var_tmp;
}

//INITIALIZE 
function get_element(id_panel) {
    var var_tab_indicators;

    $.ajax({
        url: 'php/accessFonctions.php',
        data: {fonction: 'load_element', id_panel: id_panel, },
        async: false,
        type: 'POST',
        dataType: 'json',
        success: function (objetJson) {
            if (objetJson != null) {

                var_tab_indicators = objetJson;
            } else {
                alert("erreur get_element! ");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            var_tab_indicators = null;
        }
    });
    return var_tab_indicators;

}


//OK
function get_indicators() {

    var var_tmp;
    $.ajax({
        url: 'php/accessFonctions.php',
        data: {fonction: 'get_indicators'},
        async: false,
        type: 'POST',
        dataType: 'json',
        success: function (objetJson) {
            if (objetJson != null) {
                var_tmp = objetJson;
            } else {
                alert("ERROR : get_indicators! ");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("get_indicators failed " + errorThrown);
        }
    });
    //alert("returnValue"+paramList);
    return var_tmp;
}

function get_panels_saved() {
    var var_tmp;
    $.ajax({
        url: 'php/accessFonctions.php',
        data: {fonction: 'getPanel', id_user: "1"},
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

function get_id_element_js() {
    var var_tmp;
    $.ajax({
        url: 'php/accessFonctions.php',
        data: {fonction: 'get_id_element_php'},
        type: 'POST',
        async: false,
        dataType: 'json',
        success: function (objetJson) {
            if (objetJson != null) {
                var_tmp = objetJson;
            } else {
                alert("erreur get_id_element! ");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("get_id_element failed " + errorThrown);
        }
    });
    return var_tmp;

}

function load_type_element_js() {
    var var_tmp;
    $.ajax({
        url: 'php/accessFonctions.php',
        data: {fonction: 'load_type_element_php'},
        type: 'POST',
        async: false,
        dataType: 'json',
        success: function (objetJson) {
            if (objetJson != null) {
                var_tmp = objetJson;
            } else {
                alert("erreur load_type_element! ");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("load_type_element failed " + errorThrown);
        }
    });
    return var_tmp;
}

function list_compatible_indicators_js() {
    var var_tmp;
    $.ajax({
        url: 'php/accessFonctions.php',
        data: {fonction: 'list_compatible_indicators_php'},
        type: 'POST',
        async: false,
        dataType: 'json',
        success: function (objetJson) {
            if (objetJson != null) {
                var_tmp = objetJson;
            } else {
                alert("erreur list_compatible_indicators! ");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("list_compatible_indicators failed " + errorThrown);
        }
    });
    return var_tmp;
}

function id_compatible_indicators_js(id_indicator_1, id_indicator_2) {
    var var_tmp;
    $.ajax({
        url: 'php/accessFonctions.php',
        data: {fonction: 'id_compatible_indicators_php', id_indicator_1: id_indicator_1, id_indicator_2: id_indicator_2},
        type: 'POST',
        async: false,
        dataType: 'json',
        success: function (objetJson) {
            if (objetJson != null) {
                var_tmp = objetJson;
            } else {
                alert("erreur id_compatible_indicators_js! ");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("id_compatible_indicators_js failed " + errorThrown);
        }
    });
    return var_tmp;
}

function bool_compatible_indicators_js(id_indicator_1, id_indicator_2) {
    var var_tmp = false;
    $.ajax({
        url: 'php/accessFonctions.php',
        data: {fonction: 'id_compatible_indicators_php', id_indicator_1: id_indicator_1, id_indicator_2: id_indicator_2},
        type: 'POST',
        async: false,
        dataType: 'json',
        success: function (objetJson) {
            if (objetJson != null) {
                var_tmp = true;
            } else {
                var_tmp = false;
            }
        },
//        error: function (jqXHR, textStatus, errorThrown) {
//            alert("bool_compatible_indicators_js failed " + errorThrown);
//        }
    });
    return var_tmp;
}

function get_list_users_js() {
    var var_tmp;
    $.ajax({
        url: 'php/accessFonctions.php',
        data: {fonction: 'get_list_users_php'},
        type: 'POST',
        async: false,
        dataType: 'json',
        success: function (objetJson) {
            if (objetJson != null) {
                var_tmp = objetJson;
            } else {
                alert("erreur get_list_users ");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("get_list_users failed " + errorThrown);
        }
    });
    return var_tmp;
}

function get_nb_connection_user_js(name_user) {
    var var_tmp;
    $.ajax({
        url: 'php/accessFonctions.php',
        data: {fonction: 'get_nb_connection_user_php', p_name_user: name_user},
        type: 'POST',
        dataType: 'json',
        async: false,
        success: function (objetJson) {
            if (objetJson != null) {
                var_tmp = objetJson;
            } else {
                alert("erreur nb_connection_user! ");
            }
        },
        cache: false
    });
    return var_tmp;
}

function get_nb_messages_sent_user_js(name_user) {
    var var_tmp;
    $.ajax({
        url: 'php/accessFonctions.php',
        data: {fonction: 'get_nb_messages_sent_user_php', p_name_user: name_user},
        type: 'POST',
        dataType: 'json',
        async: false,
        success: function (objetJson) {
            if (objetJson != null) {
                var_tmp = objetJson;
            } else {
                alert("erreur nb_messages_sent_user! ");
            }
        },
        cache: false
    });
    return var_tmp;
}

function get_nb_messages_read_user_js(name_user) {
    var var_tmp;
    $.ajax({
        url: 'php/accessFonctions.php',
        data: {fonction: 'get_nb_messages_read_user_php', p_name_user: name_user},
        type: 'POST',
        dataType: 'json',
        async: false,
        success: function (objetJson) {
            if (objetJson != null) {
                var_tmp = objetJson;
            } else {
                alert("erreur nb_messages_read_user! ");
            }
        },
        cache: false
    });
    return var_tmp;
}

function get_type_element_js(id_element) {
    var var_tmp;
    $.ajax({
        url: 'php/accessFonctions.php',
        data: {fonction: 'get_type_element_php', p_id_element: id_element},
        type: 'POST',
        dataType: 'json',
        async: false,
        success: function (objetJson) {
            if (objetJson != null) {
                var_tmp = objetJson;
            } else {
                alert("erreur get_type_element! ");
            }
        },
        cache: false
    });
    return var_tmp;
}
