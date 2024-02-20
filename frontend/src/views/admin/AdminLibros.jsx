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
} from "@nextui-org/react";
import { SearchIcon } from "../../utils/SearchIcon";
import ErrorAlerta from "../../components/ErrorAlerta";
import { toast } from "react-toastify";
export default function AdminLibros() {
  const {
    getLibros,
    libros,
    agregarLibroAdmin,
    modificarLibroAdmin,
    eliminarLibro,
  } = useLibreria();
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [errores, setErrores] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [action, setAction] = useState("");
  const [libroEdit, setLibroEdit] = useState({});
  const nombreRef = createRef();
  const estadoRef = createRef();
  const autorRef = createRef();
  const descripcionRef = createRef();
  const {
    isOpen: isOpenAgregar,
    onOpen: onOpenAgregar,
    onOpenChange: onOpenChangeAgregar,
    onClose: onCloseAgregar,
  } = useDisclosure();
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchLibros();
    }, 500);

    return () => clearTimeout(timer);
  }, [pagina, searchTerm]);
  const handleEditLibro = (libro) => {
    setLibroEdit(libro);
    console.log(libro.nombre);
  };
  const handleAgregarLibro = async () => {
    const datos = {
      nombre: nombreRef.current.value,
      autor: autorRef.current.value,
      descripcion: descripcionRef.current.value,
      estado: estadoRef.current.value,
    };

    if (action == "ADD") {
      // return console.log('add',datos)

      await agregarLibroAdmin(datos, setErrores);
      if (errores.length === 0) {
        nombreRef.current.value = "";
        autorRef.current.value = "";
        descripcionRef.current.value = "";
        setLibroEdit({});
      }
    } else {
      await modificarLibroAdmin(libroEdit, setErrores);
      onCloseAgregar();
      //  return console.log('editt',libroEdit)

      // call function
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setIsLoading(true);
  };

  const fetchLibros = async () => {
    await getLibros(pagina, searchTerm);

    setIsLoading(false);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLibroEdit({
      ...libroEdit,
      [name]: value,
    });
  };
  const handleDeleteLibro = async (libro) => {
    await eliminarLibro(libro, setErrores);
    console.log("eliminar", libro);
  };
  return (
    <div className="">
      <Modal isOpen={isOpenAgregar} onOpenChange={onOpenChangeAgregar}>
        <ModalContent>
          {(onCloseAgregar) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {action === "ADD" ? <h1> Nuevo libro</h1> : "Editar libro"}
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
                    <label className="text-slate-800" htmlFor="nombre">
                      Nombre del libro:{" "}
                    </label>
                    <input
                      ref={nombreRef}
                      value={libroEdit ? libroEdit.nombre : ""}
                      onChange={handleInputChange}
                      type="text"
                      id="nombre"
                      className="mt-2 w-full p-3 bg-gray-50"
                      name="nombre"
                      placeholder="Nombre libro"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="text-slate-800" htmlFor="autor">
                      Autor:{" "}
                    </label>
                    <input
                      ref={autorRef}
                      value={libroEdit ? libroEdit.autor : ""}
                      onChange={handleInputChange}
                      type="text"
                      id="autor"
                      className="mt-2 w-full p-3 bg-gray-50"
                      name="autor"
                      placeholder="Autor del libro"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="text-slate-800" htmlFor="estado">
                      Estado:
                    </label>
                    <select
                      defaultValue={libroEdit ? libroEdit.estado : ""}
                      ref={estadoRef}
                      onChange={handleInputChange}
                      id="estado"
                      name="estado"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option value={1} selected>
                        ACTIVO
                      </option>
                      <option value={0}>INACTIVO</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="text-slate-800" htmlFor="descripcion">
                      Descripción del libro:{" "}
                    </label>

                    <textarea
                      ref={descripcionRef}
                      value={libroEdit ? libroEdit.descripcion : ""}
                      onChange={handleInputChange}
                      name="descripcion"
                      id="descripcion"
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Descripción del libro"
                      rows={4}
                    ></textarea>
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
                    handleAgregarLibro();
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
          setLibroEdit({});
          onOpenAgregar();
          setAction("ADD");
        }}
        className="w-10 mb-2"
        color="primary"
      >
        Agregar
      </Button>
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
                  AUTOR
                </th>
                <th scope="col" className="px-6 py-3">
                  Disponible
                </th>
                <th scope="col" className="px-6 py-3">
                  PRESTADO
                </th>
                <th scope="col" className="px-6 py-3">
                  OPERACIONES
                </th>
              </tr>
            </thead>
            <tbody>
              {libros
                ? libros.data.map((libro, i) => (
                    <tr
                      key={libro.id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {libro.nombre}
                      </th>
                      <td className="px-6 py-4">{libro.autor}</td>
                      <td className="px-6 py-4">
                        {libro.estado === 1 ? (
                          <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                            Disponible
                          </span>
                        ) : (
                          <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
                            No disponible
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {libro.reservas?.length > 0 ? "SI" : "NO"}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => {
                            // handleSolicitar(libro);
                            setAction("EDIT");
                            onOpenAgregar();
                            handleEditLibro(libro);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6 text-blue-500"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                            />
                          </svg>
                        </button>
                        <button onClick={() => handleDeleteLibro(libro)}>
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
            {libros.links
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
