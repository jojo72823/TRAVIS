/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//ATTRIBUTES
var nb_panel = 0;
var panel_select = 0;
var color_select;
var name_panel;

//MENU ADD IN SIDE PANEL
function pre_add_panel(){7
    color_select = document.getElementById("color_panel").value;
    name_panel = document.getElementById("name_panel").value;
  

    
    
    if (nb_panel < 10) {
        nb_panel = nb_panel + 1;
        panel_select = nb_panel;
        add_panel();
        add_button_right_panel();
        view_panel(panel_select);
    } else {
        alert("Size limit reached. Max 10 panel.");
    }
}

//TODO LIMITE DE PANEL (10 max)
function add_panel_saved(num_panel, id_user, name, letter, color) {
    var page_content = document.getElementById('page_content');
    var div = document.createElement("div");
    div.setAttribute("id", 'panel' + num_panel);
    div.setAttribute("class", 'mdl-grid background_content ');
    div.setAttribute("style", 'background-color: '+color+';');
    page_content.appendChild(div);
}
function add_panel() {
    var page_content = document.getElementById('page_content');
    var div = document.createElement("div");
    div.setAttribute("id", 'panel' + nb_panel);
    div.setAttribute("class", 'mdl-grid background_content ');
    div.setAttribute("style", 'background-color: '+color_select);
    page_content.appendChild(div);

    //TODO save in BDD
    $.ajax({
        url: 'php/accessFonctions.php',
        data: {fonction: 'savePanel', num_panel: nb_panel, id_user: "1", name: name_panel, letter: name_panel.charAt(0), color: color_select},
        type: 'POST',
        dataType: 'json',
        success: function (objetJson) {
            if (objetJson != null) {

            } else {
                alert("erreur savePanel! ");
            }
        },
        cache: false
    });
}
function add_button_right_panel_saved(num_panel, id_user, name, letter, color) {
    var right_panel = document.getElementById('right_panel');

    var div = document.createElement("div");
    div.setAttribute("id", 'btn_panel' + num_panel);
    div.setAttribute("class", 'layout_btn_right_bar mdl-js-button animated zoomIn');

    var img = document.createElement("img");
    img.setAttribute("id", 'img_btn_panel' + num_panel);
    img.setAttribute("class", 'img_btn_right_bar mdl-button mdl-js-button mdl-button--icon');
    img.setAttribute("src", 'images/circle.png');
    img.setAttribute("onclick", 'view_panel(\'' + num_panel + '\')');
    img.setAttribute("style", 'background-color: '+color);
    var text = document.createElement("div");
    text.setAttribute("id", 'text_btn_panel' + num_panel);
    text.setAttribute("class", 'text_btn_right_bar ');
    text.setAttribute("onclick", 'view_panel(\'' + num_panel + '\')');
    text.textContent = "" + letter;

    div.appendChild(text);
    div.appendChild(img);
    right_panel.appendChild(div);
}

function add_button_right_panel() {
    var right_panel = document.getElementById('right_panel');

    var div = document.createElement("div");
    div.setAttribute("id", 'btn_panel' + nb_panel);
    div.setAttribute("class", 'layout_btn_right_bar mdl-js-button');

    var img = document.createElement("img");
    img.setAttribute("id", 'img_btn_panel' + nb_panel);
    img.setAttribute("class", 'img_btn_right_bar mdl-button mdl-js-button mdl-button--icon');
    img.setAttribute("src", 'images/circle.png');
    img.setAttribute("onclick", 'view_panel(\'' + nb_panel + '\')');
    img.setAttribute("style", 'background-color: '+color_select+";");
    var text = document.createElement("div");
    text.setAttribute("id", 'text_btn_panel' + nb_panel);
    text.setAttribute("class", 'text_btn_right_bar ');
    text.setAttribute("onclick", 'view_panel(\'' + nb_panel + '\')');
    text.textContent = name_panel.charAt(0);

    div.appendChild(text);
    div.appendChild(img);
    right_panel.appendChild(div);
}

function view_panel(number) {
    panel_select = number;

    for (var cpt = 1; cpt <= nb_panel; cpt++) {
        var panel = document.getElementById('panel' + cpt);
        panel.style.display = 'none';
        var img_btn_panel = document.getElementById('img_btn_panel' + cpt);
        img_btn_panel.setAttribute("src", 'images/circle_hide.png');
    }
    var panel = document.getElementById('panel' + panel_select);
    panel.style.display = 'block';
    var img_btn_panel = document.getElementById('img_btn_panel' + panel_select);
    img_btn_panel.setAttribute("src", 'images/circle.png');


}




