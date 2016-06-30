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
	    <link rel="stylesheet" type="text/css" href="/assets/Assignments/css/main.css">
	    <title>Documents</title>
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
				<div id="grades" class="sideBarItem" onclick="location.href='/home/{{$classId}}/grades';">
					GRADES
				</div>
				<div id="assignments" class="sideBarItem" onclick="location.href='#';">
					DOCUMENTS<img id="pointer" src="/assets/Discussion/img/pointer.svg" height="20px">
				</div>
				<div id="contact" class="sideBarItem" onclick="location.href='/home/{{$classId}}/contact_me/ type="file"';">
					CONTACT ME
				</div>
				</div>
				</div>

			</div>
			<!--TABLE IS VERY TEMPORARY.... NEED TO UPDATE COLUMNS WITH ASSIGNMENT TABLE DATA NOT GRADE DATA-->
			<div id="right-container">
				<div class="container-fluid">
					<h3 class="className">{{$class['subject']}}</h3>
					<div id="fileUpLoad">
						<form action="upload_file" method="POST">
							<input type="hidden" name="_token" id="token" value="{{ csrf_token() }}" ></input>
							<table >
								<tr>
									<td><input required  type="file" /></td>
									<td><button type="submit" id="addDoc">Submit File</button></td>
								</tr>
							</table>
						</form>
					</div>
					@if (count($documents) > 0)
						<table>
							<th>Title</th>
							<th>DownLoad Link</th>
							@foreach ($documents as $doc)
								<td>{{$doc->title}}</td>
								<td>{{$doc->doc_link}}</td>
								<td><a data-id="{{$doc->id}}" class="delete_doc">Delete</a></td>
							@endforeach
						</table>
					@else
						<div id="noDocuments"><p>No Documents</p></div>
					@endif
				</div>	
			</div>
		</div>
			  
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script>
		<script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
		<script type="text/javascript" src="/assets/Assignments/js/script.js"></script>
	</body>
</html>