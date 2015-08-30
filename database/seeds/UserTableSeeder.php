<?php

use Illuminate\Database\Seeder;

class UserTableSeeder extends Seeder
{

	public function run()
	{
	    DB::table('users')->delete();
	    \App\User::create(array(
	    	'first_name' => 'Chris',
	        'last_name'     => 'Sevilleja',
	        'student_id' => 'sevilayha',
	        'is_teacher' => false,
	        'password' => Hash::make('awesome')
	    ));
	    \App\User::create(array(
	    	'first_name' => 'Nate',
	        'last_name'     => 'A',
	        'email'    => 'natie623@gmail.com',
	        'is_teacher' => true,
	        'student_id' => 'nattie123',
	        'password' => Hash::make('tacos')
	    ));
	    \App\User::create(array(
	    	'first_name' => 'Jermey',
	        'last_name'     => 'Po',
	        'student_id' => 'po123',
	        'is_teacher' => false,
	        'password' => Hash::make('hello')
	    ));
	    \App\User::create(array(
	    	'first_name' => 'Wes',
	        'last_name'     => 'Coast',
	        'student_id' => 'wes23',
	        'is_teacher' => false,
	        'password' => Hash::make('bestPassword')
	    ));
	    $this->command->info('User table seeded!');
	}

}