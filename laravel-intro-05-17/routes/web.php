<?php

use App\Models\Car;
use App\Models\User;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('home', ['users' => User::all()]);
});

Route::get('/cars', function () {
    return view('cars', ['cars' => Car::all()]);
});
