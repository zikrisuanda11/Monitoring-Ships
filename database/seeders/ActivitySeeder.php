<?php

namespace Database\Seeders;

use App\Models\Activity;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class ActivitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Memanggil state 'april' pada ActivityFactory
        Activity::factory()
            ->count(20)
            ->april()
            ->create();

        // Memanggil state 'mei' pada ActivityFactory
        Activity::factory()
            ->count(25)
            ->mei()
            ->create();

        Activity::factory()
            ->count(12)
            ->juni()
            ->create();
    }
}
