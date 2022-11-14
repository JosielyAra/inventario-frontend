import axios from 'axios'

export const getProductsRequest = async(id) => await axios.post('https://inventario-backend-production.up.railway.app/api/products/get', {'id':id})


export const createProductsRequest = async(product) => await axios.post('https://inventario-backend-production.up.railway.app/api/products', product)

export const deleteProductsRequest = async id => await axios.delete('https://inventario-backend-production.up.railway.app/api/products/' + id)

export const getProductRequest = async(id) => await axios.get('https://inventario-backend-production.up.railway.app/api/products/' + id)

export const updateProductRequest = async(id, data) => await axios.put('https://inventario-backend-production.up.railway.app/api/products/' + id, data)