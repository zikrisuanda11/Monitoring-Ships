<?php

namespace App\Http\Controllers\Admin;

use DateTime;
use Carbon\Carbon;
use App\Models\Ship;
use App\Models\Activity;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\ActivityRequest;

class ActivityController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $dayNow = Carbon::now();
        $oneWeekBefore = Carbon::now()->subWeek();
        $data = Activity::with('ships')->get();
        return inertia('Admin/Activity/Activity', [
            'activities' => $data,
            'dayNow' => $dayNow,
            'oneWeekBefore' => $oneWeekBefore
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
        $ships = Ship::all();
        return inertia('Admin/Activity/ActivityCreate', [
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
            'eta' => Carbon::parse($request->eta),
            'etd' => Carbon::parse($request->etd),
            'service_code' => $request->service_code
        ]);

        return redirect()->route('admin.activities.index')->with('success', 'Data Berhasil di Simpan');
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
        return inertia('Admin/Activity/ActivityEdit', [
            'ships' => $ships,
            'activity' => $activity,
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

        return redirect()->route('admin.activities.index')->with('success', 'Data Berhasil di Update');
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

        return redirect()->route('admin.activities.index')->with('success', 'Data Berhasil di Hapus');
    }
    public function exportPdf($start, $end)
    {
        $user_name = auth()->user()->name;

        $startDate = Carbon::parse($start);
        $endDate = Carbon::parse($end);
        // dd($startDate, $endDate);

        $formattedStartDate = $startDate->locale('id')->isoFormat('D MMMM YYYY');
        $formattedEndDate = $endDate->locale('id')->isoFormat('D MMMM YYYY');
        
        $dayStartDate = $startDate->format('l');
        $dayEndDate = $endDate->format('l');
        
        $weekActivities = Activity::with('ships')
            ->whereBetween('eta', [$startDate, $endDate])
            ->whereBetween('etd', [$startDate, $endDate])
            ->orderBy('eta', 'asc')
            ->get();

        $pdf = Pdf::loadView('cetak-pdf', compact('weekActivities', 'formattedStartDate', 'formattedEndDate', 'dayStartDate', 'dayEndDate', 'user_name'));

        return $pdf->stream();
    }

}
