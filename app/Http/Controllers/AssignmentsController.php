<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class AssignmentsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index($classId)
    {
        $class = \App\Classe::find($classId);
        $documents = $class->documents->toArray();
        return view('Assignments/index')->with([
            'classId' => $classId,
            'class' => $class,
            'documents' => $documents
        ]);
    }

    public function update($classId, $id)
    {

    }

    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store($classId, Request $request)
    {
        $class = \App\Classe::find($classId);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($classId, $id)
    {
        $doc = \App\document::find($id);
        $doc->delete();
    }
}
