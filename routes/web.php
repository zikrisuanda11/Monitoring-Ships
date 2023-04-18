<?php

use App\Http\Controllers\ActivityController;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ShipController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\FleetController;
use App\Http\Controllers\LogisticController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return ;
// });

Route::get('/', [DashboardController::class, 'index']);

Route::resource('ships', ShipController::class);
Route::resource('activities', ActivityController::class);
Route::resource('fleets', FleetController::class);

Route::get('login', [AuthController::class, 'login']);