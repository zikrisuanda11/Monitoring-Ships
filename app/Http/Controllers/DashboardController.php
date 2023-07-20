<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Models\Fleet;
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

        $totalDataBongkarMuat = Fleet::all()->count();

        // charts
        $today = Carbon::now()->addDay();

        $oneMonthAgo = Carbon::now()->subMonth();
        
        // $totalKapalPerHari = [];
        
        // for ($date = $oneMonthAgo; $date <= $today; $date->addDay()) {
        //     $formattedDate = $date->toDateString();
            
        //     $totalKapalHari = Ship::whereDate('created_at', $formattedDate)->count();
            
        //     $data = [
        //         'tanggal' => $formattedDate,
        //         'value' => $totalKapalHari,
        //     ];
            
        //     $totalKapalPerHari[] = $data;
            
        // }

        $totalBongkarMuatPerHari = [];
        
        for ($date = $oneMonthAgo; $date <= $today; $date->addDay()) {
            $formattedDate = $date->toDateString();
            
            $totalKapalHari = Fleet::whereDate('created_at', $formattedDate)->count();
            
            $data = [
                'tanggal' => $formattedDate,
                'value' => $totalKapalHari,
            ];
            
            $totalBongkarMuatPerHari[] = $data;
            
        }
        // dd($totalBongkarMuatPerHari);
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
                'chartKapal' => $totalBongkarMuatPerHari,
                'label' => 'Data Bongkar Muat 30 Hari Terakhir'
            ],
            // [
            //     'chartKapal' => $totalKapalPerHari,
            //     'label' => 'Data Kapal 30 Hari Terakhir'
            // ],
            [
                'eta' => $totalEtaPerHari,
                'label' => 'Data Kedatangan 30 Hari Terakhir'
            ],
            [
                'etd' => $totalEtdPerHari,
                'label' => 'Data Keberangkatan 30 Hari Terakhir'
            ]
        ]);

        return inertia('Dashboard', [
            'charts' => $charts,
            'totalKapal' => $totalKapal,
            'totalKegiatanKapal' => $totalKegiatanKapal,
            'totalDataBongkarMuat' => $totalDataBongkarMuat
        ]);
    }
}
