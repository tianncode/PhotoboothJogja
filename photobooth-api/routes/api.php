<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\PhotoController;

Route::post('/send-photo', [PhotoController::class, 'send']);
