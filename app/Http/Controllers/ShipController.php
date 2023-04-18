<?php

namespace App\Http\Controllers;

use App\Models\Ship;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ShipController extends BaseController
{
    public function index()
    {
        $ships = Ship::all();
        // return response()->json($ships, );
        return inertia('Ships/Ships', [
            'ships' => $ships
        ]);
    }

    public function create()
    {
        return inertia('Ships/ShipsCreate');
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'ship_name' => 'required|string',
            'grt' => 'required|integer',
            'loa' => 'required|numeric',
            'agent' => 'required|string'
        ]);

        if ($validator->fails()) {
            return $validator->errors();
        }

        Ship::create([
            'ship_name' => $request->ship_name,
            'grt' => $request->grt,
            'loa' => $request->loa,
            'agent' => $request->agent
        ]);

        return redirect()->route('ships.index')->with('success', 'Data Berhasil di Simpan');
    }

    public function edit($id)
    {
        $ship = Ship::find($id);
        return inertia('Ships/ShipEdit', [
            'ship' => $ship
        ]);
        
    }

    public function update(Request $request, $id)
    {
        $ship = Ship::find($id);

        Validator::make($request->all(), [
            'ship_name' => 'required|string',
            'grt' => 'required|integer',
            'loa' => 'required|numeric',
            'agent' => 'required|string'
        ]);

        $ship->update([
            'ship_name' => $request->ship_name,
            'grt' => $request->grt,
            'loa' => $request->loa,
            'agent' => $request->agent
        ]);

        return redirect()->route('ships.index')->with('success', 'Data Berhasil di Update');
    }

    public function destroy($id)
    {
        $ship = Ship::find($id);
        $ship->delete();

        return redirect()->route('ships.index')->with('success', 'Data Berhasil di Hapus');
    }
}
