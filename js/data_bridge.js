/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var indicators;

function moteur_calcul_indicateur() {

    var dfrd1 = $.Deferred();
    setTimeout(function () {


        $.ajax({
            url: 'php/accessFonctions.php',
            data: {fonction: 'nb_messages_read'},
            type: 'POST',
            dataType: 'json',
            success: function (objetJson) {
                if (objetJson != null) {
                    nb_messages_read = objetJson;
                    //alert("ok nb_messages_read! " + objetJson);
                } else {
                    alert("erreur nb_messages_read! ");
                }
            },
            cache: false
        });
        $.ajax({
            url: 'php/accessFonctions.php',
            data: {fonction: 'nb_messages_sent'},
            type: 'POST',
            dataType: 'json',
            success: function (objetJson) {
                if (objetJson != null) {
                    //alert("ok nb_messages_sent! " + objetJson);
                    nb_messages_send = objetJson;
                } else {
                    alert("erreur nb_messages_sent! ");
                }
            },
            cache: false
        });
        $.ajax({
            url: 'php/accessFonctions.php',
            data: {fonction: 'nb_files_upload'},
            type: 'POST',
            dataType: 'json',
            success: function (objetJson) {
                if (objetJson != null) {
                    //alert("ok nb_files_upload! " + objetJson);
                    nb_files_upload = objetJson;
                } else {
                    alert("erreur nb_files_upload! ");
                }
            },
            cache: false
        });
        $.ajax({
            url: 'php/accessFonctions.php',
            data: {fonction: 'nb_files_download'},
            type: 'POST',
            dataType: 'json',
            success: function (objetJson) {
                if (objetJson != null) {
                    //alert("ok nb_files_download! " + objetJson);
                    nb_files_download = objetJson;
                } else {
                    alert("erreur nb_files_download! ");
                }
            },
            cache: false
        });
        //get indicator for user
        $.ajax({
            url: 'php/accessFonctions.php',
            data: {fonction: 'nb_connection_users', p_name_user: select_nb_connection_users},
            type: 'POST',
            dataType: 'json',
            success: function (objetJson) {
                if (objetJson != null) {
                    nb_connection_users = objetJson;
                } else {
                    alert("erreur nb_connection_users! ");
                }
            },
            cache: false
        });
        $.ajax({
            url: 'php/accessFonctions.php',
            data: {fonction: 'nb_messages_sent_users', p_name_user: select_nb_messages_sent_users},
            type: 'POST',
            dataType: 'json',
            success: function (objetJson) {
                if (objetJson != null) {
                    nb_messages_sent_users = objetJson;
                } else {
                    alert("erreur nb_messages_sent_users! ");
                }
            },
            cache: false

        });
        $.ajax({
            url: 'php/accessFonctions.php',
            data: {fonction: 'nb_messages_read_users', p_name_user: select_nb_messages_read_users},
            type: 'POST',
            dataType: 'json',
            success: function (objetJson) {
                if (objetJson != null) {
                    nb_messages_read_users = objetJson;
                } else {
                    alert("erreur nb_messages_read_users! ");
                }
            },
            cache: false
        });
        if (nb_messages_read == null ||
                nb_messages_send == null ||
                nb_files_upload == null ||
                nb_files_download == null ||
                nb_connection_users == null ||
                nb_messages_sent_users == null ||
                nb_messages_read_users == null) {
            moteur_calcul_indicateur();
        } else {
            dfrd1.resolve();
        }


    }, 800);
    return $.when(dfrd1).done(function () {

        pre_print_graph();
    }).promise();
}


function get_indicators() {
    $.ajax({
        url: 'php/accessFonctions.php',
        data: {fonction: 'get_indicators'},
        type: 'POST',
        dataType: 'json',
        success: function (objetJson) {
            if (objetJson != null) {
                indicators = objetJson;
               
            } else {
                alert("ERROR : get_indicators! ");
            }
        },
        cache: false
    });
}

