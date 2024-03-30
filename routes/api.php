<?php

use App\Http\Controllers\FileController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/entries', [FileController::class, 'index']);
Route::post('/entries', [FileController::class, 'store']);
Route::put('/entries', [FileController::class, 'update']);
Route::delete('/entries/{id}', [FileController::class, 'destroy']);

