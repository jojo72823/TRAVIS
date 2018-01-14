/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function save_element(){
    $.ajax({
        url: 'php/accessFonctions.php',
        data: {fonction: 'get_id_indicators', data_print: legende_print},
        type: 'POST',
        dataType: 'json',
        success: function (objetJson) {
            if (objetJson != null) {
                id_indicators = objetJson;
            } else {
                alert("erreur get_id_indicators! ");
            }
        },
        cache: false
    });
    alert("toto");
    
     $.ajax({
        url: 'php/accessFonctions.php',
        data: {fonction: 'save_element', id_panel: "1",class_size_element: "null",type_content: "TAB_POLAR",id_type_graph:1,tab_indicators: id_indicators},
        type: 'POST',
        dataType: 'json',
        success: function (objetJson) {
            if (objetJson != null) {
              
            } else {
                alert("erreur save_element! ");
            }
        },
        cache: false
    });
}

