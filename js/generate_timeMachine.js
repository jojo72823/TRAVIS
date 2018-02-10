/*******************************************************************************
 * ATTRIBUTES
 ******************************************************************************/
var type_element;
var count = 0;
var myPointFormat;
var array_id_indicators_element = new Array();
var id_element_exemple = -500;

var array_data = new Array();

/*******************************************************************************
 * GET ELEMENT SELECTED IN DIALOG
 ******************************************************************************/
function get_timeMachine_indicators() {
    id_element = 0; //E. so it'll be placed at first place
    name_indicators.length = 0;
    forum_indicators.length = 0;
    array_id_indicators_element.length = 0;
    users_selected.length = 0;
    forum_selected.length = 0;

    
    //********************************SIMPLE COPYPASTE TO BE DELETED********************************************* */
    switch (type_element) {
        case "TAB_POLAR":
            add_section(id_element, 0);

            state_save = true;
            //GET SELECT_INDICATORS
            for (var cpt = 0; cpt < indicators.length; cpt++) {
                if (document.getElementById(indicators[cpt][1]).checked) {
                    if (bool_compatible_indicators_js(indicators[cpt][0], 8)) {
                        users_selected.push($('select[name=' + indicators[cpt][1] + ']').val());
                        var array_many_indicators = new Array();
                        array_many_indicators.push(indicators[cpt][0]);
                        array_many_indicators.push(8);
                        array_many_indicators.push(get_id_user($('select[name=' + indicators[cpt][1] + ']').val()));
                        array_id_indicators_element.push(array_many_indicators);
                        name_indicators.push(indicators[cpt][1]);//get name of indicator
                    } else {
                        if (bool_compatible_indicators_js(indicators[cpt][0], 13)) {
                            forum_selected.push($('select[name=' + indicators[cpt][1] + ']').val());
                            var array_many_indicators = new Array();
                            array_many_indicators.push(indicators[cpt][0]);
                            array_many_indicators.push(13);
                            array_many_indicators.push(get_id_user($('select[name=' + indicators[cpt][0] + ']').val()));
                            array_id_indicators_element.push(array_many_indicators);
                            forum_indicators.push(indicators[cpt][0]);
                        }
                        users_selected.push('null');
                        array_id_indicators_element.push(indicators[cpt][0]);
                        name_indicators.push(indicators[cpt][1]);//get name of indicator
                    }
                }
            }
            get_results_indicators_selected();
            break;
        case "TAB_SPIDER":
            add_section(id_element, panel_select);
            state_save = true;
            //GET SELECT_INDICATORS
            for (var cpt = 0; cpt < indicators.length; cpt++) {
                if (document.getElementById(indicators[cpt][1]).checked) {
                    if (bool_compatible_indicators_js(indicators[cpt][0], 8)) {
                        users_selected.push($('select[name=' + indicators[cpt][1] + ']').val());
                        var array_many_indicators = new Array();
                        array_many_indicators.push(indicators[cpt][0]);
                        array_many_indicators.push(8);
                        array_many_indicators.push(get_id_user($('select[name=' + indicators[cpt][1] + ']').val()));
                        array_id_indicators_element.push(array_many_indicators);
                        name_indicators.push(indicators[cpt][1]);//get name of indicator
                    } else {
                        users_selected.push('null');
                        array_id_indicators_element.push(indicators[cpt][0]);
                        name_indicators.push(indicators[cpt][1]);//get name of indicator
                    }
                }
            }
            get_results_indicators_selected();
            break;

        case "TAB_BIG_NUMBER":

            add_section_big_number();

            state_save = true;
            //GET SELECT_INDICATORS
            for (var cpt = 0; cpt < indicators.length; cpt++) {
                if (document.getElementById(indicators[cpt][1]).checked) {
//                    name_indicators.push(indicators[cpt][1]);//get name of indicator
//                    if (bool_compatible_indicators_js(indicators[cpt][0], 8)) {
//                        users_selected.push($('select[name=' + indicators[cpt][1] + ']').val());
//                    } else {
//                        users_selected.push('null');
//                    }
                    array_id_indicators_element.push(indicators[cpt][0]);
                    name_indicators.push(indicators[cpt][1]);

                }
            }
            var tmp_element = document.getElementById('container' + id_element);
            var value = document.createElement("div");
            value.setAttribute("id", "big_number" + id_element);
            value.setAttribute("class", "text_big_number");
            add_indicator("nb_messages_read");
            value.textContent = get_nb_messages_read();

            tmp_element.appendChild(value);


            break;
        case 3:
        default:

            break;
    }
}

