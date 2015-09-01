
//=============================GLOBAL VARIABLES====================================//
var currentMonthIndex = month_+1;
var nextButton = $('#nextButton');
var previousButton = $('#previousButton');
var calendar = $('#calendar-dates');
var addEventButton = $('#addEventButton');
var previousDate ;
var currentFullDate = date_+" "+(month_+1)+" "+year_;
var isListEmpty = true;
var eventList = $('#eventList');
var eventRecord = new yearEvents();
var yearIndex = year_;

for(var i =0; i<20; i++) {
	var newEvent = new eventClass();
	newEvent.time = 680;
	newEvent.date = '30';
	newEvent.month= '8';
	newEvent.year= '2015';
	newEvent.classId='2342';
	eventRecord.saveEvent(newEvent);
	console.log('yolo');
}
//===========================HIGHLIGHT CURRENT DATE===========================//
function highlightDate(date_, monthIndex_, year_){
	var date = date_.toString();
	var monthIndex = (monthIndex_+1).toString();
	var year = year_.toString();
	var e = $("#" + date + "-" + monthIndex + "-" + year);
	e.removeClass("dayNames");
	e.addClass("dateElementToday");
}
//===========================HIGHLIGHT DATE WITH EVENT===========================//
// Parameters: integer month on calendar 
function highlightDateWithEvent(month){
	$("#calendar>tr>td.dateWithEvent").removeClass("dateWithEvent");
	var events = [];
	events = eventRecord.getMonthEvents(month);
	for (var i=0; i<31; i++) {
		if (events[i].isNotEmpty()) {
			var d = i+1;
			$("#"+d+"-"+month+"-"+yearIndex).addClass("dateWithEvent");
		}
	}
}
//===============GENERATE NEXT MONTH CALENDAR=======================================//
// Parameter: interger Year e.g 2014.
// loops from the september to august , one school year .
function generateNextMonth(currentYear){

	calendar.empty();
	currentMonthIndex++;
	if(currentMonthIndex >= 9 && currentMonthIndex <=12)
		yearIndex = currentYear-1;

	else if(currentMonthIndex > 12) {
		currentMonthIndex = 1;
		yearIndex = currentYear;
	}
		else
			yearIndex = currentYear;

	var calObjt = createCalendar(currentMonthIndex, yearIndex);
	var rowDays = generateDayRow();
	document.getElementById("calendar-month-year").innerHTML = month_name[currentMonthIndex-1]+" "+yearIndex;
	document.getElementById("calendar-dates").appendChild(rowDays); 
	document.getElementById("calendar-dates").appendChild(calObjt);
	highlightDateWithEvent(currentMonthIndex);
}
//================GENERATE PREVIOUS MONTH CALENDAR=======================================//
//Parameter: interger Year e.g 2014.
// loops from the september to august , one school year .
function generatePreviousMonth(currentYear){

	calendar.empty();
	currentMonthIndex --;
	if (currentMonthIndex < 1)
		currentMonthIndex =12;
		if(currentMonthIndex >= 9 && currentMonthIndex <=12)
			yearIndex = currentYear-1;
		else
			yearIndex = currentYear;

	var calObjt = createCalendar(currentMonthIndex, yearIndex);
	var rowDays = generateDayRow();
	document.getElementById("calendar-month-year").innerHTML = month_name[currentMonthIndex-1]+" "+yearIndex;
	document.getElementById("calendar-dates").appendChild(rowDays); 
	document.getElementById("calendar-dates").appendChild(calObjt);
	highlightDateWithEvent(currentMonthIndex);
}


