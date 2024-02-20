<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ReservaController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\LibroController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\NotificacionController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/logout', [AuthController::class, 'logout']);


Route::middleware('auth:sanctum')->group(function(){
    Route::get('/libros', [LibroController::class, 'index']);

    Route::post('/libros', [LibroController::class, 'store']);
    Route::put('/libros/{libro}', [LibroController::class, 'update']);
    Route::post('/delete-libro/{libro}', [LibroController::class, 'destroy']);
    Route::post('/delete-user/{user}', [UserController::class, 'destroy']);
    Route::post('/delete-reserva/{reserva}', [ReservaController::class, 'destroy']);


    Route::get('/libros/buscar', [LibroController::class, 'search']);

    Route::get('/usuarios', [UserController::class, 'index']);
    Route::post('/enviar-notificacion', [UserController::class, 'enviarCorreo']);

    Route::post('/usuarios', [UserController::class, 'store']);
    Route::put('/usuarios/{user}', [UserController::class, 'update']);
    Route::delete('/usuarios/{user}', [UserController::class, 'destroy']);

    Route::post('/notificacion/{libro}', [NotificacionController::class, 'queue']);
    Route::get('/reservas', [ReservaController::class, 'index']);

    Route::post('/reservas', [ReservaController::class, 'store']);
    Route::put('/reservas/{reserva}', [ReservaController::class, 'update']);
    Route::delete('/reservas/{reserva}', [ReservaController::class, 'destroy']);
    Route::get('/usuarios/{user}/historial', [ReservaController::class, 'historialUsuario']);
    Route::post('/reservas/prestar', [ReservaController::class, 'prestarLibroAdmin']);
    Route::put('/reservas/{libro}/devolver', [ReservaController::class, 'devolverLibro']);

    // Route::put('/reservas/{reserva}/devolver', [ReservaController::class, 'devolverLibro']);
});
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return ['user' =>$request->user() ];

});


