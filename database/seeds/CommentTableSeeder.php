<?php

use Illuminate\Database\Seeder;

class CommentTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('comments')->delete();

        \App\comment::create(array(
            "post_id" => 1,
            "user_id" => 2,
            "first_name" => "Nate",
            "class_id" => 1,
            "teacher" => 2,
        	"comment" => "Test 1",
            "teacher_comment" => true,

        ));
        \App\comment::create(array(
            "post_id" => 2,
            "user_id" => 2,
            "first_name" => "Nate",
            "class_id" => 2,
            "teacher" => 2,
            "comment" => "Test 2",
            "teacher_comment" => true,
        ));

        $this->command->info('Comment table seeded!');
    }
}
