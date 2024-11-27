"use client";
import Image from "next/image";
import SimpleTable from "@/components/SimpleTable";
import data from "@/MOCK_DATA.json"
import { useRouter } from "next/navigation";


export default function Home() {

  const router = useRouter();
  const handleEdit = (id: number) => {
    router.push(`/proveedores/${id}`);
  }

  const handleDelete = (id: number) => {
    router.push(`/proveedores/${id}`);
  }
  const columns = [
    {
        header: "ID",
        accessorKey: "id",
    },
    {
        header: "Name",
        accessorKey: "first_name",
    },
    {
        header: "Last Name",
        accessorKey: "last_name",
    },
    {
        header: "Email",
        accessorKey: "email",
    },
    {
        header: "Gender",
        accessorKey: "gender",
    },
    {
        header: "IP Address",
        accessorKey: "ip_address",
    }
]
  return(
    <div>
      <h1>Home</h1>
      <SimpleTable columns={columns} data={data} handleDelete={handleDelete} handleEdit={handleEdit}/> 
    </div>
  );
}
