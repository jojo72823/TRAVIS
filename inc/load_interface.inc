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
//        $panel = array();
//        array_push($panel, $data['ID_PANEL']);
//        array_push($panel, $data['ID_USER']);
//        array_push($panel, $data['NAME']);
//        array_push($panel, $data['LETTER']);
//        array_push($panel, $data['COLOR']);
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
