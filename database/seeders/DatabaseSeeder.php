<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Activity;
use App\Models\Document;
use App\Models\Fleet;
use App\Models\Logistic;
use App\Models\Ship;
use Illuminate\Database\Seeder;
use Illuminate\Notifications\Action;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
        $this->call([
            RoleSeeder::class,
            UserSeeder::class,
            ShipSeeder::class,
            ActivitySeeder::class,
            EmployeeSeeder::class,
            FleetSeeder::class,
        ]);
    }
}
