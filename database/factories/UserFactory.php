<?php

namespace Database\Factories;

use Carbon\Carbon;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'password' => Hash::make('password')
        ];
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
    public function maret()
    {
        return $this->state(function (array $attributes) {
            return [
                'created_at' => Carbon::createFromDate(2023, 3, 1),
            ];
        });
    }
    
    public function configure()
    {
        return $this->afterCreating(function (User $user) {
            $user->assignRole('admin');
        });
    }
}
