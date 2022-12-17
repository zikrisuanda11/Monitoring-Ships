<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CorporateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'container_id' => 'required',
            'agent_name' => 'required',
            'eta' => 'required',
            'etd' => 'required',
            'status_document' => 'required',
            'ppkb' => 'required',
            'service_code' => 'required',
            'pkk_no' => 'required'
        ];
    }
}
