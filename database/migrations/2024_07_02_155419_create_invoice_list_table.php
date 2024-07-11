<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  /**
   * Run the migrations.
   */
  public function up()
  {
    Schema::create('invoice_lists', function (Blueprint $table) {
      $table->id('id');
      $table->string('owner_id')->nullable();
      $table->unsignedBigInteger('action_owner_id')->default(0);
      $table->string('customer_name')->nullable();
      $table->string('customer_phone')->nullable();
      $table->string('customer_postcode')->nullable();
      $table->text('customer_address')->nullable();
      $table->string('way_to_know')->nullable();
      $table->string('way_to_know_name')->nullable();
      $table->string('order_type')->nullable();
      $table->string('order_type_name')->nullable();
      $table->string('way_to_send')->nullable();
      $table->string('way_to_send_name')->nullable();
      $table->string('payment_type')->nullable();
      $table->string('payment_type_name')->nullable();
      $table->string('payment_bank_name')->nullable();
      $table->string('payment_date')->nullable();
      $table->decimal('full_price', 64, 0)->nullable();
      $table->decimal('price_off', 64, 0)->default(0);
      $table->decimal('price_paying', 64, 0)->nullable();
      $table->decimal('price_remaining', 64, 0)->nullable();
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    // Schema::dropIfExists('invoice_lists');
    Schema::table('invoice_lists', function (Blueprint $table) {
      $table->string('owner_id')->change();
      $table->string('customer_name')->change();
      $table->string('customer_phone')->change();
      $table->string('customer_postcode')->change();
      $table->text('customer_address')->change();
      $table->dropColumn('way_to_know');
      $table->dropColumn('order_type');
      $table->string('way_to_send')->change();
      $table->string('way_to_send_name')->change();
      $table->string('payment_type')->change();
      $table->string('payment_type_name')->change();
      $table->string('payment_bank_name')->change();
      $table->string('payment_date')->change();
      $table->decimal('full_price', 10, 2)->change();
      $table->decimal('price_off', 10, 2)->change();
      $table->decimal('price_paying', 10, 2)->change();
      $table->decimal('price_remaining', 10, 2)->change();
    });
  }
};