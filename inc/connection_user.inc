<?php

function fonctionVerifLogin($log, $mdp) {
    //CONNEXION TO DATABASE
    $bdd = connexionBdTravis();
    //REQUEST TO KNOW IF THE LOGIN EXIST OR NOT
    $requete = $bdd->prepare("SELECT count(LOGIN) as nbLigne FROM TAB_USER WHERE LOGIN = :id");
    $requete->bindParam(":id", $log);
    $requete->execute() or die("erreur requête 1");
    $tab = $requete->fetch();
    $requete->closeCursor();
    if ($tab['nbLigne'] == 1) {//if the login exist
        $requete = $bdd->prepare("SELECT count(LOGIN) as nbLigne FROM TAB_USER WHERE LOGIN = :id AND PASSWORD = :mdp");
        $requete->bindParam(":id", $log);
        $requete->bindParam(":mdp", $mdp);
        $requete->execute() or die("erreur requête 2");
        $tab = $requete->fetch();
        $requete->closeCursor();
        if ($tab['nbLigne'] == 1) {//login and password ok
            $retour = 'OK';
        } else {//mdp incorrect
            $retour = 'PMDP';
        }
    } else {
        if ($log == null && $mdp == null) {//fields are empty
            $retour = 'PVIDE';
        } else {
            $retour = 'PID'; //login unknow
        }
    }
    return $retour;
}
