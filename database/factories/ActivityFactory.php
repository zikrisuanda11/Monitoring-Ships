<?php

namespace Database\Factories;

use Carbon\Carbon;
use App\Models\Ship;
use App\Models\Document;
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
            'activity_id' => 'VS'. fake()->randomNumber(5, true),
            'ship_id' => Ship::pluck('id')->random(),
            'eta' => Carbon::createFromDate(2023, fake()->numberBetween(3, 5), fake()->numberBetween(1, 30)),
            'etd' => Carbon::createFromDate(2023, fake()->numberBetween(3, 5), fake()->numberBetween(1, 30)),
            'service_code' => $service_code->random()
        ];
    }

    public function maret()
    {
        return $this->state(function (array $attributes) {
            return [
                'created_at' => Carbon::createFromDate(2023, 3, 1),
            ];
        });
    }

    public function april()
    {
        return $this->state(function (array $attributes) {
            return [
                'created_at' => Carbon::createFromDate(2023, 4, 1),
            ];
        });
    }
    public function mei()
    {
        return $this->state(function (array $attributes) {
            return [
                'created_at' => Carbon::createFromDate(2023, 5, 1),
            ];
        });
    }
}
