<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDiscussionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('discussions', function (Blueprint $table) {
            $table->increments('post_id');
            $table->integer('user_id')->unsigned();
            $table->integer('class_id')->unsigned();
            $table->string('post_title');
            $table->string('first_name');
            $table->integer('teacher'); // teacher's user id
            $table->string('discussion_post');
            $table->boolean('teacher_post');
            $table->timestamps();
        });

        Schema::table('discussions', function($table) {
            $table->foreign('class_id')->references('class_id')->on('classes')->onDelete('cascade');
        });

        Schema::table('discussions', function($table) {
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
        Schema::drop('discussions');
    }
}
