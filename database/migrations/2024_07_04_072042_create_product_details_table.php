<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  /**
   * Run the migrations.
   */
  public function up(): void
  {
    Schema::create('product_details', function (Blueprint $table) {
      $table->id();
      $table->unsignedBigInteger('invoice_list_id'); // Foreign key should be unsignedBigInteger
      $table->integer('productCount')->nullable();
      $table->string('productCustomSize')->nullable();
      $table->string('productDesign')->nullable();
      $table->string('productDesignName')->nullable();
      $table->string('productName')->nullable();
      $table->string('productSize')->nullable();
      $table->string('productSizeName')->nullable();
      $table->string('productType')->nullable();
      $table->timestamps();

      // Ensure the foreign key constraint is correctly formed
      $table->foreign('invoice_list_id')->references('id')->on('invoice_lists')->onDelete('cascade');
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('product_details');
  }
};