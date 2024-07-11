<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\AuditLog;

class ProductDetail extends Model
{
  use HasFactory;
  protected $fillable = [
    'invoice_list_id',
    'productCount',
    'productCustomSize',
    'productDesign',
    'productDesignName',
    'productName',
    'productSize',
    'productSizeName',
    'productType',
  ];


  public function invoiceList()
  {
    return $this->belongsTo(InvoiceList::class);
  }
}