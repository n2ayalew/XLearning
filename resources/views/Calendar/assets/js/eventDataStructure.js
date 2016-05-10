//==============================EVENT CLASS===================================//
// EVERYTHING SHOULD BE IN STRING!
function eventClass() {
	var time; // INTEGER TOTAL OF MINUTESS SINCE DAY STARTED.
	this.date; // STRING
	this.month; // STRING
	this.year;	//STRING
	var title;	//STRING
	this.classId; //STRING
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
			return 0;
		}
		console.log('list size:'+list.length);

		var size = list.length;
		for (var i=0; i<size; i++) {
			if(list[i].time > e.time) {
				list.splice(i,0,e);
				console.log('inserted new event at:'+i+' size:'+list.length);
				return i;
			}
		}
		list.push(e); // if the element.time is the largest
		console.log('inserted new event at end size:'+list.length);
		return i+1;
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







//=============================CLASS OF ARRAYS====================================//
// THIS CLASS WILL STORE AN ARRAY OF EVENTS FOR EACH MONTH 
// e.g year[ jan[ event1, event2 ... ], feb[]...].
/*function eventListClass() {
	var jan =[];
	for (var i = 0; i<31; i++) {
		jan[i] = new dayEvents();
	}
	var janEventDates = []; 
	var feb =[];
	for (var i = 0; i<31; i++) {
		feb[i] = new dayEvents();
	}
	var febEventDates = []; 
	var mar =[];
	for (var i = 0; i<31; i++) {
		mar[i] = new dayEvents();
	}
	var marEventDates = []; 
	var apr =[];
	for (var i = 0; i<31; i++) {
		apr[i] = new dayEvents();
	}
	var aprEventDates = []; 
	var may =[];
	for (var i = 0; i<31; i++) {
		may[i] = new dayEvents();
	}
	var mayEventDates = []; 
	var jun =[];
	for (var i = 0; i<31; i++) {
		jun[i] = new dayEvents();
	}
	var junEventDates = []; 
	var jul =[];
	for (var i = 0; i<31; i++) {
		jul[i] = new dayEvents();
	}
	var julEventDates = []; 
	var aug =[];
	for (var i = 0; i<31; i++) {
		aug[i] = new dayEvents();
	}
	var augEventDates = []; 
	var sep =[];
	for (var i = 0; i<31; i++) {
		sep[i] = new dayEvents();
	}
	var sepEventDates = []; 
	var oct =[];
	for (var i = 0; i<31; i++) {
		oct[i] = new dayEvents();
	}
	var octEventDates = []; 
	var nov =[];
	for (var i = 0; i<31; i++) {
		nov[i] = new dayEvents();
	}
	var novEventDates = []; 
	var dec =[];
	for (var i = 0; i<31; i++) {
		dec[i] = new dayEvents();
	}
	var decEventDates = []; 

	// stores all the dates(string: dd-mm-yy) of each events
	var EventDates =[]; 

	// take in a event object
	this.saveEvent = function(e) { 
		fullDate = e.date+"-"+e.month+"-"+e.year;
		console.log('event full date:' + fullDate);
		switch (e.month) {
			case '1':
				jan.push(e);
				janEventDates.push(fullDate);
				
				console.log('pushing into array'+e.month);
				console.log('Number of event objects in jan: '+jan.length);
				console.log('Number of event DATES in jan: '+janEventDates.length);
				break;
			case '2':
				feb.push(e);
				febEventDates.push(fullDate);
				
				console.log('pushing into array'+e.month);
				console.log('Number of event objects in feb: '+feb.length);
				console.log('Number of event DATES in feb: '+febEventDates.length);
				break;
			case '3':
				mar.push(e);
				marEventDates.push(fullDate);
				
				console.log('pushing into array'+e.month);
				console.log('Number of event objects in mar: '+mar.length);
				console.log('Number of event DATES in mar: '+marEventDates.length);
				break;
			case '4':
				apr.push(e);
				aprEventDates.push(fullDate);
				
				console.log('pushing into array'+e.month);
				console.log('Number of event objects in apr: '+apr.length);
				console.log('Number of event DATES in apr: '+aprEventDates.length);
				break;
			case '5':
				may.push(e);
				mayEventDates.push(fullDate);
				
				console.log('pushing into array'+e.month);
				console.log('Number of event objects in may: '+may.length);
				console.log('Number of event DATES in may: '+mayEventDates.length);
				break;
			case '6':
				jun.push(e);
				junEventDates.push(fullDate);
				
				console.log('pushing into array'+e.month);
				console.log('Number of event objects in jun: '+jun.length);
				console.log('Number of event DATES in jun: '+junEventDates.length);
				break;
			case '7':
				jul.push(e);
				julEventDates.push(fullDate);
				
				console.log('pushing into array'+e.month);
				console.log('Number of event objects in jul: '+jul.length);
				console.log('Number of event DATES in jul: '+julEventDates.length);
				break;
			case '8':
				aug.push(e);
				augEventDates.push(fullDate);
				
				console.log('pushing into array'+e.month);
				console.log('Number of event objects in aug: '+aug.length);
				console.log('Number of event DATES in aug: '+augEventDates.length);
				break;
			case '9':
				sep.push(e);
				sepEventDates.push(fullDate);
				
				console.log('pushing into array'+e.month);
				console.log('Number of event objects in sep: '+sep.length);
				console.log('Number of event DATES in sep: '+sepEventDates.length);
				break;
			case '10':
				oct.push(e);
				octEventDates.push(fullDate);
				
				console.log('pushing into array'+e.month);
				console.log('Number of event objects in oct: '+oct.length);
				console.log('Number of event DATES in oct: '+octEventDates.length);
				break;
			case '11':
				nov.push(e);
				novEventDates.push(fullDate);
				
				console.log('pushing into array'+e.month);
				console.log('Number of event objects in nov: '+nov.length);
				console.log('Number of event DATES in nov: '+novEventDates.length);
				break;
			case '12':
				dec.push(e);
				decEventDates.push(fullDate);
				
				console.log('pushing into array'+e.month);
				console.log('Number of event objects in dec: '+dec.length);
				console.log('Number of event DATES in dec: '+decEventDates.length);
				break;
		}
	}; 

	this.getEventArray = function(month) { // take in interger monthIndex.
		switch (month) {
			case 1:
				console.log('returning array for month:' + month);
				return jan;
				break;
			case 2:
				console.log('returning array for month:' + month);
				return feb;
				break;
			case 3:
				console.log('returning array for month:' + month);
				return mar;
				break;
			case 4:
				console.log('returning array for month:' + month);
				return apr;
				break;
			case 5:
				console.log('returning array for month:' + month);
				return may;
				break;
			case 6:
				console.log('returning array for month:' + month);
				return jun;
				break;
			case 7:
				console.log('returning array for month:' + month);
				return jul;
				break;
			case 8:
				console.log('returning array for month:' + month);
				return aug;
				break;
			case 9:
				console.log('returning array for month:' + month);
				return sep;
				break;
			case 10:
				console.log('returning array for month:' + month);
				return oct;
				break;
			case 11:
				console.log('returning array for month:' + month);
				return nov;
				break;
			case 12:
				console.log('returning array for month:' + month);
				return dec;
				break;
		}
	}; 

	this.getEventDates = function(month) { // take in interger monthIndex.
		switch (month) {
			case 1:
				console.log('returning array for month:' + month);
				return janEventDates;
				break;
			case 2:
				console.log('returning array for month:' + month);
				return febEventDates;
				break;
			case 3:
				console.log('returning array for month:' + month);
				return marEventDates;
				break;
			case 4:
				console.log('returning array for month:' + month);
				return aprEventDates;
				break;
			case 5:
				console.log('returning array for month:' + month);
				return mayEventDates;
				break;
			case 6:
				console.log('returning array for month:' + month);
				return junEventDates;
				break;
			case 7:
				console.log('returning array for month:' + month);
				return julEventDates;
				break;
			case 8:
				console.log('returning array for month:' + month);
				return augEventDates;
				break;
			case 9:
				console.log('returning array for month:' + month);
				return sepEventDates;
				break;
			case 10:
				console.log('returning array for month:' + month);
				return octEventDates;
				break;
			case 11:
				console.log('returning array for month:' + month);
				return novEventDates;
				break;
			case 12:
				console.log('returning array for month:' + month);
				return decEventDates;
				break;
		}
	}; 

	this.deleteEvent = function(index, date, month, year) { // take in a integer index and integer month
		
		switch (month) {
			case 1:
				console.log('Deleting Event with index: '+index+'in array: ' + month);
				jan.splice(index,1);
				janEventDates.splice(index,1);
				
				console.log('Number of event objects in jan: '+jan.length);
				console.log('Number of event DATES in jan: '+janEventDates.length);
				break;
			case 2:
				console.log('Deleting Event with index: '+index+'in array: ' + month);
				feb.splice(index,1);
				febEventDates.splice(index,1);
				
				console.log('Number of event objects in feb: '+feb.length);
				console.log('Number of event DATES in feb: '+febEventDates.length);
				break;
			case 3:
				console.log('Deleting Event with index: '+index+'in array: ' + month);
				mar.splice(index,1);
				marEventDates.splice(index,1);
				
				console.log('Number of event objects in mar: '+mar.length);
				console.log('Number of event DATES in mar: '+marEventDates.length);
				break;
			case 4:
				console.log('Deleting Event with index: '+index+'in array: ' + month);
				apr.splice(index,1);
				aprEventDates.splice(index,1);
				
				console.log('Number of event objects in apr: '+apr.length);
				console.log('Number of event DATES in apr: '+aprEventDates.length);
				break;
			case 5:
				console.log('Deleting Event with index: '+index+'in array: ' + month);
				may.splice(index,1);
				mayEventDates.splice(index,1);
				
				console.log('Number of event objects in may: '+may.length);
				console.log('Number of event DATES in may: '+mayEventDates.length);
				break;
			case 6:
				console.log('Deleting Event with index: '+index+'in array: ' + month);
				jun.splice(index,1);
				junEventDates.splice(index,1);
				
				console.log('Number of event objects in jun: '+jun.length);
				console.log('Number of event DATES in jun: '+junEventDates.length);
				break;
			case 7:
				console.log('Deleting Event with index: '+index+'in array: ' + month);
				jul.splice(index,1);
				julEventDates.splice(index,1);
				
				console.log('Number of event objects in jul: '+jul.length);
				console.log('Number of event DATES in jul: '+julEventDates.length);
				break;
			case 8:
				console.log('Deleting Event with index: '+index+'in array: ' + month);
				aug.splice(index,1);
				augEventDates.splice(index,1);
				
				console.log('Number of event objects in aug: '+aug.length);
				console.log('Number of event DATES in aug: '+augEventDates.length);
				break;
			case 9:
				console.log('Deleting Event with index: '+index+'in array: ' + month);
				sep.splice(index,1);
				sepEventDates.splice(index,1);
				
				console.log('Number of event objects in sep: '+sep.length);
				console.log('Number of event DATES in sep: '+sepEventDates.length);
				break;
			case 10:
				console.log('Deleting Event with index: '+index+'in array: ' + month);
				oct.splice(index,1);
				octEventDates.splice(index,1);
				
				console.log('Number of event objects in oct: '+oct.length);
				console.log('Number of event DATES in oct: '+octEventDates.length);
				break;
			case 11:
				console.log('Deleting Event with index: '+index+'in array: ' + month);
				nov.splice(index,1);
				novEventDates.splice(index,1);
				
				console.log('Number of event objects in nov: '+nov.length);
				console.log('Number of event DATES in nov: '+novEventDates.length);
				break;
			case 12:
				console.log('Deleting Event with index: '+index+'in array: ' + month);
				dec.splice(index,1);
				decEventDates.splice(index,1);
				
				console.log('Number of event objects in dec: '+dec.length);
				console.log('Number of event DATES in dec: '+decEventDates.length);
				break;
		}
	}; 
}*/