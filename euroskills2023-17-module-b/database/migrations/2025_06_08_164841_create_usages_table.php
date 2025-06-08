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
		Schema::create('usages', function (Blueprint $table) {
			$table->id();
			$table->timestamps();
			$table->foreignId('api_token_id')->constrained();
			$table->foreignId('bill_id')->nullable()->constrained();
			$table->string('service', 100);
			$table->float('seconds', 3);
			$table->float('price_per_second', 4);
			$table->float('total', 2)->virtualAs('seconds * price_per_second');
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void
	{
		Schema::dropIfExists('usages');
	}
};
