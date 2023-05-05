<?php

namespace App\Http\Controllers\Manager;

use App\Http\Controllers\Controller;
use App\Models\Ship;

class ShipController extends Controller
{
    public function index()
    {
        $ships = Ship::all();
        return inertia('Manager/Ships/Ships', [
            'ships' => $ships
        ]);
    }
}
