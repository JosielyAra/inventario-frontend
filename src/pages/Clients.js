import React, { useEffect, useState } from 'react'
import { useAuth } from "../Context/authContext";
import axios from 'axios'
import toast from "react-hot-toast";
import { Link, useNavigate } from 'react-router-dom'
import { FaRegEdit, FaTrash } from "react-icons/fa";

export const Clients = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [clients, setClients] = useState([])


  async function getClients(id) {
    const res = await axios.post('https://inventario-backend-production.up.railway.app/api/client/get', { id })
    setClients(res.data)
  }

  const deleteClient = async (id) => {
    try {
      await axios.delete('https://inventario-backend-production.up.railway.app/api/client/' + id)
      setClients(clients.filter(client => client._id !== id))
    } catch (error) {
      toast(
        (t) => {
          return (
            <div>
              <p className="mb-2 text-white">
                {error.message}{" "}
              </p>
              
            </div>
          );
        },
        {
          style: {
            background: "#fb923c",
          },
        }
      );
    }
  }

  const handleDelete = (id) => {
    toast(
      (t) => {
        return (
          <div>
            <p className="mb-2 text-white">
              Estas seguro que quieres eliminar este elemento? No se podra
              recuperar.{" "}
            </p>
            <div className="float-right">
              <button
                className="mr-2 inline-block px-6 py-2.5 bg-neutral-100 text-black font-medium text-sm leading-tight uppercase rounded shadow-md hover:bg-neutral-200 hover:shadow-lg focus:bg-neutral-200 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-neutral-300 active:shadow-lg transition duration-150 ease-in-out"
                onClick={() => {
                  deleteClient(id);
                  toast.dismiss(t.id);
                }}
              >
                Confirmar
              </button>
              <button
                className="inline-block px-6 py-2.5 bg-neutral-600 text-white font-medium text-sm leading-tight uppercase rounded shadow-md hover:bg-neutral-700 hover:shadow-lg focus:bg-neutral-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-neutral-800 active:shadow-lg transition duration-150 ease-in-out"
                onClick={() => toast.dismiss(t.id)}
              >
                Cancelar
              </button>
            </div>
          </div>
        );
      },
      {
        style: {
          background: "#fb923c",
        },
      }
    );
  };

  useEffect(() => {
    getClients(user.uid)


  }, [user])

  if (clients.length < 1) {
    return (
      <div className='text-white text-center'>
        <div>
      <h1 className="text-white text-center text-5xl mb-2">Clientes / Proveedores</h1>
      </div>
        <div className='mt-64'>
        <p className='mb-3'>No existen clientes / proveedores.</p>
        <Link
          to='/clients/create'
          className=' hover:bg-gray-700 text-white font-bold p-3 rounded'
        >
          Crear Uno      </Link>
        </div>
       
      </div>
    )
  } else {
    return (

      <div className='p-6'>
         <div>
      <h1 className="text-white text-center text-5xl mb-2">Clientes / Proveedores</h1>
      </div>
        <Link
          to='/clients/create'
          className=' hover:bg-gray-700 text-white font-bold py-2 px-4 rounded'
        >
          Crear cliente      </Link>
        <div className='flex flex-wrap'>

          {clients.map((client) => <div className=' w-full sm:w-full md:w-1/3 lg:w-1/4 xl:w-1/5 m-3 bg-zinc-500 text-white rounded-lg p-3' key={client._id}>
            <p>{client.name}</p>
            <p>{client.ci}</p>
            <p>{client.phone}</p>
            <button onClick={() => handleDelete(client._id)} className='mr-2'><FaTrash className='w-5 h-5' /></button>
            <button onClick={() => navigate(`/clients/edit/${client._id}`)}><FaRegEdit className='w-5 h-5' /></button>
          </div>)}
        </div>
      </div>
    )
  }
}


