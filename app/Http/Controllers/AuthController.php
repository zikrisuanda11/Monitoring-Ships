<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Requests\AuthRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{

    public function login()
    {
        return inertia('Auth/Login');
    }

    // public function login(AuthRequest $request)
    // {
    //     $credential = $request->only('email', 'password');

    //     if(Auth::attempt($credential)){
    //         $user = User::where('email', $request->email)->first();
    //         $token = $user->createToken('auth_token')->plainTextToken;
            
    //         return response()->json([
    //             'message' => 'success login',
    //             'status' => true,
    //             'token' => $token
    //         ]);
    //     }
    //     return response()->json([
    //         'message' => 'unauthorized',
    //         'status' => false,
    //     ], 401);
    // }

    public function register(AuthRequest $request)
    {
        $data = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'phone' => $request->phone
        ]);
        return response()->json([
            'message' => 'success',
            'data' => $data
        ]);
    }

    public function logout(Request $request)
    {
        $user = $request->user();
        $user->currentAccessToken()->delete();

        return response()->json([
            'message' => 'success logout'
        ]);
    }
}
