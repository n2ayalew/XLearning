<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();

        $this->call('UserTableSeeder');
        $this->call('ClassTableSeeder');
        $this->call('EventTableSeeder');
        $this->call('UserClassSeeder');
        $this->call('GradeTableSeeder');
        $this->call('NotificationTableSeeder');
        $this->call('AnnouncementTableSeeder');
        $this->call('DiscussionTableSeeder');
        $this->call('CommentTableSeeder');
    }
}
