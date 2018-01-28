<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function load_type_element_php() {
    $bdd = connexionBdTravis();

    $retour = array();

    $requete = $bdd->query('SELECT * FROM `tab_type_element`');
    while ($data = $requete->fetch()) {
        $tmp = array();
        array_push($tmp, $data['ID_ELEMENT']);
        array_push($tmp, $data['NAME_ELEMENT']);
        array_push($tmp, $data['NAME_TAB_ELEMENT']);
        
        array_push($retour, $tmp);
    }
    $requete->closeCursor();
    echo json_encode($retour);
}
