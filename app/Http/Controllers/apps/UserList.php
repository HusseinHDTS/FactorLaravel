<?php

namespace App\Http\Controllers\apps;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Admin;

class UserList extends Controller
{

  public function create(Request $request)
  {
    $admin = Admin::factory()->create([
      'name' => $request['name'],
      'email' => $request['email'],
      'password' => bcrypt($request['password']),
    ]);
    $admin->assignRole($request['role']);

    return redirect()->route('app-user-list');

  }
  public function index()
  {
    return view('content.apps.app-user-list');
  }
}