function get_timeMachine_data(begin, end){
    //var start = $('.daterange').data('daterangepicker').getStartDate();
    //var end = document.getElementById("daterange").data('daterangepicker').getEndDate();
    alert("start : " + begin + " end : " + end);
    var begin_split = begin.split('-');
    var end_split = end.split('-');
    if(begin_split[0] == end_split[0]){
        alert("==, parse 1 : " + parseInt(begin_split[1]));
        for(var cpt_month = parseInt(begin_split[1]); cpt_month <= parseInt(end_split[1]); cpt_month ++){
            alert("for 1");
            for(var cpt_day = parseInt(begin_split[2]); cpt_day <= parseInt(end_split[2]); cpt_day ++){
                alert("for 2");
                //array_data.push("[" + get_nb_connection_date_users_js($("tdelille", begin_split[0]+"-"+cpt_month+"-"+cpt_day)+","+cpt_day+"/"+cpt_month));
                array_data.push(get_nb_connection_date_users_js("tdelille", begin_split[0]+"-"+cpt_month+"-"+cpt_day)+","+cpt_day+"/"+cpt_month);
                alert("pushed : " + "["+get_nb_connection_date_users_js("tdelille", begin_split[0]+"-"+cpt_month+"-"+cpt_day)+","+cpt_day+"/"+cpt_month);
            }
        }
    }
    //alert("year : " + begin_split[0] + " month : " + begin_split[1] + " day : " + begin_split[2]);
}

/*******************************************************************************
 * E. PRELOAD INTERFACE OF TIMEMACHINE PAGE
 ********************************************************************************/
function add_panel_timeMachine() {
//Adds a panel to hold the section, which will hold the timeAMchine element
    var page_content = document.getElementById('page_content');
    var id_panel = 0;

    var card = document.createElement("div");
    card.setAttribute("id", 'panel' + id_panel);
    card.setAttribute("class", 'mdl-grid background_content animated zoomIn');
    card.setAttribute("style", 'height: auto;width:98%');



    var in_content_card = document.createElement("div");
    //TODO change width to auto
    in_content_card.setAttribute("style", 'background-color : lightblue;height: auto;width: 1000px');
    in_content_card.setAttribute("class", 'mdl-shadow--4dp');


    var text_header_panel = document.createElement("div");
    text_header_panel.setAttribute("class", 'text_header_panel');
    //text_header_panel.textContent = "Panel : timeMachine" ;

    in_content_card.appendChild(text_header_panel);

    var close = document.createElement("div");
    close.setAttribute("id", 'close' + id_panel);
    close.setAttribute("style", 'height: 50px;margin-left:15px;margin-right:15px;margin-bottom:15px;');


    var input = document.createElement("input");
    input.setAttribute("id", 'delete_button');
    input.setAttribute("type", 'image');
    input.setAttribute("src", 'images/icon_close.png');
    input.setAttribute("style", 'width: 50px;float: right;padding:5px;z_index:999');
    input.setAttribute("onclick", 'delete_panel(\'' + id_panel + '\')');


    close.appendChild(input);
    var container = document.createElement("div");
    container.setAttribute("id", 'container' + id_panel);
    container.setAttribute("style", 'height=100%;width=100%;background-color : #3575bb');
    in_content_card.appendChild(close);
    in_content_card.appendChild(container);

    card.appendChild(in_content_card);

    page_content.appendChild(card);
    //alert("OK : add_panel");
    add_section_timeMachine(0, id_panel);
}

function add_section_timeMachine(id_element, panel_select) {
    //adds the section which will hold the timeMachine element
    var element = document.getElementById('container' + panel_select);

    var card = document.createElement("div");
    card.setAttribute("id", 'card' + id_element);
    card.setAttribute("class", 'col-lg-6  col-md-6 col-sm-12  col-xs-12 animated fadeInUp');
    card.setAttribute("style", 'background-color : #d7d7d7; height: auto;margin-bottom :10px');

    element.appendChild(card);

    var content_card = document.getElementById('card' + id_element);

    var in_content_card = document.createElement("div");
    in_content_card.setAttribute("style", 'background-color : #404041; height: auto;');
    in_content_card.setAttribute("class", 'mdl-shadow--4dp');

    var close = document.createElement("div");
    close.setAttribute("id", 'close' + id_element);
    var input = document.createElement("input");
    input.setAttribute("id", 'delete_button');
    input.setAttribute("type", 'image');
    input.setAttribute("src", 'images/icon_close.png');
    input.setAttribute("style", 'width: 42px;float: right;padding:5px');
    input.setAttribute("onclick", 'delete_graph(\'' + id_element + '\')');


    close.appendChild(input);
    var container = document.createElement("div");
    container.setAttribute("id", 'container' + id_element);
    container.setAttribute("style", 'height=500px;width=100%');
    in_content_card.appendChild(close);
    in_content_card.appendChild(container);
    content_card.appendChild(in_content_card);

//    jQuery("#car_add" + panel_select).detach().appendTo('#panel' + panel_select);


}


