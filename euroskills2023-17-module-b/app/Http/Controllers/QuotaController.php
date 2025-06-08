<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class QuotaController extends Controller
{
	public function index(Request $request)
	{
		return inertia('billing/quota', [
			'quota' => $request->user()->workspaces->find($request->route('ws_id'))->quota,
		]);
	}

	public function update(Request $request)
	{
		$workspace = $request->user()->workspaces->find($request->route('ws_id'));
		if (!$workspace) {
			return redirect()
				->route('workspace.select')
				->withErrors(['error' => 'Workspace not found.']);
		}

		$limit = $request->input('limit');

		if ($limit != null) {
			$request->validate([
				'limit' => 'integer|min:1',
			]);
			$quota = $workspace->quota;
			if (!$quota) {
				$quota = $workspace->quota()->create(['limit' => $limit]);
			} else {
				$quota->update(['limit' => $limit]);
			}
		} elseif ($workspace->quota) {
			$workspace->quota()->delete();
		}

		return redirect()
			->route('quota', ['ws_id' => $request->route('ws_id')])
			->with('success', 'Quota updated successfully.');
	}
}
