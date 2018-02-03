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
        id_panel = add_panel_in_database();
        var new_id = new Array();
        new_id.push(id_panel);

        var new_panel = new Array();
        new_panel.push(new_id);



        data_panel.push(new_panel);
        add_panel(id_panel);
        add_button_right_panel(id_panel);

        view_panel_add_element_add(id_panel);
        
        if(nb_panel ==10){
             jQuery("#demo-menu-lower-right").remove();
        }


    } else {
        alert("Size limit reached. Max 10 panel.");
    }

}

//TODO LIMITE DE PANEL (10 max)
function add_panel_saved(id_panel, id_user, name, letter, color) {


//    < button id = "demo-menu-lower-right"
//            class = "mdl-button mdl-js-button mdl-button--icon" >
//            < i class = "material-icons" > more_vert < /i>
//            < /button>

//    var page_content = document.getElementById('page_content');
//
//
//    var header = document.createElement("div");
//    header.setAttribute("id", 'header' + id_panel);
//    header.setAttribute("style", 'background-color : #123456; height : 100px; width : 100%;text-align : left');
//
////    var name = document.createElement("div");
////    name.textContent = name;
//
//    var ul = document.createElement("ul");
//    ul.setAttribute("class", 'mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect');
//    ul.setAttribute("for", 'button_delete_panel');
//    var li = document.createElement("li");
//    li.setAttribute("class", 'mdl-menu__item');
//    li.textContent = 'Delete this panel';
//
//    ul.appendChild(li);
//    header.appendChild(ul);
//
//
//    var button = document.createElement("button");
//    button.setAttribute("id", 'button_delete_panel');
//    button.setAttribute("style", 'position:absolute; float:left;');
//    button.setAttribute("class", 'mdc-button mdc-button--raised demo-button demo-button--normal');
//
//    var i = document.createElement("i");
//    i.setAttribute("class", 'material-icons');
//    i.textContent = 'more_vert';
//
//
//    button.appendChild(i);
////    header.appendChild(name);
//    header.appendChild(button);


    var div = document.createElement("div");
    div.setAttribute("id", 'panel' + id_panel);
    div.setAttribute("class", 'mdl-grid background_content ');
    div.setAttribute("style", 'width:100%');


//    div.appendChild(header);
    page_content.appendChild(div);



}
function add_panel(id_panel) {
    var page_content = document.getElementById('page_content');
    var div = document.createElement("div");
    div.setAttribute("id", 'panel' + id_panel);
    div.setAttribute("class", 'mdl-grid background_content ');
    div.setAttribute("style", 'background-color: ' + color_select);
    page_content.appendChild(div);
}


function add_panel_in_database() {

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





