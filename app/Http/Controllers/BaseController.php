<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class BaseController extends Controller
{
    public function successResponse($data, $message = "Success")
    {
        return response()->json([
            'message' => $message,
            'data' => $data
        ]);
    }

    public function failedResponse($data = null, $message = 'operation failed!')
    {
        return response()->json([
            'message' => $message,
            'data' => $data
        ]);
    }
}
