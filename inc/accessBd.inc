<?php

/* * ***************************************************************************
 * CONNEXION to DATABASES
 */

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

/* * ***************************************************************************
 * INDICATORS
 */

function nb_messages_read() {
    $bdd = connexionBd();
    $requete = $bdd->query('SELECT count(*) AS count FROM message_receiver');
    $count = $requete->fetch();
    echo $count['count'];
    $requete->closeCursor();
}

function nb_messages_sent() {
    $bdd = connexionBd();
    $requete = $bdd->query('SELECT count(*) AS count FROM message');
    $count = $requete->fetch();
    echo $count['count'];

    $requete->closeCursor();
}

function nb_files_upload() {
    $bdd = connexionBd();
    $requete = $bdd->query("SELECT count(*) AS count FROM action WHERE type='Upload un ficher avec le message'");
    $count = $requete->fetch();
    echo $count['count'];

    $requete->closeCursor();
}

function nb_files_download() {
    $bdd = connexionBd();
    $requete = $bdd->query("SELECT count(*) AS count FROM action WHERE type='Download un fichier dans le message'");
    $count = $requete->fetch();
    echo $count['count'];
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
        $name_user = "" + $args['p_name_user'];
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

function get_nb_files_download_users_php($args) {
    if (isset($args['p_name_user'])) {
        $name_user = $args['p_name_user'];
    }
    $bdd = connexionBd();

    $requete = $bdd->query("SELECT idUser FROM `user` WHERE name = '" . $name_user . "'");
    $count = $requete->fetch();
    $count['idUser'];

    $requete = $bdd->query("SELECT count(*) AS count FROM `tracecmc` NATURAL JOIN `action` WHERE action.type='Download un fichier dans le message' AND idUser = '" . $count['idUser'] . "'");
    $count = $requete->fetch();
    echo $count['count'];
    $requete->closeCursor();
}

function get_nb_files_upload_users_php($args) {
    if (isset($args['p_name_user'])) {
        $name_user = $args['p_name_user'];
    }
    $bdd = connexionBd();

    $requete = $bdd->query("SELECT idUser FROM `user` WHERE name = '" . $name_user . "'");
    $count = $requete->fetch();
    $count['idUser'];

    $requete = $bdd->query("SELECT count(*) AS count FROM `tracecmc` NATURAL JOIN `action` WHERE action.type='Upload un ficher avec le message' AND idUser = '" . $count['idUser'] . "'");
    $count = $requete->fetch();
    echo $count['count'];

    $requete->closeCursor();
}

function get_nb_display_forum_users($args) {
    if (isset($args['p_forum_number']) && isset($args['p_name_user'])) {
        $forum_number = $args['p_forum_number'];
        $name_user = $args['p_name_user'];
    }
    $bdd = connexionBd();

    $requete = $bdd->query("SELECT idUser FROM `user` WHERE name = '" . $name_user . "'");
    $count = $requete->fetch();
    $count['idUser'];
    $requete = $bdd->query("SELECT count(*) AS count FROM `tracecmc` 
                            NATURAL JOIN `action` 
                            NATURAL JOIN `message`
                            NATURAL JOIN `attributes`
                            WHERE action.type='Afficher une structure (cours/forum)' 
                                AND attributes.Title LIKE 'IDForum=" . $forum_number . "'
                                AND idUser = '" . $count['idUser'] . "'");
    $count = $requete->fetch();
    echo $count['count'];

    $requete->closeCursor();
}

function nb_display_forum_date($args) {
    if (isset($args['p_forum_number']) && isset($args['p_date'])) {
        $forum_number = $args['p_forum_number'];
        $date = $args['p_date'];
    }
    $bdd = connexionBd();
    $requete = $bdd->query("SELECT count(*) AS count FROM `tracecmc` 
                            NATURAL JOIN `action` 
                            NATURAL JOIN `message`
                            NATURAL JOIN `attributes`
                            WHERE action.type='Afficher une structure (cours/forum)' 
                                AND attributes.Title LIKE 'IDForum=" . $forum_number . "%'
                                AND message.Date LIKE '" . $date . "%'");
    $count = $requete->fetch();
    echo $count['count'];
    $requete->closeCursor();
}

function nb_display_forum_date_users($args) {
    if (isset($args['p_forum_number']) && isset($args['p_name_user']) && isset($args['p_date'])) {
        $forum_number = $args['p_forum_number'];
        $date = $args['p_date'];
        $name_user = $args['p_name_user'];
    }
    $bdd = connexionBd();

    $requete = $bdd->query("SELECT idUser FROM `user` WHERE name = '" . $name_user . "'");
    $count = $requete->fetch();
    $count['idUser'];
    $requete = $bdd->query("SELECT count(*) AS count FROM `tracecmc` 
                            NATURAL JOIN `action` 
                            NATURAL JOIN `message`
                            NATURAL JOIN `attributes`
                            WHERE action.type='Afficher une structure (cours/forum)' 
                                AND attributes.Title LIKE 'IDForum=" . $forum_number . "%'
                                AND idUser = '" . $count['idUser'] . "'
                                AND message.Date LIKE '" . $date . "%'");
    $count = $requete->fetch();
    echo $count['count'];
    $requete->closeCursor();
}

function get_nb_connection_date_users_php($args) {
    if (isset($args['p_name_user']) && isset($args['p_date'])) {

        $date = $args['p_date'];
        $name_user = $args['p_name_user'];
    }
    $bdd = connexionBd();

    $requete = $bdd->query("SELECT idUser FROM `user` WHERE name = '" . $name_user . "'");
    $count = $requete->fetch();
    $count['idUser'];
    $requete = $bdd->query("SELECT count(*) AS count FROM `tracecmc` 
                            NATURAL JOIN `action` 
                            NATURAL JOIN `message`
                            NATURAL JOIN `attributes`
                            WHERE action.type='Connexion' 
                                AND idUser = '" . $count['idUser'] . "'
                                AND message.Date LIKE '" . $date . "%'");
    $count = $requete->fetch();
    echo $count['count'];
    $requete->closeCursor();
}

/* * ***************************************************************************
 * TRANSLATER
 */

//Translater user
function get_name_of_id_user_php($args) {

    $bdd = connexionBd();

    $requete = $bdd->prepare('SELECT name FROM user WHERE idUser = :id_user');
    $requete->bindParam(":id_user", $args['id_user']);
    $requete->execute() or die("ERROR REQUEST : get_name_of_id_user_php");
    $data = $requete->fetch();
    echo json_encode($data['name']);
}

function get_id_user_php($args) {
    $bdd = connexionBd();

    $requete = $bdd->prepare('SELECT idUser FROM user WHERE name = :name');
    $requete->bindParam(":name", $args['p_name_user']);
    $requete->execute() or die("ERROR REQUEST : get_id_user_php");
    $data = $requete->fetch();
    echo $data['idUser'];
}

//translater indicator
function get_name_of_id_indicator_php($args) {

    $bdd = connexionBdTravis();

    $requete = $bdd->prepare('SELECT `INDICATOR` FROM `tab_indicators` WHERE `ID_INDICATOR` = :id_indicator');
    $requete->bindParam(":id_indicator", $args['id_indicator']);
    $requete->execute() or die("ERROR REQUEST : get_name_of_id_indicator_php");
    $data = $requete->fetch();
    echo json_encode($data['INDICATOR']);
}

function get_id_for_name_indicator_php($args) {

    $bdd = connexionBdTravis();

    $requete = $bdd->prepare('SELECT * FROM `tab_indicators` WHERE INDICATOR= :indicator');
    $requete->bindParam(":indicator", $args['p_name_indicator']);
    $requete->execute() or die("ERROR REQUEST : get_id_for_name_indicator_php");
    $data = $requete->fetch();
    echo $data['ID_INDICATOR'];
}

/* * ***************************************************************************
 * TOOLS
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

/* * ***************************************************************************
 * Visualisation
 */

function get_indicators_php() {

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

function list_user() {

    $count = 0;

    $bdd = connexionBd();
    $requete = $bdd->query('SELECT * FROM user');
    while ($donnees = $requete->fetch()) {
        if ($count == 0) {
            echo ' <option  id=' . $donnees['idUser'] . ' selected=\'selected\'>' . $donnees['name'] . '</option>';
            $count = 1;
        } else {
            echo ' <option id=' . $donnees['idUser'] . '>' . $donnees['name'] . '</option>';
        }
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

function list_forum() {
    $bdd = connexionBd();
    $requete = $bdd->query('SELECT DISTINCT CAST(SUBSTRING_INDEX(SUBSTRING_INDEX(Title,",",1),"=",-1) AS Unsigned) AS idForum FROM `attributes` WHERE Title LIKE "IDForum%" ORDER BY idForum ASC');
    while ($donnees = $requete->fetch()) {
        echo ' <option id=' . $donnees['idForum'] . ' selected=\'selected\'>' . $donnees['idForum'] . '</option>';
    }
}

function get_list_forums_php() {

    $retour = array();

    $bdd = connexionBd();

    $requete = $bdd->query('SELECT DISTINCT CAST(SUBSTRING_INDEX(SUBSTRING_INDEX(Title,",",1),"=",-1) AS Unsigned) AS idForum FROM `attributes` WHERE Title LIKE "IDForum%" ORDER BY idForum ASC');
    while ($data = $requete->fetch()) {
        $tmp = array();
        array_push($tmp, $data['idForum']);
        array_push($retour, $tmp);
    }
    echo json_encode($retour);
}

function get_nb_display_forum($args) {
    if (isset($args['p_forum_number'])) {
        $forum_number = $args['p_forum_number'];
    }
    $bdd = connexionBd();

    $requete = $bdd->query("SELECT count(*) AS count FROM `tracecmc` 
                            NATURAL JOIN `action` 
                            NATURAL JOIN `message`
                            NATURAL JOIN `attributes`
                            WHERE action.type='Afficher une structure (cours/forum)' 
                                AND attributes.Title LIKE 'IDForum=" . $forum_number . "'");
    $count = $requete->fetch();
    echo $count['count'];
    $requete->closeCursor();
}

function get_first_date_php(){
    $bdd = connexionBd();

    $requete = $bdd->query("SELECT LEFT(Date, 10) AS Date FROM `action` 
                            WHERE LEFT(Date, 10) ORDER BY Date ASC LIMIT 1");
    $date = $requete->fetch();
    echo json_encode($date['Date']);
    $requete->closeCursor();
}

function get_last_date_php(){
    $bdd = connexionBd();

    $requete = $bdd->query("SELECT LEFT(Date, 10) AS Date FROM `action` 
                            WHERE LEFT(Date, 10) ORDER BY Date DESC LIMIT 1");
    $date = $requete->fetch();
    echo json_encode($date['Date']);
    $requete->closeCursor();
}

?>