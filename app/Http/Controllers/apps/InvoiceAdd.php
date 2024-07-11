<?php

namespace App\Http\Controllers\apps;

use App\Http\Controllers\Controller;
use App\Models\ProductType;
use Illuminate\Http\Request;

class InvoiceAdd extends Controller
{
  public function index()
  {
    $productTypes = ProductType::all();
    return view('content.apps.app-invoice-add',compact('productTypes'));
  }
}
