"use client"
import ProductList from "@/components/producto/ProductList"
import Link from "next/link"
import { useProductos } from "@/hooks/useProductos"
import SimpleTable from "@/components/SimpleTable"
import { useRouter } from "next/navigation";

function Productos() {
  const { loading, productos } = useProductos()
  const router = useRouter();

  const handleEdit = (id: number) => {
    router.push(`/productos/${id}`);
  }
  
  const handleDelete = (id: number) => {
    router.push(`/productos/${id}`);
  }
  
  const columns = [
    {
      header: "ID",
      accessorKey: "ID",
    },
    {
      header: "Categoría",
      accessorKey: "NombreCategoria",
    },
    {
      header: "Nombre",
      accessorKey: "Nombre",
    },
    {
      header: "Descripción",
      accessorKey: "Descripcion",
    },
    {
      header: "Marca",
      accessorKey: "Marca",
    },
    {
      header: "Modelo",
      accessorKey: "Modelo",
    },
    {
      header: "Precio",
      accessorKey: "Precio",
    },
    {
      header: "Nivel Min",
      accessorKey: "Nivel_Minimo",
    },
    {
      header: "Nivel Max",
      accessorKey: "Nivel_Maximo",
    },
  ]

  return (
    <main className="px-10 pt-5">
            <div className="mb-5">
            <h1 className="subtitle">Productos registrados</h1>
            </div>
            <div className="container-custom">
              <h2 className="title">Tabla de Productos</h2>
            <div className="mx-auto max-w-screen-xl">
            {loading ? <p>Cargando productos...</p> : <SimpleTable columns={columns} data={productos} handleDelete={handleDelete} handleEdit={handleEdit} />}
            <Link className="button" href="/productos/nuevo">Agregar producto</Link>
            </div>
            </div>
    </main>
  )
}

export default Productos