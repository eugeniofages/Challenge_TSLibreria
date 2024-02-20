import { useState, useEffect, createContext } from "react";
import axios from "axios";

import data from "../data/libros.js";
const LibreriaContext = createContext();
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const LibreriaProvider = ({ children }) => {
  const [libros, setLibros] = useState();
  const [reservas, setReservas] = useState();

  const [usuarios,setUsuarios] = useState()

  const prestarLibroAdmin = async(libro) => {
      const {user_id,libro_id} = libro

  
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/reservas/prestar`,
      {
        user_id,libro_id
      },
        {
          headers: {
            Accept: "application/json",
            "X-Requested-With": "XMLHttpRequest",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response)
      // toast.success(`El libro ${response.data.reserva.libro.nombre} fue prestado correctamente`)
     
     console.log('reservas',reservas)
     console.log('response',response)
    //  return console.log(response.data.reserva)
    toast.success(`El libro ${response.data.reserva.libro.nombre} fue otorgado a el usuario ${response.data.reserva.user.name}`)
      setReservas((prevReservas) => {
        if (prevReservas) {
          return {
            ...prevReservas,
            data: [...prevReservas.data, response.data.reserva], //
          };
        }
        return prevReservas;
      });
    } catch (error) {
      toast.error(error.response.data.message)
          console.log(error)
    }
    
  }
  const eliminarReservaAdmin = async(reserva) => {

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/delete-reserva/${reserva.id}`,
        reserva,
        {
          headers: {
            Accept: "application/json",
            "X-Requested-With": "XMLHttpRequest",
            Authorization: `Bearer ${token}`,
          },
        }
      );
        console.log(response)
      const reservasActualizados = reservas.data.filter(
        (item) => item.id !== reserva.id
      );
      setReservas((prevReservas) => ({ ...prevReservas, data: reservasActualizados }));
     
      toast.success(
        `La reserva ${response.data.id} fue eliminada correctamente`
      );
    } catch (error) {
      console.log(error);
      // toast.error("No se pudo eliminar el usuario");
    }


  }
  const eliminarUsuario = async (user,setErrores) =>{
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/delete-user/${user.id}`,
        user,
        {
          headers: {
            Accept: "application/json",
            "X-Requested-With": "XMLHttpRequest",
            Authorization: `Bearer ${token}`,
          },
        }
      );
    
      const usuariosActualizados = usuarios.data.filter(
        (item) => item.id !== user.id
      );
      setUsuarios((prevUsuarios) => ({ ...prevUsuarios, data: usuariosActualizados }));
     
      toast.success(
        `El usuario ${response.data.name} fue eliminado correctamente`
      );
    } catch (error) {
      console.log(error);
      toast.error("No se pudo eliminar el usuario");
    }
  }
  const eliminarLibro = async (libro, setErrores) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/delete-libro/${libro.id}`,
        libro,
        {
          headers: {
            Accept: "application/json",
            "X-Requested-With": "XMLHttpRequest",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const librosActualizados = libros.data.filter(
        (item) => item.id !== libro.id
      );
      setLibros((prevLibros) => ({ ...prevLibros, data: librosActualizados }));
      console.log("delete", libros, response.data);
      toast.success(
        `El libro ${response.data.nombre} fue eliminado correctamente`
      );
    } catch (error) {
      console.log(error);
      toast.error("No se pudo eliminar el libro");
    }
  };

    const modificarUsuarioAdmin = async(user,setErrores ) =>{
    
      try {
        user.role = Number(user.role)
        const token = localStorage.getItem("token");

        const response = await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/api/usuarios/${user.id}`,
          user,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
    
        setUsuarios((prevUsers) => {
          if (prevUsers) {
            const updatedUsers = prevUsers.data.map((user) => {
              if (user.id === response.data.id) {
                return response.data;
              } else {
                return user;
              }
            });
            return {
              ...prevUsers,
              data: updatedUsers,
            };
          }
          return prevUsers;
        });
        console.log(response.data, "actualizado");
        toast.success("Usuario actualizado");
  
        setErrores([]);
      } catch (error) {
        console.log(error);
        setErrores(Object.values(error.response.data.errors));
      }
    }

  const modificarLibroAdmin = async (libro, setErrores) => {
    try {
      console.log("llega esto", libro);
      const token = localStorage.getItem("token");

      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/libros/${libro.id}`,
        libro,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response);
      setLibros((prevLibros) => {
        if (prevLibros) {
          const updatedLibros = prevLibros.data.map((lib) => {
            if (lib.id === libro.id) {
              return response.data;
            } else {
              return lib;
            }
          });
          return {
            ...prevLibros,
            data: updatedLibros,
          };
        }
        return prevLibros;
      });
      console.log(response.data, "actualizado");
      toast.success("Libro actualizado");

      setErrores([]);
    } catch (error) {
      console.log(error);
      setErrores(Object.values(error.response.data.errors));
    }
  };
  const agregarUsuarioAdmin = async (user, setErrores) => {
     
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/usuarios`,
        user,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUsuarios((prevUsers) => {
        if (prevUsers) {
          return {
            ...prevUsers,
            data: [...prevUsers.data, response.data], //
          };
        }
        return prevUsers;
      });
      toast.success("Usuario agregado correctamente");
      setErrores([]);
    } catch (error) {
      setErrores(Object.values(error.response.data.errors));
    }
  }
  const agregarLibroAdmin = async (libro, setErrores) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/libros`,
        libro,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setLibros((prevLibros) => {
        if (prevLibros) {
          return {
            ...prevLibros,
            data: [...prevLibros.data, response.data], //
          };
        }
        return prevLibros;
      });
      toast.success("Libro agregado correctamente");
      setErrores([]);
    } catch (error) {
      setErrores(Object.values(error.response.data.errors));
    }
  };
  const devolverLibro = async (libro) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/reservas/${libro.id}/devolver`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response.data.message);
    } catch (error) {
      toast.error("Ocurrio un error");
    }
  };
  const getLibros = async (page, searchTerm) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/libros?page=${page}&search=${searchTerm}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLibros(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
    // setLibros(data)
  };

  const getReservas = async (page,searchTerm) =>{
    try {
    const token = localStorage.getItem("token");

      const response = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/reservas?page=${page}&search=${searchTerm}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setReservas(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }

  }
  const getUsuarios = async (page, searchTerm) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/usuarios?page=${page}&search=${searchTerm}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsuarios(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
    // setLibros(data)
  };
  return (
    <LibreriaContext.Provider
      value={{
        getLibros,
        libros,
        setLibros,
        devolverLibro,
        agregarLibroAdmin,
        modificarLibroAdmin,
        eliminarLibro,
        getUsuarios,
        usuarios,
        modificarUsuarioAdmin,
        setUsuarios,
        agregarUsuarioAdmin,
        eliminarUsuario,
        getReservas,
        reservas,
        setReservas,
        prestarLibroAdmin,
        eliminarReservaAdmin
      }}
    >
      {children}
    </LibreriaContext.Provider>
  );
};

export { LibreriaProvider };
export default LibreriaContext;
