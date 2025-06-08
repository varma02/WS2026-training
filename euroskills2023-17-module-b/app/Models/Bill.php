<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Bill extends Model
{
	/**
	 * The attributes that are mass assignable.
	 *
	 * @var list<string>
	 */
	protected $fillable = ['workspace_id', 'total', 'paid', 'due'];

	/**
	 * Get the attributes that should be cast.
	 *
	 * @return array<string, string>
	 */
	protected function casts(): array
	{
		return [
			'due' => 'datetime',
		];
	}

	/**
	 * Get the workspace that owns the bill.
	 */
	public function workspace(): BelongsTo
	{
		return $this->belongsTo(Workspace::class);
	}

	public function usages(): HasMany
	{
		return $this->hasMany(Usage::class);
	}
}
