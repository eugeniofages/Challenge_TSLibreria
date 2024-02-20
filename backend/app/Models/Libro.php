<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Libro extends Model
{
    use HasFactory;
        public $fillable=['nombre','autor','descripcion','estado'];
    public function reservas(){

        return $this->hasMany(Reserva::class,'libro_id','id');
    }
}
