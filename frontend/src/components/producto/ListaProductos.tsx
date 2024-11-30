import React from 'react'
import { Producto } from '@/types/producto'
import { GoAlertFill } from "react-icons/go";
interface Props {
    productos: Pick<Producto, 'ID' | 'Nombre' | 'Stock_Actual'>[],
    children?: React.ReactNode
}
function ListaProductos( { productos, children }: Props ) {
  return (
    <div className='flex flex-col gap-6'>
        {productos.map((producto) => (
            <div key={producto.ID} className='flex gap-4'>
                {children}
                <div className=''>
                <p>ID: {producto.ID}</p>
                <p>{producto.Nombre}</p>
                <p className='font-semibold'>{producto.Stock_Actual} {producto.Stock_Actual === 1 ? 'Unidad' : 'Unidades'} </p>
                </div>
            </div>
        ))}
    </div>
  )
}

export default ListaProductos