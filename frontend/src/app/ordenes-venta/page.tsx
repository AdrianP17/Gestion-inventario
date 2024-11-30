"use client"
import SimpleTable from "@/components/SimpleTable"
import useOrdenesVenta from "@/hooks/useOrdenesVenta";
import api from "@/lib/api";
import { formatearFecha } from "@/lib/utils";
import { useRouter} from "next/navigation"
function OrdenesVenta() {
  const { ordenesVenta, loading } = useOrdenesVenta();
  const router = useRouter();

  const columns = [
    {
      header: "ID",
      accessorKey: "ID",
    },
    {
      header: "Fecha de Registro",
      accessorKey: "Fecha_Registro",
      cell: (info : {getValue: () => string}) => formatearFecha(info.getValue()),
    },
    {
      header: "Motivo",
      accessorKey: "Motivo",
    },
    {
      header: "Estado",
      accessorKey: "Estado",
    },
    {
      header: "Total",
      accessorKey: "Total_Salida",
    },
    {
      header: "Observaciones",
      accessorKey: "Observaciones",
    },
  ]
  return (
    <main className="px-10 pt-5">
      <h1 className="subtitle">Órdenes de Venta</h1>
      <div className="container-custom">
        <h2 className="title">Tabla de Órdenes de Venta</h2>
        <div className="mx-auto max-w-screen-xl">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <SimpleTable enableSearch={false} columns={columns}
              data={ordenesVenta}
              handleEdit={(id: number) => {
                router.push(`/ordenes-venta/${id}`);
              }}
              handleDelete={(id: number) => {
                api.delete(`/ordenes-venta/${id}`).then(() => {
                  window.location.reload();
                })
              }}
            />)}
        </div>
      </div>
    </main>
  )
}

export default OrdenesVenta;