import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    getFilteredRowModel
} from "@tanstack/react-table"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import { FiEye, FiTrash2 } from "react-icons/fi";

  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
  import { Button } from "@/components/ui/button";
  import { Input } from "@/components/ui/input";
  import { 
    ChevronDown, 
    ChevronUp, 
    MoreVertical,
    ArrowUpDown
  } from "lucide-react";
  
import { useState } from "react";
interface Props<TData> {
    data:  TData[],
    columns: {
        header: string,
        accessorKey: string,
        enableSorting?: boolean
    }[],
    handleEdit: (id: number) => void,
    handleDelete: (id: number) => void
}

export default function SimpleTable<TData> ( {data, columns, handleEdit, handleDelete} : Props<TData>) { {
    
    const [sorting, setSorting] = useState<SortingState>([]);
      const [searchTerm, setSearchTerm] = useState('');
  


const table = useReactTable({
    data, 
    columns, 
    getCoreRowModel: getCoreRowModel(), 
    getPaginationRowModel: getPaginationRowModel(), 
    getSortedRowModel: getSortedRowModel(), 
    getFilteredRowModel: getFilteredRowModel() ,
    state: { sorting, globalFilter: searchTerm}, 
    onSortingChange: setSorting, 
    onGlobalFilterChange: setSearchTerm,
});


  return (
    <div className="w-full">
        <div className="flex items-center py-4">
        <Input
          placeholder="Buscar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>
    <Table>
            <TableHeader>
                <TableRow className="bg-gray-100">
                    {table.getHeaderGroups().map((headerGroup) => (
                        headerGroup.headers.map((header) => (
                            <TableHead key={header.id}>
                                {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                                {header.column.getCanSort() ? (
                                    <button
                                        onClick={header.column.getToggleSortingHandler()}
                                    >
                                        {header.column.getIsSorted() === "asc" ? (
                                                    <ChevronUp className="h-4 w-4" />
                                                ) : header.column.getIsSorted() === "desc" ? (
                                                    <ChevronDown className="h-4 w-4" />
                                                ) : (
                                                    <ArrowUpDown className="h-4 w-4" />
                                                )}
                                    </button>
                                ) : null}
                            </TableHead>
                        ))
                    ))}
                    <TableHead><span>Accionesasda</span></TableHead>
                </TableRow>
            </TableHeader>
                <TableBody>
                    {table.getRowModel().rows.map((row) => (
                        <TableRow key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>
                            ))}
                            
                            <TableCell className='flex gap-2'>
                                <button onClick={() => handleEdit(row.getValue('id')) } className='bg-primary p-2 grid content-center cursor-pointer text-white rounded-lg'>
                                    <FiEye size={16} />
                                </button>
                                <button onClick={() => handleDelete(row.getValue('id'))} className='bg-red-500 p-2 grid content-center cursor-pointer text-white rounded-lg'>
                                    <FiTrash2 size={16} />
                                </button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
    </Table>
    <div className="flex items-center justify-between px-2 mt-4">
                <div className="flex items-center gap-2">
                    <Button 
                        onClick={() => table.setPageIndex(0)}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Primera página
                    </Button>
                    <Button 
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Anterior
                    </Button>
                    <Button 
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Siguiente
                    </Button>
                    <Button 
                        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                        disabled={!table.getCanNextPage()}
                    >
                        Última página
                    </Button>
                </div>
                <div className="flex items-center gap-1">
                    <span className="text-sm text-gray-700">
                        Página{" "}
                        <span className="font-medium">
                            {table.getState().pagination.pageIndex + 1}
                        </span>{" "}
                        de{" "}
                        <span className="font-medium">{table.getPageCount()}</span>
                    </span>
                </div>
            </div>
    </div>
  )
}
}