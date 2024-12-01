import { Producto } from "@/types/producto";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { FiBox, FiEdit, FiTrash2 } from "react-icons/fi";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"



interface Props {
    productos: Producto[];
}

export default function ProductList({ productos }: Props) {
    const router = useRouter()
    return (
        <Table>
            <TableCaption>Productos</TableCaption>
            <TableHeader>
                <TableRow >
                    <TableHead><span className="font-bold"> ID</span></TableHead>
                    <TableHead><span className="font-bold">Categoría</span></TableHead>
                    <TableHead><span className="font-bold">Nombre</span></TableHead>
                    <TableHead><span className="font-bold">Descripción</span></TableHead>
                    <TableHead><span className="font-bold">Marca</span></TableHead>
                    <TableHead><span className="font-bold">Modelo</span></TableHead>
                    <TableHead><span className="font-bold">Precio</span></TableHead>
                    <TableHead><span className="font-bold">Nivel Min</span></TableHead>
                    <TableHead><span className="font-bold">Nivel Max</span></TableHead>
                    <TableHead><span className="font-bold">Acciones</span></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {productos.map((producto) => (
                    <TableRow key={producto.ID}>
                        <TableCell>{producto.ID}</TableCell>
                        <TableCell>{producto.NombreCategoria}</TableCell>
                        <TableCell>{producto.Nombre}</TableCell>
                        <TableCell>{producto.Descripcion}</TableCell>
                        <TableCell>{producto.Marca}</TableCell>
                        <TableCell>{producto.Modelo}</TableCell>
                        <TableCell>{producto.Precio}</TableCell>
                        <TableCell>{producto.Nivel_Minimo}</TableCell>
                        <TableCell>{producto.Nivel_Maximo}</TableCell>
                        <TableCell>
                            <div className="flex flex-row gap-2">
                                <div className="cursor-pointer bg-primary text-white rounded-md p-2 grid content-center" onClick={() => router.push(`/productos/${producto.ID}`)}>
                                    <FiEdit size={16} />
                                </div>
                                <div className="cursor-pointer bg-red-500 text-white rounded-md p-2 grid content-center" onClick={async () => {
                                    const confirmation = confirm('¿Deseas eliminar el producto?');
                                    if (confirmation) {
                                        const res = await api.delete(`/productos/${producto.ID}`);
                                        const data = await res.data;
                                        console.log(data);
                                        router.refresh();
                                    }
                                }}>
                                    <FiTrash2 size={16} />
                                </div>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>

        // <ul>
        //     {productos.map((producto) => (
        //         <li key={producto.ID}>

        //             <FiBox />
        //             {producto.ID}	
        //             {producto.Nombre} - {producto.Precio}
        //         </li>
        //     ))}
        // </ul>
    );
}