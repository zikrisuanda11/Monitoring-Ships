<?php

namespace App\Http\Controllers;

use App\Http\Requests\CorporateRequest;
use App\Models\Corporate;
use Illuminate\Http\Request;

class CorporateController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = Corporate::all();
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
    public function store(CorporateRequest $request)
    {
        $data = Corporate::create([
            'container_id' => $request->container_id,
            'agent_name' => $request->agent_name,
            'eta' => $request->eta,
            'etd' => $request->etd,
            'status_document' => $request->status_document,
            'spum' => $request->spum,
            'ppkb' => $request->ppkb,
            'service_code' => $request->service_code,
            'pkk_no' => $request->pkk_no
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
        $data = Corporate::find($id);
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
    public function update(CorporateRequest $request, $id)
    {
        $data = Corporate::find($id);
        $data->update([
            'container_id' => $request->container_id,
            'agent_name' => $request->agent_name,
            'eta' => $request->eta,
            'etd' => $request->etd,
            'status_document' => $request->status_document,
            'spum' => $request->spum,
            'ppkb' => $request->ppkb,
            'service_code' => $request->service_code,
            'pkk_no' => $request->pkk_no
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
        $data = Corporate::find($id);
        $data->delete();
        return response()->json([
            'message' => 'success',
            'data' => $data
        ]);
    }
}
