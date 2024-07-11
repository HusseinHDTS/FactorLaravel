<?php

namespace App\Http\Controllers\api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\InvoiceList;
use App\Models\ProductDetail;
use App\Http\Requests\StoreInvoiceListRequest;
use Illuminate\Support\Facades\Auth;
use App\Models\AuditLog;

class InvoiceListController extends Controller
{
  public function index()
  {
    if (Auth::user()->hasRole("admin")) {
      $invoice = InvoiceList::with('user')->get();
    } else {
      $invoice = InvoiceList::with('user')->where('owner_id', Auth::user()->id)->get();
    }
    return ['data' => $invoice];
  }
  public function showByUser($id)
  {
    $invoice = InvoiceList::with('user')->where('owner_id', $id)->get();
    return ['data' => $invoice];
  }
  public function store(StoreInvoiceListRequest $request)
  {
    $validatedData = $request->validated();
    $validatedData['action_owner_id'] = Auth::user()->id;
    $allData = $validatedData;
    $productDetails = $validatedData['product_details'] ?? [];
    unset($validatedData['product_details']);
    $invoiceList = InvoiceList::create($validatedData);
    AuditLog::create([
      'user_id' => auth()->id(),
      'event' => 'created',
      'auditable_type' => InvoiceList::class,
      'auditable_id' => $invoiceList->id,
      'new_values' => $allData,
    ]);
    foreach ($productDetails as $productDetailData) {
      $productDetailData['invoice_list_id'] = $invoiceList->id;
      $productDetails = ProductDetail::create($productDetailData);
    }

    return response()->json($invoiceList->load('productDetails'));
  }

  public function show(string $id)
  {
    return InvoiceList::findOrFail($id);
  }

  public function update(StoreInvoiceListRequest $request, string $id)
  {
    $validatedData = $request->validated();
    $validatedData['action_owner_id'] = Auth::user()->id;
    $allData = $validatedData;
    $productDetails = $validatedData['product_details'] ?? [];
    unset($validatedData['product_details']);
    $invoiceList = InvoiceList::findOrFail($id);
    $invoiceList->update($validatedData);
    AuditLog::create([
      'user_id' => auth()->id(),
      'event' => 'updated',
      'auditable_type' => InvoiceList::class,
      'auditable_id' => $id,
      'old_values' => $invoiceList,
      'new_values' => $allData,
    ]);
    $existingProductDetails = $invoiceList->productDetails->keyBy('id');
    foreach ($productDetails as $productDetailData) {
      if (isset($productDetailData['id']) && $existingProductDetails->has($productDetailData['id'])) {
        $existingProductDetails[$productDetailData['id']]->update($productDetailData);
        $existingProductDetails->forget($productDetailData['id']);
      } else {
        $productDetailData['invoice_list_id'] = $invoiceList->id;
        $newProductDetail = ProductDetail::create($productDetailData);
      }
    }
    foreach ($existingProductDetails as $existingProductDetail) {
      $existingProductDetail->delete();
    }
    return response()->json($invoiceList->load('productDetails'));
  }

  public function destroy(string $id)
  {
    $invoiceList = InvoiceList::findOrFail($id);
    AuditLog::create([
      'user_id' => auth()->id(),
      'event' => 'deleted',
      'auditable_type' => InvoiceList::class,
      'auditable_id' => $id,
      'old_values' => $invoiceList,
      'new_values' => [],
    ]);
    $invoiceList->delete();
    return response()->json(null, 204);
  }
}
