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
		Schema::create('bills', function (Blueprint $table) {
			$table->id();
			$table->timestamps();
			$table->float('total', 2);
			$table->boolean('paid')->default(false);
			$table->foreignId('workspace_id')->constrained();
			$table->timestamp('due');
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void
	{
		Schema::dropIfExists('bills');
	}
};
