<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class NotificationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    // public function index()
    // {
    //     return \Auth::user()->notifications;
    // }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store(Request $request)
    {

        
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function update($id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id)
    {
        $notification = \App\Notification::find($id);
        $notification->delete();
    }

    public function createJoinClassRequest($id){

        $currentUser = \Auth::user();
        $joinClassRequest = new \App\notification();
        $joinClassRequest->user_id_creator = $currentUser->user_id;
        $joinClassRequest->class_id = $id;
        $joinClassRequest->notification_type = "join_request";
        $joinClassRequest->save();

        return \DB::table('notifications')->select('id')->orderBy('id', 'desc')->value('id'); // Return statement is temporary
    }

    public function getJoinClassRequests(){
        $currentUser = \Auth::user();

        if ( !$currentUser ){
            //return Response::make('Not Found', 404);
            return view('front_end/auth/login_view');
        }

        if ( !$currentUser->isTeacher() ){
            return Response::make('Forbidden', 403);
        }
        
        $classes = $currentUser->classes->toArray();
        $joinClassList = array();
        for ($i = 0; $i < count($classes); $i++){
            $class = new \App\Classe($classes[$i]);
            array_push($joinClassList, $class->joinNotifications);
        }
        
        return $joinClassList;
    }
    // Should use this in future!!!
    // $class->users()->attach(user index);
    /**
    *   @param notification id
    *   @return id of new Notification
    */
    public function acceptJoinClassRequest($id) {

        $joinNotification = \App\notification::find($id);

        // Create accpeted join request notification

        $acceptJoinClassRequest = new \App\notification();
        $acceptJoinClassRequest->user_id_creator = \Auth::user()->user_id;
        $acceptJoinClassRequest->class_id = $joinNotification->class_id;
        $acceptJoinClassRequest->notification_type = "join_accept";
        $acceptJoinClassRequest->join_request_owner = $joinNotification->user_id_creator;
        $acceptJoinClassRequest->save();

        // Enroll the requesting user into the respective class
        $user_class = new \App\user_class();
        $user_class->user_id = $acceptJoinClassRequest->join_request_owner;
        $user_class->classe_id = $acceptJoinClassRequest->class_id;
        $user_class->save();
        
        // Delete the original 'join Class Notification'
        $joinNotification->delete();

        // Return the new notification ********* TEMPOARY ********
        return \DB::table('notifications')->select('id')->orderBy('id', 'desc')->value('id');
    }

    public function getAcceptedJoinClassRequest() {

        $acceptedJoinRequests = \DB::table('notifications')->select('*')->where('join_request_owner', \Auth::user()->user_id)->get();
        
        if ( !$acceptedJoinRequests ){
            return Redirect::back()->with('message', 'No Join Requests');
        }

        return $acceptedJoinRequests;
    }

    public function deleteAcceptedJoinClassRequest($id) {

        $notification = \App\Notification::find($id);
        $notification->delete();

    }
}
