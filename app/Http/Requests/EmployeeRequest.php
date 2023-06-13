<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EmployeeRequest extends FormRequest
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
            'name'      => 'required',
            'nip'       => 'required|unique:employees,nip,' . $this->id . 'id',
            'roles'     => 'required',
        ];
    }

    public function messages()
    {
        return [
            'name.required'     => 'Nama tidak boleh kosong',
            'nip.required'    => 'Email tidak boleh kosong',
            'nip.unique'      => 'Email sudah digunakan',
            'roles.required' => 'Password tidak boleh kosong',
        ];
    }
}
