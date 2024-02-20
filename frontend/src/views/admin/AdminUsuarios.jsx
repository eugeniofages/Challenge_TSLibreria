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
export default function AdminUsuarios() {
  const {
    getUsuarios,
    usuarios,
    agregarUsuarioAdmin,
    modificarUsuarioAdmin,
    eliminarUsuario,
  } = useLibreria();
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [errores, setErrores] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [action, setAction] = useState("");
  const [usuarioEdit, setUsuarioEdit] = useState({});
  const nombreRef = createRef();
  const passwordRef = createRef();
  const correoRef = createRef();

  const rolRef = createRef();
  const {
    isOpen: isOpenAgregar,
    onOpen: onOpenAgregar,
    onOpenChange: onOpenChangeAgregar,
    onClose: onCloseAgregar,
  } = useDisclosure();
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchUsuarios();
    }, 500);

    return () => clearTimeout(timer);
  }, [pagina, searchTerm]);
  const handleEditUsuario = (usuario) => {
    setUsuarioEdit(usuario);

  };
  const handleAgregarUsuario = async () => {
    const datos = {
      name: nombreRef.current.value,
      email: correoRef.current.value,
      password: passwordRef.current.value,
      role: rolRef.current.value,
    };

    if (action == "ADD") {
      // return console.log('add',datos)

      await agregarUsuarioAdmin(datos, setErrores);
      if (errores.length === 0) {
        nombreRef.current.value = "";
        correoRef.current.value = "";
        passwordRef.current.value = "";
        rolRef.current.value = "";

        setUsuarioEdit({});
      }
    } else {
       await modificarUsuarioAdmin(usuarioEdit, setErrores);
    
      onCloseAgregar();

      // call function
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setIsLoading(true);
  };

  const fetchUsuarios = async () => {
    await getUsuarios(pagina, searchTerm);

    setIsLoading(false);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUsuarioEdit({
      ...usuarioEdit,
      [name]: value,
    });
  };
  const handleDeleteUsuario = async (user) => {
    await eliminarUsuario(user, setErrores);
    console.log("eliminar user", user);
  };
  return (
    <div className="">
      <Modal isOpen={isOpenAgregar} onOpenChange={onOpenChangeAgregar}>
        <ModalContent>
          {(onCloseAgregar) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {action === "ADD" ? <h1> Nuevo Usuario</h1> : "Editar Usuario"}
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
                    <label className="text-slate-800" htmlFor="name">
                      Nombre:{" "}
                    </label>
                    <input
                      ref={nombreRef}
                      value={usuarioEdit ? usuarioEdit.name : ""}
                      onChange={handleInputChange}
                      type="text"
                      id="name"
                      className="mt-2 w-full p-3 bg-gray-50"
                      name="name"
                      placeholder="Nombre"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="text-slate-800" htmlFor="password">
                      Contraseña:{" "}
                    </label>
                    <input
                      ref={passwordRef}
                      value={usuarioEdit ? usuarioEdit.password : ""}
                      onChange={handleInputChange}
                      type="password"
                      id="password"
                      className="mt-2 w-full p-3 bg-gray-50"
                      name="password"
                      placeholder="Password"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="text-slate-800" htmlFor="email">
                      Correo:{" "}
                    </label>
                    <input
                      ref={correoRef}
                      value={usuarioEdit ? usuarioEdit.email : ""}
                      onChange={handleInputChange}
                      type="email"
                      id="email"
                      className="mt-2 w-full p-3 bg-gray-50"
                      name="email"
                      placeholder="Correo"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="text-slate-800" htmlFor="role">
                      Estado:
                    </label>
                    <select
                      defaultValue={usuarioEdit ? usuarioEdit.role : ""}
                      ref={rolRef}
                      onChange={handleInputChange}
                      id="role"
                      name="role"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option value={1} selected>
                        ADMIN
                      </option>
                      <option value={0}>USUARIO</option>
                    </select>
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
                    handleAgregarUsuario();
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
          setUsuarioEdit({});
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
                  Nombre
                </th>
                <th scope="col" className="px-6 py-3">
                  Correo
                </th>
                <th scope="col" className="px-6 py-3">
                  Tipo
                </th>
               
                <th scope="col" className="px-6 py-3">
                  OPERACIONES
                </th>
              </tr>
            </thead>
            <tbody>
              {usuarios
                ? usuarios.data.map((user, i) => (
                    <tr
                      key={user.id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {user.name}
                      </th>
                      <td className="px-6 py-4">{user.email}</td>
                      <td className="px-6 py-4">
                        {user.role == 1 ? (
                          <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                            ADMIN
                          </span>
                        ) : (
                          <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
                            USUARIO
                          </span>
                        )}
                      </td>
                    
                      <td className="px-6 py-4">
                        <button
                          onClick={() => {
                            // handleSolicitar(libro);
                            setAction("EDIT");
                            onOpenAgregar();
                            handleEditUsuario(user);
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
                        <button onClick={() => handleDeleteUsuario(user)}>
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
            {usuarios.links
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
