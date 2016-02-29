<?php

use Illuminate\Database\Seeder;

class DiscussionTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('discussions')->delete();

        \App\discussion::create(array(
        	'class_id' => 1,
            'user_id' => 2,
            "first_name" => "Nate",
        	'teacher' => 2,
        	'discussion_post' => 'Hello World',
        	'teacher_post' => true,
        ));

        \App\discussion::create(array(
        	'class_id' => 2,
            'user_id' => 2,
            "first_name" => "Nate",
        	'teacher' => 2,
        	'discussion_post' => 'Daaaaamn Daniel',
        	'teacher_post' => true,
        ));

        $this->command->info('Discussion table seeded!');
    }
}
