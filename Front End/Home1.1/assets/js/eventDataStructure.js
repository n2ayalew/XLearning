//==============================EVENT CLASS===================================//
// EVERYTHING SHOULD BE IN STRING!
function eventClass() {
	var time; // INTEGER TOTAL OF MINUTESS SINCE DAY STARTED.
	this.date; // STRING
	this.month; // STRING
	this.year;	//STRING
	var title;	//STRING
	this.classId; //STRING
	this.className; //STRING
	this.eventID; // the one from server
}

function dayEvents() {
	var list =[];

	this.isNotEmpty = function() {
		if(list.length != 0)
			return true;
		else
			return false;
	}

	//saves the event and return the integer index it was saved
	this.saveEvent = function(e) {
		if (list.length == 0) {
			list.push(e);
			console.log('pushing into empty list');
			return;
		}
		console.log('list size:'+list.length);

		var size = list.length;
		for (var i=0; i<size; i++) {
			if(list[i].time > e.time) {
				list.splice(i,0,e);
				console.log('inserted new event at:'+i+' size:'+list.length);
				return;
			}
		}
		list.push(e); // if the element.time is the largest
		console.log('inserted new event at end size:'+list.length);
		return;
	};

	//returns an array of event objects
	this.getEvents = function() { 
		return list;
	};
	this.deleteEvent = function(index) {
		var i = parseInt(index);
		list.splice(i,1);
		return;
	};
}



function monthEvents() {
	var month = [];

	for (var i=0; i<31; i++)
		month[i]= new dayEvents();
	//creating a an instance of dayEvents for each day.

	this.saveEvent = function(e) {

		var date = parseInt(e.date);
		var index = date-1;
		console.log('saving Event DateIndex = '+ index);
		return month[index].saveEvent(e);
	};

	this.deleteEvent = function(index,date) {
		date = parseInt(date);
		month[date].deleteEvent(index);
		return;
	};

	//return an array of dayEvents object
	this.getEvents = function() {
		return month;
	};

	this.getDayEvents = function(date) {

		console.log('idate:' + date);//////////////

		return month[date].getEvents();
	};
}


function yearEvents() {
	var year = [];
	for(var i=0; i<12; i++)
		year[i] = new monthEvents();
	//Creating an instance of monthEvents of each month.

	this.saveEvent = function(e) {
		var month = parseInt(e.month);
		var index = month -1;
		return year[index].saveEvent(e);
	};

	this.deleteEvent = function(index,date,month) {
		month = parseInt(month);
		date = parseInt(date);
		var indexMonth = month-1;
		var indexDate = date-1;
		year[indexMonth].deleteEvent(index, indexDate);
	};

	this.getDayEvents = function(date,month) {
		month = parseInt(month);
		date = parseInt(date);
		var indexMonth = month-1;
		var indexDate = date-1;

		console.log('idate:' + indexDate + ' imonth: ' + indexMonth); //////////////////////////////////
		
		return year[indexMonth].getDayEvents(indexDate);
	};

	this.getMonthEvents = function(month) {
		var month = parseInt(month);
		var index = month -1;
		return year[index].getEvents();
	};
}




