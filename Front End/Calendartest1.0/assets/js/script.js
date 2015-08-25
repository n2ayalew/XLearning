//=============================GLOBAL VARIABLES====================================//
//Data is for the current date and month and year.

    var d = new Date();
    var month_name = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    var month_ = d.getMonth();   
    // get something like : 0-11
    var year_ = d.getFullYear(); 
    // get something like : 2014
    var first_date = month_name[month_] + " " + 1 + " " + year_;
    // get something like : September 1 2014
    var temp_ = new Date(first_date).toDateString();
    // get something like : Mon Sep 01 2014 ...
    var first_day = temp_.substring(0, 3);    //Mon
    var day_name = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    var first_day_index = day_name.indexOf(first_day);   //1
    var no_days = new Date(year_, month_+1, 0).getDate();    //30
    // get something like : Tue Sep 30 2014 ...

//============================INTERACTIVE CALENDAR================================//    
window.onload = function(){
    //var calendar = createCalendar(2 , 2016);
    var calendar = generateCalendarTable(first_day_index, no_days, month_+1, year_);
    document.getElementById("calendar-month-year").innerHTML = month_name[month_]+" "+year_;
    document.getElementById("calendar-dates").appendChild(calendar);
}
//===========================CREATE CALENDAR ===========================//
//  Take as parameters the month index, e.g: for february its 2 & the year. 
//  It returns a calendar object (DOM table).

function createCalendar(monthIndex, year) {
  var monthName = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  var firstDate = monthName[monthIndex-1] + " " + 1 + " " + year;
  var temp = new Date(firstDate).toDateString();
  //alert(temp);
  var firstDay = temp.substring(0, 3);
  var dayNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  var firstDayIndex = dayNames.indexOf(firstDay); 
  //alert(firstDayIndex); 
  var days = new Date(year, monthIndex, 0).getDate(); 
  return generateCalendarTable(firstDayIndex, days, monthIndex, year);
}

//===========================GENERATE CALENDAR TABLE===========================//
//  Take as parameters the index of the first day of month , e.g: Sunday = 0, Monday = 1,
//  number of days in the month, month index and year.
//  It returns a calendar object (DOM table).

function generateCalendarTable(firstDayIndex, days, monthIndex, yearIndex){
    var table = document.createElement('table');
    var tr = document.createElement('tr');
    //row for the day letters
    for(var c=0; c<=6; c++){
        var td = document.createElement('td');
        var dayNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
        td.setAttribute("id", dayNames[c]);
        td.setAttribute("class", "dayNames");
        td.innerHTML = dayNames[c];
        tr.appendChild(td);
    }
    table.appendChild(tr);
    
    //create 2nd row
    tr = document.createElement('tr');
    var c;
    for(c=0; c<=6; c++){
        if(c == firstDayIndex){
            break;
        }
        var td = document.createElement('td');
        td.setAttribute("class", "emptySlot");
        td.innerHTML = "";
        tr.appendChild(td);
    }
    
    var count = 1;
    for(; c<=6; c++){
        var td = document.createElement('td');
        td.setAttribute("id", count + ":" + monthIndex + ":" + yearIndex);
        td.setAttribute("class", "dateElement");
        td.innerHTML = count;
        count++;
        tr.appendChild(td);
    }
    table.appendChild(tr);
    
    //rest of the date rows
    for(var r=3; r<=7; r++){
        tr = document.createElement('tr');
        for(var c=0; c<=6; c++){
            if(count > days){
                table.appendChild(tr);
                return table;
            }
            var td = document.createElement('td');
            td.setAttribute("id", count + ":" + monthIndex + ":" + yearIndex);
            td.setAttribute("class", "dateElement");
            td.innerHTML = count;
            count++;
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
  return table;
}