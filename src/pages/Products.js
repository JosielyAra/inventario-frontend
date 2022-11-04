import { Link } from "react-router-dom";
import { useProducts } from '../Context/productsContext'
import { ProductsCard } from '../components/ProductsCard'



export function Products() {
  const { products } = useProducts();

  if (products.length === 0)  return (
    <div className='text-white text-center'>
       <div>
      <h1 className="text-white text-center text-5xl mb-2">Productos</h1>
      </div>
      <div className='mt-64'>
      <p className='mb-3'>No existen productos.</p>
      <Link
        to='/products/new'
        className=' hover:bg-gray-700 text-white font-bold p-3 rounded'
      >
        Crea uno.     </Link>
      </div>
     
    </div>
  )

  return (
    <div className='text-white pt-3 px-6'>
      <div>
      <h1 className="text-white text-center text-5xl mb-2">Productos</h1>
      </div>
      <div>
        <Link to={'/products/new'} type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 font-small rounded-sm text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Crea nuevo producto</Link>
      </div>
      <div className="flex flex-wrap">
      {products.map(product => (
        <ProductsCard product={product} key={product._id} />
      ))}
      </div>
    </div>

  )
}
