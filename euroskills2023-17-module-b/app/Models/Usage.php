<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Usage extends Model
{
	protected $fillable = ['api_token_id', 'service', 'seconds', 'price_per_second', 'total', 'created_at'];

	public function api_token(): BelongsTo
	{
		return $this->belongsTo(ApiToken::class);
	}

	public function bill(): BelongsTo
	{
		return $this->belongsTo(Bill::class);
	}
}
