<?php

namespace App\Http\Controllers\apps;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProductTypeRequest;
use App\Models\ProductType;
use Illuminate\Support\Facades\Log;

class ProductAdd extends Controller
{
  public function index()
  {
    return view('content.apps.app-product-add');
  }
  public function update(ProductTypeRequest $request,$id){
    $productType = ProductType::find($id);
    $productType->update($request->all());
    return redirect('/app/product/list')->with("success","طرح ویرایش شد.");
  }
  public function show($id){
    $product = ProductType::findOrFail($id);
    return view('content.apps.app-product-edit',compact("product"));
  }
  public function store(ProductTypeRequest $request)
  {
    // $filePath = $request->input('file_path'); // Assuming 'file_path' is returned from FileUploadController
    Log::info($request);
    ProductType::create($request->all());

    return redirect('/app/product/list')->with('success', 'طرح مصحول اضافه شد');
  }
  public function destroy($id){
    $product = ProductType::findOrFail($id);
    $product->delete();
    return redirect('/app/product/list')->with('success', 'طرح مصحول حذف شد');
  }
}
