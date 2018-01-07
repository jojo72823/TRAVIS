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
    if ("OK" == fonctionVerifLogin($login,$mdp)) {
        //$_SESSION['login'] = "toto";
      
        echo "<script>location.href=\"../dashboard.php\";</script>";
    } else {
        if ('PID'== fonctionVerifLogin($login, $mdp)) {
            echo "<script>alert('Identifiant inconnu !');</script>";
            echo "<script>location.href=\"../index.php\";</script>";
        } else {
            if ('PMDP'== fonctionVerifLogin($login, $mdp)) {
                echo "<script>alert('Mot de passe incorrect !');</script>";
                echo "<script>location.href=\"../index.php\";</script>";
            }
        }
    }
}
?>


