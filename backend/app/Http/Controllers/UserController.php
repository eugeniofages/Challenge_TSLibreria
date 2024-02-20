<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Mail\CorreoMailable;
use Illuminate\Http\Request;
use App\Models\User;
use Mail;
class UserController extends Controller
{

    public function enviarCorreo($user){
        //

        $mailData = [
            'title' => 'Recordatorio de la app',
            'body' => 'Le recordamos que ya esta disponible el libro DD'

        ];
        Mail::to('your_email@gmail.com')->send(new CorreoMailable($mailData));

    }
    public function index(Request $request)
    {
        $query = User::query();
        if ($request->has('search')) {
            $searchTerm = $request->input('search');
            $query->where('name', 'like', '%' . $searchTerm . '%');
        }

        $usuarios = $query->paginate(10);
        return response()->json($usuarios);
    }

    public function store(UserRequest $request, User $user)
    {

        $data = $request->validated();
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'role' => $data['role'],
            'password' => bcrypt($data['password'])

        ]);

        return response()->json($user);
    }

    public function update(Request $request, User $user)
    {
        $rules = [
            'name' => 'required',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'role' => 'required',
            'password' => 'required'
        ];
        $messages = [
            'name.required' => 'El nombre es obligatorio.',
            'password.required' => 'La contraseña es obligatoria.',
            'email.required' => 'El correo electrónico es obligatorio.',
            'email.email' => 'Por favor ingresa un correo electrónico válido.',
            'email.unique' => 'Este correo electrónico ya está en uso.',
            'role.required' => 'El rol es obligatorio.',
        ];
        $validatedData = $request->validate($rules, $messages);
        $user->update($validatedData);
        return $user;
    }

    public function destroy(User $user)
    {

        $user->delete();


        return response()->json($user, 200);
    }
}
