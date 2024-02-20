<?php

namespace App\Http\Controllers;

use App\Mail\CorreoMailable;
use App\Models\Libro;
use App\Models\Reserva;
use App\Models\Suscripcion;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\ValidationException;

class ReservaController extends Controller
{


    public function index(Request $request)
    {
        $query = Reserva::query();

        if ($request->has('search')) {
            $searchTerm = $request->input('search');
            $query->where('libro_id', 'like', '%' . $searchTerm . '%')
                ->orWhereHas('user', function($query) use ($searchTerm) {
                    $query->where('name', 'like', '%' . $searchTerm . '%');
                })
                ->orWhereHas('libro', function($query) use ($searchTerm) {
                    $query->where('nombre', 'like', '%' . $searchTerm . '%');
                });
        }

        $reservas = $query->with('user', 'libro')->paginate(10);

        return response()->json($reservas);

    }


    public function existeReserva($idLibro)
    {
        $reserva = Reserva::where('libro_id', $idLibro)->where('prestado', 1)->take(1)->get();
        if (!empty($reserva[0])) {
            return true;
        } else false;
    }


    public function checkCantidadPosesion()
    {
        $user = Auth::user()->id;

        $reservas = Reserva::where('user_id', $user)->where('prestado', 1)->get();
        return count($reservas);
    }
    public function store(Request $request)
    {

        try {
            //code...

            $user = Auth::user();
            $validatedData = $request->validate([
                'libro_id' => 'required|exists:libros,id',
            ]);

            //check cantidad de libros de la persona
            $cantidadReservas = $this->checkCantidadPosesion();
            if ($cantidadReservas >= 5) {
                return response()->json([
                    'message' => 'Usted puede tener como maximo 5 libros',


                ], 405);
            }
            $libro = Libro::find($request->libro_id);


            if ($libro->estado == 0) {
                return response()->json([
                    'message' => 'El libro no se encuentra disponible',
                    'libro' => $libro

                ], 405);
            } else {

                ///
                if ($this->existeReserva($libro->id)) {

                    return response()->json([
                        'message' => 'El libro se encuentra en posesión de alguien',
                        'libro' => $libro

                    ], 405);
                }




                $reserva = new Reserva();
                $reserva->user_id = $user->id;
                $reserva->prestado = 1;
                $reserva->libro_id = $validatedData['libro_id'];
                $reserva->save();
                $reserva->load('libro');
                return response()->json(['reserva' => $reserva], 200);
            }
        } catch (\Throwable $th) {
            //throw $th;

            return response()->json($th);
        }
    }

    public function update(Request $request, Reserva $reserva)
    {
        $reserva->update($request->all());
        return $reserva;
    }

    public function destroy(Reserva $reserva)
    {

        $reserva->delete();


        return response()->json($reserva, 200);
    }

    public function historialUsuario(User $user)
    {
        return $user->reservas()->with('libro')->get();
    }


    // public function prestarLibro(Request $request)
    // {
    //     // Validar si el usuario ya tiene 5 libros prestados
    //     $user = User::find($request->input('user_id'));
    //     if ($user->reservas()->where('prestado', true)->count() >= 5) {
    //         throw ValidationException::withMessages(['user_id' => 'El usuario ya tiene el máximo de libros prestados.']);
    //     }

    //     // Crear la reserva solo si el usuario tiene menos de 5 libros prestados
    //     $reserva = Reserva::create($request->all());

    //     // Aquí podrías agregar la lógica para notificar vía mail

    //     return $reserva;
    // }
    public function prestarLibroAdmin(Request $request)
    {

        try {

            $rules = [
                'libro_id' => 'required|exists:libros,id',
                'user_id' => 'required|exists:users,id',
            ];
            $messages = [
                'libro_id.required' => 'Debe ingresar un libro.',
                'user_id.required' => 'Debe ingresar un usuario.',

            ];
            $validatedData = $request->validate($rules, $messages);


            $cantidadReservas = $this->checkCantidadPosesion();
            if ($cantidadReservas >= 5) {
                return response()->json([
                    'message' => 'Usted puede tener como maximo 5 libros',


                ], 405);
            }
            $libro = Libro::find($request->libro_id);


            if ($libro->estado == 0) {
                return response()->json([
                    'message' => 'El libro no se encuentra disponible',
                    'libro' => $libro

                ], 405);
            } else {

                ///
                if ($this->existeReserva($libro->id)) {

                    return response()->json([
                        'message' => 'El libro se encuentra en posesión de alguien',
                        'libro' => $libro

                    ], 405);
                }




                $reserva = new Reserva();
                $reserva->user_id = $validatedData['user_id'];
                $reserva->prestado = 1;
                $reserva->libro_id = $validatedData['libro_id'];
                $reserva->save();
                $reserva->load('libro');
                $reserva->load('user');


                return response()->json(['reserva' => $reserva], 200);
            }
        } catch (\Throwable $th) {
            //throw $th;

            return response()->json($th);
        }
    }

    public function enviarCorreo($email,$libro){
        //

        $mailData = [

            'title' => 'Recordatorio de la app',
            'body' => 'Le recordamos que ya esta disponible el libro'. $libro

        ];
        Mail::to($email)->send(new CorreoMailable($mailData));

    }
    public function devolverLibro(Libro $libro)
    {

            try {


                $reserva = Reserva::where('libro_id', $libro->id)->where('user_id', Auth::user()->id)->where('prestado', 1)->take(1)->get();


                $suscripcion=Suscripcion::where('libro_id',$libro->id)->where('estado',1)->orderBy('id','asc')->with('user')->first();
                //

                if($suscripcion){
                    $this->enviarCorreo($suscripcion->user->email, $libro->nombre);
                    $suscripcion->estado = 0;
                    $suscripcion->save();

                }

                if (!empty($reserva[0])){
                    $reserva[0]->prestado = false;
                    $reserva[0]->save();


                    return response()->json(['message' => 'Devolviste el libro'], 200);
                } else {
                    return response()->json(['message' => 'No posees el libro'], 405);

                }
            } catch (\Throwable $th) {
                //throw $th;
                return response()->json($th);

            }


    }
}
