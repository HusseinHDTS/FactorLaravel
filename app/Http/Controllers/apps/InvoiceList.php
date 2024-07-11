<?php

namespace App\Http\Controllers\apps;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ChangeLog;
use App\Models\InvoiceList as InvoiceListModel;

class InvoiceList extends Controller
{
  public function index()
  {
    return view('content.apps.app-invoice-list');
  }
  public function changeLog($id)
  {
    $logs = ChangeLog::where('model_type', InvoiceListModel::class)
      ->where('model_id', $id)
      ->get();
    return view('content.apps.app-invoice-change-log', compact('logs'));
  }
}
