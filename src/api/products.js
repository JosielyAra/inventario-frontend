import axios from 'axios'

export const getProductsRequest = async(id) => await axios.post('http://localhost:4000/api/products/get', {'id':id})


export const createProductsRequest = async(product) => await axios.post('http://localhost:4000/api/products', product)

export const deleteProductsRequest = async id => await axios.delete('http://localhost:4000/api/products/' + id)

export const getProductRequest = async(id) => await axios.get('http://localhost:4000/api/products/' + id)

export const updateProductRequest = async(id, data) => await axios.put('http://localhost:4000/api/products/' + id, data)