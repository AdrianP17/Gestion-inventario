"use client"
import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Producto } from "@/types/producto";

export function useProductosAlerta() {
    const [productosMinimos, setProductosMinimos] = useState<Pick<Producto, 'id' | 'nombre' | 'stock_actual'>[]>([]);
    const [productosMaximos, setProductosMaximos] = useState<Pick<Producto, 'id' | 'nombre' | 'stock_actual'>[]>([]);
    const [loadingProductos, setLoadingProductos] = useState<boolean>(true);

    useEffect(() => {
        try {
            async function fetchProductosMin() {
                const response = await api.get('/productos/minimos');
                setProductosMinimos(response.data);
            }
            async function fetchProductosMax() {
                const response = await api.get('/productos/maximos');
                setProductosMaximos(response.data);
            }
            fetchProductosMin()
            fetchProductosMax()
        } catch (error) {
            console.error('Error al obtener los productos:', error); 
        } finally {
            setLoadingProductos(false);
        }
        

        
}, [])
    return { productosMinimos, productosMaximos, loadingProductos}
}