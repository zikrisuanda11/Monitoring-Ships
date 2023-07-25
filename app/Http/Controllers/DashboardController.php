<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Ship;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Fleet;
use App\Models\Activity;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        // stats total data kapal, total data kegiatan kapal


        $totalKapal = Ship::all()->count();

        $totalKegiatanKapal = Activity::all()->count();

        $totalDataBongkarMuat = Fleet::all()->count();

        // charts
        $month = Carbon::now()->month;
        // $today = Carbon::now()->addDay();
        // $oneMonthAgo = Carbon::now()->subMonth();
        $start = Carbon::createFromDate(null, $month, 1)->startOfMonth(); // Untuk bulan Mei
        $end = Carbon::createFromDate(null, $month, 1)->endOfMonth(); // Untuk bulan Mei

        $totalBongkarMuatPerHari = [];

        for ($date = $start; $date <= $end; $date = $date->clone()->addDay()) {
            $formattedDate = $date->toDateString();

            // $totalKapalHari = Fleet::select('*')
            //     ->join('activities', 'fleets.activity_id', '=', 'activities.activity_id')
            //     ->whereDate('activities.eta', $formattedDate)->count();
            $totalKapalHari = Activity::whereDate('eta', $formattedDate)->count();

            $data = [
                'tanggal' => $formattedDate,
                'value' => $totalKapalHari,
            ];

            $totalBongkarMuatPerHari[] = $data;
        }
        // dd($totalBongkarMuatPerHari);

        $totalEtaPerHari = [];

        for ($date = $start; $date <= $end; $date = $date->clone()->addDay()) {
            $formattedDate = $date->toDateString();

            $totalEta = Activity::whereDate('eta', $formattedDate)->count();

            $data = [
                'tanggal' => $formattedDate,
                'value' => $totalEta,
            ];

            $totalEtaPerHari[] = $data;
        }

        $totalEtdPerHari = [];

        for ($date = $start; $date <= $end; $date = $date->clone()->addDay()) {
            $formattedDate = $date->toDateString();

            $totalEtd = Activity::whereDate('etd', $formattedDate)->count();

            $data = [
                'tanggal' => $formattedDate,
                'value' => $totalEtd,
            ];

            $totalEtdPerHari[] = $data;
        }

        $charts = array_merge([], [
            [
                'chartKapal' => $totalBongkarMuatPerHari,
                'label' => 'Data Bongkar Muat 30 Hari'
            ],
            // [
            //     'chartKapal' => $totalKapalPerHari,
            //     'label' => 'Data Kapal 30 Hari'
            // ],
            [
                'eta' => $totalEtaPerHari,
                'label' => 'Data Kedatangan 30 Hari'
            ],
            [
                'etd' => $totalEtdPerHari,
                'label' => 'Data Keberangkatan 30 Hari'
            ]
        ]);

        return inertia('Dashboard', [
            'monthBongkar' => $month,
            'monthEta' => $month,
            'monthEtd' => $month,
            'charts' => $charts,
            'totalKapal' => $totalKapal,
            'totalKegiatanKapal' => $totalKegiatanKapal,
            'totalDataBongkarMuat' => $totalDataBongkarMuat
        ]);
    }

    public function update(Request $request)
    {
        // dd($request->month);
        $totalKapal = Ship::all()->count();

        $totalKegiatanKapal = Activity::all()->count();

        $totalDataBongkarMuat = Fleet::all()->count();
        // dd($request->month);
        // $month = Carbon::now()->addMonth();
        // dd($month);
        $startBongkar = Carbon::createFromDate(null, $request->month_bongkar, 1)->startOfMonth();
        $endBongkar = Carbon::createFromDate(null, $request->month_bongkar, 1)->endOfMonth();

        $totalBongkarMuatPerHari = [];

        for ($date = $startBongkar; $date <= $endBongkar; $date = $date->clone()->addDay()) {
            $formattedDate = $date->toDateString();

            $totalKapalHari = Activity::whereDate('eta', $formattedDate)->count();

            $data = [
                'tanggal' => $formattedDate,
                'value' => $totalKapalHari,
            ];

            $totalBongkarMuatPerHari[] = $data;
        }

        $startEta = Carbon::createFromDate(null, $request->month_eta, 1)->startOfMonth();
        $endEtd = Carbon::createFromDate(null, $request->month_eta, 1)->endOfMonth();

        $totalEtaPerHari = [];

        for ($date = $startEta; $date <= $endEtd; $date = $date->clone()->addDay()) {
            $formattedDate = $date->toDateString();

            $totalEta = Activity::whereDate('eta', $formattedDate)->count();

            $data = [
                'tanggal' => $formattedDate,
                'value' => $totalEta,
            ];

            $totalEtaPerHari[] = $data;
        }

        $totalEtdPerHari = [];

        $startEta = Carbon::createFromDate(null, $request->month_etd, 1)->startOfMonth();
        $endEtd = Carbon::createFromDate(null, $request->month_etd, 1)->endOfMonth();

        for ($date = $startEta; $date <= $endEtd; $date = $date->clone()->addDay()) {
            $formattedDate = $date->toDateString();

            $totalEtd = Activity::whereDate('etd', $formattedDate)->count();

            $data = [
                'tanggal' => $formattedDate,
                'value' => $totalEtd,
            ];

            $totalEtdPerHari[] = $data;
        }

        $charts = array_merge([], [
            [
                'chartKapal' => $totalBongkarMuatPerHari,
                'label' => 'Data Bongkar Muat 30 Hari'
            ],
            // [
            //     'chartKapal' => $totalKapalPerHari,
            //     'label' => 'Data Kapal 30 Hari'
            // ],
            [
                'eta' => $totalEtaPerHari,
                'label' => 'Data Kedatangan 30 Hari'
            ],
            [
                'etd' => $totalEtdPerHari,
                'label' => 'Data Keberangkatan 30 Hari'
            ]
        ]);

        // dd($charts);

        return inertia('Dashboard', [
            'charts' => $charts,
            'totalKapal' => $totalKapal,
            'totalKegiatanKapal' => $totalKegiatanKapal,
            'totalDataBongkarMuat' => $totalDataBongkarMuat
        ]);
    }
}
