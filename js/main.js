var select_indicators = ["nb_messages_read", "nb_messages_sent", "nb_files_upload", "nb_files_download", "nb_connection_user", "nb_mess_sent_user", "nb_mess_read_user"];
var select_indicators_new = new Array();
var count = 0;
var data_print = new Array();
var legende_print = new Array();
var data = new Array();
var tab_graph = new Array();
var nb_messages_read;
var nb_messages_send;
var nb_files_upload;
var nb_files_download;
var nb_messages_sent_users;
var nb_connection_users;
var nb_messages_read_users;
var select_nb_connection_users;
var select_nb_messages_sent_users;
var select_nb_messages_read_users;
var id_select_nb_connection_users;
var id_select_nb_messages_sent_users;
var id_select_nb_messages_read_users;
var data_indicator = new Array();
var nb_graph = 0;
var nb_filter = 0;


function readSearchInput(el, e) {
    console.log(e)
    if (e.keyCode == 13) {//touche entrée
        var value = document.getElementById('search_input').value;
        nb_filter++;
        document.getElementById('filter_bar').innerHTML +=
                '<div id=filter' + nb_filter + '>\n\
                    <span class=\"mdl-chip mdl-chip--deletable\">\n\
                        <span class=\"mdl-chip__text\">' + value + '</span>\n\
                        <button onclick="delete_filter(\'' + nb_filter + '\') "type=\"button\" class=\"mdl-chip__action\">\n\
                            <i class=\"material-icons\">cancel</i>\n\
                        </button>\n\
                    </span>\n\
                </div>'
    }
    return false;
}


function delete_filter(number) {
    document.getElementById('filter' + number).remove();
}


function delete_graph(number) {

    document.getElementById('card' + number).remove();
    //document.getElementById(name).remove();
}


function add_indicator(name_indicator) {
    var close = document.getElementById('close' + nb_graph);



    var indicator_span = document.createElement("span");
    indicator_span.setAttribute("class", 'mdl-chip mdl-chip--deletable');
     indicator_span.setAttribute("style", 'margin : 5px');
    var indicator_in_span = document.createElement("span");
    indicator_in_span.setAttribute("class", 'mdl-chip__text');
    indicator_in_span.textContent = name_indicator;
    var indicator_in_span_button = document.createElement("button");
    indicator_in_span_button.setAttribute("class", 'mdl-chip__action');
    indicator_in_span_button.setAttribute("type", 'button');
    var indicator_in_span_button_i = document.createElement("i");
    indicator_in_span_button_i.textContent = "cancel";
    indicator_in_span_button_i.setAttribute("class", 'material-icons');

    indicator_in_span_button.appendChild(indicator_in_span_button_i);
    indicator_span.appendChild(indicator_in_span);
    indicator_span.appendChild(indicator_in_span_button);

    close.appendChild(indicator_span);
}

function add_section() {

    nb_graph = nb_graph + 1;
    var element = document.getElementById('panel'+panel_select);

    var card = document.createElement("div");
    card.setAttribute("id", 'card' + nb_graph);
    card.setAttribute("class", 'col-lg-6  col-md-6 col-sm-12  col-xs-12');
    card.setAttribute("style", 'background-color : #123456; height: auto;margin-bottom :10px');

    element.appendChild(card);
    
    var content_card = document.getElementById('card' + nb_graph);
    
    var in_content_card = document.createElement("div");
    in_content_card.setAttribute("style", 'background-color : #404041; height: auto;');
    in_content_card.setAttribute("class", 'mdl-shadow--4dp');

    var close = document.createElement("div");
    close.setAttribute("id", 'close' + nb_graph);
    var input = document.createElement("input");
    input.setAttribute("id", 'delete_button');
    input.setAttribute("type", 'image');
    input.setAttribute("src", 'images/icon_close.png');
    input.setAttribute("style", 'width: 30px;float: right;padding:5px');
    input.setAttribute("onclick", 'delete_graph(\'' + nb_graph + '\')');


    close.appendChild(input);
    var container = document.createElement("div");
    container.setAttribute("id", 'container' + nb_graph);
    container.setAttribute("style", 'style="height=500px;width=100%"');
    in_content_card.appendChild(close);
    in_content_card.appendChild(container);
    content_card.appendChild(in_content_card);

}



