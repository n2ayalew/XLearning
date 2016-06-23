<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
	    <meta http-equiv="X-UA-Compatible" content="IE=edge">
	    <meta name="viewport" content="width=device-width, initial-scale=1">
	    <meta name="description" content="">
	    <meta name="author" content="Nathniel Ayalew">
	    <meta name="csrf_token" content="{{ csrf_token() }}">
	    <link href="/assets/Discussion/css/bootstrap.css" rel="stylesheet">
		<link href="/assets/Discussion/css/animate.css" rel="stylesheet" >
	    <link rel="stylesheet" type="text/css" href="/assets/Contact/css/main.css">
	    <title>GRADES</title>
	</head>
	<body>
		<div class="overlay"></div>

		<div class="pageHeader">
			<div id="xlogo"><img src="/assets/Home/img/xlogo.svg" width="40px">Grades</div>
			<a href="/auth/logout" ><button id="logOut" class="but">LOG OUT</button></a>
		</div>
		<!----------------------LEFT COLUMN------------------------>
		<div id="main-container">
			<div id="left-container">
				<div id="sideBar-container">
				<div id="sideBar">
				<div id="sideBarHome" class="sideBarItem" onclick="location.href='/home';">
					HOME
				</div>
				<div id="home" class="sideBarItem" onclick="location.href='/home/{{$classId}}';">
					DISCUSSION
				</div>
				<div id="grades" class="sideBarItem" onclick="location.href='/home/{{$classId}}/grades';">
					GRADES
				</div>
				<div id="assignments" class="sideBarItem" onclick="location.href='#';">
					ASSIGNMENTS
				</div>
				<div id="contact" class="sideBarItem">
					CONTACT ME<img id="pointer" src="/assets/Discussion/img/pointer.svg" height="20px">
				</div>
				</div>
				</div>

			</div>
			<div id="right-container">
				<h3 class="className">{{$class['subject']}}</h3>
				<div id="content">
					<h1>{{$teacher['first_name']}} {{$teacher['last_name']}}</h1>
					<h4>Email: {{$teacher['email']}}</h4>
				</div>
			</div>
			
		</div>	
	</body>
</html>