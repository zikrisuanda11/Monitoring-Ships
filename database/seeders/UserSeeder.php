<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

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
            'nip' => '123321',
            'password' => Hash::make('password'),
        ]);
        $manager = User::create([
            'name' => 'manager',
            'email' => 'manager@gmail.com',
            'nip' => '1233211',
            'password' => Hash::make('password'),
        ]);
        $admin->assignRole('admin');
        $manager->assignRole('manager');
    }
}
