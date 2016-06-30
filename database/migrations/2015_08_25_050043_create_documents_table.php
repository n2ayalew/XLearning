<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDocumentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('documents', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('class_id')->unsigned();
            $table->integer('teacher'); // teacher's user id
            $table->string('doc_link'); // link to document
            $table->string('doc_title');
            $table->timestamps();
        });
        Schema::table('documents', function($table) {
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
        Schema::drop('documents');
    }
}
