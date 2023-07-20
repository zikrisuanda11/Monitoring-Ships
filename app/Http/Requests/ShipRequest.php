<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ShipRequest extends FormRequest
{
    protected $shipId;

    /**
     * Create a new form request instance.
     *
     * @param  int|null  $shipId
     * @return void
     */
    public function __construct($shipId = null)
    {
        $this->shipId = $shipId;
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
            'ship_name' => 'required|string|unique:ships,ship_name,' . $this->shipId . ',id',
            'grt' => 'required|integer',
            'loa' => 'required|numeric',
            'agent' => 'required|string'
        ];
    }

    public function messages()
    {
        return [
            'ship_name.required' => 'Nama Kapal tidak boleh kosong',
            'ship_name.unique' => 'Nama Kapal telah digunakan',
            'grt.required' => 'GRT tidak boleh kosong',
            'loa.required' => 'LOA tidak boleh kosong',
            'agent.required' => 'Nama Agent tidak boleh kosong',
        ];
    }
}
