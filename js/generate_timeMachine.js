/*******************************************************************************
 * ATTRIBUTES
 ******************************************************************************/
var type_element;
var count = 0;
var myPointFormat;
var array_id_indicators_element = new Array();
var id_element_exemple = -500;
var year_begin;
var month_begin;
var day_begin;

var strUser; //selected user name
var array_data = new Array();
var array_data2 = new Array();


/*******************************************************************************
 * E. Init timeMachine : add select of compared user
 ******************************************************************************* */
function init_timeMachine() {
    users = get_list_users_js();
    var holder = document.getElementById("timeMachine_selectCompareUser");
    var select = document.createElement("select");
    select.setAttribute("name", "Select user2");
    select.setAttribute("id", "selectComparedUser");
    select.setAttribute("style", 'width:100px');
    for (cpt_users = 0; cpt_users < users.length; cpt_users++) {
        var option = document.createElement("option");
        option.setAttribute("id", users[cpt_users][0]);
        if (cpt_users == 0) {
            option.setAttribute("selected", 'selected');
        }
        option.textContent = users[cpt_users][1];
        select.appendChild(option);
    }
    holder.appendChild(select);
}


/**********************************************************************
 * E. adds data to the TIMEMACHINE
 ***********************************************************************/
function get_timeMachine_data(begin, end) {
    //var start = $('.daterange').data('daterangepicker').getStartDate();
    //var end = document.getElementById("daterange").data('daterangepicker').getEndDate();
    //alert("start : " + begin + " end : " + end);
    var begin_split = begin.split('-');
    year_begin = begin_split[0];
    month_begin = begin_split[1];
    day_begin = begin_split[2];
    var end_split = end.split('-');
    var e = document.getElementById("selectComparedUser");
    strUser = e.options[e.selectedIndex].text;

    if (begin_split[0] == end_split[0]) {
        //array_data.push("[");
        //alert("==, parse 1 : " + parseInt(begin_split[1]));
        alert("select : " + strUser);
        /***********USER 1 Auto selected (TODO via login) ***************/
        //TODO : handle multiple users possibility here
        for (var cpt_month = parseInt(begin_split[1]); cpt_month <= parseInt(end_split[1]); cpt_month++) {
            for (var cpt_day = parseInt(begin_split[2]); cpt_day <= parseInt(end_split[2]); cpt_day++) {
                if (cpt_month < 10) {
                    if (cpt_day < 10) {
                        /****otherwise there are no "0" in the request, and no result is returned****/
                        array_data.push(get_nb_connection_date_users_js("gachort", begin_split[0] + "-0" + cpt_month + "-0" + cpt_day));
                        array_data2.push(get_nb_connection_date_users_js(strUser, begin_split[0] + "-0" + cpt_month + "-0" + cpt_day));
                        //alert("searched : "+ begin_split[0]+"-0"+cpt_month+"-0"+cpt_day + " pushed/1/ : " +get_nb_connection_date_users_js("gachort", begin_split[0]+"-0"+cpt_month+"-0"+cpt_day));
                    } else {
                        array_data.push(get_nb_connection_date_users_js("gachort", begin_split[0] + "-0" + cpt_month + "-" + cpt_day));
                        array_data2.push(get_nb_connection_date_users_js(strUser, begin_split[0] + "-0" + cpt_month + "-" + cpt_day));
                        //alert("searched : " +  begin_split[0]+"-0"+cpt_month+"-"+cpt_day + " pushed/2/ : "+get_nb_connection_date_users_js("gachort", begin_split[0]+"-0"+cpt_month+"-"+cpt_day));
                    }
                } else {
                    if (cpt_day < 10) {
                        //otherwise there are no "0" in the request, and no result is returned
                        array_data.push(get_nb_connection_date_users_js("gachort", begin_split[0] + "-" + cpt_month + "-0" + cpt_day));
                        array_data.push(get_nb_connection_date_users_js(strUser, begin_split[0] + "-" + cpt_month + "-0" + cpt_day));
                        //alert("searched : " + begin_split[0]+"-"+cpt_month+"-0"+cpt_day + " pushed/3/ : " + get_nb_connection_date_users_js("gachort", begin_split[0]+"-"+cpt_month+"-0"+cpt_day));
                    } else {
                        array_data.push(get_nb_connection_date_users_js("gachort", begin_split[0] + "-" + cpt_month + "-" + cpt_day));
                        array_data2.push(get_nb_connection_date_users_js(strUser, begin_split[0] + "-" + cpt_month + "-" + cpt_day));
                        //alert("searched : " + begin_split[0]+"-"+cpt_month+"-"+cpt_day + " pushed/4/ : " + get_nb_connection_date_users_js("gachort", begin_split[0]+"-"+cpt_month+"-"+cpt_day));
                    }
                }

            }
        }
        //array_data.push("]");
    }
    print_timeMachine();
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
    in_content_card.setAttribute("style", 'background-color : #404041;height: auto;width: 1000px');
    in_content_card.setAttribute("class", 'mdl-shadow--4dp');


    var text_header_panel = document.createElement("div");
    text_header_panel.setAttribute("class", 'text_header_panel');
    //text_header_panel.textContent = "Panel : timeMachine" ;

    in_content_card.appendChild(text_header_panel);





    var close = document.createElement("div");
    close.setAttribute("id", 'close' + id_panel);

    var input = document.createElement("input");
    input.setAttribute("id", 'delete_button');
    input.setAttribute("type", 'image');
    input.setAttribute("src", 'images/icon_close.png');
    input.setAttribute("style", 'width: 42px;float: right;padding:5px');
    input.setAttribute("onclick", 'delete_panel(\'' + id_panel + '\')');


    close.appendChild(input);
    var container = document.createElement("div");
    container.setAttribute("id", 'container' + id_panel);
    container.setAttribute("style", 'height=100%;width=100%;background-color : #404041');
    in_content_card.appendChild(close);
    in_content_card.appendChild(container);

    card.appendChild(in_content_card);

    page_content.appendChild(card);
    //alert("OK : add_panel");
    add_section_timeMachine(0, id_panel);
}

