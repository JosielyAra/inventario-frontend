import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import { FormatMoney } from "format-money-js";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../Context/authContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { useProducts } from "../Context/productsContext";
import {Loading} from './index'

export function ProductCarrito() {
  const { getProducts } = useProducts();
  const fm = new FormatMoney({
    decimals: 2
  });
  const { user } = useAuth();
  const navigate = useNavigate();
  const [mon, setmon] = useState()
  const [carrito, setcarrito] = useState([]);
  const [totals, setTotals] = useState()
  const [client, setClient] = useState('No definido')
  const [loading, setLoading] = useState(false)
  const [allClients, setAllClients] = useState([])
  const [typeFac, setTypeFac] = useState('Venta')


  const getMonedaUsuario = async (id) => {
    const getMonedaUser = await axios.post('http://localhost:4000/api/monedas/get/' + id)
    setmon(getMonedaUser.data)
  }
  async function totaler() {
    let total = 0
    try {

      if (typeFac === 'Venta') {
        carrito.map((i) => (total = total + (i.product.price * i.cantidad)));
      } else if (typeFac === 'Compra') {
        carrito.map((i) => (total = total + (i.product.price2 * i.cantidad)));
      }
      setTotals(total)
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

  async function getCarrito(userId) {
    try {

      const res = await axios.post("http://localhost:4000/api/carrito/get", {
        userId,
      });
      // console.log(res.data)
      setcarrito(res.data);

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


  const getClient = async (id) => {
    const res = await axios.post('http://localhost:4000/api/client/get', { id })
    setAllClients(res.data)
  }

  useEffect(() => {
    getMonedaUsuario(user.uid)
  }, [user])

  useEffect(() => {

    getCarrito(user.uid)
    getClient(user.uid)
  }, [typeFac]);

  useEffect(() => {
    totaler()
  }, [carrito])



  const deleteCarrito = async (_id) => {
    try {
      await axios.post("http://localhost:4000/api/carrito/delete", {
        _id,
      });
      setcarrito(carrito.filter(carrito => carrito._id !== _id))

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
                  deleteCarrito(id);
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

  const melaniPlus = async (_id) => {
    try {
      const res = await axios.post("http://localhost:4000/api/carrito/plus", { _id });

      setcarrito(carrito.map(carrit => carrit._id === _id ? res.data : carrit))

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
      if (error.response.status === 404) {
        toast(
          (t) => {
            return (
              <div>
                <p className="mb-2 text-white">
                  No hay stock suficiente.{" "}
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
      } else {
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


  }
  const melaniMinus = async (_id) => {
    const res = await axios.post("http://localhost:4000/api/carrito/minus", { _id });

    setcarrito(carrito.map(carrito => carrito._id === _id ? res.data : carrito))
    getCarrito(user.uid)
    totaler()
  }

  const createVenta = async () => {

    try {
      await axios.post("http://localhost:4000/api/factura", {
        userId: user.uid, products: carrito, total: totals, cliente: client, typeFac: typeFac
      });
      await getProducts(user)
      //  console.log(res.data.products.product)
      toast(
        (t) => {
          return (
            <div>
              <p className="mb-2 text-white">
                Operacion realizada exitosamente.{" "}
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
      
     
      navigate('/products')
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
  };



  if (carrito.length > 0) {
    return (
      <div className="p-6">
        <div>
          <h1 className="text-white text-center text-5xl mb-2">Carrito Venta</h1>
        </div>
        <div className="flex sm:block">

          <div className="block">
            <button
              onClick={() => createVenta()}
              className="focus:outline-none text-white bg-green-700 hover:bg-green-800 font-small rounded-sm text-sm px-5 py-2.5 dark:bg-green-600 mr-3 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Venta
            </button>
            <select className="rounded bg-zinc-300 mr-3" name="client" onChange={(e) => setClient(e.target.value)} form="carform">
              <option value="" selected>Selecciona el cliente</option>
              {allClients.map((client) => <option key={client._id} value={client.name}>{client.name}</option>)}
            </select>
            <select className="rounded bg-zinc-300" name="client" onChange={(e) => setTypeFac(e.target.value)} form="carform">
              <option value="Venta">Seleccione tipo de factura</option>
              <option value="Venta">Venta</option>
              <option value="Compra">Compra</option>

            </select>
            <div className="flex">
              <p className=" ml-4 mr-2 text-zinc-300 text-2xl font-semibol">Total:</p>
              <h1 className="text-zinc-300 text-2xl font-semibol mr-6">{fm.from(totals, { symbol: '$' })}</h1>
              {mon ? <h1 className="text-zinc-300 text-2xl font-semibol">{fm.from((totals * mon.moneda.valor), { symbol: mon.moneda.simbolo })}</h1> : ""}

            </div>

          </div>

        </div>
        {carrito.map((i) => (
          <div
            className="bg-zinc-300 rounded-lg m-2 p-4 justify-between flex"
            key={i._id}
          >
            <div>
              <h2 className="text-sm text-gray-600">Nombre</h2>
              <h1>{i.product.name}</h1>
              <h2 className="text-sm text-gray-600">Precio</h2>
              <div className="flex">

                {mon && typeFac === "Compra" ? <div>
                  <h1 className="mr-3">{fm.from(i.product.price2, { symbol: '$' })}</h1> <h1>{fm.from((i.product.price2 * mon.moneda.valor), { symbol: mon.moneda.simbolo })}</h1>
                </div> : ""}
                {!mon && typeFac === "Compra" ? <div>
                  <h1 className="mr-3">{fm.from(i.product.price2, { symbol: '$' })}</h1>
                </div> : ""}


                {mon && typeFac === "Venta" ? <div>
                  <h1 className="mr-3">{fm.from(i.product.price, { symbol: '$' })}</h1> <h1>{fm.from((i.product.price * mon.moneda.valor), { symbol: mon.moneda.simbolo })}</h1>
                </div> : ""}
                {!mon && typeFac === "Venta" ? <div>
                  <h1 className="mr-3">{fm.from(i.product.price, { symbol: '$' })}</h1>
                </div> : ""}
              </div>
              <h2 className="text-sm text-gray-600">Cantidad</h2>
              <div className='flex'>
                <button className="mr-2" onClick={() => melaniMinus(i._id)}><FaMinus /></button>
                <h1 className="mr-2">{i.cantidad}</h1>
                <button onClick={() => melaniPlus(i._id)}><FaPlus /></button>
              </div>

            </div>
            <button
              className="pr-3"
              onClick={() => {
                handleDelete(i._id);
              }}
            >
              <FaTrash className="h-8" />
            </button>
          </div>
        ))}
      </div>
    );
  }else if(loading){
<Loading/>
  } else {
    return (
      <div className='text-white text-center'>
        <div>
          <h1 className="text-white text-center text-5xl mb-2">Carrito</h1>
        </div>
        <div className='mt-64'>
          <p className='mb-3'>No existen productos en el carrito.</p>
          <Link
            to='/products'
            className=' hover:bg-gray-700 text-white font-bold p-3 rounded'
          >
            Agrege uno     </Link>
        </div>

      </div>
    )
  }
}
