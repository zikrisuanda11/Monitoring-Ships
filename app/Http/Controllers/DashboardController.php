<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Models\Ship;
use App\Models\User;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        // stats total data kapal, total data kegiatan kapal
        

        $totalKapal = Ship::all()->count();

        $totalKegiatanKapal = Activity::all()->count();
        // $totalKegiatanKapalBulanIni = Activity::whereMonth('created_at', '=', Carbon::now()->month)
        //     ->whereYear('created_at', '=', Carbon::now()->year)
        //     ->count();
        // $totalKegiatanKapalBulanLalu = Activity::whereMonth('created_at', '=', date('m', strtotime('-1 month')))->count();
        // if($totalKegiatanKapalBulanLalu != 0){
        //     $persentaseKegiatanKapalBulanIni = (($totalKegiatanKapalBulanIni  - $totalKegiatanKapalBulanLalu) / $totalKegiatanKapalBulanLalu) * 100;
        // }else{
        //     $persentaseKegiatanKapalBulanIni = 0;
        // }

        // charts
        $today = Carbon::now()->addDay();

        $oneMonthAgo = Carbon::now()->subMonth();
        
        $totalKapalPerHari = [];
        
        for ($date = $oneMonthAgo; $date <= $today; $date->addDay()) {
            $formattedDate = $date->toDateString();
            
            $totalKapalHari = Ship::whereDate('created_at', $formattedDate)->count();
            
            $data = [
                'tanggal' => $formattedDate,
                'value' => $totalKapalHari,
            ];
            
            $totalKapalPerHari[] = $data;
            
        }
        
        $today = Carbon::now()->addDay();
        $oneMonthAgo = Carbon::now()->subDays(30);
        
        $totalEtaPerHari = [];
        
        for ($date = $oneMonthAgo; $date <= $today; $date->addDay()) {
            $formattedDate = $date->toDateString();
            
            $totalEta = Activity::whereDate('eta', $formattedDate)->count();
            
            $data = [
                'tanggal' => $formattedDate,
                'value' => $totalEta,
            ];
            
            $totalEtaPerHari[] = $data;
        }
        
        $today = Carbon::now()->addDay();
        $oneMonthAgo = Carbon::now()->subDays(30);
        
        $totalEtdPerHari = [];

        for ($date = $oneMonthAgo; $date <= $today; $date->addDay()) {
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
                'chartKapal' => $totalKapalPerHari,
                'label' => 'Data Kapal 30 Hari Terakhir'
            ],
            [
                'eta' => $totalEtaPerHari,
                'label' => 'Data ETA 30 Hari Terakhir'
            ],
            [
                'etd' => $totalEtdPerHari,
                'label' => 'Data ETD 30 Hari Terakhir'
            ]
        ]);

        // $stats = array_merge([], [
        //     [
        //         'name' => 'Total Kapal',
        //         'stat' => $totalKapal,

        //     ],
        //     [
        //         'name' => 'Total Kegiatan Kapal',
        //         'stat' => $totalKegiatanKapal,
        //     ],
        // ]);

        return inertia('Dashboard', [
            'charts' => $charts,
            'totalKapal' => $totalKapal,
            'totalKegiatanKapal' => $totalKegiatanKapal
        ]);
    }
}
