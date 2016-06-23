<?php

use Illuminate\Database\Seeder;

class GradeTableSeeder extends Seeder
{
	/**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('grades')->delete();

        \App\grade::create(array(
            'test_id' => 1,
            'class_id' =>1,
            'teacher' =>2,
            'title' =>'Assignment 1',
            'grade' =>'A',
            'user_id' =>1,
        ));
        \App\grade::create(array(
            'test_id' => 2,
            'class_id' =>1,
            'teacher' =>2,
            'title' =>'Assignment 2',
            'grade' =>'N/A',
            'user_id' =>1,
        ));
        \App\grade::create(array(
            'test_id' => 1,
            'class_id' =>1,
            'teacher' =>2,
            'title' =>'Assignment 1',
            'grade' =>'B',
            'user_id' =>3,
        ));
        \App\grade::create(array(
            'test_id' => 2,
            'class_id' =>1,
            'teacher' =>2,
            'title' =>'Assignment 2',
            'grade' =>'N/A',
            'user_id' =>3,
        ));
        \App\grade::create(array(
            'test_id' => 1,
            'class_id' =>1,
            'teacher' =>2,
            'title' => 'Assignment 1',
            'grade' =>'N/A',
            'user_id' =>4,
        ));
        \App\grade::create(array(
            'test_id' => 2,
            'class_id' =>1,
            'teacher' =>2,
            'title' => 'Assignment 2',
            'grade' =>'A',
            'user_id' =>4,
        ));
        $this->command->info('Grade table seeded!');
    }
}
