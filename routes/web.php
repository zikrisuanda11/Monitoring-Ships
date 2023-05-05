<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Manager\UserController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;

Route::get('/', [AuthenticatedSessionController::class, 'login']);

Route::get('/dashboard', [DashboardController::class, 'index']);

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index']);
    
    Route::prefix('/admin')->name('admin.')->middleware('role:admin')->group(function () {
        Route::resource('/ships', App\Http\Controllers\Admin\ShipController::class);
        Route::resource('/activities', App\Http\Controllers\Admin\ActivityController::class);
        Route::resource('/fleets', App\Http\Controllers\Admin\FleetController::class);
    });

    Route::prefix('/manager')->name('manager.')->middleware('role:manager')->group(function(){
        Route::get('ships', [App\Http\Controllers\Manager\ShipController::class, 'index'])->name('ships.index');
        Route::get('activities', [App\Http\Controllers\Manager\ActivityController::class, 'index'])->name('activities.index');
        Route::get('fleets', [App\Http\Controllers\Manager\FleetController::class, 'index'])->name('fleets.index');
        Route::resource('users', UserController::class);
    });
});
require __DIR__ . '/auth.php';
