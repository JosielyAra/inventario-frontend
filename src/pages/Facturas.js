import { FaTrash } from "react-icons/fa";
import { FormatMoney } from "format-money-js";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/authContext";
import { useEffect, useState } from "react";
import axios from "axios";

export function Facturas() {
  const fm = new FormatMoney({
    decimals: 2
  });
  const { user } = useAuth();
const navigate = useNavigate()
    const [mon, setmon] = useState()
  const [factura, setfactura] = useState([]);


  const getMonedaUsuario = async (id)=>{
    const getMonedaUser = await axios.post('http://localhost:4000/api/monedas/get/'+id)
    setmon(getMonedaUser.data)
  }

  const deleteFactura = async (_id) => {
    try {
     await axios.delete('http://localhost:4000/api/factura/'+ _id)
     getFactura(user.uid)
    } catch (error) {
        toast(
          (t) => {
            return (
              <div>
                <p className="mb-2 text-white">
                  {error.message}.{" "}
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
                  deleteFactura(id);
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


  async function getFactura(userId) {
    try {
      const resp = await axios.post('http://localhost:4000/api/factura/get', { id: user.uid })
      setfactura(resp.data)
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

  useEffect(() => {
    getMonedaUsuario(user.uid)
  }, [user])

  useEffect(() => {
    getFactura(user.uid)
  },[user]);


  if (factura.length > 0) {
    return (
      <div className="p-5">
         <div>
      <h1 className="text-white text-center text-5xl mb-2">Facturas</h1>
      </div>
        {factura.map((i) => (
          <div
            className={`${i.typeFac==='Venta' ?  'bg-orange-500':'bg-orange-400'} rounded-lg m-2 p-4 justify-between`}
            key={i._id}
          >
            <h1 className='font-bolt text-2xl float-right'>{i.typeFac}</h1>
            <div>
              <h2 className="text-lg font-semibold">Productos</h2>
              <div>
              {i.products.map((a)=><div key={a._id} className='flex'>
                <p className="mr-3 text-sm">{a.product.name}</p>
                <p className="text-sm text-black">-----</p>
                
                {i.typeFac === 'Venta' ?  <p className="text-sm mr-1">{fm.from(a.product.price, { symbol: '$' })}</p>  :  <p className="text-sm mr-1">{fm.from(a.product.price2, { symbol: '$' })}</p>  }
                <p className="text-sm">x  {a.cantidad}</p>
               
                <p className="text-sm text-black mx-3">-----</p>
                
                {i.typeFac === 'Venta' ?  <p className="text-sm">{fm.from(a.product.price*a.cantidad, { symbol: '$' })}</p>  :  <p className="text-sm">{fm.from(a.product.price2*a.cantidad, { symbol: '$' })}</p>  }
                

              </div>)}
              </div>
              <hr className="my-2 border border-black" />
              <h2 className="text-lg font-semibold">{i.typeFac === 'Venta' ?  "Cliente"  :  "Proveedor"  }</h2>
              <h1>{i.cliente}</h1>
              <h2 className="text-lg font-semibold">Total</h2>
              <h1>{fm.from(i.total, { symbol: '$' })}</h1>

              {mon ?  <h1>{fm.from((i.total*mon.moneda.valor), { symbol: mon.moneda.simbolo })}</h1>: "" }
              
            </div>
            <div className="block p-2">
            <button
              className="mr-5"
              onClick={() => {
                handleDelete(i._id);
              }}
            >
              <FaTrash className="h-8 w-8" />
            </button>
            </div>
          </div>
          
        ))}
      </div>
    );
  } else {
    return (
      <div className='text-white text-center'>
        <div>
      <h1 className="text-white text-center text-5xl mb-2">Facturas</h1>
      </div>
        <div className='mt-64'>
        <p className='mb-3'>No existen facturas.</p>
        <Link
          to='/carrito'
          className=' hover:bg-gray-700 text-white font-bold p-3 rounded'
        >
          Crea una realizando una venta.     </Link>
        </div>
       
      </div>
    )
  }
}