/*******************************************************************************
 * GET RESULT OF INDICATORS SELECTED
 ******************************************************************************/
function get_results_indicators_selected() {


    legende_print.length = [];
    data_print.length = [];
    count = 0;

    for (var cpt_indicators = 0; cpt_indicators < indicators.length; cpt_indicators++) {
        //call function of this indicator
        for (var cpt_name_indicators = 0; cpt_name_indicators < name_indicators.length; cpt_name_indicators++) {
            //call function of this indicator
            if (name_indicators[cpt_name_indicators] == indicators[cpt_indicators][1]) {

                legende_print.push(indicators[cpt_indicators][2]);


                add_indicator(indicators[cpt_name_indicators][2]);

                switch (name_indicators[cpt_name_indicators]) {
                    case 'nb_messages_read':
                        data_print.push(get_nb_messages_read());

                        break;
                    case 'nb_messages_sent':
                        data_print.push(get_nb_messages_sent());
                        break;
                    case 'nb_files_upload':
                        data_print.push(get_nb_files_upload());
                        break;
                    case 'nb_files_download':
                        data_print.push(get_nb_files_download());
                        break;
                    case 'nb_connection_user':
                        data_print.push(get_nb_connection_user_js(users_selected[cpt_name_indicators]));
                        break;
                    case 'nb_messages_sent_user':
                        data_print.push(get_nb_messages_sent_user_js(users_selected[cpt_name_indicators]));
                        break;
                    case 'nb_messages_read_user':
                        data_print.push(get_nb_messages_read_user_js(users_selected[cpt_name_indicators]));
                        break;
                    case 'nb_files_download_users':
                        data_print.push(get_nb_files_download_users_js(users_selected[cpt_name_indicators]));
                        break;
                    case 'nb_files_upload_users':
                        data_print.push(get_nb_files_upload_users_js(users_selected[cpt_name_indicators]));
                        break;
                    case 'nb_display_forum':
                        data_print.push(get_nb_display_forum_js(forum_selected[cpt_name_indicators]));
                        break;
                    case 'nb_display_forum_users':
                        data_print.push(get_nb_display_forum_users_js(forum_selected[cpt_name_indicators], users_selected[cpt_name_indicators]));
                        break;
                    default:

                        break;
                }
            }
        }
    }
    if (state_save == true) {
        id_indicators = get_id_indicators_js();
        //TODO SAVE ARRAY IN DATABASE
        save_element(panel_select, type_element, array_id_indicators_element);
        for (var cpt_users_selected = 0; cpt_users_selected < users_selected.length; cpt_users_selected++) {
            if (users_selected[cpt_users_selected] != 'null') {
                save_users_selected_js(users_selected[cpt_users_selected], cpt_users_selected);
            }
        }





    }

    switch (type_element) {
        case "TAB_POLAR":
            print_polar();
            break;
        case "TAB_SPIDER":
            print_spider();
            break;

        case "TAB_BIG_NUMBER":
            break;
        case 3:
        default:

            break;
    }
    
    jQuery("#card_add"+panel_select).detach().appendTo('#panel'+panel_select);




}
/*******************************************************************************
 * PRINT CHART FUNCTIONS
 ******************************************************************************/
