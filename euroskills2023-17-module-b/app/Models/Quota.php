<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Quota extends Model
{
	protected $fillable = ['workspace_id', 'limit'];

	public function workspace(): BelongsTo
	{
		return $this->belongsTo(Workspace::class);
	}
}
