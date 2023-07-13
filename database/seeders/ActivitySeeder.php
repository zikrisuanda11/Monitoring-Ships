<?php

namespace Database\Seeders;

use Carbon\Carbon;
use App\Models\Ship;
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
        // Activity::factory()
        //     ->count(20)
        //     ->april()
        //     ->create();

        // Memanggil state 'mei' pada ActivityFactory
        // Activity::factory()
        //     ->count(25)
        //     ->mei()
        //     ->create();

        // Activity::factory()
        //     ->count(12)
        //     ->juni()
        //     ->create();

        // Activity::factory()
        //     ->count(12)
        //     ->now()
        //     ->create();
        $service_code = collect([
            'siklus_pelayanan_air',
            'siklus_pelayanan_keberangkatan',
            'siklus_pelayanan_labuh',
            'siklus_pelayanan_perpanjangan',
            'siklus_pelayanan_perubahan_kapal',
            'siklus_pelayanan_pindah',
            'siklus_pelayanan_tambat'
        ]);

        for ($i = 0; $i < 10; $i++) {
            Activity::create([
                'activity_id' => 'VS' . fake()->randomNumber(5, true),
                'ship_id' => Ship::pluck('id')->random(),
                'eta' => Carbon::createFromDate(2023, fake()->numberBetween(5, 6), fake()->numberBetween(1, 30)),
                'etd' => Carbon::createFromDate(2023, fake()->numberBetween(5, 6), fake()->numberBetween(1, 30)),
                'service_code' => $service_code->random(),
                'created_at' => Carbon::createFromDate(2023, 6, $i),
            ]);
        }
    }
}
