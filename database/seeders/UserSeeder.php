<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $admin = User::create([
            'name' => 'admin',
            'email' => 'admin@gmail.com',
            'password' => Hash::make('password'),
        ]);
        $manager = User::create([
            'name' => 'manager',
            'email' => 'manager@gmail.com',
            'password' => Hash::make('password'),
        ]);
        $admin->assignRole('admin');
        $manager->assignRole('manager');
    }
}
