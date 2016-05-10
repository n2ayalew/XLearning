
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
	return;
}
//==============================CHECK INPUT===================================//
function correctInput() {
	if($('#newEventTitle').val() != '')
		if($('#newEventTime').val() !='')
			if($('#newEventClass').val() != 0)
				return true;
	var miniAlert = document.getElementById('miniAlert1');
    miniAlert.innerHTML = "SOME INFORMATION IS MISSING PLEASE FILL THEM OUT";
    setTimeout( function() {
        $('#miniAlert1').empty();
    },2000);
	return false;
}
//==============================ADD EVENT===================================//
// STEP 1: VERIFY INPUT.	x
// STEP 2: RETRIEVE INPUT.	x
// STEP 3: CREATE LOCAL EVENT OBJECT ON CLIENT SIDE.	x
// STEP 4: UPDATE UI CALENDAR.
// STEP 5: SEND OBJECT TO BACK END SERVER.
function addEvent(){
	if(correctInput())
	{
		var fullDate =[];
		fullDate = currentFullDate.split(" ");
		newEvent = new eventClass();
		newEvent.title = ($('#newEventTitle').val()).toString();
		newEvent.date = fullDate[0];
		newEvent.month = fullDate[1];
		newEvent.year = fullDate[2];
		
		var tempTime = ($('#newEventTime').val());
		tempTime =tempTime.toString();
		var t = [];
		t = tempTime.split(':');
		h = parseInt(t[0])*60

		console.log("hour to min:" + t[0] + "-" + h); ////////////////////////////

		tempTime = h + parseInt(t[1]);

		console.log("total min:" + tempTime); ////////////////////////////
		
		newEvent.time = parseInt(tempTime);
		
		console.log("Event Object Time: "+newEvent.time); ////////////////////////////
		
		newEvent.classId = ($('#newEventClass').val()).toString();
		$('#newEventTitle').val(''); 
		$('#newEventTime').val('');
		$('#newEventClass').val('0');
		$('#newEvent-container').fadeOut('fast');
		$('.overlay').fadeOut('fast');
		// SEND TO SERVER --------------->> HERE <<-------------- SEND TO SERVER//
		//SIMULTED USING CLASS OF ARRAYS

		eventRecord.saveEvent(newEvent);

		console.log("saving done"); ////////////////////////////

		// SEND TO SERVER --------------->> HERE <<-------------- SEND TO SERVER//
		
		refreshEventList (newEvent.date, newEvent.month);

		highlightDateWithEvent(currentMonthIndex);

	}

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

	var deleteButton = document.createElement('button');
	deleteButton.setAttribute("onclick", "deleteEvent("+index+","+newEvent.date+","+newEvent.month+","+newEvent.year+")");
	deleteButton.setAttribute("class", "deleteEventButton");

	e.appendChild(deleteButton);

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

	var classId = document.createElement('div');
	classId.setAttribute("class", "eventClass");
	classId.innerHTML = 'Class ID:' + newEvent.classId;

	e.appendChild(classId);

	return e;

}

function appendEventDOM(newEvent,index) {
	var element = createEventDOM(newEvent,index);
	console.log("passed createElement");
	var list = document.getElementById('eventList');
	list.appendChild(element);
}


//==============================DELETE EVENT===================================//
function deleteEvent(index,date,month,year){

	eventRecord.deleteEvent(parseInt(index), date, parseInt(month), year);
	var id = index+"-"+date+"-"+month+"-"+year;
	console.log("Deleting: "+id);
	
		$('#'+id).slideUp();

	setTimeout( function() {
	refreshEventList(date,month);
	},500);

	highlightDateWithEvent(currentMonthIndex);
}



//===============HIDING ALL MODALS=======================================//
$(document).ready(function() {
	$('.overlay').hide();
	$('#newEvent-container').hide();
});


//===============SETTING INTERRACTIVE CALENDAR=======================================//
$(document).ready( function () {
	refreshEventList(date_,month_)
    var calendar = generateCalendarTable(first_day_index, no_days, month_+1, year_);
    var rowDays = generateDayRow();
    document.getElementById("calendar-month-year").innerHTML = month_name[month_]+" "+year_;
    document.getElementById("calendar-dates").appendChild(rowDays);
    document.getElementById("calendar-dates").appendChild(calendar);
    highlightDate(date_, month_,year_);

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

//===============SETTING INTERRACTIVE EVENT CREATOR=======================================//
$(document).ready( function() {
	$('#createNewEventButton').click( function() {
		$('.overlay').fadeIn('fast');
		$('#newEvent-container').fadeIn('fast');
	});

	$('#closeNewEvent').click( function() {
		$('#newEvent-container').fadeOut('fast');
		$('.overlay').fadeOut('fast');
	});
	addEventButton.click( function() {
		addEvent();
	});
});














