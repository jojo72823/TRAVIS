<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function getPanel($args) {

    $id_user = $args['id_user'];
    $retour = array();
    //connexion à la base de données
    $bdd = connexionBdTravis();
    //Requete pour savoir si l'identifiant existe
    $requete = $bdd->prepare("SELECT * FROM `tab_panel` WHERE `ID_USER`= :id_user");
    $requete->bindParam(":id_user", $id_user);
    $requete->execute() or die("erreur requete getPanel");

    while ($data = $requete->fetch()) {
        array_push($retour, array($data));
    }
    echo json_encode($retour);
    $requete->closeCursor();
}

function tab_data() {
    $bdd = connexionBd();
    $retour = array();
    $requete = $bdd->query('SELECT * FROM tab_data');
    while ($donnees = $requete->fetch()) {
        array_push($retour, array($donnees));
    }
    $requete->closeCursor();
    echo json_encode($retour);
}

function get_elements_php($args) {
    //get paramaters
    $id_panel = $args['id_panel'];
    $retour = array();
    //connect to database
    $bdd = connexionBdTravis();
    //prepare request
    $requete = $bdd->prepare("SELECT * FROM `tab_element` WHERE `ID_PANEL`= :id_panel");
    $requete->bindParam(":id_panel", $id_panel);
    //execute request
    $requete->execute() or die("erreur requete load_element");

    while ($data = $requete->fetch()) {//GET each element
        $tmp = array();
        array_push($tmp, $data['ID_ELEMENT']);
        array_push($tmp, $data['ID_PANEL']);
        array_push($tmp, $data['CLASS_SIZE_ELEMENT']);
        array_push($tmp, $data['TYPE_ELEMENT']);
        array_push($tmp, $data['ID_TYPE_GRAPH']);
        array_push($tmp, $data['ID_TYPE_GRAPH']);
        array_push($retour, $tmp);
    }

    $requete->closeCursor();
    echo json_encode($retour);
}

//  load_type_polar($data['ID_TYPE_GRAPH'], $data['CLASS_SIZE_ELEMENT']);
function load_type_polar($id_polar, $class_size_element) {

    $retour = array();

    //connect to database
    $bdd = connexionBdTravis();
    $requete = $bdd->prepare("SELECT * FROM `tab_polar` WHERE `ID_POLAR`= :id_polar");
    $requete->bindParam(":id_polar", $id_polar);
    $requete->execute() or die("erreur requete load_type_polar");

    while ($data = $requete->fetch()) {

        $requete_indicator = $bdd->prepare("SELECT INDICATOR FROM `TAB_INDICATORS` WHERE `ID_INDICATOR`= :ID_INDICATOR");
        $requete_indicator->bindParam(":ID_INDICATOR", $data['ID_INDICATORS']);
        $requete_indicator->execute() or die("erreur requete requete_indicator");
        $data_indicator = $requete_indicator->fetch();
        array_push($retour, $data_indicator[0]);
    }
    return $retour;

    //close connection
    $requete->closeCursor();
}

function load_array_indicators_polar_php($args) {

    $retour = array();

    //connect to database
    $bdd = connexionBdTravis();
    $requete = $bdd->prepare("SELECT * FROM `tab_polar` WHERE `ID_POLAR` = :id_element");
    $requete->bindParam(":id_element", $args['id_element']);
    $requete->execute() or die("erreur requete load_array_indicators_polar_php");

    $data = $requete->fetch();
    echo json_encode($data['ARRAY_INDICATORS']);

    //close connection
    $requete->closeCursor();
}

function load_array_indicators_spider_php($args) {
    $retour = array();

    //connect to database
    $bdd = connexionBdTravis();
    $requete = $bdd->prepare("SELECT * FROM `tab_spider` WHERE `ID_SPIDER` = :id_element");
    $requete->bindParam(":id_element", $args['id_element']);
    $requete->execute() or die("erreur requete load_array_indicators_polar_php");

    $data = $requete->fetch();
    echo json_encode($data['ARRAY_INDICATORS']);

    //close connection
    $requete->closeCursor();
}

function load_type_spider($id_spider, $class_size_element) {

    $retour = array();

    //connect to database
    $bdd = connexionBdTravis();
    $requete = $bdd->prepare("SELECT * FROM `tab_spider` WHERE `ID_SPIDER`= :id_spider");
    $requete->bindParam(":id_spider", $id_spider);
    $requete->execute() or die("erreur requete load_type_spider");

    while ($data = $requete->fetch()) {

        $requete_indicator = $bdd->prepare("SELECT INDICATOR FROM `TAB_INDICATORS` WHERE `ID_INDICATOR`= :ID_INDICATOR");
        $requete_indicator->bindParam(":ID_INDICATOR", $data['ID_INDICATORS']);
        $requete_indicator->execute() or die("erreur requete requete_indicator");
        $data_indicator = $requete_indicator->fetch();
        array_push($retour, $data_indicator[0]);
    }
    return $retour;

    //close connection
    $requete->closeCursor();
}

function get_type_element_php($args) {

    //connect to database
    $bdd = connexionBdTravis();
    //prepare request
    $requete = $bdd->prepare("SELECT * FROM `tab_element` WHERE `ID_ELEMENT`= :id_element");
    $requete->bindParam(":id_element", $args['p_id_element']);
    //execute request
    $requete->execute() or die("erreur requete get_type_element_php");

    while ($data = $requete->fetch()) {

        echo json_encode($data['TYPE_ELEMENT']);
    }

    $requete->closeCursor();
}
