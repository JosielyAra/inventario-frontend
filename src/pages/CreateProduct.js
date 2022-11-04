import React, { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useProducts } from '../Context/productsContext'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import { useAuth } from "../Context/authContext";
import {Loading} from '../components/index'

export function CreateProduct() {
  const { user } = useAuth();
  const { createProduct, getProduct, updateProduct } = useProducts()
  const navigate = useNavigate()
  const params = useParams()
  const [loading, setLoading] = useState(false)
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    price2:'',
    stock: '',
    userId: user.uid

  })

  const getProdu = async () => {
    if (params.id) {
      setLoading(true)
      const product = await getProduct(params.id)
      
      setProduct(product)
      setLoading(false)
      
    }
  }

  useEffect(() => {
    getProdu();
  },[])

  if(loading){
    return <Loading/>
  }


  return (
    <div className='flex items-center justify-center mt-32'>

      <div className='bg-orange-400 p-10 shadow-md shadow-white'>
        <Link to='/products' className='absolute text-gray-200 text-lg hover:text-gray-400 h-10 w-10'><FaArrowLeft /></Link>
        <header className='justify-between items-center py-4 text-white'>
          <h1 className='text-4xl mt-2 text-white'>Nuevo Producto</h1>

        </header>
        <Formik
          initialValues={product}
          validationSchema={
            Yup.object({
              name: Yup.string().required("Ingresa el nombre"),
              description: Yup.string().required("Ingresa la descripcion"),
              price: Yup.number().required("Ingresa el precio"),
            })
          }
          onSubmit={async (values, actions) => {
            if (params.id) {
              setLoading(true)
              await updateProduct(params.id, values)
              setLoading(false)
              navigate('/products')

            } else {
              setLoading(true)
              await createProduct(values);
              setLoading(false)
              navigate('/products')
     
            }
          }}
          enableReinitialize
        >
          {({ handleSubmit }) => {
            return <Form onSubmit={handleSubmit}>
              <div className='m-3'>
                <label className='text-white font-semibold' htmlFor="name">Nombre</label>
                <Field className='px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full focus:bg-gray-600' name='name' placeholder="Nombre" maxlength="40" required/>

              </div>



              <div className='m-3'>
                <label className='text-white font-semibold' htmlFor="description">Descripcion</label>
                <Field className='px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full focus:bg-gray-600' name='description' maxlength="40" placeholder="Descripcion" required/>

              </div>

              <div className='m-3'>
                <label className='text-white font-semibold' htmlFor="price">Precio de venta</label>
                <Field type='number' step='0.01' className='px-3 py-2 focus:outline-none focus:bg-gray-600 rounded bg-gray-600 text-white w-full' name='price' placeholder="Precio de venta" min='1' max='9999' pattern='^[0-9]+' required/>

              </div>
              <div className='m-3'>
                <label className='text-white font-semibold' htmlFor="price2">Precio de compra</label>
                <Field type='number' step='0.01' className='px-3 py-2 focus:outline-none focus:bg-gray-600 rounded bg-gray-600 text-white w-full' name='price2' placeholder="Precio de compra" min='1' max='9999'  pattern='^[0-9]+' required/>

              </div>
              <div className='m-3'>
                <label className='text-white font-semibold' htmlFor="stock">Existencias</label>
                <Field type='number' className='px-3 py-2 focus:outline-none focus:bg-gray-600 rounded bg-gray-600 text-white w-full' name='stock' placeholder="Existencias" max='9999' min='1'  pattern='^[0-9]+' required/>

              </div>

              <button className='px-3 py-2 focus:outline-none rounded bg-gray-600 hover:bg-gray-500 text-white w-full' type='submit'>Enviar</button>
            </Form>
          }}
        </Formik>

      </div>
    </div>

  )
}
