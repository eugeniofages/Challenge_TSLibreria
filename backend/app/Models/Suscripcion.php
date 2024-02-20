<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Suscripcion extends Model
{
    use HasFactory;

    public $table = 'suscripciones';
    public $fillable =['id','user_id','libro_id','estado'];
    public function user(){
        return $this->hasOne(User::class,'id','user_id');
    }
}
