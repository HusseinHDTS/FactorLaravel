<?php

namespace App\Http\Controllers\apps;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\InvoiceList;

class InvoiceEdit extends Controller
{
  public function index($id)
  {
    $invoice = InvoiceList::with(['user', 'productDetails'])->findOrFail($id);
    return view('content.apps.app-invoice-edit', compact('invoice'));
  }
}