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
        // Ship::factory()->count(25)->create();
        Ship::factory()
            ->count(12)
            ->maret()
            ->create();

        // Memanggil state 'april' pada ShipFactory
        Ship::factory()
            ->count(20)
            ->april()
            ->create();

        // Memanggil state 'mei' pada ShipFactory
        Ship::factory()
            ->count(15)
            ->mei()
            ->create();
        
    }
}
