/*******************************************************************************
 *Attributes
 *******************************************************************************/
var panel_elements;
var tmp_array_id_indicators = new Array();
var id_element;
var data_panel;
var indicators;
var users;
var forums;

/**
 * First function to load all interface
 * @returns {undefined}
 */
function load_interface() {
    //INITIALIZATION
    indicators = get_indicators();
    users = get_list_users_js();
    forums = get_list_forums_js();
    load_type_element();
    data_panel = get_panels_saved();

    if (data_panel.length != 0) {
        load_panels_saved();
    }
}

/**
 * Load each panel with their elements
 * @returns {undefined}
 */
function load_panels_saved() {
    name_indicators.length = 0;
    //INITIALIZE
    nb_panel = data_panel.length;
    for (var cpt = 0; cpt < nb_panel; cpt++) {

        var id_panel = data_panel[cpt][0][0];
        var id_user = data_panel[cpt][0][1];
        var name = data_panel[cpt][0][2];
        var letter = data_panel[cpt][0][3];
        var color = data_panel[cpt][0][4];
        add_panel(id_panel, id_user, name, letter, color);
        add_button_right_panel_saved(id_panel, id_user, name, letter, color);
        panel_select = id_panel;

        panel_elements = get_elements(id_panel);

        if (panel_elements != null) {//if there is element in the panel
            for (cpt_panel_elements = 0; cpt_panel_elements < panel_elements.length; cpt_panel_elements++) {

                //Initialize
                id_element = panel_elements[cpt_panel_elements][0];
                type_element = panel_elements[cpt_panel_elements][3];
                tmp_array_id_indicators.length = 0;
                name_indicators.length = 0;
                users_selected.length = 0;

                //GET INDICATORS OF ELEMENT
                tmp_array_id_indicators = load_array_indicators_element(panel_elements[cpt_panel_elements][4], panel_elements[cpt_panel_elements][3]);

                //Create new section of this element
                add_section(panel_elements[cpt_panel_elements][0], panel_select);

                //Prepare each indicator
                for (cpt_name = 0; cpt_name < tmp_array_id_indicators.length; cpt_name++) {

                    //Simple indicator
                    if (tmp_array_id_indicators[cpt_name].length > 1) {

                        var forum_selected_tmp = new Array();
                        var users_selected_tmp = new Array();

                        if (cpt_name + 1 < tmp_array_id_indicators.length) {


                            if (tmp_array_id_indicators[cpt_name][0] == tmp_array_id_indicators[cpt_name + 1][0]) {
                                users_selected_tmp.push(get_name_of_id_user(tmp_array_id_indicators[cpt_name][2]));
                                forum_selected_tmp.push(tmp_array_id_indicators[cpt_name + 1][2]);

                                cpt_name++;

                            } else {
                                switch (tmp_array_id_indicators[cpt_name][1]) {
                                    case "8"://users
                                        users_selected_tmp.push(get_name_of_id_user(tmp_array_id_indicators[cpt_name][2]));
                                        forum_selected_tmp.push('null');
                                        break;
                                    case "13": //forums
                                        forum_selected_tmp.push(tmp_array_id_indicators[cpt_name][2]);
                                        users_selected_tmp.push('null');
                                        break;
                                    default:
                                        break;
                                }
                            }
                        } else {
                            switch (tmp_array_id_indicators[cpt_name][1]) {
                                case "8"://users
                                    users_selected_tmp.push(get_name_of_id_user(tmp_array_id_indicators[cpt_name][2]));
                                    forum_selected_tmp.push('null');
                                    break;
                                case "13": //forums
                                    forum_selected_tmp.push(tmp_array_id_indicators[cpt_name][2]);
                                    users_selected_tmp.push('null');
                                    break;
                                default:
                                    break;
                            }
                        }








                    } else {//MULTI INDICATORS

                        var forum_selected_tmp = new Array();
                        var users_selected_tmp = new Array();

                        forum_selected_tmp.push('null');
                        users_selected_tmp.push('null');



                    }

                    forum_selected.push(forum_selected_tmp);
                    users_selected.push(users_selected_tmp);
                    var already_present = false;
                    for (cpt_name_indicators = 0; cpt_name_indicators < name_indicators.length; cpt_name_indicators++) {
                        if (name_indicators[cpt_name_indicators] == get_name_of_id_indicator(tmp_array_id_indicators[cpt_name][0])) {
                            already_present = true;
                        }
                    }

                    if (already_present == false || (name_indicators.length == 0)) {

                        if (tmp_array_id_indicators[cpt_name].length > 1) {
                            name_indicators.push(get_name_of_id_indicator(tmp_array_id_indicators[cpt_name][0]));
                        } else {
                            name_indicators.push(get_name_of_id_indicator(tmp_array_id_indicators[cpt_name]));
                        }

                    }
                }








                get_results_indicators_selected();

            }
        }
        add_section_add_button(id_panel);


    }
    if (nb_panel != 0) {
        view_panel(data_panel[0][0][0], data_panel);
    }

}

