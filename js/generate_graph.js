/*******************************************************************************
 * ATTRIBUTES
 ******************************************************************************/
var type_element;
var count = 0;
var myPointFormat;
var array_id_indicators_element = new Array();
var id_element_exemple = -500;



/*******************************************************************************
 * GET ELEMENT SELECTED IN DIALOG
 ******************************************************************************/
function get_indicators_selected() {
    id_element = get_id_element_js();
    name_indicators.length = 0;
    forum_indicators.length = 0;
    array_id_indicators_element.length = 0;
    users_selected.length = 0;
    forum_selected.length = 0;

    switch (type_element) {
        case "TAB_POLAR":
            add_section(id_element, panel_select);
            state_save = true;
            //GET SELECT_INDICATORS
            for (var cpt = 0; cpt < indicators.length; cpt++) {

                if (indicators[cpt][2] != "") {


                    if (document.getElementById(indicators[cpt][1]).checked) {

                        var array_compatible_indicators = document.getElementsByName(indicators[cpt][1]);

                        if (array_compatible_indicators.length != 0) {
                            var forum_selected_tmp = new Array();
                            var users_selected_tmp = new Array();

                            for (var cpt_array_compatible_indicators = 0; cpt_array_compatible_indicators < array_compatible_indicators.length; cpt_array_compatible_indicators++) {
                                switch (array_compatible_indicators[cpt_array_compatible_indicators].id) {
                                    case "8"://users
                                        var array_many_indicators = new Array();
                                        array_many_indicators.push(indicators[cpt][0]);
                                        array_many_indicators.push(8);
                                        array_many_indicators.push(get_id_user(array_compatible_indicators[cpt_array_compatible_indicators].value));
                                        array_id_indicators_element.push(array_many_indicators);
                                        users_selected_tmp.push(array_compatible_indicators[cpt_array_compatible_indicators].value);
                                        forum_selected_tmp.push('null');

                                        break;
                                    case "13"://forums
                                        var array_many_indicators = new Array();
                                        array_many_indicators.push(indicators[cpt][0]);
                                        array_many_indicators.push(13);
                                        array_many_indicators.push(array_compatible_indicators[cpt_array_compatible_indicators].value);
                                        array_id_indicators_element.push(array_many_indicators);
                                        forum_selected_tmp.push(array_compatible_indicators[cpt_array_compatible_indicators].value);
                                        users_selected_tmp.push('null');
                                        break;
                                    default:
                                        break;
                                }
                            }

                            name_indicators.push(indicators[cpt][1]);//get name of indicator

                            forum_selected.push(forum_selected_tmp);
                            users_selected.push(users_selected_tmp);

                        } else {
                            var forum_selected_tmp = new Array();
                            var users_selected_tmp = new Array();

                            forum_selected_tmp.push('null');
                            users_selected_tmp.push('null');

                            array_id_indicators_element.push(indicators[cpt][0]);
                            name_indicators.push(indicators[cpt][1]);//get name of indicator


                            forum_selected.push(forum_selected_tmp);
                            users_selected.push(users_selected_tmp);
                        }
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
                if (indicators[cpt][2] != "") {
                    if (document.getElementById(indicators[cpt][1]).checked) {

                        var array_compatible_indicators = document.getElementsByName(indicators[cpt][1]);

                        if (array_compatible_indicators.length != 0) {
                            var forum_selected_tmp = new Array();
                            var users_selected_tmp = new Array();

                            for (var cpt_array_compatible_indicators = 0; cpt_array_compatible_indicators < array_compatible_indicators.length; cpt_array_compatible_indicators++) {
                                switch (array_compatible_indicators[cpt_array_compatible_indicators].id) {
                                    case "8"://users
                                        var array_many_indicators = new Array();
                                        array_many_indicators.push(indicators[cpt][0]);
                                        array_many_indicators.push(8);
                                        array_many_indicators.push(get_id_user(array_compatible_indicators[cpt_array_compatible_indicators].value));
                                        array_id_indicators_element.push(array_many_indicators);
                                        users_selected_tmp.push(array_compatible_indicators[cpt_array_compatible_indicators].value);
                                        forum_selected_tmp.push('null');

                                        break;
                                    case "13"://forums
                                        var array_many_indicators = new Array();
                                        array_many_indicators.push(indicators[cpt][0]);
                                        array_many_indicators.push(13);
                                        array_many_indicators.push(array_compatible_indicators[cpt_array_compatible_indicators].value);
                                        array_id_indicators_element.push(array_many_indicators);
                                        forum_selected_tmp.push(array_compatible_indicators[cpt_array_compatible_indicators].value);
                                        users_selected_tmp.push('null');
                                        break;
                                    default:
                                        break;
                                }
                            }

                            name_indicators.push(indicators[cpt][1]);//get name of indicator

                            forum_selected.push(forum_selected_tmp);
                            users_selected.push(users_selected_tmp);

                        } else {
                            var forum_selected_tmp = new Array();
                            var users_selected_tmp = new Array();

                            forum_selected_tmp.push('null');
                            users_selected_tmp.push('null');

                            array_id_indicators_element.push(indicators[cpt][0]);
                            name_indicators.push(indicators[cpt][1]);//get name of indicator


                            forum_selected.push(forum_selected_tmp);
                            users_selected.push(users_selected_tmp);
                        }
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




                switch (name_indicators[cpt_name_indicators]) {
                    case 'nb_messages_read':
                        data_print.push(get_nb_messages_read());
                        add_indicator(indicators[cpt_indicators][2]);
                        break;
                    case 'nb_messages_sent':
                        data_print.push(get_nb_messages_sent());
                        add_indicator(indicators[cpt_indicators][2]);
                        break;
                    case 'nb_files_upload':
                        data_print.push(get_nb_files_upload());
                        add_indicator(indicators[cpt_indicators][2]);
                        break;
                    case 'nb_files_download':
                        data_print.push(get_nb_files_download());
                        add_indicator(indicators[cpt_indicators][2]);
                        break;
                    case 'nb_connection_user':

                        data_print.push(get_nb_connection_user_js(users_selected[cpt_name_indicators][0]));
                        add_indicator(indicators[cpt_indicators][2]);

                        break;
                    case 'nb_messages_sent_user':

                        data_print.push(get_nb_messages_sent_user_js(users_selected[cpt_name_indicators][0]));
                        add_indicator(indicators[cpt_indicators][2]);

                        break;
                    case 'nb_messages_read_user':

                        data_print.push(get_nb_messages_read_user_js(users_selected[cpt_name_indicators][0]));
                        add_indicator(indicators[cpt_indicators][2]);

                        break;
                    case 'nb_files_download_users':

                        data_print.push(get_nb_files_download_users_js(users_selected[cpt_name_indicators][0]));
                        add_indicator(indicators[cpt_indicators][2]);

                        break;
                    case 'nb_files_upload_users':

                        data_print.push(get_nb_files_upload_users_js(users_selected[cpt_name_indicators][0]));
                        add_indicator(indicators[cpt_indicators][2]);

                        break;
                    case 'nb_display_forum':

                        data_print.push(get_nb_display_forum_js(forum_selected[cpt_name_indicators][0]));
                        add_indicator(indicators[cpt_indicators][2]);


                        break;
                    case 'nb_display_forum_users':
                        add_indicator(indicators[cpt_name_indicators][2]);

//                        for (cpt_forum_selected = 0; cpt_forum_selected < forum_selected.length; cpt_forum_selected++) {
                        data_print.push(get_nb_display_forum_users_js(forum_selected[cpt_name_indicators][1], users_selected[cpt_name_indicators][0]));
//                        }

                        break;
                    default:

                        break;
                }
            }
        }
    }
    if (state_save == true) {
        id_indicators = get_id_indicators_js();
        save_element(panel_select, type_element, array_id_indicators_element);
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

    jQuery("#card_add" + panel_select).detach().appendTo('#panel' + panel_select);




}
/*******************************************************************************
 * PRINT CHART FUNCTIONS
 ******************************************************************************/
function print_polar() {
    Highcharts.setOptions(Highcharts.theme);

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
    Highcharts.setOptions(Highcharts.theme);
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

    add_section(id_element, 0);
    var myChart = Highcharts.chart('container' + id_element, {
        chart: {
            type: 'scatter',
            zoomType: 'xy'
        },
        title: {
            text: 'TimeMachine'
        },
        subtitle: {
            text: 'Source: Heinz  2003'
        },
        xAxis: {
            title: {
                enabled: true,
                text: 'Height (cm)'
            },
            startOnTick: true,
            endOnTick: true,
            showLastLabel: true
        },
        yAxis: {
            title: {
                text: 'Weight (kg)'
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
                    pointFormat: '{point.x} cm, {point.y} kg'
                }
            }
        },
        series: [{
                name: 'USER1',
                color: 'rgba(223, 83, 83, .5)',
                data: [[161.2, 51.6], [167.5, 59.0], [159.5, 49.2], [157.0, 63.0], [155.8, 53.6],
                    [170.0, 59.0], [159.1, 47.6], [166.0, 69.8], [176.2, 66.8], [160.2, 75.2],
                    [172.5, 55.2], [170.9, 54.2], [172.9, 62.5], [153.4, 42.0], [160.0, 50.0],
                    [147.2, 49.8], [168.2, 49.2], [175.0, 73.2], [157.0, 47.8], [167.6, 68.8],
                    [159.5, 50.6], [175.0, 82.5], [166.8, 57.2], [176.5, 87.8], [170.2, 72.8],
                    [174.0, 54.5], [173.0, 59.8], [179.9, 67.3], [170.5, 67.8], [160.0, 47.0],
                    [154.4, 46.2], [162.0, 55.0], [176.5, 83.0], [160.0, 54.4], [152.0, 45.8],
                    [162.1, 53.6], [170.0, 73.2], [160.2, 52.1], [161.3, 67.9], [166.4, 56.6],
                    [168.9, 62.3], [163.8, 58.5], [167.6, 54.5], [160.0, 50.2], [161.3, 60.3],
                    [167.6, 64.5], [167.6, 72.3], [167.6, 61.4], [154.9, 58.2], [162.6, 81.8],
                    [175.3, 63.6], [171.4, 53.4], [157.5, 54.5], [165.1, 53.6], [160.0, 60.0],
                    [174.0, 73.6], [162.6, 61.4], [174.0, 55.5], [162.6, 63.6], [161.3, 60.9],
                    [156.2, 60.0], [149.9, 46.8], [169.5, 57.3], [160.0, 64.1], [175.3, 63.6],
                    [169.5, 67.3], [160.0, 75.5], [172.7, 68.2], [162.6, 61.4], [157.5, 76.8],
                    [176.5, 71.8], [164.4, 55.5], [160.7, 48.6], [174.0, 66.4], [163.8, 67.3]]

            }, {
                name: 'USER2',
                color: 'rgba(119, 152, 191, .5)',
                data: [[174.0, 65.6], [175.3, 71.8], [193.5, 80.7], [186.5, 72.6], [187.2, 78.8],
                    [181.5, 74.8], [184.0, 86.4], [184.5, 78.4], [175.0, 62.0], [184.0, 81.6],
                    [180.0, 76.6], [177.8, 83.6], [192.0, 90.0], [176.0, 74.6], [174.0, 71.0],
                    [184.0, 79.6], [192.7, 93.8], [171.5, 70.0], [173.0, 72.4], [176.0, 85.9],
                    [176.0, 78.8], [180.5, 77.8], [172.7, 66.2], [176.0, 86.4], [173.5, 81.8],
                    [178.0, 89.6], [180.3, 82.8], [180.3, 76.4], [164.5, 63.2], [173.0, 60.9],
                    [183.5, 74.8], [175.5, 70.0], [188.0, 72.4], [189.2, 84.1], [172.8, 69.1],
                    [170.0, 59.5], [182.0, 67.2], [170.0, 61.3], [177.8, 68.6], [184.2, 80.1],
                    [186.7, 87.8], [171.4, 84.7], [172.7, 73.4], [175.3, 72.1], [180.3, 82.6],
                    [182.9, 88.7], [188.0, 84.1], [177.2, 94.1], [172.1, 74.9], [167.0, 59.1],
                    [169.5, 75.6], [174.0, 86.2], [172.7, 75.3], [182.2, 87.1], [164.1, 55.2],
                    [163.0, 57.0], [171.5, 61.4], [184.2, 76.8], [174.0, 86.8], [174.0, 72.2],
                    [177.0, 71.6], [186.0, 84.8], [167.0, 68.2], [171.8, 66.1], [182.0, 72.0],
                    [167.0, 64.6], [177.8, 74.8], [164.5, 70.0], [192.0, 101.6], [175.5, 63.2],
                    [171.2, 79.1], [181.6, 78.9], [167.4, 67.7], [181.1, 66.0], [177.0, 68.2],
                    [170.2, 62.3], [177.8, 82.7], [179.1, 79.1], [190.5, 98.2], [177.8, 84.1],
                    [180.3, 83.2], [180.3, 83.2]]
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
    jQuery("#card_add" + panel_select).detach().appendTo('#panel' + panel_select);
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
    jQuery("#card_add" + panel_select).detach().appendTo('#panel' + panel_select);
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