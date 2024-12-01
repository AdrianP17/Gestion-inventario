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
      accessorKey: 'id',
    },
    {
      header: 'Fecha de Movimiento',
      accessorKey: 'fecha_movimiento',
      cell: (info : {getValue: () => string}) => formatearFecha(info.getValue()),
    },
    {
      header: 'Tipo de Movimiento',
      accessorKey: 'tipo_movimiento',
    },
    {
      header: 'ID de Orden de Compra',
      accessorKey: 'orden_compraid',
      cell: (info : {getValue: () => number}) => info.getValue() || 'N/A',
    },
    {
      header: 'ID de Orden de Venta',
      accessorKey: 'salida_inventarioid',
      cell: (info : {getValue: () => number}) => info.getValue() || 'N/A',
    },
  ];

  return (
    <main className="px-10 pt-5">
    <div className="mb-5">
      <h1 className="subtitle">Kardex</h1>
    </div>
    <div className="container-custom">
      <h2 className="title">Registro de Movimientos</h2>
      <div className="max-w-screen-lg mb-6">

        {loading ? <p>Cargando productos...</p> : <SimpleTable enableSearch={false} columns={columnsKardex} data={kardex} />}
      </div>
    </div>
  </main>
  )
}

export default Kardex