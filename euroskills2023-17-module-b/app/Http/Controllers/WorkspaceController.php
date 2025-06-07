<?php

namespace App\Http\Controllers;

use App\Models\Workspace;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WorkspaceController extends Controller
{
	/**
	 * Display a listing of the resource.
	 */
	public function index()
	{
		return Inertia::render('workspace/select-workspace');
	}

	/**
	 * Show the form for creating a new resource.
	 */
	public function create()
	{
		return Inertia::render('workspace/create-workspace');
	}

	/**
	 * Store a newly created resource in storage.
	 */
	public function store(Request $request)
	{
		$request->validate([
			'name' => 'required|string|max:100',
			'description' => 'nullable|string',
		]);

		Workspace::create([
			'name' => $request->input('name'),
			'description' => $request->input('description', ''),
			'user_id' => $request->user()->id,
		]);

		return redirect()->route('workspace.select')->with('success', 'Workspace created successfully.');
	}

	/**
	 * Display the specified resource.
	 */
	public function show(Workspace $workspace)
	{
		//
	}

	/**
	 * Show the form for editing the specified resource.
	 */
	public function edit()
	{
		return Inertia::render('workspace/edit-workspace');
	}

	/**
	 * Update the specified resource in storage.
	 */
	public function update(Request $request)
	{
		$request->validate([
			'name' => 'required|string|max:100',
			'description' => 'nullable|string',
		]);

		$request
			->user()
			->workspaces->find($request->route('ws_id'))
			->update([
				'name' => $request->input('name'),
				'description' => $request->input('description', ''),
			]);

		return redirect()->route('workspace.select')->with('success', 'Workspace updated successfully.');
	}

	/**
	 * Remove the specified resource from storage.
	 */
	public function destroy(Workspace $workspace)
	{
		//
	}
}
