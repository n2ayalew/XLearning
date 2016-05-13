<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class DiscussionBoardController extends Controller
{
    public function __construct(){

        $this->middleware('auth');
    }

    /**
     * 
     * @param class id of interest
     * @return Array of disscussions that belong to $classId
     *
     */
    public function getDiscussions( $classId ) // Test this function
    {
        $class = \App\Classe::find($classId);
        return $class->discussions->toArray();  
    }

    public function getCommentsForDiscussion($discussionId) {
        $discussion = \App\discussion::find($discussionId);
        return $discussion->comments->toArray();
    }

    public function getDiscussion( $discussionId ){
        return \App\discussion::find($discussionId);
    }

    public function getComment( $commentId ){
        return \App\comment::find( $commentId );
    }
    /*
    Why is post title not being added to table???????
    */
    public function createDiscussion(Request $request) {
        $fields = $request->except('_token');
        $user_id = \Auth::user()->user_id;
        $c = explode('/',$request->path())[1];
        $class = \App\Classe::find( $c );
        $teacher_post = false;
        $post_title = $fields['post_title'];
        if( $user_id == $class->teacher){
            $teacher_post = true;
        }
        $discussion = new \App\discussion();
        $discussion->discussion_post = $fields['discussion_post'];
        $discussion->teacher_post = $teacher_post;
        $discussion->teacher = $class->teacher;
        $discussion->first_name = \Auth::user()->first_name;
        //$discussion->classe()->associate($class);
        $discussion->class_id = $class->class_id;
        \Auth::user()->discussions()->save($discussion);
        $post_id = \DB::table('discussions')->select('post_id')->orderBy('post_id', 'desc')->pluck('post_id');
        //$discussion->setPostTitle($post_title);
        $a = array();
        $a['user_id'] = \Auth::user()->user_id;
        $a['first_name'] = \Auth::user()->first_name;
        return json_encode( $a);
    }

    public function createComment(Request $request){
        $fields = $request->except('_token');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function storeDiscussionPost()
    {
        //
    }

    public function storeDiscussionComment(){

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