/**********************************************************
 * E. Adds the section which will hold the timeMachine element
 ********************************************************** */
function add_section_timeMachine(id_element, panel_select) {
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
 * PRINT CHART FUNCTIONS
 ******************************************************************************/

/*******************************************************************************
 * E. TIMEMACHINE
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
                data: [2, 5, 1, 8, 2, 0, 5, 9],
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
                data: [1, 6, 4, 7, 3, 2, 0],
                pointStart: Date.UTC(2009, 1, 1),
                pointInterval: 24 * 3600 * 1000
            }]
    });
}

/*******************************************************************************
 * E. Dynamic generation of timeMachine
 ********************************************************************************/
function print_timeMachine() {
    add_panel_timeMachine();
    alert("array_data : " + array_data);
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
                name: 'Madeth May',
                color: 'rgba(223, 83, 83, .5)',
                data: array_data,
                pointStart: Date.UTC(year_begin, month_begin - 1, day_begin),
                pointInterval: 24 * 3600 * 1000
            }, {
                //TODO user2 dynamic
                name: strUser,
                color: 'rgba(119, 152, 191, .5)',
                /*data: [[2009-02-01, 1],[2009-02-02, 6],[2009-02-03, 4],[2009-02-04, 7],[2009-02-05, 3],[2009-02-06, 2],
                 [2009-02-07, 0],[2009-02-08, 6],[2009-02-09, 2],[2009-02-10, 0],[2009-02-11, 5],[2009-02-12, 4],[2009-02-13, 6],[2009-02-14, 1],
                 [2009-02-01, 4],[2009-02-15, 2],[2009-02-16, 6],[2009-02-17, 4],[2009-02-18, 1],[2009-02-19, 2],[2009-02-20, 5],[2009-02-21, 8],
                 [2009-02-22, 5],[2009-02-23, 3],[2009-02-24, 4],[2009-02-25, 3],[2009-02-26, 0],[2009-02-27, 12],[2009-02-28, 5]]*/
                //data: [1,6,4,7,3,2,0,6,2,0,5,4,6,1,4,2,6,4,1,2,5,8,5,3,4,3,0,12,5]
                data: array_data2,
                pointStart: Date.UTC(year_begin, month_begin - 1, day_begin),
                pointInterval: 24 * 3600 * 1000
            }]
    });
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