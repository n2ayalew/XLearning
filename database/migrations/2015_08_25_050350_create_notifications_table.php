<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateNotificationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('notifications', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id_creator')->unsigned(); // Id of user that created the notification
            $table->integer('class_id')->unsigned();
            $table->integer('join_request_owner')->nullable(); // Id of user that initally created the join request
            $table->string('notification_type');
            $table->string('serialized_notification')->nullable();
            $table->timestamps();
        });
        // For now the only notifications are for notifying the 
        // teacher that a student has tried enrolling in their class
        // and notifying the student that a teacher accepted their request

        Schema::table('notifications', function($table) {
            $table->foreign('user_id_creator')->references('user_id')->on('users')->onDelete('cascade');
        });
        Schema::table('notifications', function($table) {
            $table->foreign('class_id')->references('class_id')->on('classes')->onDelete('cascade');
        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('notifications');
    }
}
