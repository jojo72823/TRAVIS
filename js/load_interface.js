/*******************************************************************************
 *Attributes
 *******************************************************************************/
var panel_elements;
var tmp_array_id_indicators = new Array();
var id_element;
var data_panel;
var indicators;
var users;

/**
 * First function to load all interface
 * @returns {undefined}
 */
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
        var num_panel = data_panel[cpt][0][1];
        var id_user = data_panel[cpt][0][2];
        var name = data_panel[cpt][0][3];
        var letter = data_panel[cpt][0][4];
        var color = data_panel[cpt][0][5];
        add_panel_saved(num_panel, id_user, name, letter, color);
        add_button_right_panel_saved(num_panel, id_user, name, letter, color);
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
                    if (tmp_array_id_indicators[cpt_name].length == 1) {
                        var name = get_name_of_id_indicator(tmp_array_id_indicators[cpt_name]);
                        name_indicators.push(name);
                        users_selected.push("null");
                    } else {//MULTI INDICATORS
                        var name = get_name_of_id_indicator(tmp_array_id_indicators[cpt_name][0]);
                        name_indicators.push(name);
                        //tmp_array_id_indicators[cpt_name][1] == type of second indicator
                        //switch case
                        users_selected.push(get_name_of_id_user(tmp_array_id_indicators[cpt_name][2]));
                    }
                }
                pre_print_graph();
                
            }
        }
            add_section_add_button(num_panel);
    }

    view_panel(1);
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
        input.setAttribute("onclick", 'select_element(\"' + tab_type_element[cpt_tab_type_element][2] + '\");');
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

function load_indicators_multiple_choice() {

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

function load_indicators_single_choice() {

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
    card.setAttribute("class", 'col-lg-6  col-md-6 col-sm-12  col-xs-12 animated zoomIn');
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
    input.setAttribute("style", 'width: 30px;float: right;padding:5px');
    input.setAttribute("onclick", 'delete_graph(\'' + id_element + '\')');


    close.appendChild(input);
    var container = document.createElement("div");
    container.setAttribute("id", 'container' + id_element);
    container.setAttribute("style", 'height=500px;width=100%');
    in_content_card.appendChild(close);
    in_content_card.appendChild(container);
    content_card.appendChild(in_content_card);
    
//    jQuery("#car_add" + panel_select).detach().appendTo('#panel' + panel_select);


}

function add_section_big_number(id_element) {

    var element = document.getElementById('panel' + panel_select);

    var card = document.createElement("div");
    card.setAttribute("id", 'card' + id_element);
    card.setAttribute("class", 'col-lg-3  col-md-3 col-sm-6  col-xs-12 animated zoomIn');
    card.setAttribute("style", 'background-color : #123456; height: 400px;margin-bottom :10px');

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
    input.setAttribute("style", 'width: 30px;float: right;padding:5px');
    input.setAttribute("onclick", 'delete_graph(\'' + id_element + '\')');


    close.appendChild(input);
    var container = document.createElement("div");
    container.setAttribute("id", 'container' + id_element);
    container.setAttribute("style", 'height=100%;width=100%;background-color : #3575bb');
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
    card.setAttribute("class", 'col-lg-3  col-md-3 col-sm-6  col-xs-12 animated zoomIn');
    card.setAttribute("style", 'background-color : #d7d7d7; height: 200px;margin-bottom :10px');

    element.appendChild(card);

    var content_card = document.getElementById('card_add' + panel_select);

    var in_content_card = document.createElement("div");
    in_content_card.setAttribute("style", 'background-color : #404041; height: auto;');
    in_content_card.setAttribute("class", 'mdl-shadow--4dp');


    var container = document.createElement("div");
    container.setAttribute("id", 'container' + id_element);
//    container.setAttribute("style", 'height=200px;width=100%');

    var img = document.createElement("img");
    img.setAttribute("id", 'show-dialog');
    img.setAttribute("data-toggle", 'modal');

    img.setAttribute("style", "padding : 15px");
    img.setAttribute("data-target", '#modal_add_element');
    img.setAttribute("src", 'images/icon_add.png');
    img.setAttribute("class", 'img_btn_add_in_card');



    container.appendChild(img);





    in_content_card.appendChild(container);
    content_card.appendChild(in_content_card);


    /* <button id="show-dialog" 
     data-toggle="modal" 
     data-target="#modal_add_element" 
     class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect fab mdl-button--colored dialog-button">
     <i class="material-icons-fab">add</i>
     </button>*/
}

