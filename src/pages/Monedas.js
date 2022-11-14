import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth } from "../Context/authContext";
import { FormatMoney } from "format-money-js";

export const Monedas = () => {
  const { user } = useAuth();
  const [monedas, setMonedas] = useState([])
  const [monedaUsuario, setmonedaUsuario] = useState()
  const fm = new FormatMoney({
    decimals: 2
  });

  const getMonedas = async () => {
    const monedas = await axios.get('https://inventario-backend-production.up.railway.app/api/monedas')
    setMonedas(monedas.data)
  }

  const createMonedaUser = async (moneda) => {
    if (moneda.length > 1) {
      setmonedaUsuario('')
      await axios.post('https://inventario-backend-production.up.railway.app/api/monedas/create', { moneda, userId: user.uid })
    } else {
      const createMoneda = await axios.post('https://inventario-backend-production.up.railway.app/api/monedas/create', { moneda, userId: user.uid })
      setmonedaUsuario(createMoneda.data)
    }


  }

  const getMonedaUsuario = async (id) => {

    const getMonedaUser = await axios.post('https://inventario-backend-production.up.railway.app/api/monedas/get/' + id)
    setmonedaUsuario(getMonedaUser.data)
  }


  const getOneMoneda = async (e) => {

    const oneMoneda = await axios.get('https://inventario-backend-production.up.railway.app/api/monedas/' + e)
    createMonedaUser(oneMoneda.data)

  }

  useEffect(() => {
    getMonedas()
    getMonedaUsuario(user.uid)
  }, [user])

  return (
    <div className='min-h-screen mx-4 mt-6'>
      <div className='bg-slate-200 ml-4 p-6'>
        <div className='font-bold text-xl'>
          <p>Moneda Principal</p>
        </div>
        <div class="flex flex-col">
          <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div class="overflow-hidden">
                <table class="min-w-full">
                  <thead class="border-b">
                    <tr>
                      <th scope="col" class="text-sm font-light text-gray-900 px-6 py-4 text-left">
                        Nombre
                      </th>
                      <th scope="col" class="text-sm font-light text-gray-900 px-6 py-4 text-left">
                        Simbolo
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="border-b">
                      <td class="px-6 whitespace-nowrap text-sm font-medium text-gray-900">Dolar Estadounidense</td>
                      <td class="text-sm text-gray-900 font-medium px-6 whitespace-nowrap">
                        $
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {monedaUsuario && monedaUsuario !== undefined ? <div className='bg-slate-200 ml-4 p-6'>
        <div className='font-bold text-xl'>
          <p>Moneda Secundaria</p>
        </div>
        <div class="flex flex-col">
          <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div class="overflow-hidden">
                <table class="min-w-full">
                  <thead class="border-b">
                    <tr>
                      <th scope="col" class="text-sm font-light text-gray-900 px-6 py-4 text-left">
                        Nombre
                      </th>
                      <th scope="col" class="text-sm font-light text-gray-900 px-6 py-4 text-left">
                        Simbolo
                      </th>
                      <th scope="col" class="text-sm font-light text-gray-900 px-6 py-4 text-left">
                        Value
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="border-b">
                      <td class="px-6 whitespace-nowrap text-sm font-medium text-gray-900">{monedaUsuario.moneda.name}</td>
                      <td class="text-sm text-gray-900 font-medium px-6 whitespace-nowrap">
                        {monedaUsuario.moneda.simbolo}
                      </td>
                      <td class="text-sm text-gray-900 font-medium px-6 whitespace-nowrap">
                        {fm.from(monedaUsuario.moneda.valor, { symbol: '$' })}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className='text-center text-5xl mb-2'>
              <select name="monedas" onChange={(e) => getOneMoneda(e.target.value)}>
                <option value="" selected>Modificar moneda</option>
                <option value="">Quitar moneda</option>
                {monedas ? monedas.map((i) => <option value={i._id} key={i._id}>{i.name}</option>) : ''}
              </select>
            </div>
          </div>
        </div>
      </div>


        :


        <div>
          <h1 className='text-center text-white font-bold text-xl mb-2'>Configurar moneda secundaria</h1>
          <div className='text-center text-5xl mb-2'>
            <select name="monedas" onChange={(e) => getOneMoneda(e.target.value)}>
              <option value="" selected>No seleccionada</option>
              {monedas ? monedas.map((i) => <option value={i._id} key={i._id}>{i.name}</option>) : ''}
            </select>
          </div>
        </div>}

    </div>
  )
}
