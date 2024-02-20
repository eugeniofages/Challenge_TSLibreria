import React, { useState,useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate,Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
export default function Registro() {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [email, setEmail] = useState("");
  const [alerta, setAlerta] = useState("");


useEffect(()=>{

},[])
  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([username, password,email,passwordConfirm].includes("")) {
      setAlerta({ msg: "Todos los campos son obligatorios" });

      return;
    }


    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/register`,
        {
          email,
          name: username,
          password,
          password_confirmation : passwordConfirm
        }
      );

      setAlerta({});
      localStorage.setItem("token", data.token);
      toast.success(`Bienvenido ${data.user.name}`)



      setAuth(data.user);

      navigate("/panel");
     
   
    } catch (error) {
      setAlerta({ msg: error.response?.data?.message });
    }
  };
  return (
    <div className="flex justify-center items-center h-screen flex-col gap-5">
              <h1 className="font-bold text-5xl text-center text-blue-800">BIBLOTECA</h1>

      <div className="bg-white rounded-lg shadow-2xl w-80 p-8">
        <h1 className="font-bold text-3xl text-center">Registrarse </h1>
        {alerta.msg && (
          <div className="bg-red-500 p-2 text-white text-center my-4">
            {alerta.msg}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <input
              name="name"
              type="text"
              placeholder="Nombre y Apellido"
              className="w-full p-2 border border-gray-400 rounded mt-2"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <input
              type="email"
              placeholder="Correo"
              className="w-full p-2 border border-gray-400 rounded mt-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <input
              type="password"
              placeholder="Contraseña"
              className="w-full p-2 border border-gray-400 rounded mt-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mt-4">
            <input
              type="password"
              placeholder="Confirmar contraseña"
              className="w-full p-2 border border-gray-400 rounded mt-2"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </div>
          <div className="mt-2 flex flex-col">
          <Link
          to="/"
          >
          <span className=" mb-5 text-xs text-gray-400">Ya tienes cuenta? Inicia sesión</span>
          </Link>
            <button
              className="bg-blue-500 w-full py-2 text-white rounded hover:bg-blue-600"
              type="submit"
            >
              Registrarse
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
