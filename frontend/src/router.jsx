import Layout from "./views/Layout";
import Login from "./views/Login";
import Registro from "./views/Registro";
import Home from "./views/admin/Home";
import UserLayout from "./views/user/UserLayout";
import AdminLayout from "./views/admin/AdminLayout";
import Reservas from "./views/admin/Reservas";
import { createBrowserRouter } from "react-router-dom";
import HomeAdmin from "./views/admin/HomeAdmin";
import AdminLibros from "./views/admin/AdminLibros";
import AdminUsuarios from "./views/admin/AdminUsuarios";
import AdminHistorial from "./views/admin/AdminHistorial";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
        {
            index: true,
            element: <Login/>,

        },
        {
            path:'/registro',
            element: <Registro/>
        }
    ],
  },
  {
    path: "/panel",
    element: <UserLayout />,
    children: [
        {
            index: true,
            element: <Home/>,

        },
       
        
    ],
  },

  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
        {
            index: true,
            element: <HomeAdmin/>,

        },

       
        
        {
            path:'usuarios',
            element: <AdminUsuarios/>,

        },
        {
            path:'libros',
            element: <AdminLibros/>,

        },
        {
            path:'historial',
            element: <AdminHistorial/>,

        },
        
    ],
  },
 
]);

export default router;
