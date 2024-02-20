import React from 'react'

export default function FormatoFecha({fecha}) {
    const fechaObj = new Date(fecha);

    // Obtener los componentes de la fecha (día, mes y año)
    const dia = fechaObj.getDate();
    const mes = fechaObj.getMonth() + 1; // Los meses van de 0 a 11 en JavaScript
    const año = fechaObj.getFullYear();
  
    // Formatear la fecha en el formato deseado (dd/mm/yyyy)
    const fechaFormateada = `${dia}/${mes}/${año}`;
  
    return <span>{fechaFormateada}</span>;
}
