<?php

namespace Database\Seeders;

use App\Models\Usage;
use App\Models\User;
use App\Models\Workspace;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
	/**
	 * Seed the application's database.
	 */
	public function run(): void
	{
		User::factory()->create([
			'name' => 'demo2',
			'password' => 'skills2023d2',
		]);

		$demo1 = User::factory()->create([
			'name' => 'demo1',
			'password' => 'skills2023d1',
		]);

		$my_app = $demo1->workspaces()->create([
			'name' => 'My App',
			'description' => 'This is a demo workspace for user demo1.',
		]);

		$production = $my_app->apiTokens()->create([
			'name' => 'production',
			'token' => bin2hex(random_bytes(20)),
		]);

		$development = $my_app->apiTokens()->create([
			'name' => 'development',
			'token' => bin2hex(random_bytes(20)),
		]);

		$csvPath = storage_path('app/service_usages.csv');
		$handle = fopen($csvPath, 'r');
		fgetcsv($handle);
		$serviceUsages = [];
		while (($data = fgetcsv($handle)) !== false) {
			$serviceUsages[] = $data;
		}
		fclose($handle);

		$months = [];
		foreach ($serviceUsages as $usage) {
			$month = substr($usage[4], 0, 7);
			if (!in_array($month, $months)) {
				$months[] = $month;
			}
			if ($usage[2] == 'production') {
				$production->usages()->create([
					'service' => $usage[5],
					'seconds' => $usage[3],
					'price_per_second' => $usage[6],
					'created_at' => $usage[4],
				]);
			} else {
				$development->usages()->create([
					'service' => $usage[5],
					'seconds' => $usage[3],
					'price_per_second' => $usage[6],
					'created_at' => $usage[4],
				]);
			}
		}

		foreach ($months as $month) {
			$usages = Usage::whereMonth('created_at', '=', intval(substr($month, 5, 3)))->whereYear(
				'created_at',
				'=',
				intval(substr($month, 0, 4)),
			);

			$usage_list = $usages->get();

			$bill = $my_app->bills()->create([
				'total' => $usage_list->sum('total'),
				'paid' => false,
				'due' => now()->addDays(30),
				'created_at' => $usage_list->max('created_at'),
			]);

			$usages->update(['bill_id' => $bill->id]);
		}
	}
}
