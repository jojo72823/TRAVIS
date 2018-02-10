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

        <title>TRAVIS - TimeMachine</title>

        <link rel='stylesheet prefetch' href='https://fonts.googleapis.com/icon?family=Material+Icons'>
        <link rel='stylesheet prefetch' href='https://cdnjs.cloudflare.com/ajax/libs/dialog-polyfill/0.4.2/dialog-polyfill.min.css'>
        <link rel="stylesheet prefetch" href="https://netdna.bootstrapcdn.com/bootstrap/3.0.2/css/bootstrap.css">
        <link rel='stylesheet prefetch' href='css/timeMachine.css'>

        <link href="css/animate.css" rel="stylesheet"> 
        <!--<link rel="stylesheet" href="css/style.css">-->
        <link rel="stylesheet" href="css/custom_material.min.css" />

        <link rel="stylesheet" href="css/timeMachine.css">

        <link rel="stylesheet" href="css/main.css">

        <script defer src="https://code.getmdl.io/1.3.0/material.min.js"></script>

        
        <script src="https://code.highcharts.com/highcharts.src.js"></script>
        <script src="js/generate_graph.js"></script>
        <script src="js/generate_timeMachine.js"></script>
        <script src="js/load_interface.js"></script>
        <script src="js/save_interface.js"></script>
        <script src="js/data_bridge.js"></script>

        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
        <script type='text/javascript' src='https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js'></script>
        <script src="https://code.highcharts.com/highcharts.js"></script>
        <script src="https://code.highcharts.com/highcharts-more.js"></script>
        <script src="https://code.highcharts.com/modules/exporting.js"></script>

        <!-- Include Required Prerequisites for DatePicker-->
        <script type="text/javascript" src="//cdn.jsdelivr.net/jquery/1/jquery.min.js"></script>
        <script type="text/javascript" src="//cdn.jsdelivr.net/momentjs/latest/moment.min.js"></script>
        <link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/bootstrap/3/css/bootstrap.css" />
        
        <!-- Include Date Range Picker -->
        <script type="text/javascript" src="//cdn.jsdelivr.net/bootstrap.daterangepicker/2/daterangepicker.js"></script>
        <link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/bootstrap.daterangepicker/2/daterangepicker.css" />

    </head>
    <body style="background-color: #d7d7d7">
        <!--<div class="preloader">
            <div class="preloder-wrap">
                <div class="preloder-inner"> 
                    <div class="loading">
                    </div> 
                </div>
            </div>
        </div>-->
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
                        <a class="mdl-navigation__link" href="dashboard.php" style="color: white">Dashboard</a>
                        <a class="mdl-navigation__link" href="" style="color: white">Time Machine</a>
                        <a class="mdl-navigation__link" href="" style="color: white">Settings</a>
                        <a style="bottom: 0;color: white; " class="mdl-navigation__link" href="index.php" style="color: white">Sign out</a>
                    </nav>
                </div>
            </div>


            <!MAIN PART-------------------------------------------------------->
            <main class="mdl-layout__content background_content" >
                <button class="mdl-button mdl-js-button mdl-button--raised" style="margin: 10px;" id="plopButton" onclick="loadTimeMachine();">
                    Generate TimeMachine
                </button>
                <input id "daterange" type="text" name="daterange" value="12/02/2009 - 28/02/2009" />

                <script type="text/javascript">
                    $(function() {
                        $('input[name="daterange"]').daterangepicker(
                            {
                                locale: {
                                format: 'YYYY-MM-DD'
                                },
                                minDate: '2009-02-12',
                                maxDate: '2009-05-11'
                            }, 
                        function(start, end, label) {
                            //alert("A new date range was chosen: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
                            $.getScript('js/generate_timeMachine.js', function () {          
                                get_timeMachine_data(start.format('YYYY-MM-DD'), end.format('YYYY-MM-DD'));
                            });
                        });
                        /*$('#daterange').on('apply.daterangepicker', function(ev, picker) {
                        console.log(picker.startDate.format('YYYY-MM-DD'));
                        console.log(picker.endDate.format('YYYY-MM-DD'));
                        alert("start : " + picker.startDate.format('YYYY-MM-DD') + " end : " + picker.endDate.format('YYYY-MM-DD'));
                        get_timeMachine_data(picker.startDate.format('YYYY-MM-DD'), picker.endDate.format('YYYY-MM-DD'));
                        });*/
                    });
                </script>
                <!--<button class="mdl-button mdl-js-button mdl-button--raised" style="margin: 10px;" id="genTimeMachine" onclick="get_timeMachine_indicators();">
                    Generate clever TimeMachine
                </button>-->
                <!CONTENT PANEL------------------------------------------------>
                <div id="page_content" class="page-content" >
                
                </div>
                <!RIGHT MENU--------------------------------------------------->
                <div id="right_panel" class="rightSide">
                    <div id="demo-menu-lower-right"
                         class="layout_btn_right_bar mdl-js-button" >

                        <img id="demo-menu-lower-right" class="img_btn_right_bar mdl-button mdl-js-button mdl-button--icon"  src="images/icon_add.png"/>
                    </div>

                    <ul class="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect"
                        for="demo-menu-lower-right">
                        <li id="add_panel" data-toggle="modal" data-target="#modal_add_panel" class="mdl-menu__item">Add panel</li>


                    </ul>

                </div>
            </main>
        </div>
    </body>
</html>


<!-- Modal add_element -->
<div class="modal fade" id="modal_add_element" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Chart generator</h5>
                <!--                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>-->
            </div>
            <div class="modal-body">
                <table>

                    <tr>
                        <td>
                            <table id='tab_graph'>  
                            </table>
                        </td>
                        <td>
                            <table id='tab_indicators'>  
                            </table>
                        </td>
                    </tr>
                </table>
                <button class="mdl-button mdl-js-button mdl-button--raised" style="margin: 10px;" id="MyButton" onclick="get_indicators_selected();" data-dismiss="modal">
                    Generate graph
                </button>

                <h4>Predefined chart</h4>
                <button class="mdl-button mdl-js-button mdl-button--raised" style="margin: 10px;" id="MyButtongraphique_comparaison_nb_co" data-dismiss="modal" onclick="graphique_comparaison_nb_co();">
                    Exemple 1
                </button>
                <button class="mdl-button mdl-js-button mdl-button--raised" style="margin: 10px;" id="MyButtongraphique_comparaison_note" data-dismiss="modal" onclick="graphique_comparaison_note();">
                    Exemple 2 
                </button>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>

<!-- Modal add_panel -->
<div class="modal fade" id="modal_add_panel" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Add panel </h5>
            </div>
            <div class="modal-body">
                <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input class="mdl-textfield__input" type="text" id="name_panel">
                    <label class="mdl-textfield__label" for="sample3">Name</label>
                </div>
                <input id="color_panel" type="color" value="#ff0000">

                <button class="mdl-button mdl-js-button mdl-button--raised" data-dismiss="modal" onclick="pre_add_panel();" style="margin: 10px;" id="MyButton">
                    Add panel
                </button>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>

<script src="js/right_panel.js"></script>
<!--<script type="text/javascript" src="js/main.js"></script> -->
