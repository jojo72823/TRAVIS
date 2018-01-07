<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function savePanel($args) {
    
    
    $id_panel = $args['id_panel'];
    $id_user = $args['id_user'];
    $name = $args['name'];
    $letter = $args['letter'];
    $color = $args['color'];
    
    
    
    
    //connexion à la base de données
    $bdd = connexionBdTravis();
    //Requete pour savoir si l'identifiant existe
    $requete = $bdd->prepare("INSERT INTO `tab_panel`(`ID_PANEL`, `ID_USER`, `NAME`, `LETTER`, `COLOR`) VALUES (:id_panel,:id_user,:name,:letter,:color)");
    $requete->bindParam(":id_panel", $id_panel);
    $requete->bindParam(":id_user", $id_user);
    $requete->bindParam(":name", $name);
    $requete->bindParam(":letter", $letter);
    $requete->bindParam(":color", $color);
    
    $requete->execute() or die("erreur requête savePanel");
    
   
}
