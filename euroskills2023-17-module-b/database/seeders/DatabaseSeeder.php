<?php

namespace Database\Seeders;

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
		$demo1 = User::factory()->create([
			'name' => 'demo1',
			'password' => 'skills2023d1',
		]);

		$demo1->workspaces()->create([
			'name' => 'Demo Workspace 1',
			'description' => 'This is a demo workspace for user demo1.',
		]);

		User::factory()->create([
			'name' => 'demo2',
			'password' => 'skills2023d2',
		]);
	}
}
