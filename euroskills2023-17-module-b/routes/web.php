<?php

use App\Http\Controllers\ApiTokenController;
use App\Http\Controllers\WorkspaceController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
	return redirect()->route('login');
})->name('home');

Route::prefix('/console')
	->middleware(['auth', 'verified'])
	->group(function () {
		Route::prefix('{ws_id}')->group(function () {
			Route::get('dashboard', function (Request $request, int $ws_id) {
				$workspace = $request->user()->workspaces->find($ws_id);
				if (!$workspace) {
					return redirect()->route('workspace.select');
				}
				return Inertia::render('dashboard', []);
			})->name('dashboard');

			Route::get('edit', [WorkspaceController::class, 'edit'])->name('workspace.edit');
			Route::post('edit', [WorkspaceController::class, 'update']);

			Route::prefix('api-tokens')->group(function () {
				Route::get('', [ApiTokenController::class, 'index'])->name('api-tokens');

				Route::get('create', [ApiTokenController::class, 'create'])->name('api-tokens.create');
				Route::post('create', [ApiTokenController::class, 'store']);

				Route::get('show', [ApiTokenController::class, 'show'])->name('api-tokens.show');

				Route::prefix('{tk_id}')->group(function () {
					Route::get('edit', [ApiTokenController::class, 'edit'])->name('api-tokens.edit');
					Route::post('edit', [ApiTokenController::class, 'update']);

					Route::get('revoke', [ApiTokenController::class, 'revoke'])->name('api-tokens.revoke');
					Route::post('revoke', [ApiTokenController::class, 'destroy']);
				});
			});

			Route::get('quota', function () {
				return Inertia::render('billing/quota', []);
			})->name('quota');

			Route::prefix('bills')->group(function () {
				Route::get('', function () {
					return Inertia::render('billing/bills', []);
				})->name('bills');
			});
		});

		Route::get('create-workspace', [WorkspaceController::class, 'create'])->name('workspace.create');
		Route::post('create-workspace', [WorkspaceController::class, 'store']);

		Route::get('', [WorkspaceController::class, 'index'])->name('workspace.select');
	});

Route::fallback(function () {
	return Inertia::render('not-found');
})->name('not-found');

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
