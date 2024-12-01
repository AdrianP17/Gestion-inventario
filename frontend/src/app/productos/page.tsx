"use client"
import ProductList from "@/components/producto/ProductList"
import Link from "next/link"
import { useProductos } from "@/hooks/useProductos"
import SimpleTable from "@/components/SimpleTable"
import { useRouter } from "next/navigation";
import api from "@/lib/api"

function Productos() {
  const { loading, productos } = useProductos()
  const router = useRouter();

  const handleEdit = (id: number) => {
    router.push(`/productos/${id}`);
  }
  
  const handleDelete = (id: number) => {
    const confirmation = confirm("¿Estás seguro de que deseas eliminar este producto?");
    if (!confirmation) {
      return;
    }
    api.delete(`/productos/${id}`);
    router.refresh();
  }
  
  const columns = [
    {
      header: "ID",
      accessorKey: "id",
    },
    {
      header: "Categoría",
      accessorKey: "nombrecategoria",
    },
    {
      header: "Nombre",
      accessorKey: "nombre",
    },
    {
      header: "Descripción",
      accessorKey: "descripcion",
    },
    {
      header: "Marca",
      accessorKey: "marca",
    },
    {
      header: "Modelo",
      accessorKey: "modelo",
    },
    {
      header: "Precio",
      accessorKey: "precio",
    },
    {
      header: "Nivel Min",
      accessorKey: "nivel_minimo",
    },
    {
      header: "Nivel Max",
      accessorKey: "nivel_maximo",
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