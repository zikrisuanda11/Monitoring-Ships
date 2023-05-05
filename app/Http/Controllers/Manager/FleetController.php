<?php

namespace App\Http\Controllers\Manager;

use App\Http\Controllers\Controller;
use App\Models\Fleet;

class FleetController extends Controller
{
    public function index()
    {
        $fleets = Fleet::with('activity')->get();
        return inertia('Manager/Fleet/Fleet', [
            'fleets' => $fleets
        ]);
    }

}
