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
        	'teacher' => 28,
        ));
        \App\Classe::create(array(
        	'subject' => 'Science',
        	'teacher' => 28,
        ));
        $this->command->info('Class table seeded!');
    }
}
