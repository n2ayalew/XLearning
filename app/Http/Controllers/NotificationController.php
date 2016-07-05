<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Input;
use Illuminate\Routing\Redirector;

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
        $joins = \App\notification::where('class_id', $id)->where('notification_type', 'join_request')->where('user_id_creator', $currentUser->user_id)->get()->toArray();
        
        if (count($joins) > 0){
            return  Redirect::back();
        }
    
        $joinClassRequest = new \App\notification();
        $joinClassRequest->user_id_creator = $currentUser->user_id;
        $joinClassRequest->class_id = $id;
        $joinClassRequest->notification_type = "join_request";
        $joinClassRequest->save();

        return redirect()->action('HomeController@index');
        //return \DB::table('notifications')->select('id')->orderBy('id', 'desc')->value('id'); // Return statement is temporary
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
            $nots = $class->joinNotifications;
            foreach ($nots as $n) {
                $n['studentName'] = $n->user->first_name . ' ' . $n->user->last_name;
                $n['className'] = $n->classe->subject;
            }
            array_push($joinClassList, $nots);
        }
        //dd($joinClassList);
        return $joinClassList;
    }
    // Should use this in future!!!
    // $class->users()->attach(user index);
    /**
    *   @param notification id
    *   @return id of new Notification
    */
    public function acceptJoinClassRequest($id) {
        $currentUser = \Auth::user();
        if ( !$currentUser->isTeacher() ){
            return Response::make('Forbidden', 403);
        }

        $joinNotification = \App\notification::find($id);

        // Create accpeted join request notification

        // $acceptJoinClassRequest = new \App\notification();
        // $acceptJoinClassRequest->user_id_creator = \Auth::user()->user_id;
        // $acceptJoinClassRequest->class_id = $joinNotification->class_id;
        // $acceptJoinClassRequest->notification_type = "join_accept";
        // $acceptJoinClassRequest->join_request_owner = $joinNotification->user_id_creator;
        // $acceptJoinClassRequest->save();

        // Enroll the requesting user into the respective class
        $user_class = new \App\user_class();
        $user_class->user_id = $joinNotification->user_id_creator;
        $user_class->class_id = $joinNotification->class_id;
        $user_class->save();
        
        // Delete the original 'join Class Notification'
        $joinNotification->delete();

        // Return the new notification ********* TEMPOARY ********
        return "Success";
        //return \DB::table('notifications')->select('id')->orderBy('id', 'desc')->value('id');
    }

    public function declineJoinClassRequest($id) {
        $notification = \App\notification::find($id);
        $notification->delete();
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
