<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class AnnouncementController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        // Get All announcements for current user
        $classes = \Auth::user()->classes->toArray();
        $ar = array();
        foreach ($classes as $key) {
            array_push($ar, strval($key['class_id']));
        }
        $announcements = array();

        foreach($ar as $key){
            $announcements[$key] = \DB::table('announcements')->where('class_id', $key)->get();
        }
        $announList = array();
        foreach ($announcements as $key => $value) {
            foreach ($value as $annun => $text) {
                array_push($announList, $text);
            }
        }
        return $announList;
    }

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
        $fields = $request->except('_token');
        $fields['teacher'] = \Auth::user()->user_id;
        $fields['class_id'] = 3; // temporary!!! remove soon
        $announcement = new \App\Announcement();
        $announcement->announcement = $fields['announcement'];
        $announcement->teacher = $fields['teacher'];
        $announcement->class_id = $fields['class_id'];
        $announcement->save();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id)
    {
        return \DB::table('announcements')->select('announcement')->where('id', $id)->first();
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
        $announcement = App\Announcement::find($id);
        $announcement->delete();
    }
}
