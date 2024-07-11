<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AuditLog extends Model
{
  use HasFactory;
  protected $fillable = [
    'user_id',
    'event',
    'auditable_type',
    'auditable_id',
    'old_values',
    'new_values'
  ];
  protected $casts = [
    'old_values' => 'array',
    'new_values' => 'array',
  ];
  public function user()
  {
    return $this->belongsTo(Admin::class, 'user_id')->select(['id', 'name', 'email', 'created_at', 'updated_at']);
  }
  public function actionOwner()
  {
    return $this->belongsTo(Admin::class, 'action_owner_id');
  }
  public function getActionOwnerIdAttribute()
  {
    return $this->new_values['action_owner_id'] ?? $this->old_values['action_owner_id'] ?? null;
  }
}