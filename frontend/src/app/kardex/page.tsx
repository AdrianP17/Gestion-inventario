"use client"
import SimpleTable from '@/components/SimpleTable'
import { useRouter } from 'next/navigation'
import { useKardex } from '@/hooks/useKardex'
import { formatearFecha } from '@/lib/utils'
function Kardex() {
  const {kardex, loading} = useKardex();
  const columnsKardex = [
    {
      header: 'ID',
      accessorKey: 'ID',
    },
    {
      header: 'Fecha de Movimiento',
      accessorKey: 'Fecha_Movimiento',
      cell: (info : {getValue: () => string}) => formatearFecha(info.getValue()),
    },
    {
      header: 'Tipo de Movimiento',
      accessorKey: 'Tipo_Movimiento',
    },
    {
      header: 'ID de Orden de Compra',
      accessorKey: 'Orden_CompraID',
      cell: (info : {getValue: () => number}) => info.getValue() || 'N/A',
    },
    {
      header: 'ID de Orden de Venta',
      accessorKey: 'Salida_InventarioID',
      cell: (info : {getValue: () => number}) => info.getValue() || 'N/A',
    },
  ];

  return (
    <main className="px-10 pt-5">
    <div className="mb-5">
      <h1 className="subtitle">Inventario</h1>
    </div>
    <div className="container-custom">
      <h2 className="title">Registro de Movimientos</h2>
      <div className="max-w-screen-lg mb-6">

        {loading ? <p>Cargando productos...</p> : <SimpleTable columns={columnsKardex} data={kardex} />}
      </div>
    </div>
  </main>
  )
}

export default Kardex