<!------------------------CALENDAR---------------------------->
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
	    <meta http-equiv="X-UA-Compatible" content="IE=edge">
	    <meta name="viewport" content="width=device-width, initial-scale=1">
	    <meta name="description" content="">
	    <meta name="author" content="">
	    <meta name="csrf_token" content="{{ csrf_token() }}">
		<link href="assets/Home/css/bootstrap.css" rel="stylesheet">
		<link href="assets/Home/css/animate.css" rel="stylesheet" > 
	    <link href="assets/Home/css/calendar_style.css" rel="stylesheet">
	    <link href="assets/Home/css/class_style.css" rel="stylesheet">
	    <link href="assets/Home/css/profile_style.css" rel="stylesheet">
	    <link href="assets/Home/css/notice_style.css" rel="stylesheet">
	    <link href="assets/Home/css/common_style.css" rel="stylesheet">	    
	   	<title>calendar</title>
	</head>
	<body>

	<div class="overlay"></div>

	<div class="pageHeader">
		<div id="xlogo"><img src="assets/Home/img/xlogo.svg" width="40px"> HOME</div>
		<a href="auth/logout"><button id="logOut" class="but" >LOG OUT</button></a>
	</div>
	
	<div id="main-container"><!------MAIN CONTAINER------>
	
<!----------------------LEFT COLUMN------------------------>

	<div id="left-container">
		<div id="userProfile-container">
			<div id="userIcon-container">
				<div id="userIcon"></div>
			</div>
			<div id="user-container">
			<div id ="userName">{{ $first_name }}</div>
			<button id="settingButton" class="but">SETTINGS</button>
			</div>
		</div>

		<div id="noticeBoard-container">
			<div id="noticeBoard-header" class="container-header">ANNOUNCEMENTS
				<button id="newNoticeButton" class="but">+</button>
			</div>
			<div id="noticeList">
				@foreach ($announcements as $announ)
					 <div class="classElement"> {{ $announ->announcement }} </div>
				@endforeach
			</div>

		</div>
	</div>



<!----------------------MIDDLE COLUMN------------------------>
	<div id="middle-container">

		<div id="classList-container">
			<div id="classList-header" class="container-header">YOUR CLASSES</div>
			<div id="classList"></div>
			<div id="classList-footer">
				<button id="createNewClassButton" class="but">CREATE NEW CLASS</button>
			</div>
		</div>

		<div id="joinRequestMini-container">
			
			<div id="joinRequestMini-header" class="container-header">
				<div id="joinRequest-counter" class="counter"></div>
				JOIN REQUESTS
			</div>

			<div id="joinRequestList"></div>

		</div>

	</div>




<!----------------------RIGHT COLUMN------------------------>

	<div id="right-container">
		<div id="calendar-container">
	        <div id="calendar-header">
	        <table id="bigHeader">
	            <tr>
	            	<td id="prev"><img id="previousButton" src="assets/Home/img/previous.svg" width="10px"></td>
	                <td id="calendar-month-year"></td>
	                <td id="nxt"><img id="nextButton" src="assets/Home/img/next.svg" width="10px"></td>
	            </tr>
	    	</table>
	        </div>

	        <div id="calendar-dates">
	        </div>
	    </div>

	    <div id="eventList-container">
	    	<button id="createNewEventButton" class="but">+</button>
	    	<div id="eventList-innercontainer">
		    	<div id="eventList-header">EVENTS TODAY 
		    	</div>

				<div id="eventList">
				</div>
			</div>
		</div>

	</div>


	</div><!--------MAIN CONTAINER ENDS----->










<!----------------------MODALS & MENUS------------------------>
 
<!----------------------CREATE NEW EVENT---------------------->
	<div id="newEvent-container">
	    <button id='closeNewEvent'  class="closeButton"></button>
	    <form id="createEventForm" method="POST" action="/event">
	    	<input type="hidden" name="_token" id="token" value="{{ csrf_token() }}">
	        <div id="defaultEvent" class="modalHeader">NEW EVENT TODAY </div>
	        <div id="miniAlert1" class="miniAlert"></div>
	        <input id="newEventTitle" type="text" placeholder="TITTLE" maxlength="25" name="event_title"></input>
	        <input id="newEventTime" type="time" name="event_time"></input>
	        <br>

	        <div id="newEventClassContainer">
				<select id="newEventClassPicker" name="class_id">
				  <option value="0">Select Class</option>
				</select>
			</div>

	        <button id="addEventButton" class="but" type="submit">ADD EVENT</button>
	    </form>
	</div>


