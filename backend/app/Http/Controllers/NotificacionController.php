<?php

namespace App\Http\Controllers;

use App\Models\Libro;
use App\Models\Reserva;
use App\Models\Suscripcion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NotificacionController extends Controller
{
    //

    public function disponibilidadLibro($id){
        $reserva=Libro::where('id',$id)->where('estado', 1)->take(1)->get();
        return $reserva;

    }
    public function existeSuscripcion($id){
        $suscripcion=Suscripcion::where('libro_id',$id)->where('user_id',Auth::user()->id)->where('estado', 1)->take(1)->get();
        if (!empty($suscripcion[0])){

            return true;
        } else return false;
    }
    public function queue(Libro $libro)
    {
        // $estaDisponible=$this->disponibilidadLibro($libro->id);

        // if (!empty($estaDisponible[0])){
        //     return response()->json(['message' => 'El libro  esta disponible'], 405);
        // }
        if ($this->existeSuscripcion($libro->id)){
            return response()->json(['message' => 'Ya estas suscripto a este libro.'], 405);
        }



        $notificacion = Suscripcion::where('libro_id', $libro)->where('estado', 1)->where('user_id', Auth::user()->id)->take(1)->get();

        if (!empty($notificacion[0])) {
            return response()->json(['message' => 'Ya te encuentras en la lista de espera'], 405);

        }

        $notificacion = new Suscripcion();
        $notificacion->user_id = Auth::user()->id;

        $notificacion->libro_id = $libro->id;
        $notificacion->save();
        return response()->json(['message' => 'Te avisaremos por correo cuando el libro este disponible'], 200);

    }
}
