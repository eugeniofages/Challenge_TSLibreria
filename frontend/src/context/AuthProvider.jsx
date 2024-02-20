import { useState, useEffect, createContext } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
 

  const [auth, setAuth] = useState({});
  const [cargando, setCargando] = useState(true);
  const [infoUser,setInfoUser] = useState({})


  useEffect(() => {
      

    const autenticarUsuario = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setCargando(false);
        return;
      }

     

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/user`,
          config
        );

       
        setAuth(data);
       
        
        
        // const navigate = useNavigate(); 
        // navigate("/panel"); // Use navigate here
       
      } catch (error) {
        console.log(error);
      }

      setCargando(false);
    };

    autenticarUsuario();
  }, []); 

  const cerrarSesionAuth = async () => {
    try {
  const token = localStorage.getItem("token");

      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/logout`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      localStorage.removeItem('token');
      
   
      setAuth({});
      
    } catch (error) {
console.log(error)

    }
  };


  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        cargando,
        setCargando,
        cerrarSesionAuth,
        
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
export default AuthContext;