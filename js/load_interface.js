/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//ATTRIBUTES
var tab_indicators = new Array();
var data_panel;


function load_interface() {
    // alert("load_interface");
    get_panels_saved();
    load_indicators();
}
function get_panels_saved() {

    var dfrd1 = $.Deferred();
    setTimeout(function () {
        $.ajax({
            url: 'php/accessFonctions.php',
            data: {fonction: 'getPanel', id_user: "0"},
            type: 'POST',
            dataType: 'json',
            success: function (objetJson) {
                if (objetJson != null) {
                    data_panel = objetJson;
                } else {
                    alert("erreur getPanel! ");
                }
            },
            cache: false
        });


        if (data_panel == null) {
            get_panels_saved();

        } else {
            dfrd1.resolve();
        }


    }, 100);
    return $.when(dfrd1).done(function () {
        load_panels_saved();

    }).promise();
}



function load_panels_saved() {
    //INITIALIZE
    //alert('load_panels_saved');

    nb_panel = Object.keys(data_panel).length;
    for (var cpt = 0; cpt < nb_panel; cpt++) {

        var id_panel = data_panel[cpt][0][0];
        var num_panel = data_panel[cpt][0][1];
        var id_user = data_panel[cpt][0][2];
        var name = data_panel[cpt][0][3];
        var letter = data_panel[cpt][0][4];
        var color = data_panel[cpt][0][5];
        add_panel_saved(num_panel, id_user, name, letter, color);
        add_button_right_panel_saved(num_panel, id_user, name, letter, color);
        //TODO  load_element
        $.ajax({
            url: 'php/accessFonctions.php',
            data: {fonction: 'load_element', id_panel: id_panel, },
            type: 'POST',
            dataType: 'json',
            success: function (objetJson) {
                if (objetJson != null) {
                    tab_indicators = objetJson;
                } else {
                    alert("erreur load_element! ");
                }
            },
            cache: false
        });
        
    }


        view_panel(nb_panel);

        //GET SELECT_INDICATORS
        get_indicators();

        //  alert("length = " + tab_indicators.length);
        select_indicators_new.length = 0;
        for (cpt = 0; cpt < indicators.length; cpt++) {
                //TODO GET SAVE INDICATOR
                //IF/ELSE CASE INDDICATOR IF IT'S PRESENT IN DATABASE
              
        }




        
        select_indicators_new.length = 0;
        select_indicators_new.push(true);
        select_indicators_new.push(true);
        select_indicators_new.push(true);
        select_indicators_new.push(false);
        select_indicators_new.push(true);
        select_indicators_new.push(true);
        select_indicators_new.push(true);
        select_nb_connection_users = 5;
        select_nb_messages_sent_users = 5;
        select_nb_messages_read_users = 5;


        if (tab_indicators.length != 0) {
            add_section();
            moteur_calcul_indicateur();
        }

}

function load_indicators() {


    get_indicators();
    if (indicators == null) {
        get_indicators();
    }
    alert("load_indicators");

    var element = document.getElementById('tab_indicators');
    for (cpt_indicators = 0; cpt_indicators < indicators.length; cpt_indicators++) {
        var tr = document.createElement("tr");
        var td = document.createElement("td");
        var label = document.createElement("label");
        label.setAttribute("class", 'mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect');
        label.setAttribute("for", indicators[cpt_indicators]);
        var input = document.createElement("input");
        input.setAttribute("id", indicators[cpt_indicators]);
        input.setAttribute("type", 'checkbox');
        input.setAttribute("class", 'mdl-checkbox__input');
        var span = document.createElement("span");
        span.setAttribute("class", 'mdl-checkbox__label');
        span.textContent = indicators[cpt_indicators];
        label.appendChild(span);
        label.appendChild(input);
        td.appendChild(label);
        tr.appendChild(td);
        element.appendChild(tr);
    }
}


