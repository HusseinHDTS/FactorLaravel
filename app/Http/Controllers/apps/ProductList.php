<?php

namespace App\Http\Controllers\apps;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ChangeLog;
use App\Models\InvoiceList as InvoiceListModel;

class ProductList extends Controller
{
  public function index()
  {
    return view('content.apps.app-product-list');
  }
}
