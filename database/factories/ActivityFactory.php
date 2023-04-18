<?php

namespace Database\Factories;

use App\Models\Document;
use App\Models\Ship;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Logistic>
 */
class ActivityFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $service_code = collect([
            'siklus_pelayanan_air',
            'siklus_pelayanan_keberangkatan',
            'siklus_pelayanan_labuh',
            'siklus_pelayanan_perpanjangan',
            'siklus_pelayanan_perubahan_kapal',
            'siklus_pelayanan_pindah',
            'siklus_pelayanan_tambat'
        ]);

        return [
            'activity_id' => 'VS'. fake()->randomNumber(4),
            'ship_id' => Ship::pluck('id')->random(),
            'eta' => fake()->dateTime(),
            'etd' => fake()->dateTime(),
            'service_code' => $service_code->random()
        ];
    }
}
