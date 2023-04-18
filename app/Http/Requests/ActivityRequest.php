<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ActivityRequest extends FormRequest
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
            'activity_id' => 'required|string|unique:activities,activity_id',
            'ship_id' => 'required|exists:ships,id',
            'eta' => 'required|date',
            'etd' => 'required|date',
            'service_code' => 'required'
        ];
    }

    public function messages()
    {
        return [
            'activity_id.required' => 'Vessel ID tidak boleh kosong',
            'activity_id.unique' => 'Vessel ID telah digunakan',
            'ship_id.required' => 'ID Kapal Tidak boleh kosong',
            'eta.required' => 'ETA tidak boleh kosong',
            'etd.required' => 'ETD tidak boleh kosong',
            'service_code.required' => 'Service Code tidak boleh kosong'
        ];
    }
}
