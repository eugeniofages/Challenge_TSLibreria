import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useLibreria from "../hooks/useLibreria";
import useAuth from "../hooks/useAuth";
export default function Libro({ libro, actualizarLibros, user }) {
  const {devolverLibro,queueLibro } = useLibreria();
  const {auth} = useAuth()
  const [libroSelect, setLibroSelect] = useState();
  const {
    isOpen: isOpenSolicitar,
    onOpen: onOpenSolicitar,
    onOpenChange: onOpenChangeSolicitar,
    onClose: onCloseSolicitar,
  } = useDisclosure();
  const handleSolicitar = (libro) => {
    setLibroSelect(libro);
  };
  const handleNotificarUser = async(libro,auth) => {

    queueLibro(libro,auth)
  }

  const handleDevolverLibro = (libro) => {
   
    devolverLibro(libro)
    actualizarLibros()
    console.log('devolver el libro', libro)
  }
  const handleConfirmSolicitar = async () => {
    onCloseSolicitar();
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/reservas`,
        {
          libro_id: libroSelect.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(
        `Ahora posees el libro ${response.data.reserva.libro.nombre}`
      );

      actualizarLibros();
      onCloseSolicitar();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  console.log(auth,'user')
  return (
    <>
      <Card className="py-4">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <h4 className="font-bold text-large">{libro?.nombre}</h4>
          <small className="text-default-500">{libro?.autor}</small>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <Image
            alt="Card background"
            className="object-cover rounded-xl"
            src="https://picperf.io/https://laravelnews.s3.amazonaws.com/images/laravel-featured.png"
            width={270}
          />
        </CardBody>
        <div className="flex justify-center items-center">
          {/* case:1 SI ESTA ACTIVO MOSTRAR SOLICITAR ->case1.1 de tener
                 5 LIBROS MOSTRAR error EN TOAST
                 case:2 mostrar boton des con text No disponible
                 
                 CASE LIBRO NO DISPONIBLE: MOSTRAR BOTON WISHLISH QUE GUARDE EN LA DB EL LIBRO QUE YO QUIERO CUANDO ESTE DIPOSNIBLE,
                 
                 */}
          {libro?.reservas[0] && auth.user?.id === libro?.reservas[0].user_id && libro?.reservas[0].prestado === 1 ? (
            <Button 
            onPress={(e) => handleDevolverLibro(libro)}
            className="w-40 " color="warning" >
              Devolver
            </Button>
          ) : libro?.reservas[0]?.prestado===1 ? (
            <div className="flex justify-evenly items-center gap-1">
              <Button className="w-40 " color="default" disabled>
                Reservado
              </Button>
              {libro?.reservas[0]?.user_id != auth?.user?.id  ?   <button
              onClick={() => handleNotificarUser(libro,auth)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                  />
                </svg>
              </button> : ''}
            
            </div>
          ) : libro?.estado === 1 ? (
            <Button
              onPress={() => {
                handleSolicitar(libro);
                onOpenSolicitar();
              }}
              className="w-40 "
              color="primary"
            >
              Solicitar
            </Button>
          ) : (
            <div  className="flex justify-evenly items-center gap-1">
              
              <Button className="w-40 " color="danger" disabled>
              No disponible
            </Button>
           
               </div>
            
          )}
        </div>
      </Card>

      <Modal isOpen={isOpenSolicitar} onOpenChange={onOpenChangeSolicitar}>
        <ModalContent>
          {(onCloseSolicitar) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Esta por solicitar el libro {libroSelect?.nombre} esta seguro?
              </ModalHeader>
              <ModalBody>
                <p className="font-light">{libroSelect?.autor}</p>
                <img
                  alt={libroSelect?.nombre}
                  className="object-fill w-full rounded-xl mt-2"
                  src="https://picperf.io/https://laravelnews.s3.amazonaws.com/images/laravel-featured.png"
                  width={270}
                />
                <p>{libroSelect?.descripcion}</p>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={onCloseSolicitar}
                >
                  No
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    handleConfirmSolicitar();
                  }}
                >
                  Si
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
