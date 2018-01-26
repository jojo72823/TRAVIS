/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var indicators;

function delete_graph_js(number, panel_select) {
    $.ajax({
        url: 'php/accessFonctions.php',
        data: {fonction: 'delete_graph_php', p_panel_select: panel_select,p_number: number},
        type: 'POST',
        async: false,
        dataType: 'json',
        success: function (objetJson) {

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






//get indicator for user
//        $.ajax({
//            url: 'php/accessFonctions.php',
//            data: {fonction: 'nb_connection_users', p_name_user: select_nb_connection_users},
//            type: 'POST',
//            dataType: 'json',
//            success: function (objetJson) {
//                if (objetJson != null) {
//                    nb_connection_users = objetJson;
//                } else {
//                    alert("erreur nb_connection_users! ");
//                }
//            },
//            cache: false
//        });
//        $.ajax({
//            url: 'php/accessFonctions.php',
//            data: {fonction: 'nb_messages_sent_users', p_name_user: select_nb_messages_sent_users},
//            type: 'POST',
//            dataType: 'json',
//            success: function (objetJson) {
//                if (objetJson != null) {
//                    nb_messages_sent_users = objetJson;
//                } else {
//                    alert("erreur nb_messages_sent_users! ");
//                }
//            },
//            cache: false
//
//        });
//        $.ajax({
//            url: 'php/accessFonctions.php',
//            data: {fonction: 'nb_messages_read_users', p_name_user: select_nb_messages_read_users},
//            type: 'POST',
//            dataType: 'json',
//            success: function (objetJson) {
//                if (objetJson != null) {
//                    nb_messages_read_users = objetJson;
//                } else {
//                    alert("erreur nb_messages_read_users! ");
//                }
//            },
//            cache: false
//        });


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
//            alert("get_element failed " + errorThrown);
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
        data: {fonction: 'getPanel', id_user: "0"},
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

//function get_new_id_chart() {
//    var var_tmp;
//    $.ajax({
//        url: 'php/accessFonctions.php',
//        data: {fonction: 'getPanel', id_user: "0"},
//        type: 'POST',
//        async: false,
//        dataType: 'json',
//        success: function (objetJson) {
//            if (objetJson != null) {
//                var_tmp = objetJson;
//            } else {
//                alert("erreur getPanel! ");
//            }
//        },
//        error: function (jqXHR, textStatus, errorThrown) {
//            alert("getPanel failed " + errorThrown);
//        }
//    });
//    return var_tmp;
//
//}

