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

function nb_messages_sent_users($args) {
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

function nb_connection_users($args) {
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

function nb_messages_read_users($args) {
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
        array_push($indicators, $data['INDICATOR']);
    }

    echo json_encode($indicators);
}
?>


