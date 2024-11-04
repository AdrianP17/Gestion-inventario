"use client"
import ProductList from "@/components/producto/ProductList"
import Link from "next/link"
import { useProductos } from "@/hooks/useProductos"

function Productos() {
  const { loading, productos } = useProductos()
  return (
    <main className="px-10 pt-5">
            <div className="mb-5">
            <h1 className="subtitle">Productos registrados</h1>
            </div>
            <div className="container-custom">
              <h2 className="title">Tabla de Productos</h2>
            <div className="mx-auto max-w-screen-xl">
            {loading ? <p>Cargando productos...</p> : <ProductList productos={productos} />}
            <Link className="button" href="/productos/nuevo">Agregar producto</Link>
            </div>
            </div>
    </main>
  )
}

export default Productos