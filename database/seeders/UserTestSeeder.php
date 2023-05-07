<?php

namespace Database\Seeders;

use Carbon\Carbon;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Database\Factories\UserMeiFactory;
use Database\Factories\UserAprilFactory;
use Database\Factories\UserMaretFactory;

class UserTestSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Memanggil state 'maret' pada UserFactory
        User::factory()
            ->count(12)
            ->maret()
            ->configure()
            ->create();

        // Memanggil state 'april' pada UserFactory
        User::factory()
            ->count(20)
            ->april()
            ->configure()
            ->create();

        // Memanggil state 'mei' pada UserFactory
        User::factory()
            ->count(15)
            ->mei()
            ->configure()
            ->create();
    }
}