function generate_graph() {
    add_section();
    //GET USERS_INDICATORS 
    select_nb_connection_users = $('select[name=nb_connection_users]').val();
    select_nb_messages_sent_users = $('select[name=nb_messages_sent_users]').val();
    select_nb_messages_read_users = $('select[name=nb_messages_read_users]').val();
    //GET SELECT_INDICATORS
    select_indicators_new.length = 0;
    var tr_nb_messages_read = document.getElementById('tr_nb_messages_read').checked;
    var tr_nb_messages_send = document.getElementById('tr_nb_messages_send').checked;
    var tr_nb_files_upload = document.getElementById('tr_nb_files_upload').checked;
    var tr_nb_files_download = document.getElementById('tr_nb_files_download').checked;
    var tr_nb_connection_users = document.getElementById('tr_nb_connection_users').checked;
    var tr_nb_messages_sent_users = document.getElementById('tr_nb_messages_sent_users').checked;
    var tr_nb_messages_read_users = document.getElementById('tr_nb_messages_read_users').checked;
    select_indicators_new.push(tr_nb_messages_read);
    select_indicators_new.push(tr_nb_messages_send);
    select_indicators_new.push(tr_nb_files_upload);
    select_indicators_new.push(tr_nb_files_download);
    select_indicators_new.push(tr_nb_connection_users);
    select_indicators_new.push(tr_nb_messages_sent_users);
    select_indicators_new.push(tr_nb_messages_read_users);
    moteur_calcul_indicateur();
}
function moteur_calcul_indicateur() {

    var dfrd1 = $.Deferred();
    setTimeout(function () {


        $.ajax({
            url: 'php/accessFonctions.php',
            data: {fonction: 'nb_messages_read'},
            type: 'POST',
            dataType: 'json',
            success: function (objetJson) {
                if (objetJson != null) {
                    nb_messages_read = objetJson;
                    //alert("ok nb_messages_read! " + objetJson);
                } else {
                    alert("erreur nb_messages_read! ");
                }
            },
            cache: false
        });
        $.ajax({
            url: 'php/accessFonctions.php',
            data: {fonction: 'nb_messages_sent'},
            type: 'POST',
            dataType: 'json',
            success: function (objetJson) {
                if (objetJson != null) {
                    //alert("ok nb_messages_sent! " + objetJson);
                    nb_messages_send = objetJson;
                } else {
                    alert("erreur nb_messages_sent! ");
                }
            },
            cache: false
        });
        $.ajax({
            url: 'php/accessFonctions.php',
            data: {fonction: 'nb_files_upload'},
            type: 'POST',
            dataType: 'json',
            success: function (objetJson) {
                if (objetJson != null) {
                    //alert("ok nb_files_upload! " + objetJson);
                    nb_files_upload = objetJson;
                } else {
                    alert("erreur nb_files_upload! ");
                }
            },
            cache: false
        });
        $.ajax({
            url: 'php/accessFonctions.php',
            data: {fonction: 'nb_files_download'},
            type: 'POST',
            dataType: 'json',
            success: function (objetJson) {
                if (objetJson != null) {
                    //alert("ok nb_files_download! " + objetJson);
                    nb_files_download = objetJson;
                } else {
                    alert("erreur nb_files_download! ");
                }
            },
            cache: false
        });
        //get indicator for user
        $.ajax({
            url: 'php/accessFonctions.php',
            data: {fonction: 'nb_connection_users', p_name_user: select_nb_connection_users},
            type: 'POST',
            dataType: 'json',
            success: function (objetJson) {
                if (objetJson != null) {
                    nb_connection_users = objetJson;
                } else {
                    alert("erreur nb_connection_users! ");
                }
            },
            cache: false
        });
        $.ajax({
            url: 'php/accessFonctions.php',
            data: {fonction: 'nb_messages_sent_users', p_name_user: select_nb_messages_sent_users},
            type: 'POST',
            dataType: 'json',
            success: function (objetJson) {
                if (objetJson != null) {
                    nb_messages_sent_users = objetJson;
                } else {
                    alert("erreur nb_messages_sent_users! ");
                }
            },
            cache: false

        });
        $.ajax({
            url: 'php/accessFonctions.php',
            data: {fonction: 'nb_messages_read_users', p_name_user: select_nb_messages_read_users},
            type: 'POST',
            dataType: 'json',
            success: function (objetJson) {
                if (objetJson != null) {
                    nb_messages_read_users = objetJson;
                } else {
                    alert("erreur nb_messages_read_users! ");
                }
            },
            cache: false
        });
        if (nb_messages_read == null ||
                nb_messages_send == null ||
                nb_files_upload == null ||
                nb_files_download == null ||
                nb_connection_users == null ||
                nb_messages_sent_users == null ||
                nb_messages_read_users == null) {
            moteur_calcul_indicateur();
        } else {
            dfrd1.resolve();
        }


    }, 100);
    return $.when(dfrd1).done(function () {

        pre_print_graph();
    }).promise();
}
function pre_print_graph() {

    legende_print.length = 0;
    data_print.length = 0;
    data_indicator.length = 0;
    count = 0;
    data_indicator.push(nb_messages_read);
    data_indicator.push(nb_messages_send);
    data_indicator.push(nb_files_upload);
    data_indicator.push(nb_files_download);
    data_indicator.push(nb_connection_users);
    data_indicator.push(nb_messages_sent_users);
    data_indicator.push(nb_messages_read_users);
    for (var cpt = 0; cpt < select_indicators.length; cpt++) {

        if (select_indicators_new[cpt]) {
            legende_print.push(select_indicators[cpt]);
            data_print.push(data_indicator[cpt]);
            add_indicator(select_indicators[cpt]);
        }
    }
    print_graph();
}

