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
        	'classe_id' => 1,
        	'is_teacher' => true,

        ));
        \App\user_class::create(array(
        	'user_id' => 2,
        	'classe_id' => 2,
        	'is_teacher' => true,

        ));
        $this->command->info('UserClass table seeded!');
    }
}