//==============================SHOW EVENTS ON DATE===================================//
// STEP 1: CHANGE CURRENT FULL DATE.
// STEP 2: HIDE WHAT WAS SHOWN PREVIOUSLY.
// STEP 3: REQUEST EVENT FOR THAT DAY FORM SERVER.
// STEP 3: SHOW EVENTS ON THIRD SECTION OF PAGE
function showEvents(date, month, year){
	$('#'+previousDate).removeClass('selectedDate');
	$('#'+date+'-'+month+'-'+year).addClass('selectedDate');
	previousDate = date+'-'+month+'-'+year;
	currentFullDate = date+" "+month+" "+year;
	
	if(date == date_) {
		$('#eventList-header').text('EVENTS TODAY ');
		$('#defaultEvent').text('NEW EVENT TODAY ');
	}
	else {
		$('#eventList-header').text('EVENTS ON ' + currentFullDate);
		$('#defaultEvent').text('NEW EVENT ON ' + currentFullDate);
	}
	//RETRIEVE FROM SERVER --------------->> HERE <<-------------- RETRIEVE FROM SERVER SERVER//
	//SIMULTED USING CLASS OF ARRAYS
	refreshEventList(date, month);

}
//==============================REFRESH THE EVENT LIST===================================//
function refreshEventList(date, month) {
	$('#eventList').empty();

	console.log("hey refresh__________________________________________________________________"); //////////////////////////////////

	var eventArray = [];

	eventArray = eventRecord.getDayEvents(parseInt(date),parseInt(month));
	var size = eventArray.length;

	if(size == 0)
		$('#eventList').append('<div>NO EVENTS</div>');
	else {

		console.log('refreshing event list, size =' + size); //////////////////////////////////

		for (var i=0; i<size; i++) {

			console.log('Appending index: '+i); //////////////////////////////////
			
			appendEventDOM(eventArray[i],i);
		}
	}
	highlightDateWithEvent(month);
	return;
}
//==============================APPEND EVENT TO UI===================================//
// PARAMETERS: NEWEVENT OBJECT.
function createEventDOM(newEvent,index) {
	/*var time = [];
	time = (newEvent.time).split(":");
	var timeStr = time[0] + time[1];*/


	var e = document.createElement('div');
	e.setAttribute("id",index+"-"+(newEvent.date.toString())+"-"+(newEvent.month.toString())+"-"+(newEvent.year.toString()) );
	e.setAttribute("class", "eventElement");

	var eventTime = document.createElement('div');
	eventTime.setAttribute("class", "eventTime");
	var t = newEvent.time;
	var hours = Math.floor( t/ 60);          
    var minutes = t % 60;
    if(minutes < 10)
    	minutes = "0" + minutes;
 	if(hours < 10)
 		hours = "0" + hours;
 	timeStr = hours.toString() +" : "+ minutes.toString();

	eventTime.innerHTML = timeStr;

	e.appendChild(eventTime);

	var title = document.createElement('div');
	title.setAttribute("class", "eventTitle");
	title.innerHTML = newEvent.title;

	e.appendChild(title);

	var className = document.createElement('div');
	className.setAttribute("class", "eventClass");
	className.innerHTML = 'Class :' + newEvent.className;

	e.appendChild(className);

	return e;

}

function appendEventDOM(newEvent,index) {
	var element = createEventDOM(newEvent,index);
	console.log("passed createElement");
	var list = document.getElementById('eventList');
	list.appendChild(element);
}

//===============SETTING INTERRACTIVE CALENDAR=======================================//
$(document).ready( function () {

    var calendar = generateCalendarTable(first_day_index, no_days, month_+1, year_);
    var rowDays = generateDayRow();
    document.getElementById("calendar-month-year").innerHTML = month_name[month_]+" "+year_;
    document.getElementById("calendar-dates").appendChild(rowDays);
    document.getElementById("calendar-dates").appendChild(calendar);


    nextButton.click(function () {
    	generateNextMonth(parseInt(year_));
    	if(currentMonthIndex == month_+1)
    		highlightDate(date_, month_,year_);
    });
    previousButton.click(function () {
    	generatePreviousMonth(parseInt(year_));
    	if(currentMonthIndex == month_+1)
	    	highlightDate(date_, month_,year_);
    });
});


$(document).ready( function() {
		refreshEventList(date_,currentMonthIndex);
		highlightDate(date_,month_,yearIndex);
		highlightDateWithEvent(currentMonthIndex);
});









