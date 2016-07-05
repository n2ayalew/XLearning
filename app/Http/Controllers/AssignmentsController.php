<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Input;

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
        if (\Auth::user()->is_teacher) {
            return view('Assignments/index')->with([
                'classId' => $classId,
                'class' => $class,
                'documents' => $documents
            ]);
        } else {
            return view('Assignments/index_student')->with([
                'classId' => $classId,
                'class' => $class,
                'documents' => $documents
            ]);
        }
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
        $file = Input::file('fileUpload');
        $path = public_path() . '/documents/';
        $file->move($path, $file->getClientOriginalName());
        $doc = new \App\document();
        $doc->teacher = \Auth::user()->user_id;
        $doc->doc_link = '/documents/' . $file->getClientOriginalName();
        $doc->doc_title = $request->doc_title; //$file->getClientOriginalName();
        $class->documents()->save($doc);

        return Redirect::back()->with('flash_message', 'File Successfully Uploaded');

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
        unlink(public_path() . $doc->doc_link);
        $doc->delete();
    }
}
