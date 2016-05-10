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
        return $$discussion->comments->toArray();
    }

    public function getDiscussion( $discussionId ){
        return \App\discussion::find($discussionId);
    }

    public function getComment( $commentId ){
        return \App\comment::find( $commentId );
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
