<?php

namespace Database\Factories;

use App\Models\Activity;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Document>
 */
class FleetFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $status_doc = collect([
            'nota',
            'cancel_pkk',
            'dtjk',
            'pranota'
        ]);

        $activityID = Activity::inRandomOrder()->first();

        $activityId = Activity::whereNotIn('activity_id', function ($query) {
            $query->select('activity_id')->from('fleets');
        })->inRandomOrder()->first('activity_id');

        return [
            'activity_id' => $activityID,
            'ppkb' => fake()->randomNumber(7),
            'pkk_no' => 'PKK.DN.IDBPN.2011' . fake()->randomNumber(6),
            'status_doc' => $status_doc->random()
        ];
    }
}
