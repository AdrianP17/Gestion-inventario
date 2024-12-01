"use client"
import { useEffect, useState } from "react";
import api from "@/lib/api";
import { SalidaInventario } from "@/types/salidaInventario";

function useOrdenesVenta() {
    const [ordenesVenta, setOrdenesVenta] = useState<SalidaInventario[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function fetchOrdenesVenta() {
            const response = await api.get('/salidas');
            setOrdenesVenta(response.data);
            setLoading(false);
        }
        fetchOrdenesVenta()
}, [])
    return { ordenesVenta, loading} 
}

export default useOrdenesVenta