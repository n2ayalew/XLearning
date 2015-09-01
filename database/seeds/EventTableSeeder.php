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
    		'user_id' => 5,
    		'classe_id' => 3,
    		'teacher' => 6,
    		'event' => 'test event',
    		'event_date' => '2015-10-04',
    		'event_time' => 840,
    	));
    	\App\Event::create(array(
    		'user_id' => 6,
    		'classe_id' => 3,
    		'teacher' => 6,
    		'event' => 'test event',
    		'event_date' => '2015-10-04',
    		'event_time' => 840,
    	));
    	\App\Event::create(array(
    		'user_id' => 7,
    		'classe_id' => 3,
    		'teacher' => 6,
    		'event' => 'test event',
    		'event_date' => '2015-10-04',
    		'event_time' => 840,
    	));
    	\App\Event::create(array(
    		'user_id' => 8,
    		'classe_id' => 3,
    		'teacher' => 6,
    		'event' => 'test event',
    		'event_date' => '2015-10-04',
    		'event_time' => 840,
    	));
    	$this->command->info('Event table seeded!');
    }
}
