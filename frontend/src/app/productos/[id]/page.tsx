"use client"
import { useParams } from "next/navigation"
import { useState, useEffect } from "react"
import api from "@/lib/api"
import ProductForm from "@/components/producto/ProductForm"

function ProductoPage() {
  const params = useParams<{ id: string }>()

  // Asumiendo que el tipo de datos es un objeto o array
  const [data, setData] = useState<any>(null)

  async function fetchProducto() {
    const response = await api.get(`/productos/info/${params.id}`)
    return response.data
  }

  useEffect(() => {
    async function fetchData() {
      const productoData = await fetchProducto()
      setData(productoData)
    }
    
    fetchData()
  }, [params.id]) // Dependencia para que solo se ejecute cuando cambie `params.id`
  
  return (
    <div>
      <h1>Editar producto</h1>

      <ProductForm />
    </div>
  )
}

export default ProductoPage
