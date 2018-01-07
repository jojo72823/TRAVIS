<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function fonctionVerifLogin($log, $mdp) {
    //connexion à la base de données
    $bdd = connexionBdTravis();
    //Requete pour savoir si l'identifiant existe
    $requete = $bdd->prepare("SELECT count(LOGIN) as nbLigne FROM TAB_USER WHERE LOGIN = :id");
    $requete->bindParam(":id", $log);
    $requete->execute() or die("erreur requête 1");
    $tab = $requete->fetch();
    $requete->closeCursor();
    if ($tab['nbLigne'] == 1) {//Si il existe on verifie que le mot de passe soit correct
        $requete = $bdd->prepare("SELECT count(LOGIN) as nbLigne FROM TAB_USER WHERE LOGIN = :id AND PASSWORD = :mdp");
        $requete->bindParam(":id", $log);
        $requete->bindParam(":mdp", $mdp);
        $requete->execute() or die("erreur requête 2");
        $tab = $requete->fetch();
        $requete->closeCursor();
        if ($tab['nbLigne'] == 1) {//identifiant et mdp correct
            $retour = 'OK';
        } else {//mdp incorrect
            $retour = 'PMDP';
        }
    } else {
        if ($log == null && $mdp == null) {//champs vide
            $retour = 'PVIDE';
        } else {
            $retour = 'PID'; //identifiant inconnu
        }
    }
//valeur retournée
    return $retour;
}
