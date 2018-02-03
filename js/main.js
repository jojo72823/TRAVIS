/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//FOR THE LOADING SCREEN
jQuery(window).load(function () {

    'use strict';
    load_interface();

    setTimeout(function () {
        $(".preloader").delay(1000).fadeOut("slow").remove();
       
    }, 1000);

});

function watchColorPicker(event) {
  document.querySelectorAll("p").forEach(function(p) {
    p.style.color = event.target.value;
  });
}