/**
 * Load type element in dialog
 * @returns {undefined}
 */
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
        input.setAttribute("onclick", 'load_indicators_of_type_element_selected(\"' + tab_type_element[cpt_tab_type_element][2] + '\");');
        input.setAttribute("class", 'mdl-checkbox__input');
        var span = document.createElement("span");
        span.setAttribute("class", 'mdl-checkbox__label');
        span.textContent = " " + tab_type_element[cpt_tab_type_element][1];
        label.appendChild(input);
        label.appendChild(span);
        td.appendChild(label);
        tr.appendChild(td);
        element.appendChild(tr);
    }
}

function load_indicators_multiple_choice() {

    var element = document.getElementById('tab_indicators');

    for (cpt_indicators = 0; cpt_indicators < indicators.length; cpt_indicators++) {

        if (indicators[cpt_indicators][2] != "") {

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
            span.textContent = " " + indicators[cpt_indicators][2];
            label.appendChild(input);
            label.appendChild(span);
            td.appendChild(label);

            //TODO CHANGE ID IN FUNCTION's PARAMETER
            if (bool_compatible_indicators_js(indicators[cpt_indicators][0], 8)) {

                var select = document.createElement("select");
                select.setAttribute("name", indicators[cpt_indicators][1]);
                select.setAttribute("id", 8);
                select.setAttribute("style", 'width:100px');
                for (cpt_users = 0; cpt_users < users.length; cpt_users++) {
                    var option = document.createElement("option");
                    option.setAttribute("id", users[cpt_users][0]);
                    if (cpt_users == 0) {
                        option.setAttribute("selected", 'selected');
                    }
                    option.textContent = users[cpt_users][1];
                    select.appendChild(option);
                }
                td2.appendChild(select);
            }

            //TODO CHANGE ID IN FUNCTION's PARAMETER
            if (bool_compatible_indicators_js(indicators[cpt_indicators][0], 13)) {

                var select = document.createElement("select");
                select.setAttribute("name", indicators[cpt_indicators][1]);
                select.setAttribute("id", 13);
                select.setAttribute("style", 'width:100px');
                for (cpt_forums = 0; cpt_forums < forums.length; cpt_forums++) {
                    var option = document.createElement("option");
                    option.setAttribute("id", forums[cpt_forums][0]);
                    if (cpt_forums == 0) {
                        option.setAttribute("selected", 'selected');
                    }
                    option.textContent = forums[cpt_forums][0];
                    select.appendChild(option);
                }
                td2.appendChild(select);
            }

            tr.appendChild(td);
            tr.appendChild(td2);
            element.appendChild(tr);
        }
    }
}

