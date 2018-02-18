<?php
session_start();
unset($_SESSION['login']);
echo "<script>alert('You are disconnected ! ');";
echo "location.href=\"../index.php\";</script>";
?>
