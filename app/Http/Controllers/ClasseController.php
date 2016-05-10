<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Redirect;

class ClasseController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
       return \Auth::user()->classes->toArray();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store(Request $request)
    {
        $newClass = $request->except('_token', 'year');
        $newClass['teacher'] = \Auth::user()->user_id;
        $class = new \App\Classe();
        $class->subject = $newClass['subject'];
        $class->teacher = $newClass['teacher'];
        \Auth::user()->classes()->save($class);
        return Redirect::back()->with('message', 'Class Created!'); // messgae is in session variable 
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show()
    {
        $class = new \App\Classe();
        return $class->getClassList();
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
        $class = \App\Classe::find($id);
        $class->delete();
    }

    public function remove($id){
        $class = \App\Classe::find($id);
        $class->delete();
    }
}
