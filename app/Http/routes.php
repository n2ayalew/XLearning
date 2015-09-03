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
    	return redirect('home');
    }
 	return view('front_end/auth/login_view');
 });

Route::resource('event', 'EventController');

Route::get('home', 'HomeController@index'); // class Page

Route::controllers([
	'auth' => 'Auth\AuthController',
	'password' => 'Auth\PasswordController',

]);


Route::resource('announcement', 'AnnouncementController');
Route::resource('class', 'ClasseController');
Route::resource('profile', 'ProfileController');
Route::resource('notification', 'NotificationController');



