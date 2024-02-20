<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class RegistroRequest extends FormRequest
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

                'name' => ['required','string'],
                'email' => ['required','email','unique:users,email'],
                'password'=>[
                    'required',
                    'confirmed',
                    Password::min(6)

                ]

        ];
    }

    public function messages(){
        return [
            'name' => 'El nombre es obligatorio',
            'email.required' => 'El Email es obligatorio',
            'password.confirmed' => 'No coinciden las contraseñas',
            'email.email' => 'El email no es valido',
            'email.unique' => 'El email ya esta registrado',
            'password' => 'El password debe contener al menos 6 caracteres',

        ];
    }
}
