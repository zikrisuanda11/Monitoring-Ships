<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

 /**
     * @OA\Info(
     *      version="1.0.0",
     *      title="Ship RESTful API",
     *      description="Ship RESTful API documentation",
     * )
     *
     * @OA\Server(
     *      url="/api",
     *      description="API Server"
     * )
     * 
     ** @OA\SecurityScheme(
     *     type="http",
     *     scheme="bearer",
     *     securityScheme="bearer_token"
     * )
     */
class Controller extends BaseController
{
   
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
}
