<?php

namespace App\Http\Controllers;

use App\Models\Document;
use App\Models\Logistic;
use App\Models\Ship;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class LogisticController extends BaseController
{
    
    public function index()
    {
        $logistics = Logistic::with('ships', 'document')->get();
        // return response()->json([
        //     'data' => $logistics
        // ]);
        return inertia('Logistics/Logistic', [
            'logistics' => $logistics
        ]);
    }

    public function create()
    {
        $ships = Ship::all();
        return inertia('Logistics/LogisticCreate', [
            'ships' => $ships,
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'vessel_id' => 'required|string',
            'ship_id' => 'required|exists:ships,id',
            'document_id' => 'required|exists:documents,id|unique:logistics',
            'eta' => 'required|date',
            'etd' => 'required|date',
        ]);
    
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }
    
        $logistic = new Logistic();
        $logistic->vessel_id = $request->vessel_id;
        $logistic->ship_id = $request->ship_id;
        $logistic->document_id = $request->document_id;
        $logistic->eta = $request->eta;
        $logistic->etd = $request->etd;
        $logistic->save();
    
        return response()->json([
            'message' => 'Logistic created successfully',
            'data' => $logistic
        ], 201);
    }

    public function show($vessel_id)
    {
        $data = Logistic::find($vessel_id);
        if(!$data){
            return $this->failedResponse(null, "Data Not Found");
        }
        return $this->successResponse($data);
    }

    public function update(Request $request, $vessel_id)
    {
        $logistic = Logistic::find($vessel_id);

        if (!$logistic) {
            return response()->json([
                'message' => 'Logistic not found'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'ship_id' => 'exists:ships,id',
            'document_id' => 'exists:documents,id',
            'eta' => 'date_format:Y-m-d H:i:s',
            'etd' => 'date_format:Y-m-d H:i:s',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        if ($request->has('ship_id')) {
            $logistic->ship_id = $request->ship_id;
        }

        if ($request->has('document_id')) {
            $logistic->document_id = $request->document_id;
        }

        if ($request->has('eta')) {
            $logistic->eta = $request->eta;
        }

        if ($request->has('etd')) {
            $logistic->etd = $request->etd;
        }

        $logistic->save();

        return response()->json([
            'message' => 'Logistic updated successfully',
            'data' => $logistic
        ], 200);
    }

    public function destroy($id)
    {
        $document = Logistic::find($id);

        if (!$document) {
            return response()->json([
                'message' => 'Document not found'
            ], 404);
        }

        $document->delete();

        return response()->json([
            'message' => 'Document deleted successfully'
        ], 200);
    }
}
