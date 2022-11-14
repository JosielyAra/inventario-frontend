
// import { Disclosure} from "@headlessui/react";
// import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
 import { Link } from "react-router-dom";
import { useAuth } from "../Context/authContext";
import { useState } from 'react'
import { FaRegEdit } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";

import { createPopper } from "@popperjs/core";


export function Navigation({color}) {
  const { user, logout } = useAuth()
  const [navbarOpen, setNavbarOpen] = useState(false);
  

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <>
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-gray-600 mb-3">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link
              className="text-3xl font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap  text-white"
              href="#pablo"
            >
             Inventary
            </Link>
            <button
              className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <FiMenu />
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center" +
              (navbarOpen ? " flex" : " hidden")
            }
            id="example-navbar-danger"
          >
            {user ? <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">

          

              
              <li className="nav-item">
                <Link
                  className="px-3 py-2 flex items-center text-sm font-semibold text-white hover:opacity-75"
                 to="/products"
                >
                <span className="ml-2">Productos</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="px-3 py-2 flex items-center text-sm font-semibold text-white hover:opacity-75"
                  to="/carrito"
                >
                  <span className="ml-2">Carrito</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="px-3 py-2 flex items-center text-sm font-semibold text-white hover:opacity-75"
                  to="/facturas"
                >
                  <span className="ml-2">Facturas</span>
                </Link>
              </li>
              <li>

              </li>
              <li className="nav-item">
                <Link
                  className="px-3 py-2 flex items-center text-sm font-semibold text-white hover:opacity-75"
                  to="/clients"
                >
                  <span className="ml-2">Clientes / Proveedores</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="px-3 py-2 flex items-center text-sm font-semibold text-white hover:opacity-75"
                  to="/moneda"
                >
                  <span className="ml-2">Moneda</span>
                </Link>
              </li>
              <li className="nav-item">
                <button
                  className="px-3 py-2 flex items-center text-sm font-semibold text-white opacity-60 hover:opacity-100"
                  onClick={handleLogout}
                >
                  <span className="ml-2">Cerrar sesion</span>
                </button>
              </li>
            </ul> : 
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="nav-item">
                <Link
                  className="px-3 py-2 flex items-center text-sm font-semibold text-white hover:opacity-75"
                 to="/"
                >
                <span className="ml-2">Pagina Principal</span>
                </Link>
              </li>
          
            <li className="nav-item">
              <Link
                className="px-3 py-2 flex items-center text-sm font-semibold text-white hover:opacity-75"
                to="/register"
              >
                <span className="ml-2">Registro</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="px-3 py-2 flex items-center text-sm font-semibold text-white hover:opacity-75"
                to="/login"
              >
                <span className="ml-2">Iniciar Sesion</span>
              </Link>
            </li>
          </ul>
            }
          </div>
        </div>
      </nav>
    </>
  );
}

{/* <Link
                        to='/'
                        className='hover:bg-gray-700 text-white font-bold py-2 px-4 rounded'
                      >
                        Home
                      </Link>
                      <Link
                        to='/products'
                        className=' hover:bg-gray-700 text-white font-bold py-2 px-4 rounded'
                      >
                        Products
                      </Link>
                      <Link
                        to='/carrito'
                        className=' hover:bg-gray-700 text-white font-bold py-2 px-4 rounded'
                      >
                        Carrito
                      </Link>
                      <Link
                        to='/facturas'
                        className=' hover:bg-gray-700 text-white font-bold py-2 px-4 rounded'
                      >
                        Facturas
                      </Link>

                      <Link
                        to='/clients'
                        className=' hover:bg-gray-700 text-white font-bold py-2 px-4 rounded'
                      >
                       Clients
                      </Link> */}

