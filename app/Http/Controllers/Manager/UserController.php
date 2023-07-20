<?php

namespace App\Http\Controllers\Manager;

use App\Models\User;
use App\Http\Controllers\Controller;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = User::with('roles')->get();
        return inertia('Manager/User/User', [
            'users' => $user
        ]);
    }
}
