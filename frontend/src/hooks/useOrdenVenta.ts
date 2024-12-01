'use client'
import { useState, useEffect } from 'react';
import api from '../lib/api';
import { SalidaInventario } from '@/types/salidaInventario';
export function useOrdenVenta(id: number) {
    const [orden, setOrden] = useState<SalidaInventario | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function fetchOrden() {
            try {
                const response = await api.get(`/salidas/${id}`);
                setOrden(response.data);
            } catch (error) {
                console.error('Error al obtener la orden de venta:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchOrden();
    }, [id]);

    return { orden, loading };
}

