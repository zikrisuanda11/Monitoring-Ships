<?php

namespace App\Http\Controllers\Manager;

use App\Http\Controllers\Controller;
use App\Models\Activity;

class ActivityController extends Controller
{
    public function index()
    {
        $data = Activity::with('ships')->get();
        return inertia('Manager/Activity/Activity', [
            'activities' => $data
        ]);
    }
}
