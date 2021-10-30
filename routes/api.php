<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('auth/register', 'Api\Auth\RegisterController');
Route::post('/auth/login', 'Api\Auth\LoginController@login');
Route::post('/auth/logout', 'Api\Auth\LoginController@logout')->middleware('auth:api');
