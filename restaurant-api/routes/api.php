<?php

use App\Http\Controllers\ItemsConroller;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::group(['middleware' =>['auth:sanctum']] ,function(){

Route::resource('item',ItemsConroller::class);
Route::resource('product',ProductsController::class);
Route::get('/item/search/{id}', [ItemsConroller::class,'search']);
Route::get('/order/{id}',[OrderController::class,'order']);
Route::get('/orders',[OrderController::class,'orders']);
Route::get('/logout', [LoginController::class,'logout']);
});
Route::post('/register', [LoginController::class,'register']);
Route::post('/login', [LoginController::class,'login']);