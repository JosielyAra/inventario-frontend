import React from 'react'
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export const Loading = () => {
  return (
    <div className='min-h-screen flex items-center'>
      
      <div className='mx-auto'>
      <AiOutlineLoading3Quarters className='animate-spin text-white h-32 w-32'/>
      <h1 className='font-bold mt-2 text-2xl text-white'>Cargando...</h1>
      </div>
    </div>
  )
}
