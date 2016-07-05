<!------------------------------------------------------------>
<!------------------------------------------------------------>
<!----------------------------TEACHER / STUDENT-------------------------->
<!------------------------------------------------------------>
<!------------------------------------------------------------>

<!DOCTYPE html>
<html lang="en">
	<head>
		<link rel="shortcut icon" href="/assets/Discussion/img/tab_icon.ico">
		<meta charset="utf-8">
	    <meta http-equiv="X-UA-Compatible" content="IE=edge">
	    <meta name="viewport" content="width=device-width, initial-scale=1">
	    <meta name="description" content="">
	    <meta name="author" content="">
	    <meta name="csrf-token" type="hidden" content="{{ csrf_token() }}">
	    <meta name="is_teacher" content="{{$is_teacher}}">
		<link href="/assets/Discussion/css/bootstrap.css" rel="stylesheet">
		<link href="/assets/Discussion/css/animate.css" rel="stylesheet" > 
	    <link href="/assets/Discussion/css/discussion_style.css" rel="stylesheet">
	    <link href="/assets/Discussion/css/common_style.css" rel="stylesheet">	    
	   	<title>DISCUSSION</title>
	</head>
	<body>

	<div class="overlay"></div>

	<div class="pageHeader">
		<div id="xlogo"><img src="/assets/Home/img/xlogo.svg" width="40px"> DISCUSSION</div>
		<!--<div id="xlogo"><img src="/assets/Discussion/img/xlogo.svg" width="40px"> DISCUSSION</div>-->
		<a href="/auth/logout" ><button id="logOut" class="but">LOG OUT</button></a>
	</div>
	


<div id="main-container"><!------MAIN CONTAINER----->


<!----------------------LEFT COLUMN------------------------>

	<div id="left-container">
		<div id="sideBar-container">
		<div id="sideBar">
		<div id="sideBarHome" class="sideBarItem" onclick="location.href='/home';">
			HOME
		</div>
		<div id="home" class="sideBarItem" onclick="location.href='#';">
			DISCUSSION<img id="pointer" src="/assets/Discussion/img/pointer.svg" height="20px">
		</div>
		<div id="grades" class="sideBarItem" onclick="location.href='/home/{{$classId}}/grades';">
			GRADES
		</div>
		<div id="assignments" class="sideBarItem" onclick="location.href='/home/{{$classId}}/assignments';">
			DOCUMENTS
		</div>
		<div id="contact" class="sideBarItem" onclick="location.href='/home/{{$classId}}/contact_me';">
			CONTACT ME
		</div>
		</div>
		</div>

	</div>



<!----------------------MIDDLE COLUMN------------------------>
	<div id="middle-container">
		<div id="discussion-container">
			<div id="discussionList-container">
				<div id="discussionList"></div>
			</div>

			<div id ="createDisc-container">
				<button id="createDiscButton" class="but">OPEN NEW DISCUSSION</button>
			</div>
		</div>
	</div>




<!----------------------RIGHT COLUMN------------------------>

	<div id="right-container">
	<div id="topDisc">
		<div id="discFullDetail-container">
			<div id="discFullDetail"></div>
		</div>

		<div id="comment-container">
			<div id="commentList"></div>
		</div>
	</div>

	<div id="bottomDisc">
		<form id="createNewComment">
			<input type="hidden" name="_token" id="token" value="{{ csrf_token() }}" ></input>
			<div id="commentBox-container">
				<textarea id="commentBox" type="text" name="comment" ></textarea>
			</div>
			<div id="submitButton-container">
				<button id="submitComment" class="but" type="submit">COMMENT</button>
			</div>
		</form>
	</div>
	
	</div>


</div><!--------MAIN CONTAINER ENDS----->










<!----------------------MODALS & MENUS------------------------>
 


<!----------------------MAKE NEW Discussion---------------------->
	<div id="newDiscussion-container">
		<form id="createDiscussionForm">
			<button id="closeNewDiscussion" class="closeButton"></button>
			<input type="hidden" name="_token" id="token" value="{{ csrf_token() }}" ></input>
			<div class="modalHeader">NEW DISCUSSION</div>
			TITLE: <input id="newDiscTitle" type="text"  maxlength="30" name="post_title"></input>
			<div class="modalTitle">DETAILS</div>
			<textarea id="newDiscDetail" cols="50" rows="7" name="discussion_post" type="text"></textarea>
			<button id="submitNewDiscButton" class="but" type="submit">SUBMIT NEW DISCUSSION</button>
		</form>
	</div>


<!------------------------SCRIPTS------------------------------>

	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
	<script src="/assets/Discussion/js/discussionDatabase.js"></script>
	<script src="/assets/Discussion/js/discussion_jquery.js"></script>	
	<script src="/assets/Discussion/js/bootstrap.min.js"></script>
	</body>
</html>