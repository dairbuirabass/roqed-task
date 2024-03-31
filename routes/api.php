<?php

use App\Http\Controllers\FileController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/entries', [FileController::class, 'index']);
Route::get('/entries/{id}', [FileController::class, 'show']);
Route::post('/entries', [FileController::class, 'store']);
Route::post('/entries/{id}', [FileController::class, 'update']); // TODO implement with ::put
Route::delete('/entries/{id}', [FileController::class, 'destroy']);

