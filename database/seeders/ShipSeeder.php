<?php

namespace Database\Seeders;

use App\Models\Ship;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class ShipSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Ship::factory()
            ->count(12)
            ->maret()
            ->create();

        Ship::factory()
            ->count(20)
            ->april()
            ->create();

        Ship::factory()
            ->count(15)
            ->mei()
            ->create();
    }
}
