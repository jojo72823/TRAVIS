<!doctype html>
<!--
  PROJET DAUMONT JONATHAN & SALIOU ELISABETH
  Material Design Lite
  Copyright 2015 Google Inc. All rights reserved.

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      https://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License
-->
<html>
    <head>
        <meta charset="utf-8">

        <title>TRAVIS - Dashboard</title>

        <link rel='stylesheet prefetch' href='https://fonts.googleapis.com/icon?family=Material+Icons'>
        <link rel='stylesheet prefetch' href='https://cdnjs.cloudflare.com/ajax/libs/dialog-polyfill/0.4.2/dialog-polyfill.min.css'>
        <link rel="stylesheet prefetch" href="https://netdna.bootstrapcdn.com/bootstrap/3.0.2/css/bootstrap.css">
        <link rel='stylesheet prefetch' href='css/dashboard.css'>

        <link rel="stylesheet" href="css/style.css">
        <link rel="stylesheet" href="css/custom_material.indigo-blue.min.css" />
        <link rel="stylesheet" href="css/dashboard.css">
        <link rel="stylesheet" href="css/material_design_perso.css">


        <script src="./mdl/material.min.js"></script>
        <script src="https://code.highcharts.com/highcharts.src.js"></script>
        <script src="js/generate_graph.js"></script>
        <script src="js/load_interface.js"></script>
        <script src="js/save_interface.js"></script>
        <script src="js/data_bridge.js"></script>

        <script type='text/javascript' src='https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js'></script>
        <script src="https://code.highcharts.com/highcharts.js"></script>
        <script src="https://code.highcharts.com/highcharts-more.js"></script>
        <script src="https://code.highcharts.com/modules/exporting.js"></script>


    </head>
    <body style="background-color: #ff0000"onload="load_interface();">
        <div class=" mdl-layout mdl-js-layout mdl-layout--fixed-drawer">
            <div class="mdl-layout mdl-js-layout mdl-layout--fixed-drawer" >
                <div class="mdl-layout__drawer" style="background: #404041;color: white">
                    <img src="images/travis.png" style="background: white;height: 100px;width: auto;padding: 5px;"/>
                    <div class="mdl-list__item">
                        <span class="mdl-list__item-primary-content" style="margin-top: 50px;">
                            <img src="images/user.png" style="width: 50px;height: auto;margin-right: 5px;">
                            <span style="color: white;font-size: 25px;">Madeth May</span>
                        </span>
                    </div>
                    <nav class="mdl-navigation" >
                        <a class="mdl-navigation__link" href="" style="color: white">Tableau de bord</a>
                        <a class="mdl-navigation__link" href="" style="color: white">Time Machine</a>
                        <a class="mdl-navigation__link" href="" style="color: white">Préférences</a>
                        <a style="bottom: 0;color: white; " class="mdl-navigation__link" href="index.php" style="color: white">Se déconnecter</a>
                    </nav>
                </div>
            </div>

            <!MAIN PART-------------------------------------------------------->
            <main class="mdl-layout__content background_content" >
                <!CONTENT PANEL------------------------------------------------>
                <div id="page_content" class="page-content" >

                    <button id="show-dialog" class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect fab mdl-button--colored dialog-button">
                        <i class="material-icons-fab">add</i>
                    </button>
                </div>
                <!RIGHT MENU--------------------------------------------------->
                <div id="right_panel" class="rightSide">
                    <div id="demo-menu-lower-right"
                         class="layout_btn_right_bar mdl-js-button" >

                        <img id="demo-menu-lower-right" class="img_btn_right_bar mdl-button mdl-js-button mdl-button--icon"  src="images/icon_add.png"/>
                    </div>


                    <ul class="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect"
                        for="demo-menu-lower-right">
                        <li id="panel" class="mdl-menu__item">Add panel</li>
                        <li disabled class="mdl-menu__item">Add indicator</li>
                        <li disabled class="mdl-menu__item">Add chart</li>
                    </ul>

                </div>
            </main>
        </div>
    </body>
