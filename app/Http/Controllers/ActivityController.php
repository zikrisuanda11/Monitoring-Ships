<?php

namespace App\Http\Controllers;

use App\Http\Requests\ActivityRequest;
use DateTime;
use App\Models\Ship;
use App\Models\Activity;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class ActivityController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = Activity::with('ships')->get();
        return inertia('Activity/Activity', [
            'activities' => $data
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $ships = Ship::all();
        return inertia('Activity/ActivityCreate', [
            'ships' => $ships,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ActivityRequest $request)
    {
        Activity::create([
            'activity_id' => $request->activity_id,
            'ship_id' => $request->ship_id,
            'eta' => DateTime::createFromFormat('Y-m-d\TH:i:s.u\Z', $request->eta),
            'etd' => DateTime::createFromFormat('Y-m-d\TH:i:s.u\Z', $request->etd),
            'service_code' => $request->service_code
        ]);

        return redirect()->route('activities.index')->with('success', 'Data Berhasil di Simpan');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $ships = Ship::all();
        $activity = Activity::find($id);
        return inertia('Activity/ActivityEdit', [
            'ships' => $ships,
            'activity' => $activity
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $request->validate((new ActivityRequest($id))->rules(), (new ActivityRequest())->messages());
        
        $activity = Activity::find($id);
        $activity->update([
            'activity_id' => $request->activity_id,
            'ship_id' => $request->ship_id,
            'eta' => DateTime::createFromFormat('Y-m-d\TH:i:s.u\Z', $request->eta),
            'etd' => DateTime::createFromFormat('Y-m-d\TH:i:s.u\Z', $request->etd),
            'service_code' => $request->service_code
        ]);

        return redirect()->route('activities.index')->with('success', 'Data Berhasil di Update');

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $activity = Activity::find($id);
        $activity->delete();

        return redirect()->route('activities.index')->with('success', 'Data Berhasil di Hapus');
    }
}
