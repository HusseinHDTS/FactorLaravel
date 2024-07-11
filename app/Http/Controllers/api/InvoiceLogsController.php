<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use App\Models\AuditLog;
use Illuminate\Http\Request;
use App\Models\InvoiceList;
use App\Models\ChangeLog;

class InvoiceLogsController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index($id)
  {
    $logs = AuditLog::where(['auditable_id' => $id, 'auditable_type' => InvoiceList::class])->with(['user'])->get();
    $logs->each(function ($log) {
      $actionOwnerId = $log->action_owner_id;
      if ($actionOwnerId) {
        $log->action_owner = Admin::select(['id', 'name', 'email'])->find($actionOwnerId);
      } else {
        $log->action_owner = null;
      }
    });
    return response()->json(['data' => $logs]);
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
    //
  }
}