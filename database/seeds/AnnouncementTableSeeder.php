<?php

use Illuminate\Database\Seeder;

class AnnouncementTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \DB::table('announcements')->delete();
        \App\announcement::create(array(
        	'classe_id' => 1,
        	'teacher' => 2,
        	'announcement' => 'test 1',
        ));
        \App\announcement::create(array(
        	'classe_id' => 1,
        	'teacher' => 2,
        	'announcement' => 'test 2',
        ));
        \App\announcement::create(array(
        	'classe_id' => 2,
        	'teacher' => 2,
        	'announcement' => 'test 3',
        ));
        $this->command->info('Announcement table seeded!');
    }
}
