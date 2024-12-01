"use client"
import { getOrdenesCompra, deleteOrdenCompra } from "@/lib/api";
import { useRouter } from "next/navigation";
import useOrdenesCompra from "@/hooks/useOrdenesCompra";
import SimpleTable from "@/components/SimpleTable";
import { formatearFecha } from "@/lib/utils";
import { Button } from "@/components/ui/button";
function OrdenesCompraPage() {
  const router = useRouter();
  const { ordenesCompra, loading } = useOrdenesCompra();
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!ordenesCompra) {
    return <div>No hay ordenes de compra</div>;
  }
  const columns = [
    {
      header: "ID",
      accessorKey: "id",
    },
    {
      header: "Proveedor",
      accessorKey: "nombreproveedor",
    },
    {
      header: "Fecha de Compra",
      accessorKey: "fecha_compra",
      cell: (info : {getValue: () => string}) => formatearFecha(info.getValue()),
    },
    {
      header: "Estado",
      accessorKey: "estado",
    },
    {
      header: "Total",
      accessorKey: "total_compra",
    },
  ];


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
      <h1 className="subtitle">Órdenes de Compra</h1>
      <div className="container-custom">
        <h2 className="title">Tabla de Órdenes de Compra</h2>
        <div className="mx-auto max-w-screen-xl">
      <SimpleTable enableSearch={false}  data={ordenesCompra} columns={columns} handleEdit={handleEdit} handleDelete={handleDelete}/>
        <Button className="mt-5 text-lg py-7 px-6" onClick={() => router.push("/ordenes-compra/nuevo")}>Solicitar Orden de Compra</Button>
        </div>


      </div>
    </main>
     
  )
}

export default OrdenesCompraPage