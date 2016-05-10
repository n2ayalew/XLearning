<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAssigngmentsTestsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('assignments_tests', function (Blueprint $table) {
            $table->increments('test_id');
            $table->integer('class_id');
            $table->integer('teacher'); // teacher's user id
            $table->string('title'); // title of assinment or test
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('assignments_tests');
    }
}
