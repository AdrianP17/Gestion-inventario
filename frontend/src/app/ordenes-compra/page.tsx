"use client"
import { useEffect, useState } from "react";
import { getOrdenesCompra, deleteOrdenCompra } from "@/lib/api";
import OrderTable from "@/components/ordenes-compra/OrdenCompraTable";
import { useRouter } from "next/navigation";
import useOrdenesCompra from "@/hooks/useOrdenesCompra";

function OrdenesCompraPage() {
  const router = useRouter();
  const { ordenesCompra, loading } = useOrdenesCompra();
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!ordenesCompra) {
    return <div>No hay ordenes de compra</div>;
  }

  const handleDelete = async (id: number) => {
    const confirmation = confirm("¿Estás seguro de que deseas eliminar esta orden de compra?");
    if (!confirmation) {
      return;
    }
    await deleteOrdenCompra(id.toString());
    router.refresh();
  };

  const handleEdit = (id: number) => {
    router.push(`/ordenes-compra/${id}`);
  };

  return (
    <main className="px-10 pt-5">
      <h1 className="subtitle">Ordenes de Compra</h1>
      <div className="container-custom">
        <h2 className="title">Tabla de Ordenes de Compra</h2>
        <div className="mx-auto max-w-screen-xl">
      <OrderTable
        orders={ordenesCompra}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
        </div>
      </div>
    </main>
     
  )
}

export default OrdenesCompraPage