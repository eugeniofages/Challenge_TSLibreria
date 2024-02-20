<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use App\Models\User;
class LibroSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $libros = [
            [
                'nombre' => 'Book 1',
                'autor' => 'Author 1',
                'descripcion' => 'Description 1',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
                'estado' => true,
            ],
            [
                'nombre' => 'Book 2',
                'autor' => 'Author 2',
                'descripcion' => 'Description 2',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
                'estado' => true,
            ],
            [
                'nombre' => 'Book 3',
                'autor' => 'Author 3',
                'descripcion' => 'Description 3',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
                'estado' => true,
            ],
            [
                'nombre' => 'Book 4',
                'autor' => 'Author 4',
                'descripcion' => 'Description 4',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
                'estado' => true,
            ],
            [
                'nombre' => 'Book 5',
                'autor' => 'Author 5',
                'descripcion' => 'Description 5',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
                'estado' => true,
            ],
            [
                'nombre' => 'Book 6',
                'autor' => 'Author 6',
                'descripcion' => 'Description 6',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
                'estado' => true,
            ],
            [
                'nombre' => 'Book 7',
                'autor' => 'Author 7',
                'descripcion' => 'Description 7',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
                'estado' => true,
            ],
            [
                'nombre' => 'Book 8',
                'autor' => 'Author 8',
                'descripcion' => 'Description 8',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
                'estado' => true,
            ],
            [
                'nombre' => 'Book 9',
                'autor' => 'Author 9',
                'descripcion' => 'Description 9',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
                'estado' => true,
            ],
            [
                'nombre' => 'Book 10',
                'autor' => 'Author 10',
                'descripcion' => 'Description 10',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
                'estado' => true,
            ],
            [
                'nombre' => 'Book 11',
                'autor' => 'Author 11',
                'descripcion' => 'Description 11',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
                'estado' => true,
            ],
            [
                'nombre' => 'Book 12',
                'autor' => 'Author 12',
                'descripcion' => 'Description 12',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
                'estado' => true,
            ],
            [
                'nombre' => 'Book 13',
                'autor' => 'Author 13',
                'descripcion' => 'Description 13',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
                'estado' => true,
            ],
            [
                'nombre' => 'Book 14',
                'autor' => 'Author 14',
                'descripcion' => 'Description 14',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
                'estado' => true,
            ],
            [
                'nombre' => 'Book 15',
                'autor' => 'Author 15',
                'descripcion' => 'Description 15',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
                'estado' => true,
            ],
            [
                'nombre' => 'Book 16',
                'autor' => 'Author 16',
                'descripcion' => 'Description 16',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
                'estado' => true,
            ],
            [
                'nombre' => 'Book 17',
                'autor' => 'Author 17',
                'descripcion' => 'Description 17',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
                'estado' => true,
            ],
            [
                'nombre' => 'Book 18',
                'autor' => 'Author 18',
                'descripcion' => 'Description 18',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
                'estado' => true,
            ],
            [
                'nombre' => 'Book 19',
                'autor' => 'Author 19',
                'descripcion' => 'Description 19',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
                'estado' => true,
            ],
            [
                'nombre' => 'Book 20',
                'autor' => 'Author 20',
                'descripcion' => 'Description 20',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
                'estado' => true,
            ],
            [
                'nombre' => 'Book 21',
                'autor' => 'Author 21',
                'descripcion' => 'Description 21',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
                'estado' => true,
            ],
            [
                'nombre' => 'Book 22',
                'autor' => 'Author 22',
                'descripcion' => 'Description 22',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
                'estado' => true,
            ],
            [
                'nombre' => 'Book 23',
                'autor' => 'Author 23',
                'descripcion' => 'Description 23',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
                'estado' => true,
            ],
            [
                'nombre' => 'Book 24',
                'autor' => 'Author 24',
                'descripcion' => 'Description 24',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
                'estado' => true,
            ],
            [
                'nombre' => 'Book 25',
                'autor' => 'Author 25',
                'descripcion' => 'Description 25',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
                'estado' => true,
            ],
            [
                'nombre' => 'Book 26',
                'autor' => 'Author 26',
                'descripcion' => 'Description 26',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
                'estado' => true,
            ],
            [
                'nombre' => 'Book 27',
                'autor' => 'Author 27',
                'descripcion' => 'Description 27',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
                'estado' => true,
            ]
        ];

        DB::table('libros')->insert($libros);
        $userAdmin = new User();
        $userAdmin->name = 'Administrador';
        $userAdmin->email = 'admin@admin.com';
        $userAdmin->password = bcrypt('123456');
        $userAdmin->save();
    }
}
