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
		Schema::create('api_tokens', function (Blueprint $table) {
			$table->id();
			$table->string('name', 100);
			$table->string('token', 64)->unique();
			$table->foreignId('workspace_id')->constrained();
			$table->timestamp('revoked_at')->nullable()->default(null);
			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void
	{
		Schema::dropIfExists('api_tokens');
	}
};
