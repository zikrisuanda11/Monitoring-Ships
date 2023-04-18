<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FleetRequest extends FormRequest
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
            'activity_id' => 'required',
            'status_doc' => 'required',
            'pkk_no' => 'required',
            'ppkb' => 'required'
        ];
    }

    public function messages()
    {
        return [
            'activity_id.required' => 'Vessel ID Harus Di isi.',
            'status_doc.required' => 'Status Dokumen Harus Di isi.',
            'pkk_no.required' => 'PKK NO Harus Di isi.',
            'ppkb.required' => 'PPKB Harus Di isi.'
        ];
    }
}
