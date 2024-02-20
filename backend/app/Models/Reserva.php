<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reserva extends Model
{
    use HasFactory;



    public function libro(){
        return $this->hasOne(Libro::class,'id','libro_id');
    }

    public function user(){
        return $this->hasOne(User::class,'id','user_id');
    }
}
