"use client"
import { useEffect, useState } from "react";
import api from "@/lib/api";
import { OrdenCompra } from "@/types/ordenCompra";

function useOrdenesCompra() {
    const [ordenesCompra, setordenesCompra] = useState<OrdenCompra[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function fetchordenesCompra() {
            const response = await api.get('/ordenes');
            setordenesCompra(response.data);
            setLoading(false);
        }
        fetchordenesCompra()
}, [])
    return { ordenesCompra, loading} 
}

export default useOrdenesCompra