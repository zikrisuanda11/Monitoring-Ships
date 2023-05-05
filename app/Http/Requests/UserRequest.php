<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
{
    protected $id;

    /**
     * Create a new form request instance.
     *
     * @param  int|null  $id
     * @return void
     */
    public function __construct($id = null)
    {
        $this->id = $id;
    }
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
            'name' => 'required',
            'email' => 'required|unique:users,email,' . $this->id . 'id',
            'password' => 'required|min:8',
            'role' => 'required'
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'Nama tidak boleh kosong',
            'email.required' => 'Email tidak boleh kosong',
            'email.unique' => 'Email sudah digunakan',
            'password.required' => 'Password tidak boleh kosong',
            'password.min' => 'Password minimal terdiri dari 8 karakter',
            'role.required' => 'Jabatan tidak boleh kosong'
        ];
    }
}
