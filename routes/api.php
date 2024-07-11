<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\api\InvoiceListController;
use App\Http\Controllers\api\AdminsController;
use App\Http\Controllers\api\InvoiceLogsController;
use App\Http\Controllers\api\ProductListController;

Route::middleware(['auth:api'])->group(function () {
  Route::apiResource('invoice-lists', InvoiceListController::class);
  Route::apiResource('product-lists', ProductListController::class);
  Route::patch('/invoice-lists/{id}', [InvoiceListController::class, 'update']);
  //
  // Route::apiResource('invoice-logs', InvoiceLogsController::class);
  Route::apiResource('admins', AdminsController::class);
  Route::get('/admins', [AdminsController::class, 'index']);
  Route::delete('/admins/{id}', [AdminsController::class, 'destroy']);
  Route::get('/invoice-lists', [InvoiceListController::class, 'index']);
  Route::get('/invoice-lists/user/{id}', [InvoiceListController::class, 'showByUser']);
  Route::get('/invoice-logs/{id}', [InvoiceLogsController::class, 'index']);
});
