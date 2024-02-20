<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegistroRequest;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function register(RegistroRequest $request)
    {


        $data = $request->validated();
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
            'role' => 0


        ]);
        return [
            'token' => $user->createToken('token')->plainTextToken,
            'user' => $user
        ];

    }

    public function logout(Request $request)
    {
        $user= auth('sanctum')->user();
        $user->currentAccessToken()->delete();
        return [
            'user' => null
        ];
    }
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json(['message' => 'Usuario o contraseña incorrectos'], 401);
        }

        $user = Auth::user();
        $token = $user->createToken('AuthToken')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token

        ], 200);
    }
}
