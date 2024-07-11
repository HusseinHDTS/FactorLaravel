<?php

namespace App\Http\Controllers\apps;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\InvoiceList;

class InvoicePrint extends Controller
{
  public function index($id)
  {
    $pageConfigs = ['myLayout' => 'blank'];
    $invoice = InvoiceList::with(['user', 'productDetails'])->findOrFail($id);
    return view('content.apps.app-invoice-print', compact('invoice'), ['pageConfigs' => $pageConfigs]);
  }
  public function indexLabel($id)
  {
    $pageConfigs = ['myLayout' => 'blank'];
    $invoice = InvoiceList::with(['user', 'productDetails'])->findOrFail($id);
    return view('content.apps.app-invoice-print-label', compact('invoice'), ['pageConfigs' => $pageConfigs]);
  }
}
