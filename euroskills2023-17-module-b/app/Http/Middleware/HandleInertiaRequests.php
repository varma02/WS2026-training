<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
	/**
	 * The root template that's loaded on the first page visit.
	 *
	 * @see https://inertiajs.com/server-side-setup#root-template
	 *
	 * @var string
	 */
	protected $rootView = 'app';

	/**
	 * Determines the current asset version.
	 *
	 * @see https://inertiajs.com/asset-versioning
	 */
	public function version(Request $request): ?string
	{
		return parent::version($request);
	}

	/**
	 * Define the props that are shared by default.
	 *
	 * @see https://inertiajs.com/shared-data
	 *
	 * @return array<string, mixed>
	 */
	public function share(Request $request): array
	{
		$ws_id = $request->route('ws_id') ?? $request->input('ws_id');
		return [
			...parent::share($request),
			'name' => config('app.name'),
			'auth' => [
				'user' => $request->user(),
			],
			'workspace' => [
				'selected' => $ws_id ?? ($request->user()?->workspaces->first()->id ?? null),
				'all' => $request->user()?->workspaces ?? [],
			],
			'ziggy' => fn(): array => [...(new Ziggy())->toArray(), 'location' => $request->url()],
			'sidebarOpen' => !$request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
		];
	}
}
