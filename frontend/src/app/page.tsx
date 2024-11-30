"use client";
import Image from "next/image";
import SimpleTable from "@/components/SimpleTable";
import { useRouter } from "next/navigation";
import { formatearFecha } from "@/lib/utils";
import { useInventario } from "@/hooks/useInventario";
import { useKardex } from "@/hooks/useKardex";
import { useProductosAlerta } from "@/hooks/useProductosAlerta";
import { GoAlertFill } from "react-icons/go";
import { IoMdAlert } from "react-icons/io";

import ListaProductos from "@/components/producto/ListaProductos";

export default function Home() {
  const { inventario, loading } = useInventario();
  const kardex = useKardex();
  const {productosMaximos, productosMinimos, loadingProductos} = useProductosAlerta();
  const router = useRouter();
  const columnsInventario = [
    {
      header: 'ID',
      accessorKey: 'ID',
    },
    {
      header: 'SKU',
      accessorKey: 'SKU',
    },
    {
      header: 'Nombre',
      accessorKey: 'Nombre',
    },
    {
      header: 'Categoria',
      accessorKey: 'NombreCategoria',
    },
    {
      header: 'Precio',
      accessorKey: 'Precio',
    },
    {
      header: 'Marca',
      accessorKey: 'Marca',
    },
    {
      header: 'Modelo',
      accessorKey: 'Modelo',
    },
    {
      header: 'Stock',
      accessorKey: 'Stock_Actual',
    },
    {
      header: 'Estado',
      accessorKey: 'Estado',
    },
  ];

  


  return (
    <main className="px-10 pt-5">
      <div className="mb-5">
        <h1 className="subtitle">Inventario</h1>
      </div>
      <div className="container-custom">
        <h2 className="title">Inventario de Productos</h2>
        <div className="max-w-screen-lg mb-6">

          {loading ? <p>Cargando productos...</p> : <SimpleTable columns={columnsInventario} data={inventario}  />}
        </div>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-red-100/30 rounded-2xl p-8">
            <h3 className="text-2xl mb-4">Productos con stock bajo</h3>
            {loadingProductos ? <p>Cargando productos...</p> : <>{productosMinimos.length > 0 ? <ListaProductos productos={productosMinimos}><GoAlertFill color='red' size={20} /> </ListaProductos> : <p>No hay productos con stock bajo</p>}</>}
          </div>
          <div className="bg-orange-100/30 rounded-2xl p-8">
            <h3 className="text-2xl mb-4">Productos con stock alto</h3>
            {loadingProductos ? <p>Cargando productos...</p> : <>{productosMaximos.length > 0 ? <ListaProductos productos={productosMaximos}> <IoMdAlert color='orange' size={20} /> </ListaProductos> : <p>No hay productos con stock alto</p>}</>}
          </div>
        </div>
      </div>
    </main>
  );
}