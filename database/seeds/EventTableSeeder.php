<?php

use Illuminate\Database\Seeder;

class EventTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
    	DB::table('events')->delete();
      
    	\App\Event::create(array(
    		'user_id' => 1,
    		'classe_id' => 1,
    		'teacher' => 2,
    		'event_title' => 'test event',
    		'event_date' => '2015-10-04',
    		'event_time' => 840,
    	));
    	\App\Event::create(array(
    		'user_id' => 2,
    		'classe_id' => 1,
    		'teacher' => 2,
    		'event_title' => 'test event',
    		'event_date' => '2015-10-04',
    		'event_time' => 840,
    	));
    	\App\Event::create(array(
    		'user_id' => 3,
    		'classe_id' => 1,
    		'teacher' => 2,
    		'event_title' => 'test event',
    		'event_date' => '2015-10-04',
    		'event_time' => 840,
    	));
    	\App\Event::create(array(
    		'user_id' => 4,
    		'classe_id' => 1,
    		'teacher' => 2,
    		'event_title' => 'test event',
    		'event_date' => '2015-10-04',
    		'event_time' => 840,
    	));
    	$this->command->info('Event table seeded!');
    }
}
