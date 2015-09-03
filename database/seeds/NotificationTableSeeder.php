<?php

use Illuminate\Database\Seeder;

class NotificationTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \DB::table('notifications')->delete();

        \App\Notification::create(array(
        	'user_id' => 6,
        	'serialized_notification' => 'test 2',
        ));

        \App\Notification::create(array(
        	'user_id' => 6,
        	'serialized_notification' => 'test 3',
        ));
    }
}
