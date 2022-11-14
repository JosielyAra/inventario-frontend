import { FaRegEdit, FaTrash, FaCartPlus } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import axios from 'axios'
import { FormatMoney } from "format-money-js";
import toast from "react-hot-toast";
import { useProducts } from "../Context/productsContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/authContext";

export function ProductsCard({ product }) {
  const { user } = useAuth();
  const [mon, setmon] = useState()
  const { deleteProduct,getProduct } = useProducts();
  const navigate = useNavigate();
  const fm = new FormatMoney({
    decimals: 2,
  });


  const getMonedaUsuario = async (id)=>{
    const getMonedaUser = await axios.post('https://inventario-backend-production.up.railway.app/api/monedas/get/'+id)
    setmon(getMonedaUser.data)
  }

useEffect(() => {
  getMonedaUsuario(user.uid)
}, [user])


  const addCarrito = async (userId, product) => {
    try {
      const res = await axios.post('https://inventario-backend-production.up.railway.app/api/carrito', {userId, product})
    if(res.status === 200){
      toast(
        (t) => {
          return (
            <div>
              <p className="mb-2 text-white">
                Producto agregado exitosamente.{" "}
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
      getProduct(user)
    }else if(res.status === 204){
      toast(
        (t) => {
          return (
            <div>
              <p className="mb-2 text-white">
                Producto sumado.{" "}
              </p>
            </div>
          );
        },
        {
          style: {
            background: "#fbbf24",
          },
        }
      );
    }
      
    
    } catch (error) {
      if(error.response.status === 404){
        toast(
          (t) => {
            return (
              <div>
                <p className="mb-2 text-white">
                  {error.response.data.message}{" "}
                </p>
              </div>
            );
          },
          {
            style: {
              background: "#dc2626",
            },
          }
        );
      }else{
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
              background: "#dc2626",
            },
          }
        );
      }
    }
  };

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
                  deleteProduct(id);
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
  return (
    <div className="bg-orange-400 w-full sm:w-full md:w-1/4 lg:w-1/4 xl:w-1/6 m-3 text-white rounded-md shadow-white hover:bg-orange-500">
      <div className="p-4">
        <div className="flex justify-between">
          <h3 className="font-bold">{product.name}</h3>
        </div>
        <div className="flex justify-between ">
          <h3 className="font-thin text-xs">{product.description}</h3>
        </div>
        <div className="flex justify-end">
          Precio de compra
        </div>
        <div className="flex justify-end">
          <h3 className="font-black text-base mr-3">
            {fm.from(product.price2, { symbol: "$" })}
          </h3>
          {mon ?  <h3 className="font-black text-base">
            {fm.from((product.price2*mon.moneda.valor), { symbol: mon.moneda.simbolo })}
          </h3> : "" }
         
        </div>
        <div className="flex justify-end">
          Precio de venta
        </div>
        <div className="flex justify-end">
          <h3 className="font-black text-base mr-3">
            {fm.from(product.price, { symbol: "$" })}
          </h3>
          {mon ?  <h3 className="font-black text-base">
            {fm.from((product.price*mon.moneda.valor), { symbol: mon.moneda.simbolo })}
          </h3> : "" }
        </div>
        <div className="flex justify-end">
          Cantidad
        </div>
        <div className="flex justify-end">
          <div className='flex'>
          
                <h1 className="mr-2 font-black text-base">{product.stock}</h1>
          
              </div>
        </div>
        <div className="flex justify-end m-3">
          <button
            onClick={() => {
              navigate(`/products/edit/${product._id}`);
            }}
          >
            <FaRegEdit className="h-6 w-6 mr-3" />
          </button>
          <button onClick={() => handleDelete(product._id)}>
            <FaTrash className="h-6 w-6 mr-3" />
          </button>
          <button onClick={() => {addCarrito(user.uid, product)}}>
            <FaCartPlus className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
