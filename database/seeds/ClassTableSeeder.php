<?php

use Illuminate\Database\Seeder;

class ClassTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('classes')->delete();

        \App\Classe::create(array(
        	'subject' => 'Math',
        	'teacher' => 6,
        ));
        \App\Classe::create(array(
        	'subject' => 'Science',
        	'teacher' => 6,
        ));
        $this->command->info('Class table seeded!');
    }
}
