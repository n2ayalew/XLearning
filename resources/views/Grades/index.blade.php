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
				<div id="grades" class="sideBarItem" onclick="location.href='#';">
					GRADES<img id="pointer" src="/assets/Discussion/img/pointer.svg" height="20px">
				</div>
				<div id="assignments" class="sideBarItem" onclick="location.href='#';">
					ASSIGNMENTS
				</div>
				<div id="contact" class="sideBarItem" onclick="location.href='/home/{{$classId}}/contact_me';">
					CONTACT ME
				</div>
				</div>
				</div>

			</div>
			<!--TABLE IS VERY TEMPORARY.... NEED TO UPDATE COLUMNS WITH ASSIGNMENT TABLE DATA NOT GRADE DATA-->
			<div id="right-container">
				<div class="container-fluid">
					<h3 class="className">{{$class['subject']}}</h3> <button id="addTest">Add Assessment</button>
					<table class="table table-hover">
						<thead>
							<tr>
								<th>Name</th>
								@foreach ($user_with_most_grades['class_grades'] as $grade) 
									<th>{{$grade->title}}</th> 
								@endforeach
								<th></th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							@foreach ($users as $user)
								<tr>
									<td>{{$user['first_name']}} {{$user['last_name']}}</td>
									@foreach($user['class_grades'] as $grade)
										@if (!$grade)
											<td contenteditable="true" class="gradeEntry" id="grade-{{$grade->id}}" data-user-id="{{$user['user_id']}}">N/A</td>
										@else
											<td contenteditable="true" class="gradeEntry" id="grade-{{$grade->id}}" data-user-id="{{$user['user_id']}}">{{$grade->grade}}</td>
										@endif
									@endforeach
								<tr>
							@endforeach
						</tbody>
					</table>
					<button id="saveChangesBtn">Save</button>
				</div>
			</div>
		</div>	
	</body>
</html>