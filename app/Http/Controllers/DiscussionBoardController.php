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


    public function getDiscussion($classid, $discussionId ){
        return \App\discussion::find($discussionId)->toArray();
    }

    public function getComment($classid, $discussionId, $commentId ){
        return \App\comment::find( $commentId )->toArray();
    }
    public function getCommentsForDiscussion($classid, $discussionId) {
        $discussion = \App\discussion::find($discussionId);
        return $discussion->comments->toArray();
    }

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
        $discussion->post_title = $fields['post_title'];
        \Auth::user()->discussions()->save($discussion);
        $post_id = \DB::table('discussions')->select('post_id')->orderBy('post_id', 'desc')->pluck('post_id');
        $a = array();
        $a['user_id'] = \Auth::user()->user_id;
        $a['first_name'] = \Auth::user()->first_name;
        $a['post_id'] = $post_id;
        $a['postedByTeacher'] = $teacher_post;
        return json_encode( $a);
    }

    public function createComment(Request $request){
        $fields = $request->except('_token');
        $urlSplit = explode('/',$request->path());
        $class_id = $urlSplit[1];
        $post_id = $urlSplit[3];
        $class = \App\Classe::find( $class_id );
        $comment = new \App\comment();
        $comment->user_id = \Auth::user()->user_id;
        $comment->first_name = \Auth::user()->first_name;
        $comment->class_id = $class_id;
        $comment->teacher = $class->teacher;
        $comment->comment = $fields['comment'];
        $comment->teacher_comment = ( ($class->teacher == \Auth::user()->user_id) ? true : false );
        \App\discussion::find($urlSplit[3])->comments()->save($comment);

        // Response;
        $response = array();
        $response['poster_id'] = $comment->user_id;
        $response['first_name'] = \Auth::user()->first_name;
        $response['postedByTeacher'] = $comment->teacher_comment;
        $response['comment_id'] = \DB::table('comments')->select('id')->orderBy('id', 'desc')->pluck('id');

        return json_encode($response);
    }

    public function deleteComment($classId,$disscusionId,$commentId) {
        $comment = \App\comment::find($commentId);
        $comment->delete();
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
    public function destroy($classId,$id)
    {
        $discussion = \App\discussion::find($id);
        $discussion->delete();
    }
}
