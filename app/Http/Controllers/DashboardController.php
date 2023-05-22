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
        // stats
        $totalTenagaKerja = User::role('admin')->get()->count();
        $totalTenagaKerjaBulanIni = User::whereHas('roles', function ($query) {
            $query->where('name', 'admin');
        })->whereMonth('created_at', '=', date('m'))
            ->whereYear('created_at', '=', Carbon::now()->year)
            ->get()
            ->count();
        $totalTenagaKerjaBulanLalu = User::whereHas('roles', function ($query) {
            $query->where('name', 'admin');
        })->whereMonth('created_at', '=', date('m', strtotime('-1 month')))
            ->whereYear('created_at', '=', Carbon::now()->year)
            ->get()
            ->count();
        $persentaseKenaikanTenagaKerja = (($totalTenagaKerjaBulanIni - $totalTenagaKerjaBulanLalu) / $totalTenagaKerjaBulanLalu) * 100;

        $totalKapal = Ship::all()->count();
        // dd(Carbon::now());
        $totalKapalBulanIni = Ship::whereMonth('created_at', '=', Carbon::now()->month)
            ->whereYear('created_at', '=', Carbon::now()->year)
            ->count();
        $totalKapalBulanLalu = Ship::whereMonth('created_at', '=', date('m', strtotime('-1 month')))->count();
        if($totalKapalBulanLalu != 0){
            $persentaseJumlahKapalBulanIni = (($totalKapalBulanIni  - $totalKapalBulanLalu) / $totalKapalBulanLalu) * 100;
        }else{
            $persentaseJumlahKapalBulanIni = 0;
        }

        $totalKegiatanKapal = Activity::all()->count();
        $totalKegiatanKapalBulanIni = Activity::whereMonth('created_at', '=', Carbon::now()->month)
            ->whereYear('created_at', '=', Carbon::now()->year)
            ->count();
        $totalKegiatanKapalBulanLalu = Activity::whereMonth('created_at', '=', date('m', strtotime('-1 month')))->count();
        if($totalKegiatanKapalBulanLalu != 0){
            $persentaseKegiatanKapalBulanIni = (($totalKegiatanKapalBulanIni  - $totalKegiatanKapalBulanLalu) / $totalKegiatanKapalBulanLalu) * 100;
        }else{
            $persentaseKegiatanKapalBulanIni = 0;
        }

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

        $stats = array_merge([], [
            [
                'name' => 'Total Tenaga Kerja',
                'stat' => number_format($totalTenagaKerjaBulanIni, 0),
                'previousStat' => number_format($totalTenagaKerja, 0),
                'change' => number_format($persentaseKenaikanTenagaKerja, 2) . ' %',
                'changeType' => ($persentaseKenaikanTenagaKerja > 0) ? 'increase' : 'decrease',
            ],
            [
                'name' => 'Total Kapal',
                'stat' => $totalKapalBulanIni,
                'previousStat' => $totalKapal,
                'change' => number_format($persentaseJumlahKapalBulanIni, 2) . " %",
                'changeType' => ($persentaseJumlahKapalBulanIni > 0) ? 'increase' : 'decrease',
            ],
            [
                'name' => 'Total Kegiatan Kapal',
                'stat' => $totalKegiatanKapalBulanIni,
                'previousStat' => $totalKegiatanKapal,
                'change' => number_format($persentaseKegiatanKapalBulanIni, 2) . " %",
                'changeType' => ($persentaseKegiatanKapalBulanIni > 0) ? 'increase' : 'decrease',
            ],
        ]);

        return inertia('Dashboard', compact('stats', 'charts'));
    }
}
