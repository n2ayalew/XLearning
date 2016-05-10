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
        	'user_id_creator' => 3,
            'class_id' => 1,
            'notification_type' => 'join_request',
        	'serialized_notification' => 'test 1'
        ));

        \App\Notification::create(array(
        	'user_id_creator' => 3,
            'class_id' => 2,
            'notification_type' => 'join_request',
        	'serialized_notification' => 'test 2'
        ));
        $this->command->info('Notification table seeded!');
    }
}
