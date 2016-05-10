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


Route::get('home', 'HomeController@index'); // home Page

Route::get('home/{classId}', function () { // home page of class page -- shows discussion
	if (!\Auth::user()){
		return redirect('front_end/auth/login_view');
	}
	return view('Discussion/index');
});

Route::get('home/{classId}/discussions', 'DiscussionBoardController@getDiscussions'); // Get all discussion from this class
Route::get('home/{classId}/discussions/comments/{disccusionId}', 'DiscussionBoardController@getCommentsForDiscussion'); // Get comments for discussion, disccusionId
Route::get('home/{classId}/discussions/{disccusionId}', 'DiscussionBoardController@getDiscussion');

Route::get('home/{classId}/grades', 'GradesController@index');
Route::get('home/{classId}/assignments', 'AssignmentsController@index');
Route::get('home/{classId}/contact_me', 'PagesController@getContactMe');

Route::controllers([
	'auth' => 'Auth\AuthController',
	'password' => 'Auth\PasswordController',

]);

Route::resource('event', 'EventController');
Route::get('event/remove/{id}', 'EventController@remove');


Route::resource('announcement', 'AnnouncementController');
Route::get('announcement/remove/{id}', 'AnnouncementController@remove');

Route::resource('class', 'ClasseController');
Route::get('class/remove/{id}', 'ClasseController@remove');

Route::resource('profile', 'ProfileController');

//Route::resource('notification', 'NotificationController');
Route::get('notification/create_join_request/{id}', 'NotificationController@createJoinClassRequest');
Route::get('notification/join_class_requests', 'NotificationController@getJoinClassRequests');
Route::get('notification/accept_join_class_request/{id}', 'NotificationController@acceptJoinClassRequest');
Route::get('notification/accepted_join_class_requests', 'NotificationController@getAcceptedJoinClassRequest');
Route::delete('notification/delete_accepted_join_class_request/{id}', 'NotificationController@deleteAcceptedJoinClassRequest');



