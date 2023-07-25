<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\ShipRequest;
use App\Models\Ship;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ShipController extends Controller
{
    public function index()
    {
        $ships = Ship::all();
        
        return inertia('Admin/Ships/Ships', [
            'ships' => $ships,
            'user' => Auth::user()
        ]);
    }

    public function create()
    {
        return inertia('Admin/Ships/ShipsCreate');
    }

    public function store(ShipRequest $request)
    {
        // dd('tes');
        Ship::create([
            'ship_name' => $request->ship_name,
            'grt' => $request->grt,
            'loa' => $request->loa,
            'agent' => $request->agent
        ]);

        return redirect()->route('admin.ships.index')->with('success', 'Data Berhasil di Simpan');
    }

    public function edit($id)
    {
        $ship = Ship::find($id);
        return inertia('Admin/Ships/ShipEdit', [
            'ship' => $ship
        ]);
        
    }

    public function update(Request $request, $id)
    {
        $request->validate((new ShipRequest($id))->rules(), (new ShipRequest())->messages());

        $ship = Ship::find($id);

        $ship->update([
            'ship_name' => $request->ship_name,
            'grt' => $request->grt,
            'loa' => $request->loa,
            'agent' => $request->agent
        ]);

        return redirect()->route('admin.ships.index')->with('success', 'Data Berhasil di Ubah');
    }

    public function destroy($id)
    {
        $ship = Ship::find($id);
        $ship->delete();
        
        return redirect()->route('admin.ships.index')->with('success', 'Data Berhasil di Hapus');
       
    }
}
