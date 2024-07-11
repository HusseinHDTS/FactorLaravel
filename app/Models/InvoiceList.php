<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\AuditLog;

class InvoiceList extends Model
{
  use HasFactory;
  protected $table = 'invoice_lists';
  public function editor()
  {
    return $this->belongsTo(Admin::class, 'action_owner_id')->select(['id', 'name', 'email', 'created_at', 'updated_at']);
  }
  public function user()
  {
    return $this->belongsTo(Admin::class, 'owner_id')->select(['id', 'name', 'email', 'created_at', 'updated_at']);
  }
  protected $fillable = [
    'owner_id',
    'action_owner_id',
    'customer_name',
    'customer_phone',
    'customer_postcode',
    'customer_address',
    'way_to_know',
    'way_to_know_name',
    'order_type',
    'order_type_name',
    'way_to_send',
    'way_to_send_name',
    'payment_type',
    'payment_type_name',
    'payment_bank_name',
    'payment_date',
    'product_details',
    'full_price',
    'price_off',
    'price_paying',
    'price_remaining'
  ];

  public function productDetails()
  {
    return $this->hasMany(ProductDetail::class);
  }
}