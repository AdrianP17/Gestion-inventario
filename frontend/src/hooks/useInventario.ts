import api from "@/lib/api";
import { useEffect, useState } from "react";
import { Producto } from "@/types/producto";
export function useInventario() {
    const [inventario, setInventario] = useState<Producto[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        async function fetchInventario() {
            const response = await api.get('/productos/inventario');
            setInventario(response.data);
            setLoading(false);
        }
        fetchInventario();
    }, []);
    return { inventario, loading };
}