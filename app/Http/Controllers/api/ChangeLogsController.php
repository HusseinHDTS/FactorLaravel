<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\ChangeLog;

class ChangeLogsController extends Controller
{
  public static function logChanges($model, $originalData, $userId, $isNew = false, $isDeleted = false)
  {
    $changes = [];

    if ($isNew) {
      $changes['new'] = $model->toArray();
    } elseif ($isDeleted) {
      $changes['deleted'] = $originalData;
    } else {
      foreach ($model->getDirty() as $field => $newValue) {
        $changes[$field] = [
          'old' => $originalData[$field] ?? null,
          'new' => $newValue,
        ];
      }
    }

    ChangeLog::create([
      'user_id' => $userId,
      'model_type' => get_class($model),
      'model_id' => $model->id,
      'changes' => json_encode($changes),
    ]);
  }
}
