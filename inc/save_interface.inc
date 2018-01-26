<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function savePanel($args) {
    //get paramaters
    $num_panel = $args['num_panel'];
    $id_user = $args['id_user'];
    $name = $args['name'];
    $letter = $args['letter'];
    $color = $args['color'];
    //connect to database
    $bdd = connexionBdTravis();
    //prepare request
    $requete = $bdd->prepare("INSERT INTO `tab_panel`(`NUM_PANEL`, `ID_USER`, `NAME`, `LETTER`, `COLOR`) VALUES (:num_panel,:id_user,:name,:letter,:color)");
    $requete->bindParam(":num_panel", $num_panel);
    $requete->bindParam(":id_user", $id_user);
    $requete->bindParam(":name", $name);
    $requete->bindParam(":letter", $letter);
    $requete->bindParam(":color", $color);
    //execute request
    $requete->execute() or die("erreur requête savePanel");
    //close connection
    $requete->closeCursor();
}

function save_element($args) {

    //get paramaters
    $id_panel = $args['id_panel'];
    $class_size_element = $args['class_size_element'];
    $type_content = $args['type_content'];
    $tab_indicators = $args['tab_indicators'];
    //connect to database
    $bdd = connexionBdTravis();

    //get $id_type_graph
    $requete_id = $bdd->query("SELECT `ID_POLAR` FROM `tab_polar` ORDER BY `ID_POLAR` DESC");
    $count = $requete_id->fetch();
    $id_type_graph = $count['ID_POLAR'];
    $id_type_graph = $id_type_graph + 1;
//    echo  $count['ID_POLAR']
    //prepare request
    $requete = $bdd->prepare("INSERT INTO `tab_element`(`ID_PANEL`, `CLASS_SIZE_ELEMENT`, `TYPE_CONTENT`, `ID_TYPE_GRAPH`) VALUES (:id_panel,:class_size_element,:type_content,:id_type_graph)");
    $requete->bindParam(":id_panel", $id_panel);
    $requete->bindParam(":class_size_element", $class_size_element);
    $requete->bindParam(":type_content", $type_content);
    $requete->bindParam(":id_type_graph", $id_type_graph);
    //execute request
    $requete->execute() or die("erreur requête save_element");
    //close connection
    $requete->closeCursor();

    //call an other function
    switch ($type_content) {
        case 'TAB_POLAR':
            save_type_polar($id_type_graph, $tab_indicators);
            break;
        case 'TAB_NUMBER':
            save_type_number($id_type_graph, $tab_indicators);
            break;
        default:
            break;
    }
}

function save_type_polar($id_type_graph, $tab_indicators) {


    //connect to database
    $bdd = connexionBdTravis();

    for ($cpt = 0; $cpt <= count($tab_indicators); $cpt++) {
        //prepare request
        $requete = $bdd->prepare("INSERT INTO `tab_polar`(`ID_POLAR`, `ID_INDICATOR`) VALUES (:id_polar,:id_indicator)");
        $requete->bindParam(":id_polar", $id_type_graph);
        $requete->bindParam(":id_indicator", $tab_indicators[$cpt]);
        //execute request
        $requete->execute() or die(mysql_error());
    }
    //close connection
    $requete->closeCursor();
}

function save_type_number($args) {


    //connect to database
    $bdd = connexionBdTravis();
    //prepare request
    $requete = $bdd->prepare("INSERT INTO `tab_number`(`ID_POLAR`, `ID_INDICATOR`) VALUES (:id_polar,:id_indicator)");
}

function get_id_indicators($args) {

    $retour = array();

    //get paramaters
    $data_print = $args['data_print'];

    //connect to database
    $bdd = connexionBdTravis();

    for ($cpt = 0; $cpt < count($data_print); $cpt++) {
        //request
        $requete = $bdd->prepare("SELECT ID_INDICATOR FROM `TAB_INDICATORS` WHERE `INDICATOR`= :INDICATOR");
        $requete->bindParam(":INDICATOR", $data_print[$cpt]);
        $requete->execute() or die("erreur requete get_id_indicators");
        $data = $requete->fetch();
        array_push($retour, $data[0]);
    }

    echo json_encode($retour);

    //close connection
    $requete->closeCursor();
}

function delete_graph_php($args) {
    //get paramaters
    $id_graph = $args['p_number'];
    $panel_select = $args['p_panel_select'];

    //connect to database
    $bdd = connexionBdTravis();

    $requete = $bdd->prepare("DELETE FROM `tab_element` WHERE `ID_PANEL` = :panel_select AND `ID_TYPE_GRAPH` = :id_graph");
    $requete->bindParam(":panel_select", $panel_select);
    $requete->bindParam(":id_graph", $id_graph);
    $requete->execute() or die("ERROR REQUEST delete_graph tab_element");
    
    
    //TODO for different chart

    $requete = $bdd->prepare("DELETE FROM `tab_polar` WHERE `ID_POLAR` = :id_graph");
    $requete->bindParam(":id_graph", $id_graph);
    $requete->execute() or die("ERROR REQUEST delete_graph tab_polar");
}

//function get_id_chart(){
//     //get $id_type_graph
//    $requete_id = $bdd->query("SELECT `ID_POLAR` FROM `tab_polar` ORDER BY `ID_POLAR` DESC");
//    $count = $requete_id->fetch();
//    $id_type_graph = $count['ID_POLAR'];
//    $id_type_graph = $id_type_graph + 1;
//    echo $id_type_graph;
//}