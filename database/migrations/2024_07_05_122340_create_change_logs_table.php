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
    Schema::create('change_logs', function (Blueprint $table) {
      $table->id();
      $table->unsignedBigInteger('user_id');
      $table->string('model_type');
      $table->unsignedBigInteger('model_id');
      $table->json('changes');
      $table->timestamps();

      $table->foreign('user_id')->references('id')->on('admins')->onDelete('cascade');
      $table->index(['model_id', 'model_type']);
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('change_logs');
  }
};
