<?php

function connexionBd() {
    $user = 'root';
    $pass = '';
    try {
        $bdd = new PDO('mysql:host=localhost;dbname=tp_cmc', $user, $pass);
    } catch (Exception $ex) {
        die("PB connexion BD : " . $ex->getMessage());
    }
    return $bdd;
}

function connexionBdTravis() {
    $user = 'root';
    $pass = '';
    try {
        $bdd = new PDO('mysql:host=localhost;dbname=travis', $user, $pass);
    } catch (Exception $ex) {
        die("PB connexion BD : " . $ex->getMessage());
    }
    return $bdd;
}

function nb_messages_read() {
    $bdd = connexionBd();
    $requete = $bdd->query('SELECT count(*) AS count FROM message_receiver');
    $count = $requete->fetch();
//    echo $count['count'];
    echo 200;
    $requete->closeCursor();
}

function nb_messages_sent() {
    $bdd = connexionBd();
    $requete = $bdd->query('SELECT count(*) AS count FROM message');
    $count = $requete->fetch();
//    echo $count['count'];
    echo 300;
    $requete->closeCursor();
}

function nb_files_upload() {
    $bdd = connexionBd();
    $requete = $bdd->query("SELECT count(*) AS count FROM action WHERE type='Upload un fichier avec le message'");
    $count = $requete->fetch();
//    echo $count['count'];
    echo 400;
    $requete->closeCursor();
}

function nb_files_download() {
    $bdd = connexionBd();
    $requete = $bdd->query("SELECT count(*) AS count FROM action WHERE type='Download un fichier dans le message'");
    $count = $requete->fetch();
//    echo $count['count'];
    echo 500;
    $requete->closeCursor();
}

function get_nb_messages_sent_user_php($args) {
    if (isset($args['p_name_user'])) {
        $name_user = $args['p_name_user'];
    }
    $bdd = connexionBd();

    $requete = $bdd->query("SELECT idUser FROM `user` WHERE name = '" . $name_user . "'");
    $count = $requete->fetch();
    $count['idUser'];

    $requete = $bdd->query("SELECT count(*) AS count FROM `tracecmc` NATURAL JOIN `action` WHERE action.type='Poster un nouveau message' AND idUser = '" . $count['idUser'] . "'");
    $count = $requete->fetch();
    echo $count['count'];
    $requete->closeCursor();
}

function get_nb_connection_user_php($args) {
    if (isset($args['p_name_user'])) {
        $name_user = $args['p_name_user'];
    }
    $bdd = connexionBd();

    $requete = $bdd->query("SELECT idUser FROM `user` WHERE name = '" . $name_user . "'");
    $count = $requete->fetch();
    $count['idUser'];

    $requete = $bdd->query("SELECT count(*) AS count FROM `tracecmc` NATURAL JOIN `action` WHERE action.type='Connexion' AND idUser = '" . $count['idUser'] . "'");
    $count = $requete->fetch();
    echo $count['count'];
    $requete->closeCursor();
}

function get_nb_messages_read_user_php($args) {
    if (isset($args['p_name_user'])) {
        $name_user = $args['p_name_user'];
    }
    $bdd = connexionBd();

    $requete = $bdd->query("SELECT idUser FROM `user` WHERE name = '" . $name_user . "'");
    $count = $requete->fetch();
    $count['idUser'];

    $requete = $bdd->query("SELECT count(*) AS count FROM `tracecmc` NATURAL JOIN `action` WHERE action.type='Afficher le contenu d\'un message' AND idUser = '" . $count['idUser'] . "'");
    $count = $requete->fetch();
    echo $count['count'];
    $requete->closeCursor();
}

function list_user() {

    $bdd = connexionBd();
    $requete = $bdd->query('SELECT * FROM user');
    while ($donnees = $requete->fetch()) {
        echo ' <option id=' . $donnees['idUser'] . ' selected=\'selected\'>' . $donnees['name'] . '</option>';
    }
}

function get_indicators() {

    $indicators = array();

    //connect to database
    $bdd = connexionBdTravis();
    $requete = $bdd->query("SELECT * FROM `TAB_INDICATORS`");
    while ($data = $requete->fetch()) {
        $tmp = array();
        array_push($tmp, $data['ID_INDICATOR']);
        array_push($tmp, $data['INDICATOR']);
        array_push($tmp, $data['NAME_INDICATOR']);
        array_push($indicators, $tmp);
    }

    echo json_encode($indicators);
}

function list_compatible_indicators_php() {

    $indicators = array();

    $bdd = connexionBdTravis();
    $requete = $bdd->query('SELECT * FROM `tab_compatible_indicators` ');
    while ($data = $requete->fetch()) {
        array_push($indicators, $data['ID_INDICATOR_1']);
        array_push($indicators, $data['ID_INDICATOR_2']);
    }
    echo json_encode($indicators);
}

function id_compatible_indicators_php($args) {

    $bdd = connexionBdTravis();

    $requete = $bdd->prepare('SELECT * FROM `tab_compatible_indicators` WHERE ID_INDICATOR_1= :id_indicator_1 AND ID_INDICATOR_2= :id_indicator_2');
    $requete->bindParam(":id_indicator_1", $args['id_indicator_1']);
    $requete->bindParam(":id_indicator_2", $args['id_indicator_2']);
    $requete->execute() or die("erreur requete id_compatible_indicators_php");

    while ($data = $requete->fetch()) {
        echo json_encode($data['ID_TAB_COMPATIBLE_INDICATORS']);
    }
}

function get_list_users_php() {

    $retour = array();

    $bdd = connexionBd();

    $requete = $bdd->query('SELECT * FROM user');
    while ($data = $requete->fetch()) {
        $tmp = array();
        array_push($tmp, $data['idUser']);
        array_push($tmp, $data['name']);
        array_push($retour, $tmp);
    }
    echo json_encode($retour);
}
?>


