<?php

namespace App\Http\Controllers;

use App\Http\Requests\ContainerRequest;
use App\Models\Container;
use Illuminate\Http\Request;

class ContainerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = Container::all();
        return response()->json([
            'message' => 'success',
            'data' => $data
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ContainerRequest $request)
    {
        $data = Container::create([
            'vesel_id' => $request->vesel_id,
            'name' => $request->name,
            'grt' => $request->grt,
            'loa' => $request->loa,
        ]);
        return response()->json([
            'message' => 'success',
            'data' => $data
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
        $data = Container::find($id);
        return response()->json([
            'message' => 'success',
            'data' => $data
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(ContainerRequest $request, $id)
    {
        $data = Container::find($id);
        $data->update([
            'vesel_id' => $request->vesel_id,
            'name' => $request->name,
            'grt' => $request->grt,
            'loa' => $request->loa,
        ]);
        return response()->json([
            'message' => 'success',
            'data' => $data
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $data = Container::find($id);
        $data->delete();
        return response()->json([
            'message' => 'success',
        ]);
    }
}
