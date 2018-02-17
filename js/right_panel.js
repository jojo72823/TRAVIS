//ATTRIBUTES
var nb_panel = 0;
var panel_select = 0;
var color_select;
var name_panel;
var id_panel;

//MENU ADD IN SIDE PANEL
function pre_add_panel() {
    color_select = document.getElementById("color_panel").value;
    name_panel = document.getElementById("name_panel").value;

    if (nb_panel < 10) {

        nb_panel = nb_panel + 1;
        panel_select = id_panel;
        id_panel = save_panel(name_panel);
        var new_id = new Array();
        new_id.push(id_panel);

        var new_panel = new Array();
        new_panel.push(new_id);



        data_panel.push(new_panel);
        add_panel(id_panel, "1", name_panel, name_panel.charAt(0), color_select);
        add_button_right_panel(id_panel);

        view_panel_add_element_add(id_panel);

        if (nb_panel == 10) {
            jQuery("#demo-menu-lower-right").remove();
        }


    } else {
        alert("Size limit reached. Max 10 panel.");
    }

}

//TODO LIMITE DE PANEL (10 max)
function add_panel(id_panel, id_user, name, letter, color) {

    var page_content = document.getElementById('page_content');


    var card = document.createElement("div");
    card.setAttribute("id", 'panel' + id_panel);
    card.setAttribute("class", 'mdl-grid background_content animated zoomIn');
    card.setAttribute("style", 'height: auto;width:98%');



    var in_content_card = document.createElement("div");
    in_content_card.setAttribute("style", 'background-color :' + color + ';height: auto;');
    in_content_card.setAttribute("class", 'mdl-shadow--4dp');


    var text_header_panel = document.createElement("div");
    text_header_panel.setAttribute("class", 'text_header_panel');
    text_header_panel.textContent = "Panel : " +name;

    in_content_card.appendChild(text_header_panel);

    var close = document.createElement("div");
    close.setAttribute("id", 'close_panel' + id_panel);
    close.setAttribute("style", 'height: 50px;margin-left:15px;margin-right:15px;margin-bottom:15px;');


    var input = document.createElement("input");
    input.setAttribute("id", 'delete_button');
    input.setAttribute("type", 'image');
    input.setAttribute("src", 'images/icon_close.png');
    input.setAttribute("style", 'width: 50px;float: right;padding:5px;z_index:999');
    input.setAttribute("onclick", 'delete_panel(\'' + id_panel + '\')');


    close.appendChild(input);
    var container = document.createElement("div");
    container.setAttribute("id", 'container_panel' + id_panel);
    container.setAttribute("style", 'height=100%;width=100%;background-color : #3575bb');
    in_content_card.appendChild(close);
    in_content_card.appendChild(container);

    card.appendChild(in_content_card);

    page_content.appendChild(card);

}

function delete_panel(id_panel) {

    var txt;
    var r = confirm("Do you really want to delete this panel ?");
    if (r == true) {
       
        delete_panel_js(id_panel);
        location.reload();
    }

}



function save_panel(name_panel) {

    var var_tmp;

    //TODO save in BDD
    $.ajax({
        url: 'php/accessFonctions.php',
        data: {fonction: 'savePanel', id_user: "1", name: name_panel, letter: name_panel.charAt(0), color: color_select},
        type: 'POST',
        async: false,
        dataType: 'json',
        success: function (objetJson) {
            if (objetJson != null) {
                var_tmp = objetJson;
            } else {
                alert("erreur add_panel_in_database! ");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("add_panel_in_database failed " + errorThrown);
        }
    });



    return var_tmp;
}
function add_button_right_panel_saved(id_panel, id_user, name, letter, color) {
    var right_panel = document.getElementById('right_panel');

    var div = document.createElement("div");
    div.setAttribute("id", 'btn_panel' + id_panel);
    div.setAttribute("class", 'layout_btn_right_bar mdl-js-button animated zoomIn');

    var img = document.createElement("img");
    img.setAttribute("id", 'img_btn_panel' + id_panel);
    img.setAttribute("class", 'img_btn_right_bar mdl-button mdl-js-button mdl-button--icon');
    img.setAttribute("src", 'images/circle.png');
    img.setAttribute("onclick", 'view_panel(\'' + id_panel + '\')');
    img.setAttribute("style", 'background-color: ' + color);
    var text = document.createElement("div");
    text.setAttribute("id", 'text_btn_panel' + id_panel);
    text.setAttribute("class", 'text_btn_right_bar ');
    text.setAttribute("onclick", 'view_panel(\'' + id_panel + '\')');
    text.textContent = "" + letter;

    div.appendChild(text);
    div.appendChild(img);
    right_panel.appendChild(div);

    jQuery("#demo-menu-lower-right").detach().appendTo('#right_panel');
}

function add_button_right_panel(id_panel) {
    var right_panel = document.getElementById('right_panel');

    var div = document.createElement("div");
    div.setAttribute("id", 'btn_panel' + id_panel);
    div.setAttribute("class", 'layout_btn_right_bar mdl-js-button');

    var img = document.createElement("img");
    img.setAttribute("id", 'img_btn_panel' + id_panel);
    img.setAttribute("class", 'img_btn_right_bar mdl-button mdl-js-button mdl-button--icon');
    img.setAttribute("src", 'images/circle.png');
    img.setAttribute("onclick", 'view_panel(\'' + id_panel + '\')');
    img.setAttribute("style", 'background-color: ' + color_select + ";");
    var text = document.createElement("div");
    text.setAttribute("id", 'text_btn_panel' + id_panel);
    text.setAttribute("class", 'text_btn_right_bar ');
    text.setAttribute("onclick", 'view_panel(\'' + id_panel + '\')');
    text.textContent = name_panel.charAt(0);

    div.appendChild(text);
    div.appendChild(img);
    right_panel.appendChild(div);

    jQuery("#demo-menu-lower-right").detach().appendTo('#right_panel');
}

function view_panel(id_panel) {
    panel_select = id_panel;


    for (var cpt_view_panel = 0; cpt_view_panel < data_panel.length; cpt_view_panel++) {
        var panel = document.getElementById('panel' + data_panel[cpt_view_panel][0][0]);
        panel.style.display = 'none';
        var img_btn_panel = document.getElementById('img_btn_panel' + data_panel[cpt_view_panel][0][0]);
        img_btn_panel.setAttribute("src", 'images/circle_hide.png');
    }

    var panel = document.getElementById('panel' + id_panel);
    panel.style.display = 'block';
    var img_btn_panel = document.getElementById('img_btn_panel' + id_panel);
    img_btn_panel.setAttribute("src", 'images/circle.png');


}

function view_panel_add_element_add(id_panel) {
    panel_select = id_panel;


    for (var cpt_view_panel = 0; cpt_view_panel < data_panel.length; cpt_view_panel++) {
        var panel = document.getElementById('panel' + data_panel[cpt_view_panel][0][0]);
        panel.style.display = 'none';
        var img_btn_panel = document.getElementById('img_btn_panel' + data_panel[cpt_view_panel][0][0]);
        img_btn_panel.setAttribute("src", 'images/circle_hide.png');
    }

    var panel = document.getElementById('panel' + id_panel);
    panel.style.display = 'block';
    var img_btn_panel = document.getElementById('img_btn_panel' + id_panel);
    img_btn_panel.setAttribute("src", 'images/circle.png');

    add_section_add_button(id_panel);


}