function print_polar() {

    var myChart = Highcharts.chart('container' + id_element, {
        chart: {
            polar: true
        },
        title: {
            text: ''
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
                    if (count == legende_print.length) {
                        count = 0;
                    }
                    var value = legende_print[count];
                    count++;
                    return value;
//                    count++;
//                    return this.value+"|"+count;

                }
            }
        },
        yAxis: {
            min: 0

        },
        tooltip: {
            formatter: function () {
                var tmp_interval = (360 / legende_print.length);
                for (var cpt = 0; cpt < legende_print.length; cpt++) {
                    if (this.x == cpt * tmp_interval) {
                        return '' + legende_print[cpt] + '<br><div style="color:' + this.series.color + '">' + this.series.name + "</div>: <b>" + this.point.y;
                        return '<span style="color:{series.color}">{series.name}: <b>{point.y:,.0f}</b><br/>'
                    }
                }


            }
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

function print_spider() {
    var myChart = Highcharts.chart('container' + id_element, {
        chart: {
            polar: true,
            type: 'line'
        },
        title: {
            text: '',
            x: -80
        },
        pane: {
            size: '80%'
        },
        xAxis: {
            categories: legende_print,
            tickmarkPlacement: 'on',
            lineWidth: 0
        },
        yAxis: {
            gridLineInterpolation: 'polygon',
            lineWidth: 0,
            min: 0
        },
        tooltip: {
            shared: true,
            pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:,.0f}</b><br/>'
        },
        legend: {
            align: 'right',
            verticalAlign: 'top',
            y: 70,
            layout: 'vertical'
        },
        series: [{
                type: 'area',
                name: 'Results',
                data: data_print
            }]

    });
}

/*******************************************************************************
 * TIMEMACHINE
 ******************************************************************************/
function loadTimeMachine() {
    add_panel_timeMachine();
    var myChart = Highcharts.chart('container' + id_element, {
        chart: {
            type: 'scatter',
            zoomType: 'xy'
        },
        title: {
            text: 'TimeMachine'
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            title: {
                enabled: true,
                text: 'Date'
            },
            startOnTick: true,
            endOnTick: true,
            showLastLabel: true,
            type: 'datetime',
            dateTimeLabelFormats: {
                day: '%Y-%m-%e'
            }
        },
        yAxis: {
            title: {
                text: 'Number of connections'
            }
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'top',
            x: 100,
            y: 70,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
            borderWidth: 1
        },
        plotOptions: {
            scatter: {
                marker: {
                    radius: 5,
                    states: {
                        hover: {
                            enabled: true,
                            lineColor: 'rgb(100,100,100)'
                        }
                    }
                },
                states: {
                    hover: {
                        marker: {
                            enabled: false
                        }
                    }
                },
                tooltip: {
                    headerFormat: '<b>{series.name}</b><br>',
                    pointFormat: 'on {point.x}, {point.y} connections'
                }
            }
        },
        series: [{
            name: 'USER1',
            color: 'rgba(223, 83, 83, .5)',
            /*data: [[2009-02-01, 2],[2009-02-02, 5],[2009-02-03, 1],[2009-02-04, 8],[2009-02-05, 2],[2009-02-06, 0],
            [2009-02-07, 5],[2009-02-08, 9],[2009-02-09, 4],[2009-02-10, 6],[2009-02-11, 1],[2009-02-12, 3],[2009-02-13, 9],[2009-02-14, 4],
            [2009-02-01, 2],[2009-02-15, 1],[2009-02-16, 6],[2009-02-17, 7],[2009-02-18, 3],[2009-02-19, 4],[2009-02-20, 7],[2009-02-21, 6],
            [2009-02-22, 8],[2009-02-23, 1],[2009-02-24, 0],[2009-02-25, 8],[2009-02-26, 4],[2009-02-27, 10],[2009-02-28, 7]]
*/
            //data: [2,5,1,8,2,0,5,9,4,6,1,3,9,4,2,1,6,7,3,4,7,6,8,1,0,8,4,10,7]
            data: [2,5,1,8,2,0,5,9],
            pointStart: Date.UTC(2009, 1, 1),
            pointInterval: 24 * 3600 * 1000
        }, {
            name: 'USER2',
            color: 'rgba(119, 152, 191, .5)',
            /*data: [[2009-02-01, 1],[2009-02-02, 6],[2009-02-03, 4],[2009-02-04, 7],[2009-02-05, 3],[2009-02-06, 2],
            [2009-02-07, 0],[2009-02-08, 6],[2009-02-09, 2],[2009-02-10, 0],[2009-02-11, 5],[2009-02-12, 4],[2009-02-13, 6],[2009-02-14, 1],
            [2009-02-01, 4],[2009-02-15, 2],[2009-02-16, 6],[2009-02-17, 4],[2009-02-18, 1],[2009-02-19, 2],[2009-02-20, 5],[2009-02-21, 8],
            [2009-02-22, 5],[2009-02-23, 3],[2009-02-24, 4],[2009-02-25, 3],[2009-02-26, 0],[2009-02-27, 12],[2009-02-28, 5]]*/
            //data: [1,6,4,7,3,2,0,6,2,0,5,4,6,1,4,2,6,4,1,2,5,8,5,3,4,3,0,12,5]
            data: [1,6,4,7,3,2,0],
            pointStart: Date.UTC(2009, 1, 1),
            pointInterval: 24 * 3600 * 1000
        }]
    });
}
/*******************************************************************************
 * EXAMPLE CHART
 ******************************************************************************/
function graphique_comparaison_note() {
    id_element = id_element_exemple;
    id_element_exemple = id_element_exemple + 1;
    add_section(id_element, panel_select);
    var myChart = Highcharts.chart('container' + id_element, {
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
    id_element = id_element_exemple;
    id_element_exemple = id_element_exemple + 1;

    add_section(id_element, panel_select);
    var myChart = Highcharts.chart('container' + id_element, {
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


/*******************************************************************************
 * DELETE FONCTIONS
 ******************************************************************************/
function delete_filter(number) {
    document.getElementById('filter' + number).remove();
}

function delete_graph(number) {
    document.getElementById('card' + number).remove();
    delete_graph_js(number, panel_select);
    document.getElementById(name).remove();
}

/*******************************************************************************
 * FONCTION NOT USED
 ******************************************************************************/
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