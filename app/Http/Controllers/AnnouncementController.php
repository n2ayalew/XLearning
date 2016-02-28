<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Redirect;

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
        $cs = array();
        $announcements = array();
        $announcements2 = array();
        $a = 0;
        for ($i = 0; $i < count($classes); $i++){
            $c = new \App\Classe($classes[$i]);
            array_push($cs, $c);
            //array_push($announcements, $c->announcements);
            for ($j = 0; $j < count($c->announcements); $j++){
                array_push($announcements, $c->announcements[$j]);

            }
        }

        return array(
            'classes' => $classes,
            'announcements' => $announcements
        );
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
        $announcement = new \App\Announcement();
        $announcement->announcement = $fields['announcement'];
        $announcement->teacher = $fields['teacher'];
        $announcement->classe_id = $fields['class_id'];
        $announcement->save();
        $announId = \DB::table('announcements')->select('id')->orderBy('id', 'desc')->value('id');
        return $announId;
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
        $announcement = \App\Announcement::find($id);
        if ( \Auth::user()->user_id != $announcement->teacher){
            return "Only the teacher that created this announcement may delete it!"; 
        }
        $announcement->delete();
    }

    public function remove($id){
        $announcement = \App\Announcement::find($id);
        if ( \Auth::user()->user_id != $announcement->teacher){
            return "Only the teacher that created this announcement may delete it!"; 
        }
        $announcement->delete();
    }
}
