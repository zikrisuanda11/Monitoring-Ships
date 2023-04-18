<?php

namespace Database\Factories;

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
}
