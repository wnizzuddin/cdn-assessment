<?php

use App\Http\Controllers\FreelancerController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/freelancer', [FreelancerController::class, "index"]);
Route::post('/freelancer', [FreelancerController::class, "create"]);
Route::put('/freelancer/{id}', [FreelancerController::class, "update"]);
Route::delete('/freelancer/{id}', [FreelancerController::class, "destroy"]);
