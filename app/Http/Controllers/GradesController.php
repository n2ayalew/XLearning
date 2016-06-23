<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class GradesController extends Controller
{

    public function __construct(){

        $this->middleware('auth');
    }

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    // Tested in tinker!!!
    public function index($classId)
    {
        if (\Auth::user()->is_teacher){
            // Get all classes
            // Get students in those classes
            // return grades for every student in each class
            $class = \App\Classe::find($classId);
            $grades = $class->grades->toArray();
            $users = $class->users->toArray();
            $maxGrade = 0;
            $newUsers = array();
            foreach ($users as $user) {
                $tmp_grades = \DB::select('select * from grades where user_id=? AND class_id=? ORDER BY id', [$user['user_id'],$classId]);
                if ($tmp_grades) {
                    $user['class_grades'] = $tmp_grades;
                    if (count($tmp_grades) > $maxGrade){
                        $maxGrade = count($tmp_grades);
                        $user_with_most_grades = $user;
                    }
                } else {
                    $user['class_grades'] = [];
                }
                if (!$user['is_teacher']){
                    array_push($newUsers, $user);
                }
            }
            $users = $newUsers;
            return view('Grades/index')->with([
            'classId' => $classId,
            'grades' => $class->grades->toArray(),
            'class' => $class->toArray(),
            'users' => $users,
            'user_with_most_grades' => $user_with_most_grades
            ]);
        }
        else {
            return view('Grades/index')->with([
                'classId' => $classId,
                'grades' => \Auth::user()->grades(),
                'user' => \Auth::user()
            ]);
        }
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
    public function store()
    {
        // $class->users()->attach(user index);
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
