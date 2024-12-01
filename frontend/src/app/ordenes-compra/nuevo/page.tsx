"use client"
import { useState, useEffect } from "react"
import FormularioOrdenCompra from "@/components/ordenes-compra/FormularioOrdenCompra";
import api from "@/lib/api"

function NuevaOrdenCompra() {
  const [proveedores, setProveedores] = useState<{ id: number; nombre: string }[]>([]);
    const [productos, setProductos] = useState<{ id: number; nombre: string; precio: number }[]>([]);

    useEffect(() => {
      async function fetchDatos() {
          try {
              const proveedoresResponse = await api.get('/proveedores/lista');
              setProveedores(proveedoresResponse.data);

              const productosResponse = await api.get('/productos/lista');
              setProductos(productosResponse.data);
          } catch (error) {
              console.error('Error al obtener los datos:', error);
          }
      }
      fetchDatos();
  }, []);
  
    return (
    <main>
        <h1 className="subtitle">Nueva orden de compra</h1>
        <div className="container-custom">
            <h2 className="title">Formulario de orden de compra</h2>
            <div className="max-w-screen-lg ">
              <FormularioOrdenCompra proveedores={proveedores} productos={productos} onSuccess={() => {console.log("Orden de compra creada exitosamente")}} />
            </div>
        </div>
    </main>
  )
}

export default NuevaOrdenCompra