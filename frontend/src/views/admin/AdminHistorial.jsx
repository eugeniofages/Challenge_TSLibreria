import React, { useState, useEffect, createRef } from "react";
import useLibreria from "../../hooks/useLibreria";
import {
  Button,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Autocomplete,
  AutocompleteItem,
} from "@nextui-org/react";
import FormatoFecha from "../../utils/FormatoFecha";
import { SearchIcon } from "../../utils/SearchIcon";
import ErrorAlerta from "../../components/ErrorAlerta";
import { toast } from "react-toastify";
export default function AdminHistorial() {
  const {
    libros,
    getReservas,
    reservas,
    usuarios,
    getUsuarios,
    getLibros,
    prestarLibroAdmin,
    eliminarReservaAdmin,
  } = useLibreria();
  
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [errores, setErrores] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [action, setAction] = useState("");
  const [usuarioViewReserva, setUsuarioViewReserva] = useState({});
  const [reservaNueva, setReservaNueva] = useState({
    user_id: "",
    libro_id: "",
  });
  const {
    isOpen: isOpenAgregar,
    onOpen: onOpenAgregar,
    onOpenChange: onOpenChangeAgregar,
    onClose: onCloseAgregar,
  } = useDisclosure();
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchReservas();
    }, 500);

    return () => clearTimeout(timer);
  }, [pagina, searchTerm]);

  const handleEditUsuario = (usuario) => {
    setReservaNueva(usuario);
  };

  const handleAgregarReserva = async (e) => {
    
    if (!reservaNueva.user_id || !reservaNueva.libro_id) {
        console.log(reservaNueva)
        toast.error('Debe seleccionar un libro y un usuario.');
        return;
      }
    
    else 
     console.log('eviado', reservaNueva);

      await prestarLibroAdmin(reservaNueva)
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setIsLoading(true);
  };

  const fetchReservas = async () => {
    getLibros(1, "");
    getUsuarios(1, "");
    await getReservas(pagina, searchTerm);

    setIsLoading(false);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReservaNueva({
      ...usuarioEdit,
      [name]: value,
    });
  };

  const handleOnChangeLibro = (id) => {
    setReservaNueva(prevState => ({
        ...prevState,
        libro_id: id
      }));
    
  };
  const handleChangeUsuario = (id) => {
    setReservaNueva(prevState => ({
        ...prevState,
        user_id: id
      }));
  };
  const inputChangeLibro = (nombreLibro) => {
    const timer = setTimeout(() => {
      getLibros(1, nombreLibro);
    }, 1000);

    return () => clearTimeout(timer);
  };
  const handleDeleteReserva = async(reserva) =>{
   await eliminarReservaAdmin(reserva)
    console.log(reserva)
  }
  const inputChangeUsuario = (nombreUsuario) => {
    const timer = setTimeout(() => {
      getUsuarios(1, nombreUsuario);
    }, 1000);

    return () => clearTimeout(timer);
  };

  const handleEliminarReserva = async (reserva) => {
    await eliminarReserva(reserva, setErrores);
    console.log("eliminar reserva", reserva);
  };

  return (
    <div className="">
      <Modal isOpen={isOpenAgregar} onOpenChange={onOpenChangeAgregar}>
        <ModalContent>
          {(onCloseAgregar) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {action === "ADD" ? <h1> Prestar Libro</h1> : ""}
              </ModalHeader>
              <form
                noValidate
                //  onSubmit={handleAgregarLibro}
                action=""
              >
                <ModalBody>
                  {errores
                    ? errores.map((error, i) => (
                        <ErrorAlerta key={i}>{error}</ErrorAlerta>
                      ))
                    : null}
                  <div className="mb-4">
                    <Autocomplete
                      name="libro_id"
                      onSelectionChange={handleOnChangeLibro}
                      onInputChange={inputChangeLibro}
                      label="Libro"
                      className="max-w-xs"
                    >
                      {libros?.data.map((libro) => (
                        <AutocompleteItem key={libro.id} value={libro.id}>
                          {libro.nombre}
                        </AutocompleteItem>
                      ))}
                    </Autocomplete>
                  </div>
                  <div className="mb-4">
                    <Autocomplete
                      name="user_id"
                      label="Usuario"
                      className="max-w-xs"
                      onSelectionChange={handleChangeUsuario}
                      onInputChange={inputChangeUsuario}
                    >
                      {usuarios?.data.map((user) => (
                        <AutocompleteItem key={user.id} value={user.id}>
                          {user.name}
                        </AutocompleteItem>
                      ))}
                    </Autocomplete>
                  </div>

                  {/* <input
            type="submit"
            value="AGREGAR"
            className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
          /> */}
                </ModalBody>
              </form>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onCloseAgregar}>
                  No
                </Button>
                <Button
                  color="primary"
                  onPress={(e) => {
                    handleAgregarReserva(e);
                  }}
                >
                  Si
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Button
        onPress={() => {
          // handleSolicitar(libro);
          setReservaNueva({});
          onOpenAgregar();
          setAction("ADD");
        }}
        className="w-28 mb-2"
        color="primary"
      >
        Prestar Libro
      </Button>
      <Input
        isClearable
        classNames={{
          base: "w-full sm:max-w-[44%] mb-5",
          inputWrapper: "border-1",
        }}
        placeholder="Buscar usuario por nombre..."
        size="sm"
        startContent={<SearchIcon className="text-default-300" />}
        value={searchTerm}
        variant="bordered"
        onClear={() => setSearchTerm("")}
        onChange={handleSearchChange}
      />
      {isLoading ? (
        <h1>Cargando</h1>
      ) : (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className=" w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Libro
                </th>
                <th scope="col" className="px-6 py-3">
                  Usuario
                </th>
                <th scope="col" className="px-6 py-3">
                  Estado
                </th>

                <th scope="col" className="px-6 py-3">
                  OPERACIONES
                </th>
              </tr>
            </thead>
            <tbody>
              {reservas
                ? reservas.data.map((reserva, i) => (
                    <tr
                      key={reserva.id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {reserva.libro.nombre}
                      </th>
                      <td className="px-6 py-4">{reserva.user.name}</td>
                      <td className="px-6 py-4">
                        {reserva.prestado == 1 ? (
                          <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                            En curso desde <FormatoFecha fecha={reserva.created_at}/>
                          </span>
                        ) : (
                          <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
                            Devuelto el <FormatoFecha fecha={reserva.updated_at}/>
                          </span>
                        )}
                      </td>

                      <td className="px-6 py-4">
                        <button
                          onClick={() => {
                            // handleSolicitar(libro);
                          
                            onOpenAgregar();
                            
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                            />
                          </svg>
                        </button>
                        <button onClick={() => handleDeleteReserva(reserva)}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6 text-red-500"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                            />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))
                : ""}
            </tbody>
          </table>
          <div className="flex items-center justify-center gap-5 mt-5">
            {reservas.links
              .filter(
                (link) =>
                  !["&laquo; Previous", "Next &raquo;"].includes(link.label)
              )
              .map((link, index) => (
                <button
                  className={
                    link.active
                      ? "text-lg font-bold bg-blue-700 p-2 text-white rounded-lg"
                      : "text-lg font-bold"
                  }
                  key={index}
                  onClick={() => setPagina(link.label)}
                  disabled={link.active}
                >
                  {link.label}
                </button>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
