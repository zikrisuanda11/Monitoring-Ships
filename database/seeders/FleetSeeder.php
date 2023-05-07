<?php

namespace Database\Seeders;

use App\Models\Fleet;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class FleetSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Fleet::factory()
            ->count(12)
            ->maret()
            ->create();

        // Memanggil state 'april' pada FleetFactory
        Fleet::factory()
            ->count(20)
            ->april()
            ->create();

        // Memanggil state 'mei' pada FleetFactory
        Fleet::factory()
            ->count(15)
            ->mei()
            ->create();
    }
}
