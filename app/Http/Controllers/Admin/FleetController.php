<?php

namespace App\Http\Controllers\Admin;

use Carbon\Carbon;
use App\Models\Fleet;
use App\Models\Activity;
use Illuminate\Http\Request;
use App\Http\Requests\FleetRequest;
use App\Http\Controllers\Controller;

class FleetController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $fleets = Fleet::with('activity.ships')->get();
        return inertia('Admin/Fleet/Fleet', [
            'fleets' => $fleets
        ]);
    }

    public function show()
    {
        
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $activities = Activity::whereNotIn('activity_id', Fleet::pluck('activity_id'))->get();
        return inertia('Admin/Fleet/FleetCreate', [
            'activities' => $activities
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(FleetRequest $request)
    {
        Fleet::create([
            'activity_id' => $request->activity_id,
            'status_doc' => $request->status_doc,
            'pkk_no' => $request->pkk_no,
            'ppkb' => $request->ppkb
        ]);

        return redirect()->route('admin.fleets.index')->with('success', 'Data Berhasil di Simpan');
    }


    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $activities = Activity::whereNotIn('activity_id', Fleet::pluck('activity_id'))->get();
        $fleet = Fleet::find($id);
        return inertia('Admin/Fleet/FleetEdit', [
            'activities' => $activities,
            'fleet' => $fleet
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(FleetRequest $request, $id)
    {
        $fleet = Fleet::find($id);
        $fleet->update([
            'activity_id' => $request->activity_id,
            'status_doc' => $request->status_doc,
            'pkk_no' => $request->pkk_no,
            'ppkb' => $request->ppkb
        ]);

        return redirect()->route('admin.fleets.index')->with('success', 'Data Berhasil di Ubah');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $fleet = Fleet::find($id);
        $fleet->delete();
        return redirect()->route('admin.fleets.index')->with('success', 'Data Berhasil di Hapus');
    }

}
