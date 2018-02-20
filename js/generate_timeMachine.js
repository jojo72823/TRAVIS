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

var dateSelected_begin;
var dateSelected_end;

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

function init_daterange(){
    window.onload() = function(){
        var inputer = document.getElementById("daterange");
        inputer.value = ""+get_begin_date()+" - "+get_begin_date();
    };
    
}

/**********************************************************************
 * sets the dates varaibles according to the selected dates in datePicker
 */
function set_dates(begin, end){
    dateSelected_begin = begin;
    dateSelected_end = end;
    //alert("set Dates " + dateSelected_begin + " -> " + dateSelected_end);
}

function get_begin_date(){
    var first = get_first_date_js();
    return first;
}

function get_end_date(){
    var last = get_last_date_js();
    return last;
}

/**********************************************************************
 * E. adds data to the TIMEMACHINE
 ***********************************************************************/
function get_timeMachine_data() {
    //var start = $('.daterange').data('daterangepicker').getStartDate();
    //var end = document.getElementById("daterange").data('daterangepicker').getEndDate();
    //alert("start : " + begin + " end : " + end);
    var begin_split = dateSelected_begin.split('-');
    year_begin = begin_split[0];
    month_begin = begin_split[1];
    day_begin = begin_split[2];
    var end_split = dateSelected_end.split('-');
    var e = document.getElementById("selectComparedUser");
    strUser = e.options[e.selectedIndex].text;
    var last_day;
    var first_day;

    for(var cpt_year = parseInt(begin_split[0]); cpt_year <= parseInt(end_split[0]); cpt_year++){
    //if (begin_split[0] == end_split[0]) {
        //cpt_year = parseInt(begin_split[0]);
        //array_data.push("[");
        //alert("==, parse 1 : " + parseInt(begin_split[1]));
        //alert("select : " + strUser);
        /***********USER 1 Auto selected (TODO via login) ***************/
        //TODO : handle multiple users possibility here
        for (var cpt_month = parseInt(begin_split[1]); cpt_month <= parseInt(end_split[1]); cpt_month++) {
            //alert("cpt_month : " + cpt_month);
            /** end of month handling **/
            if(cpt_month == parseInt(end_split[1])){
                //if the count is at the last month, the days go until the last selected days
                last_day = parseInt(end_split[2]);
            }else{
                //the count is not at the last month, so we go until the end of the current month
                if(cpt_month == 1 || cpt_month == 3 || cpt_month == 5 || cpt_month == 7 || cpt_month == 8 || cpt_month == 10 || cpt_month == 12){
                    last_day = 31;
                }else if(cpt_month == 2){
                    last_day = 28;
                }else{
                    last_day = 30;
                }
            }
            /** start of month handling **/
            if(cpt_month == parseInt(begin_split[1])){
                first_day = parseInt(begin_split[2]);
            }else{
                first_day = 1;
            }
            //alert("last_day : " + last_day);
            for (var cpt_day = first_day; cpt_day <= last_day; cpt_day++) {
                if (cpt_month < 10) {
                    if (cpt_day < 10) {
                        /****otherwise there are no "0" in the request, and no result is returned****/
                        array_data.push(get_nb_connection_date_users_js("gachort", cpt_year + "-0" + cpt_month + "-0" + cpt_day));
                        array_data2.push(get_nb_connection_date_users_js(strUser, cpt_year + "-0" + cpt_month + "-0" + cpt_day));
                        //alert("searched : "+ begin_split[0]+"-0"+cpt_month+"-0"+cpt_day + " pushed/1/ : " +get_nb_connection_date_users_js("gachort", begin_split[0]+"-0"+cpt_month+"-0"+cpt_day));
                    } else {
                        array_data.push(get_nb_connection_date_users_js("gachort", cpt_year + "-0" + cpt_month + "-" + cpt_day));
                        array_data2.push(get_nb_connection_date_users_js(strUser, cpt_year + "-0" + cpt_month + "-" + cpt_day));
                        //alert("searched : " +  begin_split[0]+"-0"+cpt_month+"-"+cpt_day + " pushed/2/ : "+get_nb_connection_date_users_js("gachort", begin_split[0]+"-0"+cpt_month+"-"+cpt_day));
                    }
                } else {
                    if (cpt_day < 10) {
                        //otherwise there are no "0" in the request, and no result is returned
                        array_data.push(get_nb_connection_date_users_js("gachort", cpt_year + "-" + cpt_month + "-0" + cpt_day));
                        array_data.push(get_nb_connection_date_users_js(strUser, cpt_year + "-" + cpt_month + "-0" + cpt_day));
                        //alert("searched : " + begin_split[0]+"-"+cpt_month+"-0"+cpt_day + " pushed/3/ : " + get_nb_connection_date_users_js("gachort", begin_split[0]+"-"+cpt_month+"-0"+cpt_day));
                    } else {
                        array_data.push(get_nb_connection_date_users_js("gachort", cpt_year + "-" + cpt_month + "-" + cpt_day));
                        array_data2.push(get_nb_connection_date_users_js(strUser, cpt_year + "-" + cpt_month + "-" + cpt_day));
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
    input.setAttribute("onclick", 'deleteReset_timeMachine()');


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
    card.setAttribute("class", 'col-lg-12  col-md-12 col-sm-12  col-xs-12 animated fadeInUp');
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

/******************************************************************************
 * Deletes the existing timeMachine so that another one can be loaded
 * **called in print_timeMachine()
 */
function delete_timeMachine(){
    var parentNode = document.getElementById("page_content");
    while(parentNode.firstChild){
        parentNode.removeChild(parentNode.firstChild);
    }
}

function deleteReset_timeMachine(){
    var parentNode = document.getElementById("page_content");
    while(parentNode.firstChild){
        parentNode.removeChild(parentNode.firstChild);
    }
    array_data = new Array();
    array_data2 = new Array();
}

/*******************************************************************************
 * PRINT CHART FUNCTIONS
 ******************************************************************************/

/*******************************************************************************
 * E. Dynamic generation of timeMachine
 ********************************************************************************/
function print_timeMachine() {
    if(document.getElementById("panel0")!=null){
        delete_timeMachine();
    }
    add_panel_timeMachine();
    //alert("array_data : " + array_data);
    //alert("array_data2 : " + array_data2);
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
                name: strUser,
                color: 'rgba(119, 152, 191, .5)',
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