<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LibroRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            //

            'nombre' => ['required', 'string'],
            'autor' => ['required'],
            'descripcion' => ['required']


        ];
    }

    public function messages()
    {
        return [
            'nombre' => 'El nombre es obligatorio',
            'autor' => 'El autor es obligatorio',
            'descripcion' => 'La descripción del libro es obligatoria',



        ];
    }
}
