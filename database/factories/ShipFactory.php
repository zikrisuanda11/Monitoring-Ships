<?php

namespace Database\Factories;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Ship>
 */
class ShipFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'ship_name' => fake()->name(),
            'grt' => fake()->numberBetween(10, 100),
            'loa' => fake()->numberBetween(10, 100),
            'agent' => fake()->company()
        ];
    }

    public function maret()
    {
        return $this->state(function (array $attributes) {
            return [
                'created_at' => Carbon::createFromDate(2023, 3, fake()->numberBetween(1, 29)),
            ];
        });
    }

    public function april()
    {
        return $this->state(function (array $attributes) {
            return [
                'created_at' => Carbon::createFromDate(2023, 4, fake()->numberBetween(1, 29)),
            ];
        });
    }
    public function mei()
    {
        return $this->state(function (array $attributes) {
            return [
                'created_at' => Carbon::createFromDate(2023, 5, fake()->numberBetween(1, 29)),
            ];
        });
    }
    
}
