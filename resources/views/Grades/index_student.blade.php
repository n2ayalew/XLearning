<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
	    <!-- <meta http-equiv="X-UA-Compatible" content="IE=edge"> -->
	    <meta name="viewport" content="width=device-width, initial-scale=1">
	    <meta name="description" content="">
	    <meta name="author" content="Nathniel Ayalew">
	    <meta name="csrf_token" content="{{ csrf_token() }}">
	    <link href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet">
	    <link rel="stylesheet" type="text/css" href="/assets/Grades/css/main.css">
	    <title>GRADES</title>
	</head>
	<body>
		<div class="overlay"></div>

		<div class="pageHeader">
			<div id="xlogo"><img src="/assets/Home/img/xlogo.svg" width="40px">Grades</div>
			<a href="/auth/logout" ><button id="logOut" class="but">LOG OUT</button></a>
		</div>
		<!----------------------LEFT COLUMN------------------------>
		<div id="main-container" class="container">
			<div id="left-container">
				<div id="sideBar-container">
				<div id="sideBar">
				<div id="sideBarHome" class="sideBarItem" onclick="location.href='/home';">
					HOME
				</div>
				<div id="home" class="sideBarItem" onclick="location.href='/home/{{$classId}}/';">
					DISCUSSION
				</div>
				<div id="grades" class="sideBarItem" onclick="location.href='#';">
					GRADES<img id="pointer" src="/assets/Discussion/img/pointer.svg" height="20px">
				</div>
				<div id="assignments" class="sideBarItem" onclick="location.href='/home/{{$classId}}/assignments';">
					DOCUMENTS
				</div>
				<div id="contact" class="sideBarItem" onclick="location.href='/home/{{$classId}}/contact_me/';">
					CONTACT ME
				</div>
				</div>
				</div>

			</div>
			<!--TABLE IS VERY TEMPORARY.... NEED TO UPDATE COLUMNS WITH ASSIGNMENT TABLE DATA NOT GRADE DATA-->
			<div id="right-container">
				<div class="container-fluid">
					<h3 class="className">{{$class['subject']}}</h3>
					@if (!$grades)
						<div id="noGrades"><p>No Grades</p></div>
					@else
						<table class="table table-hover">
						<thead>
							<tr>
								<th>Title</th>
								<th>Grade</th>
								<th></th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							@foreach ($grades as $grade)
								<tr>
									<td>{{$grade['title']}}</td>
									<td>{{$grade['grade']}}</td>
								<tr>
							@endforeach
						</tbody>
					</table>
					<button id="saveChangesBtn">Save</button>
					@endif
				</div>
			</div>
		</div>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script>
		<script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
	</body>
</html>