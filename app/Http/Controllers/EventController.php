<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Http\Response;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        
        return \Auth::user()->events->toArray();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create()
    {
        
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store(Request $request)
    {
        $fields = $request->except('_token');
        $time = explode(':',$fields['event_time']);
        $fields['event_time'] = ($time[0] * 60) + $time[1];
        $fields['user_id'] = \Auth::user()->user_id;
        $fields['teacher'] = \Auth::user()->user_id;
        $fields['classe_id'] = 3; // temporary.. we need to find populate the list on the modal with certain class ids
        $newEvent = new \App\Event();
        $newEvent->user_id = \Auth::user()->user_id;
        $newEvent->teacher = \Auth::user()->user_id;; //$fields['teacher'];
        $newEvent->event = $fields['event'];
        $newEvent->event_date = $fields['event_date'];
        $newEvent->event_time = $fields['event_time'];
        $classEvent = \App\Classe::where('class_id', 3)->first();
        $newEvent->classe()->associate($classEvent);
        \Auth::user()->events()->save($newEvent);
        $user_id = DB::table('events')->select('id')->orderBy('id', 'desc')->pluck('id');
        return $user_id;
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
        //
    }
}