function load_indicators_single_choice() {

    var element = document.getElementById('tab_indicators');

    for (cpt_indicators = 0; cpt_indicators < indicators.length; cpt_indicators++) {
        if (indicators[cpt_indicators][2] != "") {


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
            span.textContent = " " + indicators[cpt_indicators][2];
            label.appendChild(input);
            label.appendChild(span);
            td.appendChild(label);
            if (bool_compatible_indicators_js(indicators[cpt_indicators][0], 8)) {

                var select = document.createElement("select");
                select.setAttribute("name", indicators[cpt_indicators][1]);
                select.setAttribute("id", 8);
                select.setAttribute("style", 'width:100px');
                for (cpt_users = 0; cpt_users < users.length; cpt_users++) {
                    var option = document.createElement("option");
                    option.setAttribute("id", users[cpt_users][0]);
                    if (cpt_users == 0) {
                        option.setAttribute("selected", 'selected');
                    }
                    option.textContent = users[cpt_users][1];
                    select.appendChild(option);
                }
                td2.appendChild(select);
            }
            if (bool_compatible_indicators_js(indicators[cpt_indicators][0], 13)) {

                var select = document.createElement("select");
                select.setAttribute("name", indicators[cpt_indicators][1]);
                select.setAttribute("style", 'width:100px');
                for (cpt_forums = 0; cpt_forums < forums.length; cpt_forums++) {
                    var option = document.createElement("option");
                    option.setAttribute("id", forums[cpt_forums][0]);
                    if (cpt_forums == 0) {
                        option.setAttribute("selected", 'selected');
                    }
                    option.textContent = forums[cpt_forums][0];
                    select.appendChild(option);
                }
                td2.appendChild(select);
            }

            tr.appendChild(td);
            tr.appendChild(td2);
            element.appendChild(tr);

        }

    }
}

