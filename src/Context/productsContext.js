import { useState, createContext, useContext, useEffect } from 'react'
import { getProductsRequest, createProductsRequest, deleteProductsRequest, getProductRequest, updateProductRequest } from '../api/products'
import { useAuth } from './authContext'




const productContext = createContext();


export const useProducts = () => {
  const context = useContext(productContext)
  return context
}

export const ProductsProvider = ({ children }) => {
  const { user } = useAuth()

  const [products, setProducts] = useState([]);


  const getProducts = async (id) => {
    const res = await getProductsRequest(id.uid);
    setProducts(res.data)
  }

  const createProduct = async (product) => {
    const res = await createProductsRequest(product);
    setProducts([...products, res.data])

  }
  const deleteProduct = async (id) => {
    const res = await deleteProductsRequest(id)
    if (res.status === 204) {
      setProducts(products.filter(product => product._id !== id))
    }
  }

  const updateProduct = async (id, product) => {
    const res = await updateProductRequest(id, product)
    setProducts(products.map(product => product._id === id ? res.data : product))
  }

  const getProduct = async (a) => {

    const res = await getProductRequest(a);
    return res.data
  }

  useEffect(() => {
    getProducts(user)
  }, [user])

  return <productContext.Provider value={{
    products,
    getProducts,
    createProduct,
    deleteProduct,
    getProduct,
    updateProduct
  }}>
    {children}
  </productContext.Provider>
}