</html>



<!--Dialog to add graph-->
<dialog id="my_dialog" class="mdl-dialog" style="width: 50%">
    <h4 class="mdl-dialog__title">Paramètres du graphique</h4>
    <div class="mdl-dialog__content">
        <table id='tab_indicators'>  
<!--            <tr>
                <td>
                    <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="tr_nb_messages_read"> 
                        <input id="tr_nb_messages_read" type="checkbox" class="mdl-checkbox__input">
                        <span class="mdl-checkbox__label">Nombre de messages lus</span>
                    </label>
                </td>
            </tr>
            <tr>
                <td>
                    <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="tr_nb_messages_send"> <input id="tr_nb_messages_send" type="checkbox" class="mdl-checkbox__input"><span class="mdl-checkbox__label">Nombre de messages envoyés</span>
                    </label>
                </td>
            </tr>
            <tr>
                <td>
                    <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="tr_nb_files_upload"> <input id="tr_nb_files_upload" type="checkbox" class="mdl-checkbox__input"><span class="mdl-checkbox__label">Nombre de fichier envoyés</span>
                    </label>
                </td>
            <tr>
            <tr>
                <td>
                    <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="tr_nb_files_download"> <input id="tr_nb_files_download" type="checkbox" class="mdl-checkbox__input"><span class="mdl-checkbox__label">Nombre de fichier téléchargés</span>
                    </label>
                </td>
            </tr>
            <tr>
                <td><label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="tr_nb_connection_users"> <input id="tr_nb_connection_users" type="checkbox" class="mdl-checkbox__input"><span class="mdl-checkbox__label">Nombre de connexion de l'utilisateur</span>
                    </label>
                </td>
                <td> 
                    <select name="nb_connection_users" style=width:100px>
                        <?php
//                        require_once 'inc/accessBd.inc';
//                        list_user();
                        ?>
                    </select> 
                </td>
            </tr>
            <tr>
                <td><label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="tr_nb_messages_sent_users"> <input id="tr_nb_messages_sent_users" type="checkbox" class="mdl-checkbox__input"><span class="mdl-checkbox__label">Nombre de message envoyés par l'utilisateur</span>
                    </label></td>
                <td> 
                    <select name="nb_messages_sent_users" style=width:100px>
                        <?php
//                        require_once 'inc/accessBd.inc';
//                        list_user();
                        ?>
                    </select> 
                </td>

            </tr>
            <tr>
                <td><label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="tr_nb_messages_read_users"> <input id="tr_nb_messages_read_users" type="checkbox" class="mdl-checkbox__input"><span class="mdl-checkbox__label">Nombre de message lus par l'utilisateur</span>
                    </label></td>
                <td> 
                    <select name="nb_messages_read_users" style=width:100px>
                        <?php
//                        require_once 'inc/accessBd.inc';
//                        list_user();
                        ?>
                    </select> 
                </td>
            </tr>-->
        </table>
        <button class="mdl-button mdl-js-button mdl-button--raised" style="margin: 10px;" id="MyButton">
            Générer le graphique avec les paramètres
        </button>


        <h4>Graphiques prédéfinis</h4>
        <button class="mdl-button mdl-js-button mdl-button--raised" style="margin: 10px;" id="MyButtongraphique_comparaison_nb_co">
            Comparaison nombre de connexion
        </button>
        <button class="mdl-button mdl-js-button mdl-button--raised" style="margin: 10px;" id="MyButtongraphique_comparaison_note">
            Comparaison des notes
        </button>



    </div>

    <div class="mdl-dialog__actions">
        <button type="button" class="mdl-button close">Fermer</button>
    </div>
</dialog>


<script src='https://cdnjs.cloudflare.com/ajax/libs/dialog-polyfill/0.4.2/dialog-polyfill.min.js'></script>
<script src='https://storage.googleapis.com/code.getmdl.io/1.0.6/material.min.js'></script>
<script src="js/add_chart.js"></script>
<script src="js/right_panel.js"></script>
