<!------------------------CALENDAR---------------------------->
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
	    <meta http-equiv="X-UA-Compatible" content="IE=edge">
	    <meta name="viewport" content="width=device-width, initial-scale=1">
	    <meta name="description" content="">
	    <meta name="author" content="">
		<link href="/assets/Calendar/css/bootstrap.css" rel="stylesheet" type="text/css">
		<link href="/assets/Calendar/css/animate.css" rel="stylesheet" type="text/css"> 
	    <link href="/assets/Calendar/css/calendar_style.css" rel="stylesheet" type="text/css">
	    <link href="/assets/Calendar/css/class_style.css" rel="stylesheet" type="text/css">
	    <link href="/assets/Calendar/css/profile_style.css" rel="stylesheet" type="text/css">
	    <link href="/assets/Calendar/css/common_style.css" rel="stylesheet" type="text/css">	    
	   	<title>XLearning Calendar</title>
	</head>
	<body>

	<div class="overlay"></div>

	<div class="pageHeader">
		<div id="xlogo"><img src="/assets/Calendar/img/xlogo.svg" width="60px"></div>
	</div>

	<div id="left-container">
		<div id="userProfile-container">
			<div id="userIcon-container">
				<div id="userIcon"></div>
					<div></div>
			</div>
		</div>
	</div>

	<div id="right-container">
		<div id="calendar-container">
	        <div id="calendar-header">
	        <table id="bigHeader">
	            <tr>
	            	<td id="prev"><img id="previousButton" src="/assets/Calendar/img/previous.svg" width="10px"></td>
	                <td id="calendar-month-year"></td>
	                <td id="nxt"><img id="nextButton" src="/assets/Calendar/img/next.svg" width="10px"></td>
	            </tr>
	    	</table>
	        </div>

	        <div id="calendar-dates">
	        </div>
	    </div>

	    <div id="eventList-container">
	    	<button id="createNewEventButton">NEW</button>
	    	<div id="eventList-innercontainer">
		    	<div id="eventList-header">EVENTS TODAY 
		    	</div>

				<div id="eventList">
				</div>
			</div>
		</div>

	</div>

    <div id="newEvent-container">
    	<button id='closeNewEvent'></button>
        <div id="defaultEvent">NEW EVENT TODAY </div>
        <input id="newEventTitle" type="text" placeholder="TITTLE" maxlength="25"></input>
        <input id="newEventTime" type="time"></input>
        <br>

        <div id="newEventClassContainer">
			<select id="newEventClass">
			  <option value="0">Select Class</option>
			  <option value="1">Class 1</option>
			  <option value="2">Class 2</option>
			  <option value="3">Class 3</option>
			  <option value="4">Class 4</option>
			</select>
		</div>

        <button id="addEventButton">ADD EVENT</button>
    </div>

	<script src="/assets/Calendar/js/script.js"></script>
	<script src="/assets/Calendar/js/calendar_javascript.js"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
		<script type="/assets/Calendar/js/tinysort.js"></script>
	<script type="/assets/Calendar/js/jquery.tinysort.js"></script>
	<script src="/assets/Calendar/js/eventDataStructure.js"></script>
	<script src="/assets/Calendar/js/profile_jquery.js"></script>
	<script src="/assets/Calendar/js/calendar_jquery.js"></script>	
	<script src="/assets/Calendar/js/bootstrap.min.js"></script>
	</body>
</html>