function print_graph() {
    var myChart = Highcharts.chart('container' + nb_graph, {
        chart: {
            polar: true
        },
        title: {
            text: 'TP CMC'
        },
        pane: {
            startAngle: 0,
            endAngle: 360
        },
        xAxis: {
            tickInterval: 360 / legende_print.length,
            min: 0,
            max: 360,
            labels: {
                formatter: function () {
                    var value = legende_print[count];
                    count++;
                    return value;
                }
            }
        },
        yAxis: {
            min: 0

        },
        plotOptions: {
            series: {
                pointStart: 0,
                pointInterval: 360 / legende_print.length
            },
            column: {
                pointPadding: 0,
                groupPadding: 0
            }
        },
        series: [{
                type: 'area',
                name: 'Results',
                data: data_print
            }]
    });
    myChart.setSize(null, 400, doAnimation = true);
}

function sleep(seconds) {
    var waitUntil = new Date().getTime() + seconds * 1000;
    while (new Date().getTime() < waitUntil)
        true;
}

function graphique_comparaison_note() {
    add_section();
    var myChart = Highcharts.chart('container' + nb_graph, {
        title: {
            text: 'Comparaison des notes'
        },
        xAxis: {
            categories: ['élève 1', 'élève 2', 'élève 3', 'élève 4', 'élève 5'],
        },
        labels: {
        },
        yAxis: {
            min: 0,
            max: 20,
            title: {
                text: '/20'
            }
        },
        series: [{
                name: 'Classe L2',
                type: 'column',
                colorByPoint: true,
                colors: [
                    '#66ffcc',
                    '#660033',
                    '#66ffcc',
                    '#66ffcc',
                    '#66ffcc'
                ],
                data: [18, 12, 5, 20, 13]
            }, {max: 20,
                type: 'spline',
                name: 'Min',
                data: [5, 5, 5, 5, 5],
                marker: {
                    lineWidth: 2,
                    lineColor: Highcharts.getOptions().colors[3],
                    fillColor: 'white'
                }
            }, {max: 20,
                type: 'spline',
                name: 'Max',
                data: [20, 20, 20, 20, 20],
                marker: {
                    lineWidth: 2,
                    lineColor: Highcharts.getOptions().colors[3],
                    fillColor: 'white'
                }
            }, {
                type: 'spline',
                name: 'Moyenne',
                data: [12, 12, 12, 12, 12],
                marker: {
                    lineWidth: 2,
                    lineColor: Highcharts.getOptions().colors[3],
                    fillColor: 'white'
                }
            }]
    });
    myChart.setSize(null, 400, doAnimation = true);
}

var options = {
    chart: {
        renderTo: 'container',
        type: 'bar'
    },
    series: [{
            name: 'Jane',
            data: [1, 0, 4]
        }]
};
function graphique_comparaison_nb_co() {


    add_section();
    var myChart = Highcharts.chart('container' + nb_graph, {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Nombre de connexion aux différents modules'
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: [
                'Module 1',
                'Module 2',
                'Module 3',
                'Module 4',
                'Module 5'
            ],
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Nombre de connexion'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
                name: 'Promo 2015',
                data: [48.9, 38.8, 39.3, 41.4, 47.0]

            }, {
                name: 'Promo 2016',
                data: [83.6, 78.8, 98.5, 93.4, 57.0]

            }, {
                name: 'Promo 2017',
                data: [49.9, 71.5, 106.4, 129.2, 144.0]


            }]
    });
    myChart.setSize(null, 400, doAnimation = true);
}