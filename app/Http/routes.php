<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
	if (\Auth::user()){
    	return view('welcome');
    }
 	return view('front_end/auth/login_view');
 });

Route::get('forgot-password', function (){
	return view('auth/forgot_password');
});
Route::get('home', 'HomeController@index'); // class Page

// Return Current Month
Route::get('{class}/calendar', 'CalendarController@index');

// Return Month with Given Date
Route::get('{class}/calendar/{day}-{month}', 'CalendarController@show');


Route::controllers([
	'auth' => 'Auth\AuthController',
	'password' => 'Auth\PasswordController',

]);



