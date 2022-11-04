import axios from 'axios'

export const getCarritoRequest = async() => await axios.get('http://localhost:4000/api/carrito')


export const addCarritoRequest = async(product) => await axios.post('http://localhost:4000/api/products', product)