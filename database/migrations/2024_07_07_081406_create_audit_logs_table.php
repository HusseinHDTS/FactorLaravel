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
    Schema::create('audit_logs', function (Blueprint $table) {
      $table->id();
      $table->string('user_id')->nullable();
      $table->string('event');
      $table->string('auditable_type');
      $table->unsignedBigInteger('auditable_id');
      $table->json('old_values')->nullable();
      $table->json('new_values')->nullable();
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('audit_logs');
  }
};