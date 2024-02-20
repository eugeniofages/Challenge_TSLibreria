<?php

namespace App\Http\Controllers;

use App\Http\Requests\LibroRequest;
use Illuminate\Http\Request;
use App\Models\Libro;
use App\Models\User;
use App\Models\Reserva;
use Illuminate\Support\Facades\Auth;

class LibroController extends Controller
{
    public function index(Request $request)
    {
        $query = Libro::query();

        if ($request->has('search')) {
            $searchTerm = $request->input('search');
            $query->where('nombre', 'like', '%' . $searchTerm . '%');
        }

        $query->with(['reservas' => function ($query) {
            $query->where('prestado', 1);
        }]);


        $libros = $query->paginate(10);
        return response()->json($libros);
    }


    public function store(LibroRequest $request)
    {
        $data = $request->validated();
        $libro = Libro::create([
            'nombre' => $data['nombre'],
            'autor' => $data['autor'],
            'descripcion' => $data['descripcion'],
            'estado' => 1

        ]);

        return response()->json($libro);
    }

    public function update(LibroRequest $request, Libro $libro)
    {
        $data = $request->validated();
        $libro->update($request->all());
        $libro->load(['reservas' => function ($query) {
            $query->where('prestado', 1);
        }]);
        return $libro;
    }

    public function destroy(Libro $libro)
    {

            $libro->delete();


        return response()->json($libro, 200);
    }

    public function search(Request $request)
    {
        return Libro::where('nombre', 'like', '%' . $request->input('nombre') . '%')->get();
    }
}
