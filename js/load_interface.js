/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//ATTRIBUTES
var tab_indicators;
var data_panel;
var indicators;
var tab_type_element;
var users;
function load_interface() {
    //INITIALIZATION
    indicators = get_indicators();
    users = get_list_users_js();
    load_type_element();
    data_panel = get_panels_saved();

    if (data_panel.length != 0) {
        load_panels_saved();
    }
}

function load_panels_saved() {
    //INITIALIZE
    nb_panel = data_panel.length;
    for (var cpt = 0; cpt < nb_panel; cpt++) {

        var id_panel = data_panel[cpt][0][0];
        var num_panel = data_panel[cpt][0][1];
        var id_user = data_panel[cpt][0][2];
        var name = data_panel[cpt][0][3];
        var letter = data_panel[cpt][0][4];
        var color = data_panel[cpt][0][5];
        add_panel_saved(num_panel, id_user, name, letter, color);
        add_button_right_panel_saved(num_panel, id_user, name, letter, color);
        panel_select = id_panel;
        tab_indicators = get_element(id_panel);
        if (tab_indicators != null) {
            for (cpt_tab_indicators = 0; cpt_tab_indicators < tab_indicators.length; cpt_tab_indicators++) {
                id_graph = tab_indicators[cpt_tab_indicators][0];
                add_section();
                name_indicators = tab_indicators[cpt_tab_indicators][1];
                pre_print_graph();
            }
        }
    }
    view_panel(1);
}

function load_type_element() {

    tab_type_element = load_type_element_js();
    var element = document.getElementById('tab_graph');
    for (cpt_tab_type_element = 0; cpt_tab_type_element < tab_type_element.length; cpt_tab_type_element++) {
        var tr = document.createElement("tr");
        var td = document.createElement("td");
        var label = document.createElement("label");
        label.setAttribute("class", '');
        label.setAttribute("for", tab_type_element[cpt_tab_type_element][0]);
        var input = document.createElement("input");
        input.setAttribute("id", tab_type_element[cpt_tab_type_element][0]);
        input.setAttribute("type", 'radio');
        input.setAttribute("name", 'myRadios');
        input.setAttribute("onclick", 'select_graph(' + tab_type_element[cpt_tab_type_element][0] + ');');
        input.setAttribute("class", 'mdl-checkbox__input');
        var span = document.createElement("span");
        span.setAttribute("class", 'mdl-checkbox__label');
        span.textContent = tab_type_element[cpt_tab_type_element][1];
        label.appendChild(span);
        label.appendChild(input);
        td.appendChild(label);
        tr.appendChild(td);
        element.appendChild(tr);
    }
}

function load_indicators() {

    var element = document.getElementById('tab_indicators');

    for (cpt_indicators = 0; cpt_indicators < indicators.length; cpt_indicators++) {

        var tr = document.createElement("tr");
        var td = document.createElement("td");
        var td2 = document.createElement("td2");
        var label = document.createElement("label");
        label.setAttribute("class", 'mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect');
        label.setAttribute("for", indicators[cpt_indicators][1]);
        var input = document.createElement("input");
        input.setAttribute("id", indicators[cpt_indicators][1]);
        input.setAttribute("type", 'checkbox');
        input.setAttribute("class", 'mdl-checkbox__input');
        var span = document.createElement("span");
        span.setAttribute("class", 'mdl-checkbox__label');
        span.textContent = indicators[cpt_indicators][2];
        label.appendChild(input);
        label.appendChild(span);
        td.appendChild(label);
        if (bool_compatible_indicators_js(indicators[cpt_indicators][0], 8)) {

            var select = document.createElement("select");
            select.setAttribute("name", indicators[cpt_indicators][1]);
            select.setAttribute("style", 'width:100px');
            for (cpt_users = 0; cpt_users < users.length; cpt_users++) {
                var option = document.createElement("option");
                option.setAttribute("id", users[cpt_users][0]);
                option.setAttribute("selected", 'selected');
                option.textContent = users[cpt_users][1];
                select.appendChild(option);
            }
            td2.appendChild(select);
        }

        tr.appendChild(td);
        tr.appendChild(td2);
        element.appendChild(tr);
    }
}

function load_indicators_radio_button() {

    var element = document.getElementById('tab_indicators');

    for (cpt_indicators = 0; cpt_indicators < indicators.length; cpt_indicators++) {


        var tr = document.createElement("tr");
        var td = document.createElement("td");
        var td2 = document.createElement("td2");
        var label = document.createElement("label");
        label.setAttribute("class", 'mdl-radio mdl-js-radio mdl-js-ripple-effect');
        label.setAttribute("for", indicators[cpt_indicators][1]);
        var input = document.createElement("input");
        input.setAttribute("id", indicators[cpt_indicators][1]);
        input.setAttribute("type", 'radio');
        input.setAttribute("class", 'mdl-radio__input');
        input.setAttribute("name", 'indicator');
        var span = document.createElement("span");
        span.setAttribute("class", 'mdl-radio__label');
        span.textContent = indicators[cpt_indicators][2];
        label.appendChild(input);
        label.appendChild(span);
        td.appendChild(label);
        if (bool_compatible_indicators_js(indicators[cpt_indicators][0], 8)) {

            var select = document.createElement("select");
            select.setAttribute("name", indicators[cpt_indicators][1]);
            select.setAttribute("style", 'width:100px');
            for (cpt_users = 0; cpt_users < users.length; cpt_users++) {
                var option = document.createElement("option");
                option.setAttribute("id", users[cpt_users][0]);
                option.setAttribute("selected", 'selected');
                option.textContent = users[cpt_users][1];
                select.appendChild(option);
            }
            td2.appendChild(select);
        }

        tr.appendChild(td);
        tr.appendChild(td2);
        element.appendChild(tr);



    }
}

