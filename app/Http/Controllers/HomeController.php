<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class HomeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */

    public function __construct(){

        $this->middleware('auth');
    }

    public function index()
    {
        // Get All classes that user is apart of
        $classes = new ClasseController();
        $classes = $classes->index();

        // Get All announcements for current user
       
        $announ = new AnnouncementController();
        $announcements =  $announ->index();

        
        // Get Users first name
        $first_name = \Auth::user()->first_name;
        
        // Return view with data
        return view('Home/homepage')->with([
            'first_name' => $first_name,
            'announcements' => $announcements,
            'classes' => $classes
        ]);
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
    public function store()
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
        //
    }
}
