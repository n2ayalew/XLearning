<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCommentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('comments', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('post_id')->unsigned();
            $table->integer('user_id')->unsigned();
            $table->string('first_name');
            $table->integer('class_id');
            $table->integer('teacher'); // teacher's user id
            $table->string('comment');
            $table->boolean('teacher_comment');
            $table->timestamps();
        });
        Schema::table('comments', function($table) {
            $table->foreign('post_id')->references('post_id')->on('discussions')->onDelete('cascade');
        });

        Schema::table('comments', function($table) {
            $table->foreign('user_id')->references('user_id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('comments');
    }
}
