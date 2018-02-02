var type_element;
var count = 0;
var myPointFormat;

var array_id_indicators_element = new Array();

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

function select_element(p_type) {
    var element = document.getElementById('tab_indicators');
    element.innerHTML = '';
    type_element = p_type;

    switch (p_type) {
        case "TAB_POLAR":
            load_indicators();

            break;
        case "TAB_SPIDER":
            load_indicators();

            break;
        case "TAB_LINE":

            break;
        case "TAB_BAR":


            break;
        case "TAB_BIG_NUMBER":

            load_indicators_radio_button();
            break;

        default:

            break;
    }

}

function generate_chart() {

    id_element = get_id_element_js();
    name_indicators.length = 0;
    array_id_indicators_element.length = 0;
    users_selected.length = 0;

    switch (type_element) {
        case "TAB_POLAR":
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
//                        array_id_indicators_element.push((indicators[cpt][0]));
                        name_indicators.push(indicators[cpt][1]);//get name of indicator
                    } else {
                        users_selected.push('null');
                        array_id_indicators_element.push(indicators[cpt][0]);
                        name_indicators.push(indicators[cpt][1]);//get name of indicator
                    }
                }
            }
            pre_print_graph();
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
//                        array_id_indicators_element.push((indicators[cpt][0]));
                        name_indicators.push(indicators[cpt][1]);//get name of indicator
                    } else {
                        users_selected.push('null');
                        array_id_indicators_element.push(indicators[cpt][0]);
                        name_indicators.push(indicators[cpt][1]);//get name of indicator
                    }
                }
            }
            pre_print_graph();
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
                    users_selected.push('nb_messages_read');

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


function delete_filter(number) {
    document.getElementById('filter' + number).remove();
}

function delete_graph(number) {
    document.getElementById('card' + number).remove();
    delete_graph_js(number, panel_select);
    document.getElementById(name).remove();
}

function add_indicator(name_indicator) {
    var close = document.getElementById('close' + id_element);
    var indicator_span = document.createElement("span");
    indicator_span.setAttribute("class", 'mdl-chip mdl-chip--deletable');
    indicator_span.setAttribute("style", 'margin : 5px');
    var indicator_in_span = document.createElement("span");
    indicator_in_span.setAttribute("class", 'mdl-chip__text');
    indicator_in_span.textContent = name_indicator;
//    var indicator_in_span_button = document.createElement("button");
//    indicator_in_span_button.setAttribute("class", 'mdl-chip__action');
//    indicator_in_span_button.setAttribute("type", 'button');
//    var indicator_in_span_button_i = document.createElement("i");
//    indicator_in_span_button_i.textContent = "cancel";
//    indicator_in_span_button_i.setAttribute("class", 'material-icons');
//
//    indicator_in_span_button.appendChild(indicator_in_span_button_i);
    indicator_span.appendChild(indicator_in_span);
//    indicator_span.appendChild(indicator_in_span_button);

    close.appendChild(indicator_span);
}

function pre_print_graph() {


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




}

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