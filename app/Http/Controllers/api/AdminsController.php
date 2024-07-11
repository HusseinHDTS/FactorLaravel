<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\ChangeLog;
use Illuminate\Http\Request;
use App\Models\Admin;
use App\Models\InvoiceList;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Yajra\DataTables\DataTables;

class AdminsController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    $admins = Admin::with(['roles', 'permissions'])->get();
    // return response()->json(Admin::all());
    // return DataTables::of($admins)
    // ->addColumn('roles', function($user) {
    //     return $user->roles->pluck('name')->implode(', ');
    // })
    // ->make(true);
    return response()->json([
      'data' => $admins->map(function ($admin) {
        return [
          'id' => $admin->id,
          'name' => $admin->name,
          'email' => $admin->email,
          'roles' => $admin->roles->map(function ($role) {
            return [
              'id' => $role->id,
              'name' => $role->name,
            ];
          }),
          'permissions' => $admin->getAllPermissions()->map(function ($permission) {
            return [
              'id' => $permission->id,
              'name' => $permission->name,
            ];
          }),
        ];
      }),
    ]);
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request)
  {
    //
  }

  /**
   * Display the specified resource.
   */
  public function show(string $id)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, string $id)
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(string $id)
  {
    if (Auth::user()->id == $id) {
      return response()->json(['message' => 'YOU CANT DELETE YOUR SELF!!!'], 403);
    }
    DB::beginTransaction();
    try {
      $admin = Admin::find($id);
      if ($admin) {
        $invoices = InvoiceList::where('owner_id', $id)->get();
        $admin->delete();
        foreach ($invoices as $invoice) {
          ChangeLogsController::logChanges($invoice, $invoice->toArray(), Auth::user()->id, false, true);
          foreach ($invoice->productDetails as $productDetail) {
            ChangeLogsController::logChanges($productDetail, $productDetail->toArray(), Auth::user()->id, false, true);

            $productDetail->delete();
          }
          $invoice->delete();
        }
        DB::commit();
        return response()->json(['message' => 'Admin removed successfully'], 200);
      } else {
        return response()->json(['message' => 'Admin not found'], 404);
      }
    } catch (\Exception $e) {
      DB::rollBack();
      return response()->json(['message' => 'Error deleting invoices and product details.', 'error' => $e->getMessage()], 500);
    }

  }
}
