<!DOCTYPE html>
<html lang="en">
	<head>
		<link rel="shortcut icon" href="assets/auth/img/tab_icon.ico">
		<meta charset="UTF-8">
	    <meta http-equiv="X-UA-Compatible" content="IE=edge">
	    <meta name="viewport" content="width=device-width, initial-scale=1">
	    <meta name="description" content="">
	    <meta name="author" content="">
		<link href="/assets/auth/css/bootstrap.css" rel="stylesheet" type="text/css">
		<link href="/assets/auth/css/animate.css" rel="stylesheet" > 
	    <link href="/assets/auth/css/style.css" rel="stylesheet">


	    <title>XLearning</title>
</head>
	@if ($errors->any())
		<ul class="alert alert-danger">
			@foreach ($errors->all() as $error)
				<li>{{$error}}</li>
			@endforeach
		</ul>
	@endif
	<body>
		 <!--Change log out message/ invalid crendtial message location-->
		@if (Session::get('flash_message'))
			<div class="title" color="red">
				{{Session::get('flash_message')}}
			</div>
		@endif
	<div id="welcome">
		<div id= "header">
			<div id="title" >XLEARNING</div>
			
			<div id="brackets">
				<img src="/assets/auth/img/brackets.svg" width="2700px">
			</div>
		</div>

		<div id="logo">
			<div id="icon">
				<img src="assets/auth/img/xlogo.svg" width="100px">
			</div>
		</div>
		
		<div id="menu">
			<!--Change form to use blade templating so that we can prepopulate and stuff-->
			<form id="loginForm" method="POST" action="/auth/login">
				<input type="hidden" name="_token" value="{{ csrf_token() }}">
				Student ID:<br> <input type="text" id="student_id" name="student_id"><br>
				Password:<br> <input type="password" id="password" name="password"><br>
				<button id="button1" type="submit">Login</button>
				<button id="button2" type="button">Register</button>
				<a href="/password/email" id="forgotPassword">Forgot Your Password?</a>
			</form>
		</div>
	</div>




	<div id="teacherOrStudent">	
		<p id="who">Who are you?</p>
				<div id="studentButton">
					<button id="SB"></button><br>
					Student 
				
				</div>
				<div id="teacherButton">
					<button id="TB"></button><br>
					Teacher
		</div>
	</div>





	<div id="registrationStudent">
		<div id="container">
			<form id="registrationForm" method="POST" action="/auth/register">
				<input type="hidden" name="_token" value="{{ csrf_token() }}">
				<input type="hidden" name="is_teacher">
				<p class="col-lg-6 col-md-6 col-sm-6 col-xs-12 desc">Student ID: </p>
				<input type="text" id="student_id" name="student_id" class="col-lg-6 col-md-6 col-sm-6 col-xs-12 desc">

				<p class="col-lg-6 col-md-6 col-sm-6 col-xs-12 desc">First Name: </p>
				<input type="text" id="first_name" name="first_name" class="col-lg-6 col-md-6 col-sm-6 col-xs-12 desc">

				<p class="col-lg-6 col-md-6 col-sm-6 col-xs-12 desc">Last Name: </p>
				<input type="text" id="last_name" name="last_name" class="col-lg-6 col-md-6 col-sm-6 col-xs-12 desc">

				<!--<p class="col-lg-6 col-md-6 col-sm-6 col-xs-12 desc">Email: </p>
				<input type="text" id="emailS" class="col-lg-6 col-md-6 col-sm-6 col-xs-12 desc">-->

				<p class="col-lg-6 col-md-6 col-sm-6 col-xs-12 desc">Password: </p>
				<input type="password" id="password" name="password" class="col-lg-6 col-md-6 col-sm-6 col-xs-12 desc">

				<p class="col-lg-6 col-md-6 col-sm-6 col-xs-12 desc">Comfirm Password: </p>
				<input type="password" id="password_confirmation" name="password_confirmation" class="col-lg-6 col-md-6 col-sm-6 col-xs-12 desc">

				<button id="button3" type="submit">Done</button>
			</form>
		</div>
	</div>



	<div id="registrationTeacher">
		<div id="container">
			<form id="registrationForm" method="POST" action="/auth/register">
				<input type="hidden" name="_token" value="{{ csrf_token() }}">
				<input type="hidden" id="is_teacher" name="is_teacher" value="true">
				<p class="col-lg-6 col-md-6 col-sm-6 col-xs-12 desc">First Name: </p>
				<input type="text" id="first_name" name="first_name" class="col-lg-6 col-md-6 col-sm-6 col-xs-12 desc">

				<p class="col-lg-6 col-md-6 col-sm-6 col-xs-12 desc">Last Name: </p>
				<input type="text" id="last_name" name="last_name" class="col-lg-6 col-md-6 col-sm-6 col-xs-12 desc">

				<p class="col-lg-6 col-md-6 col-sm-6 col-xs-12 desc">Email: </p>
				<input type="text" id="email" name="email" class="col-lg-6 col-md-6 col-sm-6 col-xs-12 desc">

				<p class="col-lg-6 col-md-6 col-sm-6 col-xs-12 desc">Password: </p>
				<input type="password" id="password" name="password" class="col-lg-6 col-md-6 col-sm-6 col-xs-12 desc">

				<p class="col-lg-6 col-md-6 col-sm-6 col-xs-12 desc">Comfirm Password: </p>
				<input type="password" id="password_confirmation" name="password_confirmation" class="col-lg-6 col-md-6 col-sm-6 col-xs-12 desc">

				<button id="button4" type="submit">Done</button>
			</form>
		</div>
	</div>



	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
	<script src="/assets/auth/js/script.js"></script>
    <script src="/assets/auth/js/bootstrap.min.js"></script>	
</html>