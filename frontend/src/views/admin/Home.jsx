import React, { useState, useEffect } from "react";
import Libros from "../../components/Libros";
import { Input } from "@nextui-org/react";
import { SearchIcon } from "../../utils/SearchIcon";
import useLibreria from "../../hooks/useLibreria.jsx";
import { useNavigate } from "react-router-dom";
export default function Home() {
  const { getLibros, libros } = useLibreria();
  const [searchTerm, setSearchTerm] = useState("");
  const [pagina, setPagina] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [typingTimeout, setTypingTimeout] = useState(0);
const navigate = useNavigate()
const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token){
      navigate('/')
    }
    const timer = setTimeout(() => {
      fetchLibros();
    }, 500);

    return () => clearTimeout(timer);
  }, [pagina, searchTerm]);

  const actualizarLibros = () => {

    fetchLibros();
  };

  const fetchLibros = async () => {
    await getLibros(pagina, searchTerm);

    setIsLoading(false);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setIsLoading(true);
  };

  return (
    <div>
      <Input
        isClearable
        classNames={{
          base: "w-full sm:max-w-[44%] mb-5",
          inputWrapper: "border-1",
        }}
        placeholder="Buscar libro por nombre..."
        size="sm"
        startContent={<SearchIcon className="text-default-300" />}
        value={searchTerm}
        variant="bordered"
        onClear={() => setSearchTerm("")}
        onChange={handleSearchChange}
      />
      {isLoading ? (
        <div>Cargando</div>
      ) : (
        <>
          <Libros libros={libros?.data} actualizarLibros={actualizarLibros}  />
          <div className="flex items-center justify-center gap-5 mt-5">
           
            {libros.links
              .filter(
                (link) =>
                  !["&laquo; Previous", "Next &raquo;"].includes(link.label)
              )
              .map((link, index) => (
                <button
                className={link.active ? 'text-lg font-bold bg-blue-700 p-2 text-white rounded-lg' : 'text-lg font-bold'}

                  key={index}
                  onClick={() => setPagina(link.label)}
                  disabled={link.active}
                >
                  {link.label}
                </button>
              ))}
           
          </div>
        </>
      )}
    </div>
  );
}
