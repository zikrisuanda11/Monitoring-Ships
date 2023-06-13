<?php

namespace App\Http\Controllers\Admin;

use App\Models\Employee;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\EmployeeRequest;
use Illuminate\Support\Facades\Validator;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $employees = Employee::all();
        return inertia('Admin/Employee/Employee', [
            'employees' => $employees
        ]);
    }

    public function create()
    {
        return inertia('Admin/Employee/EmployeeCreate');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(EmployeeRequest $request)
    {
        Employee::create([
            'name' => $request->name,
            'nip' => $request->nip,
            'roles' => $request->roles,
        ]);

        return redirect()->route('admin.employees.index')->with('success', 'Data Berhasil di Simpan');
    }

    public function edit($id)
    {
        $employee = Employee::find($id);
        return inertia('Admin/Employee/EmployeeEdit', [
            'employee' => $employee
        ]);
    }
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
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
        $validate = Validator::make($request->all(), 
        [
            'name'      => 'required',
            'nip'       => 'required',
            'roles'     => 'required',
        ], 
        [
            'name.required'     => 'Nama tidak boleh kosong',
            'nip.required'      => 'NIP tidak boleh kosong',
            'roles.required'    => 'Password tidak boleh kosong',
        ]);

        if ($validate->fails()) {
            return redirect()->back()->withErrors($validate)->withInput();
        }
        
        $emplyee = Employee::find($id);
        
        $emplyee->update([
            'name' => $request->name,
            'nip' => $request->nip,
            'roles' => $request->roles,
        ]);
        
        return redirect()->route('admin.employees.index')->with('success', 'Data Berhasil di Ubah');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $employee = Employee::find($id);
        $employee->delete();
        return redirect()->route('admin.emplyees.index')->with('success', 'Data Berhasil di Hapus');
    }
}
