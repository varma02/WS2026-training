<?php

namespace App\Http\Controllers;

use App\Models\Usage;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BillController extends Controller
{
	public function index(Request $request)
	{
		return Inertia::render('billing/bills', [
			'bills' => $request->user()->workspaces->find($request->route('ws_id'))->bills,
		]);
	}

	public function show(Request $request)
	{
		$bill = $request
			->user()
			->workspaces->find($request->route('ws_id'))
			->bills->find($request->route('bl_id'));
		if (!$bill) {
			return redirect()
				->route('bills', [
					'ws_id' => $request->route('ws_id'),
				])
				->withErrors('error', 'Bill not found.');
		}

		return Inertia::render('billing/view-bill', [
			'bill' => $bill,
			'usages' => $bill->usages()->with('api_token')->get(),
		]);
	}
}
