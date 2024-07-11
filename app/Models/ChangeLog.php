<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChangeLog extends Model
{
  use HasFactory;
  protected $fillable = ['user_id', 'model_type', 'model_id', 'changes'];
  public function loggable()
  {
    return $this->morphTo('model_type', 'model_id');
  }
}
