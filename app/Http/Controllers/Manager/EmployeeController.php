<?php

namespace App\Http\Controllers\Manager;

use App\Models\Employee;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class EmployeeController extends Controller
{
    public function index()
    {
        $employees = Employee::all();
        return inertia('Manager/Employee/Employee', [
            'employees' => $employees
        ]);
    }
}
