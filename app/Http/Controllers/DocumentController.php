<?php

namespace App\Http\Controllers;

use App\Models\Document;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * @OA\Schema(
 *     schema="Document",
 *     type="object",
 *     @OA\Property(property="ppkb", type="integer", example="2020057650"),
 *     @OA\Property(property="service_code", type="string", enum={"siklus_pelayanan_air", "siklus_pelayanan_keberangkatan", "siklus_pelayanan_labuh", "siklus_pelayanan_perpanjangan", "siklus_pelayanan_perubahan_kapal", "siklus_pelayanan_pindah", "siklus_pelayanan_tambat"}),
 *     @OA\Property(property="status_doc", type="string", enum={"nota", "cancel_pkk", "dtjk", "pranota"}),
 *     @OA\Property(property="created_at", type="string", format="date-time"),
 *     @OA\Property(property="updated_at", type="string", format="date-time")
 * )
 */

class DocumentController extends BaseController
{
    /**
     * @OA\Get(
     *     path="/documents",
     *     summary="Get paginated list of documents",
     *     security={{"bearer_token":{}}},
     *     description="Get paginated list of documents",
     *     tags={"Documents"},
     *     @OA\Parameter(
     *         name="pagination",
     *         in="query",
     *         description="Set to 'none' to disable pagination. Defaults to 'true'",
     *         required=false,
     *         @OA\Schema(
     *             type="string",
     *             example="none"
     *         )
     *     ),
     *     @OA\Parameter(
     *         name="per_page",
     *         in="query",
     *         description="Number of items to return per page. Defaults to 10.",
     *         required=false,
     *         @OA\Schema(
     *             type="integer",
     *             example="1"
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/Document")
     *         )
     *     )
     * )
     */


    public function index()
    {
        return inertia('Document');
        // $data = Document::customPaginate();
        // return $this->successResponse($data);
    }

    /**
     * @OA\Post(
     *     path="/documents",
     *     summary="Create a new document",
     *     tags={"Documents"},
     *     security={{"bearer_token":{}}},
     *     @OA\RequestBody(
     *         required=true,
     *         description="Request body",
     *         @OA\JsonContent(ref="#/components/schemas/Document")
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Document created successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="id", type="integer", example="1"),
     *             @OA\Property(property="ppkb", type="integer", example="123456"),
     *             @OA\Property(property="service_code", type="string", example="siklus_pelayanan_air"),
     *             @OA\Property(property="status_doc", type="string", example="nota"),
     *             @OA\Property(property="created_at", type="string", format="date-time", example="2023-04-01T00:00:00+00:00"),
     *             @OA\Property(property="updated_at", type="string", format="date-time", example="2023-04-01T00:00:00+00:00")
     *         )
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Validation error",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="The given data was invalid."),
     *             @OA\Property(property="errors", type="object", example="{'ppkb': ['The ppkb field is required.']}")
     *         )
     *     ),
     * )
     */

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'ppkb' => 'required|integer',
            'service_code' => 'required|in:siklus_pelayanan_air,siklus_pelayanan_keberangkatan,siklus_pelayanan_labuh,siklus_pelayanan_perpanjangan,siklus_pelayanan_perubahan_kapal,siklus_pelayanan_pindah,siklus_pelayanan_tambat',
            'status_doc' => 'required|in:nota,cancel_pkk,dtjk,pranota',
        ]);
    
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }
    
        $document = new Document();
        $document->ppkb = $request->ppkb;
        $document->service_code = $request->service_code;
        $document->status_doc = $request->status_doc;
        $document->save();
    
        return $this->successResponse($document, "Document created successfully");
    }

    /**
     * @OA\Get(
     *     path="/documents/{id}",
     *     security={{"bearer_token":{}}},
     *     summary="Get a single document by ID",
     *     tags={"Documents"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID of the document",
     *         required=true,
     *         @OA\Schema(
     *             type="integer",
     *             format="int64",
     *             example=1
     *         )
     *     ),
     *     @OA\Response(
     *         response="200",
     *         description="Successful operation",
     *         @OA\JsonContent(ref="#/components/schemas/Document")
     *     ),
     *     @OA\Response(
     *         response="404",
     *         description="Document not found",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(
     *                 property="error",
     *                 type="string",
     *                 example="Data Not Found"
     *             )
     *         )
     *     )
     * )
     */

    public function show($id)
    {
        $data = Document::find($id);
        if(!$data){
            return $this->failedResponse(null, "Data Not Found");
        }
        return $this->successResponse($data);
    }

    public function update(Request $request, $id)
    {
        $document = Document::find($id);

        if (!$document) {
            return response()->json([
                'message' => 'Document not found'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'ppkb' => 'integer',
            'service_code' => 'in:siklus_pelayanan_air,siklus_pelayanan_keberangkatan,siklus_pelayanan_labuh,siklus_pelayanan_perpanjangan,siklus_pelayanan_perubahan_kapal,siklus_pelayanan_pindah,siklus_pelayanan_tambat',
            'status_doc' => 'in:nota,cancel_pkk,dtjk,pranota',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        if ($request->has('ppkb')) {
            $document->ppkb = $request->ppkb;
        }

        if ($request->has('service_code')) {
            $document->service_code = $request->service_code;
        }

        if ($request->has('status_doc')) {
            $document->status_doc = $request->status_doc;
        }

        $document->save();

        return response()->json([
            'message' => 'Document updated successfully',
            'data' => $document
        ], 200);
    }

    public function destroy($id)
    {
        $document = Document::find($id);

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
