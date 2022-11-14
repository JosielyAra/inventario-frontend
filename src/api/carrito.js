import axios from 'axios'

export const getCarritoRequest = async() => await axios.get('https://inventario-backend-production.up.railway.app/api/carrito')


export const addCarritoRequest = async(product) => await axios.post('https://inventario-backend-production.up.railway.app/api/products', product)