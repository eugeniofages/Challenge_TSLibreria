import React, { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { ToastContainer } from "react-toastify";

export default function AdminLayout() {
  const { auth, cargando } = useAuth();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");


 useEffect(()=>{
    if(!token)
    {
    navigate("/");

    }

 
 },[])
  if (cargando) {
    return <h1>Cargando</h1>;
  } else return   <div
  className="flex"
  >
    
    <Sidebar />
    <main className="w-full">
    <div className="lg:mx-20 mt-5">
    <Outlet />

    </div>

    </main>
    <ToastContainer/>
  </div>
}
