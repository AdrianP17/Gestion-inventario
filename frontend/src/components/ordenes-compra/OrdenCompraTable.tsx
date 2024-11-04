import React from 'react';
import { OrdenCompra } from '@/types/ordenCompra';
import { formatearFecha } from '@/lib/utils';
import { FiEye, FiTrash2 } from "react-icons/fi";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"


interface OrderTableProps {
  orders: OrdenCompra[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const OrderTable: React.FC<OrderTableProps> = ({ orders, onEdit, onDelete }) => {
  return (
    <Table>
        <TableCaption>Órdenes de Compra</TableCaption>
            <TableHeader>
                <TableRow className="bg-gray-100">
                    <TableHead><span className="font-bold"> ID</span></TableHead>
                    <TableHead><span className="font-bold">Proveedor</span></TableHead>
                    <TableHead><span className="font-bold">Fecha de Compra</span></TableHead>
                    <TableHead><span className="font-bold">Estado</span></TableHead>
                    <TableHead><span className="font-bold">Total</span></TableHead>
                    <TableHead><span className="font-bold">Acciones</span></TableHead>
                </TableRow>
            </TableHeader>
                <TableBody>
                    {orders.map((order) => (
                        <TableRow key={order.ID}>
                            <TableCell>{order.ID}</TableCell>
                            <TableCell>{order.NombreProveedor}</TableCell>
                            <TableCell>{formatearFecha(order.Fecha_Compra)}</TableCell>
                            <TableCell>{order.Estado}</TableCell>
                            <TableCell>{order.Total_Compra}</TableCell>
                            <TableCell className='flex gap-2'>
                                <button onClick={() => onEdit(order.ID)} className='bg-primary p-2 grid content-center cursor-pointer text-white rounded-lg'>
                                    <FiEye size={16} />
                                </button>
                                <button onClick={() => onDelete(order.ID)} className='bg-red-500 p-2 grid content-center cursor-pointer text-white rounded-lg'>
                                    <FiTrash2 size={16} />
                                </button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
    </Table>
  );
};

export default OrderTable;
