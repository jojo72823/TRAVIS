/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//ATTRIBUTES
var nb_panel = 0;
var panel_select = 0;
var data_panel;

//MENU ADD IN SIDE PANEL
$(".mdl-menu__item").click(function () {
    if (nb_panel < 10) {
        var id = $(this).attr("id");
        nb_panel = nb_panel + 1;
        panel_select = nb_panel;
        add_panel();
        add_button_right_panel();
        view_panel(panel_select);
    } else {
        alert("Size limit reached. Max 10 panel.");
    }
})


//TODO LIMITE DE PANEL (10 max)
function add_panel() {
    var page_content = document.getElementById('page_content');
    var div = document.createElement("div");
    div.setAttribute("id", 'panel' + nb_panel);
    div.setAttribute("class", 'mdl-grid background_content');
    div.setAttribute("style", 'background-color: #99ff99');
    page_content.appendChild(div);

    //TODO save in BDD
//    $.ajax({
//        url: 'php/accessFonctions.php',
//        data: {fonction: 'savePanel', id_panel: nb_panel,id_user : "jojo",name:"test",letter:"J",color:"#123456"},
//        type: 'POST',
//        dataType: 'json',
//        success: function (objetJson) {
//            if (objetJson != null) {
//                
//            } else {
//                alert("erreur savePanel! ");
//            }
//        },
//        cache: false
//    });

    //LOAD PANEL BDD
//
//    $.ajax({
//        url: 'php/accessFonctions.php',
//        data: {fonction: 'getPanel', id_user: "0"},
//        type: 'POST',
//        dataType: 'json',
//        success: function (objetJson) {
//            if (objetJson != null) {
//                data_panel = objetJson;
//            } else {
//                alert("erreur getPanel! ");
//            }
//        },
//        cache: false
//    });
//
//
//
//    //TODO FOR MANY PANEL
//    //INFORMATION FOR ONE PANEL
//    var id_panel = data_panel[0][0][0];
//    var id_user = data_panel[0][0][1];
//    var name = data_panel[0][0][2];
//    var letter = data_panel[0][0][3];
//    var color = data_panel[0][0][4];



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
    img.setAttribute("style", 'background-color:#3575bb;');
    var text = document.createElement("div");
    text.setAttribute("id", 'text_btn_panel' + nb_panel);
    text.setAttribute("class", 'text_btn_right_bar ');
    text.setAttribute("onclick", 'view_panel(\'' + nb_panel + '\')');
    text.textContent = "" + nb_panel;

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
        img_btn_panel.setAttribute("style", 'background-color: rgba(0, 0, 255, 0);');
    }
    var panel = document.getElementById('panel' + panel_select);
    panel.style.display = 'block';
    var img_btn_panel = document.getElementById('img_btn_panel' + panel_select);
    img_btn_panel.setAttribute("style", 'background-color: #3575bb;');


}




