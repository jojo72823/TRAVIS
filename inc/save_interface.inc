<?php

function savePanel($args) {
    //get paramaters
    $id_user = $args['id_user'];
    $name = $args['name'];
    $letter = $args['letter'];
    $color = $args['color'];
    //connect to database
    $bdd = connexionBdTravis();
    //prepare request
    $requete = $bdd->prepare("INSERT INTO `tab_panel`(`ID_USER`, `NAME`, `LETTER`, `COLOR`) VALUES (:id_user,:name,:letter,:color)");
    $requete->bindParam(":id_user", $id_user);
    $requete->bindParam(":name", $name);
    $requete->bindParam(":letter", $letter);
    $requete->bindParam(":color", $color);
    //execute request
    $requete->execute() or die("erreur requête savePanel");
    //close connection

    echo $bdd->lastInsertId();

    $requete->closeCursor();
}

function save_element_polar($args) {

    //get paramaters
    $id_panel = $args['id_panel'];
    $class_size_element = $args['class_size_element'];
    $type_element = $args['type_element'];
    $array_id_indicators_element = $args['array_id_indicators_element'];
    //connect to database
    $bdd = connexionBdTravis();

    //get $id_type_graph
    $requete_id = $bdd->query("SELECT `ID_POLAR` FROM `tab_polar` ORDER BY `ID_POLAR` DESC");
    $count = $requete_id->fetch();
    $id_type_graph = $count['ID_POLAR'];
    $id_type_graph = $id_type_graph + 1;
    //prepare request
    $requete = $bdd->prepare("INSERT INTO `tab_element`(`ID_PANEL`, `CLASS_SIZE_ELEMENT`, `TYPE_ELEMENT`, `ID_TYPE_GRAPH`) VALUES (:id_panel,:class_size_element,:type_element,:id_type_graph)");
    $requete->bindParam(":id_panel", $id_panel);
    $requete->bindParam(":class_size_element", $class_size_element);
    $requete->bindParam(":type_element", $type_element);
    $requete->bindParam(":id_type_graph", $id_type_graph);
    //execute request
    $requete->execute() or die("erreur requête save_element");
    //close connection
    $requete->closeCursor();

    //call an other function
    switch ($type_element) {
        case 'TAB_POLAR':
            save_type_polar($id_type_graph, $array_id_indicators_element);
            break;
        case 'TAB_NUMBER':
            save_type_number($id_type_graph, $array_id_indicators_element);
            break;
        default:
            break;
    }
}

function save_element_spider($args) {

    //get paramaters
    $id_panel = $args['id_panel'];
    $class_size_element = $args['class_size_element'];
    $type_element = $args['type_element'];
    $array_id_indicators_element = $args['array_id_indicators_element'];
    //connect to database
    $bdd = connexionBdTravis();

    //get $id_type_graph
    $requete_id = $bdd->query("SELECT `ID_SPIDER` FROM `tab_spider` ORDER BY `ID_SPIDER` DESC");
    $count = $requete_id->fetch();
    $id_type_graph = $count['ID_SPIDER'];
    $id_type_graph = $id_type_graph + 1;
    //prepare request
    $requete = $bdd->prepare("INSERT INTO `tab_element`(`ID_PANEL`, `CLASS_SIZE_ELEMENT`, `TYPE_ELEMENT`, `ID_TYPE_GRAPH`) VALUES (:id_panel,:class_size_element,:type_element,:id_type_graph)");
    $requete->bindParam(":id_panel", $id_panel);
    $requete->bindParam(":class_size_element", $class_size_element);
    $requete->bindParam(":type_element", $type_element);
    $requete->bindParam(":id_type_graph", $id_type_graph);
    //execute request
    $requete->execute() or die("erreur requête save_element");
    //close connection
    $requete->closeCursor();

    //call an other function
    switch ($type_element) {
        case 'TAB_POLAR':
            save_type_polar($id_type_graph, $array_id_indicators_element);
            break;

        case 'TAB_SPIDER':
            save_type_spider($id_type_graph, $array_id_indicators_element);
            break;
        case 'TAB_NUMBER':
            save_type_number($id_type_graph, $array_id_indicators_element);
            break;
        default:
            break;
    }
}

function save_type_polar($id_type_graph, $array_id_indicators_element) {

    //connect to database
    $bdd = connexionBdTravis();

    //prepare request
    $requete = $bdd->prepare("INSERT INTO `tab_polar`(`ID_POLAR`, `ARRAY_INDICATORS`) VALUES (:id_polar,:array_id_indicators_element)");
    $requete->bindParam(":id_polar", $id_type_graph);
    $requete->bindParam(":array_id_indicators_element", json_encode($array_id_indicators_element));
    //execute request
    $requete->execute() or die(mysql_error());
    //close connection
    $requete->closeCursor();
}

function save_type_spider($id_type_graph, $array_id_indicators_element) {


    //connect to database
    $bdd = connexionBdTravis();

    //prepare request
    $requete = $bdd->prepare("INSERT INTO `tab_spider`(`ID_SPIDER`, `ARRAY_INDICATORS`) VALUES (:id_spider,:array_id_indicators_element)");
    $requete->bindParam(":id_spider", $id_type_graph);
    $requete->bindParam(":array_id_indicators_element", json_encode($array_id_indicators_element));
    //execute request
    $requete->execute() or die(mysql_error());

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
    $id_element = $args['p_number'];
    $panel_select = $args['p_panel_select'];

    //connect to database
    $bdd = connexionBdTravis();

    //GET ID
    $requete_id = $bdd->prepare("SELECT `ID_TYPE_GRAPH` FROM `tab_element` WHERE `ID_PANEL` = :panel_select AND `ID_ELEMENT` = :id_element");
    $requete_id->bindParam(":panel_select", $panel_select);
    $requete_id->bindParam(":id_element", $id_element);
    $requete_id->execute() or die("ERROR SELECT `ID_TYPE_GRAPH (delete_graph_php)");
    $data_id = $requete_id->fetch();
    $ID_TYPE_GRAPH = $data_id['ID_TYPE_GRAPH'];


    $requete_delete_1 = $bdd->prepare("DELETE FROM `tab_element` WHERE `ID_PANEL` = :panel_select AND `ID_ELEMENT` = :id_element");
    $requete_delete_1->bindParam(":panel_select", $panel_select);
    $requete_delete_1->bindParam(":id_element", $id_element);
    $requete_delete_1->execute() or die("ERROR DELETE FROM `tab_element` (delete_graph_php)");

    //TODO for different chart

    $requete_delete_2 = $bdd->prepare("DELETE FROM `tab_polar` WHERE `ID_POLAR` = :id_type_graph");
    $requete_delete_2->bindParam(":id_type_graph", $ID_TYPE_GRAPH);
    $requete_delete_2->execute() or die("ERROR REQUEST delete_graph tab_polar");
}

function get_id_element_php() {
    //connect to database
    $bdd = connexionBdTravis();

    //get $id_type_graph
    $requete_id = $bdd->query("SELECT `ID_ELEMENT` FROM `tab_element` ORDER BY `ID_ELEMENT` DESC");
    $count = $requete_id->fetch();
    $ID_ELEMENT = $count['ID_ELEMENT'];
    $ID_ELEMENT = $ID_ELEMENT + 1;
    echo $ID_ELEMENT;
}

