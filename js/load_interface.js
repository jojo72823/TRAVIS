/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//ATTRIBUTES
var tab_indicators;
var data_panel;
var indicators;


function load_interface() {
    //INITIALIZATION
    indicators = get_indicators();

    load_indicators();


    //TODO 
    data_panel = get_panels_saved();
    //
    load_panels_saved();

}






function load_panels_saved() {
    //INITIALIZE
    // alert('load_panels_saved');

    nb_panel = data_panel.length;
    // for (var cpt = 0; cpt < nb_panel; cpt++) {
    for (var cpt = 0; cpt < nb_panel; cpt++) {

        var id_panel = data_panel[cpt][0][0];
        var num_panel = data_panel[cpt][0][1];
        var id_user = data_panel[cpt][0][2];
        var name = data_panel[cpt][0][3];
        var letter = data_panel[cpt][0][4];
        var color = data_panel[cpt][0][5];
        add_panel_saved(num_panel, id_user, name, letter, color);
        add_button_right_panel_saved(num_panel, id_user, name, letter, color);
        //TODO  get save on database (load_element)
        panel_select = id_panel;

        //TODO for each element's panel
        tab_indicators = get_element(id_panel);
        if (tab_indicators != null) {
            for (cpt_tab_indicators = 0; cpt_tab_indicators < tab_indicators.length; cpt_tab_indicators++) {
                add_section();
                name_indicators = tab_indicators[cpt_tab_indicators];
                pre_print_graph();
            }





        }


    }
    view_panel(1);

}



function load_indicators() {

//    alert("load_indicators");




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


