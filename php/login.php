<?php

session_start();
require_once '../inc/accessBd.inc';
require '../inc/save_interface.inc';
require '../inc/connection_user.inc';

$login = $_POST['login'];
$mdp = $_POST['password'];
if ($login == null && $mdp == null) {
    echo "<script>alert('Les champs sont vides !');</script>";
    echo "<script>location.href=\"../index.php\";</script>";
} else {
    $retour = fonctionVerifLogin($login, $mdp);

    if ('PID' == $retour) {
        echo "<script>alert('Identifiant inconnu !');</script>";
        echo "<script>location.href=\"../index.php\";</script>";
    } else {
        if ('PMDP' == $retour) {
            echo "<script>alert('Mot de passe incorrect !');</script>";
            echo "<script>location.href=\"../index.php\";</script>";
        } else {
            
            $_SESSION['login'] = $retour;

            echo "<script>location.href=\"../dashboard.php\";</script>";
        }
    }
}
?>


