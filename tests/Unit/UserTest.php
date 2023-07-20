<?php

namespace Tests\Unit;

use PHPUnit\Framework\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class UserTest extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic unit test example.
     *
     * @return void
     */
    public function testStoreUser()
    {
        $user = [
            'name' => 'zikri',
            'email' => 'tes@gmail.com',
            'password' => 'tes'
        ];

        $response = $this->post('/manager/users', $user);
        $response->assertStatus(200);
        $this->assertDatabaseHas('users', ['email' => 'tes@gmail.com']);
    }
}
