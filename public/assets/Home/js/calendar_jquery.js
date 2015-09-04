
//=============================GLOBAL VARIABLES====================================//
$.ajaxSetup({
    headers: {
        'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
    }
});
var currentMonthIndex = month_+1;
var nextButton = $('#nextButton');
var previousButton = $('#previousButton');
var calendar = $('#calendar-dates');
var createEventForm = $('#createEventForm');
var previousDate ;
var currentFullDate = date_+" "+(month_+1)+" "+year_;
var isListEmpty = true;
var eventList = $('#eventList');
var eventRecord = new yearEvents();
var yearIndex = year_;
var yearLoop = new yearLoopClass();


// for(var i =0; i<20; i++) {
// 	var newEvent = new eventClass();
// 	newEvent.time = 680;
// 	newEvent.date = '30';
// 	newEvent.month= '8';
// 	newEvent.year= '2015';
// 	newEvent.classId='2342';
// 	eventRecord.saveEvent(newEvent);
// 	 // //console.log('yolo');
// }
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
function generateNextMonth(startPoint){
	 // //console.log('startPoint:' + startPoint) /////////////////////////////
	startPoint = parseInt(startPoint);
	calendar.empty();
	startPoint = (startPoint+1)%12;
	 // //console.log('new startPoint:'+startPoint); /////////////////////////
	currentMonthIndex = startPoint +1;
	var months = [];
	months = yearLoop.getMonths();
	yearIndex = parseInt(months[currentMonthIndex-1]);
	
	 // //console.log("currentMonthIndex: "+currentMonthIndex);//////////////
	 // //console.log(months); /////////////////////////////////////////////

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
function generatePreviousMonth(startPoint){
	// //console.log('startPoint:' + startPoint) /////////////////////////////
	startPoint = parseInt(startPoint);
	calendar.empty();
	startPoint--;
	// //console.log('new startPoint:'+startPoint); /////////////////////////
	if (startPoint < 0)
		startPoint = 11;
	currentMonthIndex = startPoint+1;
	var months = [];
	months = yearLoop.getMonths();
	yearIndex = parseInt(months[currentMonthIndex-1]);

	// //console.log("currentMonthIndex: "+currentMonthIndex);//////////////
	// //console.log(months); /////////////////////////////////////////////

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
	currDate = year + '&' + month + '&' + date;

	refreshEventList(date, month);

}
//==============================REFRESH THE EVENT LIST===================================//
function refreshEventList(date, month) {
	$('#eventList').empty();

	// //console.log("hey refresh__________________________________________________________________"); //////////////////////////////////

	var eventArray = [];

	eventArray = eventRecord.getDayEvents(parseInt(date),parseInt(month));
	var size = eventArray.length;

	if(size == 0)
		$('#eventList').append('<div>NO EVENTS</div>');
	else {

		// //console.log('refreshing event list, size =' + size); //////////////////////////////////

		for (var i=0; i<size; i++) {

			// //console.log('Appending index: '+i); //////////////////////////////////
			
			appendEventDOM(eventArray[i],i);
		}
	}
	highlightDateWithEvent(month);
	return;
}
//==============================CHECK INPUT===================================//
function correctInputNewEvent() {
	if($('#newEventTitle').val() != '')
		if($('#newEventTime').val() !='')
			if($('#newEventClassPicker').val() != 0)
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
function addEvent(f){
	var form = f;
	if(correctInputNewEvent())
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

		// //console.log("hour to min:" + t[0] + "-" + h); ////////////////////////////

		tempTime = h + parseInt(t[1]);

		// //console.log("total min:" + tempTime); ////////////////////////////
		
		newEvent.time = parseInt(tempTime);
		
		// //console.log("Event Object Time: "+newEvent.time); ////////////////////////////
		
		var temp = [];
		var str = ($('#newEventClassPicker').val()).toString();
		temp = str.split(':');
		newEvent.classId = temp[0]
		newEvent.className = temp[1];
		$('#newEvent-container').fadeOut('fast');
		$('.overlay').fadeOut('fast');
		// SEND TO SERVER --------------->> HERE <<-------------- SEND TO SERVER//
		//SIMULTED USING CLASS OF ARRAYS
		form.year = newEvent.year;
		form.month = newEvent.month;
		form.date = newEvent.date;
		var ff = document.getElementById('createEventForm');
		var dd = document.createElement('input');
		ff.appendChild(dd);
		dd.setAttribute('visibility','hidden');
		dd.setAttribute('name', 'event_date');
		dd.setAttribute('value', newEvent.year+'-'+newEvent.month+'-'+newEvent.date);

		// //console.log(newEvent);
		// //console.log(form);
		var result;
		$.ajax({
			type: 'POST',
			url: '/event',
			data: form.serialize(),
			success: function(response, status){
				// //console.log(response);
				// integrate logic with event id here
				// response holds last event id added to db
				newEvent.eventID = response;

			}
		});

		ff.removeChild(dd);
		$('#newEventTitle').val(''); 
		$('#newEventTime').val('');
		$('#newEventClassPicker').val('0');

		eventRecord.saveEvent(newEvent);
		
		// //console.log("saving done"); ////////////////////////////

		// SEND TO SERVER --------------->> HERE <<-------------- SEND TO SERVER//
		
		refreshEventList (newEvent.date, newEvent.month);

		highlightDateWithEvent(currentMonthIndex);

	}

}
//==============================APPEND EVENT TO UI===================================//
// PARAMETERS: NEWEVENT OBJECT.
function createEventDOM(newEvent,index) {
	// var time = [];
	// time = (newEvent.time).split(":");
	// var timeStr = time[0] + time[1];


	var e = document.createElement('div');
	e.setAttribute("id",index+"-"+(newEvent.date.toString())+"-"+(newEvent.month.toString())+"-"+(newEvent.year.toString()) );
	e.setAttribute("class", "eventElement");
	var deleteButton = document.createElement('button');
	deleteButton.setAttribute("onclick", "deleteEvent("+"$(this)"+","+"event"+","+index+","+newEvent.date+","+newEvent.month+","+newEvent.year+","+newEvent.eventID+")");
	deleteButton.setAttribute("class", "deleteButton");
	// var deleteForm = document.createElement('form');
	// deleteForm.setAttribute('method', 'POST');
	// deleteForm.setAttribute('action', '/event');
	// var hidToken = document.createElement('input');
	// hidToken.setAttribute('type', 'hidden');
	// hidToken.setAttribute('name','_token');
	// hidToken.setAttribute('value', $('[name="csrf_token"]').attr('content'));
	// deleteForm.appendChild(hidToken);
	// deleteForm.appendChild(deleteButton);
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

	var className = document.createElement('div');
	className.setAttribute("class", "eventClass");
	className.innerHTML = 'Class :' + newEvent.className;

	e.appendChild(className);

	return e;

}

function appendEventDOM(newEvent,index) {
	var element = createEventDOM(newEvent,index);
	// //console.log("passed createElement");
	var list = document.getElementById('eventList');
	list.appendChild(element);
}


//==============================DELETE EVENT===================================//
function deleteEvent(form,e,index,date,month,year,eventID){
	console.log(e);
	$.ajax({
		url: 'event/remove/' + eventID,	// Look into making this more secure
		success: function (result){
			console.log("deleted success");
		}
	});

	eventRecord.deleteEvent(parseInt(index), date, parseInt(month), year);
	var id = index+"-"+date+"-"+month+"-"+year;
	// //console.log("Deleting: "+id);
	
	$('#'+id).slideUp();

	setTimeout( function() {
	refreshEventList(date,month);
	},0);

	highlightDateWithEvent(currentMonthIndex);
}


//===============SETTING INTERRACTIVE CALENDAR=======================================//
$(document).ready( function () {

    var calendar = generateCalendarTable(first_day_index, no_days, month_+1, year_);
    var rowDays = generateDayRow();
    document.getElementById("calendar-month-year").innerHTML = month_name[month_]+" "+year_;
    document.getElementById("calendar-dates").appendChild(rowDays);
    document.getElementById("calendar-dates").appendChild(calendar);


    nextButton.click(function () {
    	generateNextMonth(currentMonthIndex-1);
    	if(currentMonthIndex == month_+1)
    		highlightDate(date_, month_,year_);
    });
    previousButton.click(function () {
    	generatePreviousMonth(currentMonthIndex-1);
    	if(currentMonthIndex == month_+1)
	    	highlightDate(date_, month_,year_);
    });
});

//===============SETTING INTERRACTIVE EVENT CREATOR=======================================//
$(document).ready( function() {
	$('#createNewEventButton').click( function() {
		$('.overlay').css('visibility','visible').hide().fadeIn('fast');
		$('#newEvent-container').css('visibility','visible').hide().fadeIn('fast');
	});

	$('#closeNewEvent').click( function() {
		$('#newEvent-container').fadeOut('fast');
		$('.overlay').fadeOut('fast');
	});
	createEventForm.on('submit', function(e) {
		e.preventDefault();
		addEvent($(this));
	});
});




$(document).ready(function(){
		$.ajax({
			method: 'GET',
			url: '/event',
			success: function(result){
				for (var i = 0; i < result.length; i++){
					//console.lgo(result[])
					var temp = new eventClass();
					temp.time = result[i].event_time;
					var eventDate = result[i].event_date.split('-');
					temp.date = eventDate[2];
					temp.month = eventDate[1];
					temp.year = eventDate[0]; 
					temp.title = result[i].event_title;
					temp.classId = result[i].classe_id;
					temp.className = 'test';
					temp.eventID = result[i].id;
					eventRecord.saveEvent(temp);
				}
				refreshEventList(date_,currentMonthIndex);
				highlightDate(date_,month_,yearIndex);
				highlightDateWithEvent(currentMonthIndex);
			}

		});
});









