<?php

namespace App\Http\Controllers;

use App\Models\ApiToken;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ApiTokenController extends Controller
{
	private function __getTokens(Request $request)
	{
		return $request->user()->workspaces->find($request->route('ws_id'))->apiTokens;
	}

	/**
	 * Display a listing of the resource.
	 */
	public function index(Request $request)
	{
		return Inertia::render('api-token/api-tokens', [
			'tokens' => $this->__getTokens($request),
		]);
	}

	/**
	 * Show the form for creating a new resource.
	 */
	public function create(Request $request)
	{
		return Inertia::render('api-token/api-tokens', [
			'tokens' => $this->__getTokens($request),
			'dialog' => ['type' => 'create'],
		]);
	}

	/**
	 * Store a newly created resource in storage.
	 */
	public function store(Request $request)
	{
		$request->validate([
			'name' => 'required|string|max:100',
		]);

		$token = $request
			->user()
			->workspaces->find($request->route('ws_id'))
			->apiTokens()
			->create([
				'name' => $request->input('name'),
				'token' => bin2hex(random_bytes(20)),
				'revoked_at' => null,
			]);

		return redirect()
			->route('api-tokens.show', [
				'ws_id' => $request->route('ws_id'),
				'token' => $token->makeVisible('token')->token,
			])
			->with('success', 'API token created successfully.');
	}

	/**
	 * Display the specified resource.
	 */
	public function show(Request $request)
	{
		return Inertia::render('api-token/api-tokens', [
			'tokens' => $this->__getTokens($request),
			'dialog' => ['type' => 'show', 'token' => $request->query('token')],
		]);
	}

	/**
	 * Show the form for editing the specified resource.
	 */
	public function edit(Request $request)
	{
		return Inertia::render('api-token/api-tokens', [
			'tokens' => $this->__getTokens($request),
			'dialog' => ['type' => 'edit', 'id' => $request->route('tk_id')],
		]);
	}

	/**
	 * Update the specified resource in storage.
	 */
	public function update(Request $request)
	{
		$request->validate([
			'name' => 'required|string|max:100',
		]);

		$token = $request
			->user()
			->workspaces->find($request->route('ws_id'))
			->apiTokens()
			->findOrFail($request->route('tk_id'));

		$token->update(['name' => $request->input('name')]);

		return redirect()
			->route('api-tokens', [
				'ws_id' => $request->route('ws_id'),
			])
			->with('success', 'API token updated successfully.');
	}

	/**
	 * Show confirmation dialog for revoking the specified resource.
	 */
	public function revoke(Request $request)
	{
		return Inertia::render('api-token/api-tokens', [
			'tokens' => $this->__getTokens($request),
			'dialog' => ['type' => 'revoke', 'id' => $request->route('tk_id')],
		]);
	}

	/**
	 * Remove the specified resource from storage.
	 */
	public function destroy(Request $request)
	{
		$token = $request
			->user()
			->workspaces->find($request->route('ws_id'))
			->apiTokens()
			->findOrFail($request->route('tk_id'));

		$token->update(['revoked_at' => now()]);

		return redirect()
			->route('api-tokens', [
				'ws_id' => $request->route('ws_id'),
			])
			->with('success', 'API token revoked successfully.');
	}
}