function load_array_indicators_element(id_element, type_element) {
    var var_tmp;
    switch (type_element) {
        case 'TAB_POLAR':
            $.ajax({
                url: 'php/accessFonctions.php',
                data: {fonction: 'load_array_indicators_polar_php', id_element: id_element},
                type: 'POST',
                async: false,
                dataType: 'json',
                success: function (objetJson) {
                    if (objetJson != null) {
                        var_tmp = JSON.parse(objetJson);
                    } else {
                        alert("ERROR : load_array_indicators_polar! ");
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert("load_array_indicators_element | tab_polar failed / " + errorThrown);
                }
            });
            break;
        case 'TAB_SPIDER':
            $.ajax({
                url: 'php/accessFonctions.php',
                data: {fonction: 'load_array_indicators_spider_php', id_element: id_element},
                type: 'POST',
                async: false,
                dataType: 'json',
                success: function (objetJson) {
                    if (objetJson != null) {
                        var_tmp = JSON.parse(objetJson);
                    } else {
                        alert("ERROR : load_array_indicators_spider! ");
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert("load_array_indicators_element |tab_spider failed / " + errorThrown);
                }
            });
            break;

        default:
            break;
    }


    return var_tmp;
}

function add_section(id_element, panel_select) {

    var element = document.getElementById('panel' + panel_select);

    var card = document.createElement("div");
    card.setAttribute("id", 'card' + id_element);
    card.setAttribute("class", 'col-lg-6  col-md-6 col-sm-12  col-xs-12 animated fadeInUp');
    card.setAttribute("style", 'background-color : #d7d7d7; height: auto;margin-bottom :10px');

    element.appendChild(card);

    var content_card = document.getElementById('card' + id_element);

    var in_content_card = document.createElement("div");
    in_content_card.setAttribute("style", 'background-color : #404041; height: auto;');
    in_content_card.setAttribute("class", 'mdl-shadow--4dp');

    var close = document.createElement("div");
    close.setAttribute("id", 'close' + id_element);
    var input = document.createElement("input");
    input.setAttribute("id", 'delete_button');
    input.setAttribute("type", 'image');
    input.setAttribute("src", 'images/icon_close.png');
    input.setAttribute("style", 'width: 42px;float: right;padding:5px');

//    alert('add_section' +id_element);
    input.setAttribute("onclick", 'delete_graph(\'' + id_element + '\')');


    close.appendChild(input);
    var container = document.createElement("div");
    container.setAttribute("id", 'container' + id_element);
    container.setAttribute("style", 'height=500px;width=100%');
    in_content_card.appendChild(close);
    in_content_card.appendChild(container);
    content_card.appendChild(in_content_card);




}

function add_section_big_number(id_element) {

    var element = document.getElementById('panel' + panel_select);

    var card = document.createElement("div");
    card.setAttribute("id", 'card' + id_element);
    card.setAttribute("class", 'col-lg-3  col-md-3 col-sm-6  col-xs-12 animated zoomIn');
    card.setAttribute("style", 'background-color : #d7d7d7; height: 445px;margin-bottom :10px;');

    element.appendChild(card);

    var content_card = document.getElementById('card' + id_element);

    var in_content_card = document.createElement("div");
    in_content_card.setAttribute("style", 'background-color : #404041; height: auto;');
    in_content_card.setAttribute("class", 'mdl-shadow--4dp');

    var close = document.createElement("div");
    close.setAttribute("id", 'close' + id_element);
    var input = document.createElement("input");
    input.setAttribute("id", 'delete_button');
    input.setAttribute("type", 'image');
    input.setAttribute("src", 'images/icon_close.png');
    input.setAttribute("style", 'width: 42px;float: right;padding:5px');
    input.setAttribute("onclick", 'delete_graph(\'' + id_element + '\')');


    close.appendChild(input);
    var container = document.createElement("div");
    container.setAttribute("id", 'container' + id_element);
    container.setAttribute("style", 'height=100%;width=100%;background-color : white');
    in_content_card.appendChild(close);
    in_content_card.appendChild(container);

    content_card.appendChild(in_content_card);
}

function add_section_add_button(panel_select) {
    id_element = id_element_exemple;
    id_element_exemple = id_element_exemple + 1;

    var element = document.getElementById('panel' + panel_select);

    var card = document.createElement("div");
    card.setAttribute("id", 'card_add' + panel_select);
    card.setAttribute("class", 'col-lg-6  col-md-6 col-sm-12  col-xs-12 animated zoomIn');
    card.setAttribute("style", 'background-color : #d7d7d7;');

    element.appendChild(card);

    var content_card = document.getElementById('card_add' + panel_select);

    var in_content_card = document.createElement("div");
    in_content_card.setAttribute("style", 'height: 445px;width:auto');
    in_content_card.setAttribute("class", 'mdl-shadow--4dp img_btn_add_in_card');
    in_content_card.setAttribute("id", 'show-dialog');
    in_content_card.setAttribute("data-toggle", 'modal');
    in_content_card.setAttribute("data-target", '#modal_add_element');


    var container = document.createElement("div");
    container.setAttribute("id", 'container' + id_element);
    var img = document.createElement("img");


    img.setAttribute("style", "width:auto;height:auto;max-height: 445px");
    img.setAttribute("class", "img-responsive center-block");


    img.setAttribute("src", 'images/icon_circle_add.png');




    container.appendChild(img);

    in_content_card.appendChild(container);
    content_card.appendChild(in_content_card);
}

/*******************************************************************************
 * GET INDICATORS OF ELEMENT TYPE SELECT
 ******************************************************************************/
function load_indicators_of_type_element_selected(p_type) {
    var element = document.getElementById('tab_indicators');
    element.innerHTML = '';
    type_element = p_type;

    switch (p_type) {
        case "TAB_POLAR":
            load_indicators_multiple_choice();

            break;
        case "TAB_SPIDER":
            load_indicators_multiple_choice();

            break;
        case "TAB_LINE":

            break;
        case "TAB_BAR":


            break;
        case "TAB_BIG_NUMBER":

            load_indicators_single_choice();
            break;

        default:

            break;
    }

}
/*******************************************************************************
 * LOAD CHIP WITH INDICATOR SELECTED
 ******************************************************************************/
function add_indicator(name_indicator) {
    var close = document.getElementById('close' + id_element);
    var indicator_span = document.createElement("span");
    indicator_span.setAttribute("class", 'mdl-chip mdl-chip--deletable');
    indicator_span.setAttribute("style", 'margin : 5px');
    var indicator_in_span = document.createElement("span");
    indicator_in_span.setAttribute("class", 'mdl-chip__text');
    indicator_in_span.textContent = name_indicator;
//    var indicator_in_span_button = document.createElement("button");
//    indicator_in_span_button.setAttribute("class", 'mdl-chip__action');
//    indicator_in_span_button.setAttribute("type", 'button');
//    var indicator_in_span_button_i = document.createElement("i");
//    indicator_in_span_button_i.textContent = "cancel";
//    indicator_in_span_button_i.setAttribute("class", 'material-icons');
//
//    indicator_in_span_button.appendChild(indicator_in_span_button_i);
    indicator_span.appendChild(indicator_in_span);
//    indicator_span.appendChild(indicator_in_span_button);

    close.appendChild(indicator_span);
}

