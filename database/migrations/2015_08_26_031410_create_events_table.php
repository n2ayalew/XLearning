<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEventsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('events', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->unsigned();
            $table->integer('classe_id')->unsigned();
            $table->integer('teacher'); // teacher's user id
            $table->string('event');
            $table->date('event_date');
            $table->integer('event_time'); // minutes from begining of day
            $table->timestamps();
        });
        Schema::table('events', function($table) {
            $table->foreign('user_id')->references('user_id')->on('users')->onDelete('cascade');
        });
        Schema::table('events', function($table) {
            $table->foreign('classe_id')->references('class_id')->on('classes')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('events');
    }
}
