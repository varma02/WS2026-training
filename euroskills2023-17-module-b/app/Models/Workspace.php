<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Workspace extends Model
{
	/** @use HasFactory<\Database\Factories\WorkspaceFactory> */
	use HasFactory;

	protected $fillable = ['name', 'description', 'user_id'];

	/**
	 * Get the user that owns the workspace.
	 */
	public function user(): BelongsTo
	{
		return $this->belongsTo(User::class);
	}

	/**
	 * Get the API tokens for the workspace.
	 */
	public function apiTokens(): HasMany
	{
		return $this->hasMany(ApiToken::class);
	}

	/**
	 * Get the quota for the workspace.
	 */
	public function quota(): HasOne
	{
		return $this->hasOne(Quota::class);
	}

	/**
	 * Get the bills for the workspace.
	 */
	public function bills(): HasMany
	{
		return $this->hasMany(Bill::class);
	}
}
