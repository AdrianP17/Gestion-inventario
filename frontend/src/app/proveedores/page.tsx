"use client"
import { useProveedores } from '@/hooks/useProveedores'
import SimpleTable from '@/components/SimpleTable'
import { useRouter } from 'next/navigation';
function Proveedores() {
  const router = useRouter();
  const { proveedores, loading } = useProveedores();

  const columns = [
    {
      header: "ID",
      accessorKey: "id",
    },
    {
      header: "Nombre",
      accessorKey: "nombre",
    },
    {
      header: "Dirección",
      accessorKey: "direccion",
    },
    {
      header: "Teléfono",
      accessorKey: "telefono",
    },
    {
      header: "Email",
      accessorKey: "email",
    },
  ]

  return (
    <main className="px-10 pt-5">
            <div className="mb-5">
            <h1 className="subtitle">Proveedores registrados</h1>
            </div>
            <div className="container-custom">
              <h2 className="title">Tabla de Proveedores</h2>
            <div className="mx-auto max-w-screen-xl">
            {loading ? <p>Cargando Proveedores...</p> : <SimpleTable enableSearch={false}  columns={columns} data={proveedores}/>}
            </div >
            </div>
    </main>
  )
}

export default Proveedores