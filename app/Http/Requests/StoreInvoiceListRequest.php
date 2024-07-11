<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreInvoiceListRequest extends FormRequest
{
  /**
   * Determine if the user is authorized to make this request.
   */
  public function authorize(): bool
  {
    return true;
  }

  /**
   * Get the validation rules that apply to the request.
   *
   * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
   */
  public function rules(): array
  {
    return [
      'owner_id' => 'nullable|string|max:255',
      'action_owner_id' => 'nullable|numeric',
      'customer_name' => 'nullable|string|max:255',
      'customer_phone' => 'nullable|string|max:255',
      'customer_postcode' => 'nullable|string|max:255',
      'customer_address' => 'nullable|string|max:255',
      'way_to_know' => 'nullable|string|max:255',
      'way_to_know_name' => 'nullable|string|max:255',
      'order_type' => 'nullable|string|max:255',
      'order_type_name' => 'nullable|string|max:255',
      'way_to_send' => 'nullable|string|max:255',
      'way_to_send_name' => 'nullable|string|max:255',
      'payment_type' => 'nullable|string|max:255',
      'payment_type_name' => 'nullable|string|max:255',
      'payment_bank_name' => 'nullable|string|max:255',
      'payment_date' => 'nullable|date',
      'product_details' => 'nullable|array',
      'full_price' => 'nullable|numeric',
      'price_off' => 'nullable|numeric',
      'price_paying' => 'nullable|numeric',
      'price_remaining' => 'nullable|numeric',
    ];
  }
}