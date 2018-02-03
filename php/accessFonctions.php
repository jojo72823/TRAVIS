<?php
require_once '../inc/accessBd.inc';
require '../inc/save_interface.inc';
require '../inc/load_interface.inc';
require '../inc/connection_user.inc';
$fonction = $_POST['fonction'];
unset($_POST['fonction']);
$fonction($_POST);