import { useAuth } from "../Context/authContext";
import {Link} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'

export function Home() {
  const navigate = useNavigate()
  const { user} = useAuth();
 
if(user){
 navigate('/products')
}else{
return (
  <div className="w-full pt-60 max-w-sm m-auto text-black">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <p className="text-xl mb-4 uppercase">Bienvenido al sistema de inventario multimoneda.</p>
        <p className="pb-6"><Link to='/register' className="text-blue-600 rounded hover:text-blue-900">Registrate aqui</Link> para comenzar a usarlo!</p>
        <p>Ya tienes cuenta?<Link to='/login' className="text-blue-600 rounded p-2 hover:text-blue-900">Iniciar Sesion</Link></p>
      </div>
    </div>
)
}
  
}