<!----------------------SETTINGS---------------------->
	<div id="settings-container">
			<button id="closeSettings"  class="closeButton"></button>
			<div id="settingsHeader" class="modalHeader">USER SETTINGS</div>
			<div id="miniAlert2" class="miniAlert"></div>
			<div id="changeName-container">
			<form>
				<input type="hidden" name="_token" value="{{ csrf_token() }}">
				<div class="title">CHANGE USER NAME</div>
				NEW NAME: <input id="newName" type="text"></input><br>
				<button id="submitNewName" class="but" type="submit">CHANGE</button>
			</form>
			</div>
			<div id="changeEmail-container">
			<form method="POST" action="/profile">
				<input type="hidden" name="_token" value="{{ csrf_token() }}">
				<div class="title">CHANGE/ADD USER EMAIL</div>
					NEW EMAIL: <input id="newEmail" type="email" name="email"><br>
					<input type="submit" id="submitNewEmail" class="but" value="CHANGE">
			</form>
			</div>
			<div id="changePassword-container">
			<form method="POST" action="/profile">
				<input type="hidden" name="_token" value="{{ csrf_token() }}">
				<div class="title">CHANGE USER PASSWORD</div>
				OLD PASSWORD: <input id="oldPassword" type="password" name="oldPassword"></input><br>
				NEW PASSWORD: <input id="newPassword" type="password" name="password"></input><br>
				CONFIRM PASSWORD: <input id="confirmNewPassword" type="password" name="newConfirmPassword"></input><br>
				<button id="submitNewPassword" class="but">CHANGE</button>
			</form>
			</div>
	</div>


<!----------------------MAKE NEW ANNOUNCEMENT---------------------->
		<div id="newNotice-container">
			<button id="closeNewNotice" class="closeButton"></button>
			<form id="newAnnouncementForm">
				<input type="hidden" name="_token" value="{{ csrf_token() }}">

				<div id="newNotice" class="modalHeader">NEW ANNOUCEMENT</div>

				<div id="miniAlert4" class="miniAlert"></div>

				<div id="announcement-container">
					<div class="title">WRITE YOUR MESSAGE</div>
					<textarea id="announcement" type="text" cols="50" rows="7" name="announcement"></textarea>
				</div>

				<div id="newNoticeClassContainer">
					<div class="title">CHOOSE CLASS</div>
					<select id="newNoticeClassPicker" name="class_id">
					  <option value="0">Select Class</option>
					</select>
				</div>

				<button id="submitNewNotice" class="but" type="submit">POST</button>
		</form>
		</div>




<!----------------------CREATE NEW CLASS---------------------->
	<form method="POST" action="/class">
		<div id="createNewClass-container">
			<input type="hidden" name="_token" value="{{ csrf_token() }}">
			<button id="closeCreateNewClass" class="closeButton"></button>
			<div id="createNewClassHeader" class="modalHeader">CREATE NEW CLASS</div>
			<div id="miniAlert3" class="miniAlert"></div>
			<div id="chooseClassName-container">
				<div class="title">CHOOSE CLASS NAME</div>
				CLASS NAME: <input id="newClassName" type="text" name="subject"></input><br>
			</div>
			<div id="chooseClassYear-container">
				<div class="title">CHOOSE YEAR</div>
				CLASS YEAR: <input id="newClassYear" type="text" name="year"></input><br>
			</div>
			<button id="submitNewClass" class="but" type="submit">CREATE</button>
		</div>
	</form>


<!------------------------SCRIPTS------------------------------>

	<script src="assets/Home/js/calendar_javascript.js"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
	<script src="assets/Home/js/script.js"></script>
	<script src="assets/Home/js/classDatabase.js"></script>
	<script src="assets/Home/js/classes_jquery.js"></script>
	<script src="assets/Home/js/eventDataStructure.js"></script>
	<!--<script src="assets/Home/js/classDatabase.js"></script>-->
	<script src="assets/Home/js/noticeDatabase.js"></script>
	<script src="assets/Home/js/profile_jquery.js"></script>
	<script src="assets/Home/js/notice_jquery.js"></script>	
	<!--<script src="assets/Home/js/classes_jquery.js"></script>-->
	<script src="assets/Home/js/calendar_jquery.js"></script>	
	<script src="assets/Home/js/bootstrap.min.js"></script>
	</body>
</html>