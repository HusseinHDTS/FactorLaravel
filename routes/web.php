<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\apps\UserManagement;
use App\Http\Controllers\apps\EcommerceDashboard;
use App\Http\Controllers\apps\InvoiceList;
use App\Http\Controllers\apps\InvoicePreview;
use App\Http\Controllers\apps\InvoicePrint;
use App\Http\Controllers\apps\InvoiceEdit;
use App\Http\Controllers\apps\InvoiceAdd;
use App\Http\Controllers\apps\ProductAdd;
use App\Http\Controllers\apps\ProductList;
use App\Http\Controllers\apps\UserList;
use App\Http\Controllers\apps\UserViewAccount;
use App\Http\Controllers\authentications\LoginBasic;

// Main Page Route
Route::group(['middleware' => ['guest:admin']], function () {
  Route::get('/', [EcommerceDashboard::class, 'index',])->name('dashboard');
  Route::post('/auth/logout', [LoginBasic::class, 'logout'])->name('logout');
  Route::get('/app/invoice/add', [InvoiceAdd::class, 'index'])->name('app-invoice-add');
  Route::get('/app/invoice/preview/{id}', [InvoicePreview::class, 'index'])->name('app-invoice-preview');
  Route::get('/app/invoice/print/{id}', [InvoicePrint::class, 'index'])->name('app-invoice-print');
  Route::get('/app/invoice/print/label/{id}', [InvoicePrint::class, 'indexLabel'])->name('app-invoice-preview-label');
  Route::get('/app/invoice/edit/{id}', [InvoiceEdit::class, 'index'])->name('app-invoice-edit');
  Route::get('/app/user/view/account/{id}', [UserViewAccount::class, 'index'])->name('app-user-view-account');
  Route::get('/app/invoice/list', [InvoiceList::class, 'index'])->name('app-invoice-list');
  Route::resource('/user-list', UserManagement::class);
});
Route::group(['middleware' => ['guest:admin', 'role:admin']], function () {
  Route::get('/app/product/list', [ProductList::class, 'index'])->name('app-product-list');
  Route::get('/app/product/add', [ProductAdd::class, 'index'])->name('app-product-add');
  Route::get('/app/product/delete/{id}', [ProductAdd::class, 'destroy'])->name('app-product-remove');
  Route::get('/app/product/edit/{id}', [ProductAdd::class, 'show'])->name('app-product-edit');
  Route::post('/app/product/edit/{id}', [ProductAdd::class, 'update'])->name('app-product-edit.post');
  Route::post('/app/product/add',[ProductAdd::class,"store"])->name('app-product-add.post');
  Route::get('/app/user/list', [UserList::class, 'index'])->name('app-user-list');
  Route::post('/app/user/add', [UserList::class, 'create'])->name('create-user.post');
  Route::get('/app/invoice/changes/{id}', [InvoiceList::class, 'changeLog'])->name('app-invoice-change-logs');
});
// Route::post('/upload', 'FileUploadController@upload')->name('file.upload');


Route::get('/auth/login', [LoginBasic::class, 'index'])->name('auth-login-basic');
Route::post('/auth/login', [LoginBasic::class, 'login'])->name('auth-login-basic.post');

// Route::get('/run-migrations', function(Request $request) {
//   if ($request->query('password') === 'husseindts') {
//       Artisan::call('migrate', ["--force" => true]);
//       Artisan::call('passport:install', ["--force" => true]);
//       return 'Migrations executed';
//   }
//   return 'Unauthorized';
// });
// Route::get('/run-seeds', function(Request $request) {
//   if ($request->query('password') === 'husseindts') {
//       Artisan::call('db:seed', ["--force" => true]);
//       return 'Seeding executed';
//   }
//   return 'Unauthorized';
// });
