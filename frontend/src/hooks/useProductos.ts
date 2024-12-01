"use client"
import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Producto } from "@/types/producto";

export function useProductos() {
    const [productos, setProductos] = useState<Producto[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function fetchProductos() {
            const response = await api.get('/productos');
            setProductos(response.data);
            setLoading(false);
        }
        fetchProductos()
}, [])
    return { productos, loading} 
}