<?php

use Illuminate\Database\Seeder;

class UserClassSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('user_class')->delete();
        \App\user_class::create(array(
        	'user_id' => 2,
        	'class_id' => 1
        ));
        \App\user_class::create(array(
        	'user_id' => 2,
        	'class_id' => 2

        ));
        \App\user_class::create(array(
            'user_id' => 1,
            'class_id' =>1,
        ));
        \App\user_class::create(array(
            'user_id' => 3,
            'class_id' =>1,
        ));
        \App\user_class::create(array(
            'user_id' => 4,
            'class_id' =>1,
        ));
        $this->command->info('UserClass table seeded!');
    }
}
