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
    		'user_id' => 27,
    		'class_id' => 5,
    		'teacher' => 28,
    		'event' => 'test event',
    		'event_date' => '2015-10-04',
    		'event_time' => 840,
    	));
    	\App\Event::create(array(
    		'user_id' => 28,
    		'class_id' => 5,
    		'teacher' => 28,
    		'event' => 'test event',
    		'event_date' => '2015-10-04',
    		'event_time' => 840,
    	));
    	\App\Event::create(array(
    		'user_id' => 29,
    		'class_id' => 5,
    		'teacher' => 28,
    		'event' => 'test event',
    		'event_date' => '2015-10-04',
    		'event_time' => 840,
    	));
    	\App\Event::create(array(
    		'user_id' => 30,
    		'class_id' => 5,
    		'teacher' => 28,
    		'event' => 'test event',
    		'event_date' => '2015-10-04',
    		'event_time' => 840,
    	));
    	$this->command->info('Event table seeded!');
    }
}
