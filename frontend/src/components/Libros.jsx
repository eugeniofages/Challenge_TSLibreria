import React from "react";
import Libro from "./Libro";
import useAuth from "../hooks/useAuth";
export default function Libros({libros,actualizarLibros}) {
  const {auth} = useAuth();
 
  return (      
    <div className="grid grid-cols-2 gap-5 items-center justify-center md:grid-cols-4">
        {libros.map((libro,i) => (
                        <Libro
                        user={auth}
                        actualizarLibros={actualizarLibros}
                        key={i}
                        libro={libro}
                        />  

        ))}
     
      
    </div>
  );
}
