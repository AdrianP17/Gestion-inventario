'use client'
import { useState, useEffect } from 'react';
import api from '../lib/api';
import { OrdenCompra } from '../types/ordenCompra';

export function useOrdenCompra(id: number) {
    const [orden, setOrden] = useState<OrdenCompra | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function fetchOrden() {
            try {
                const response = await api.get(`/ordenes/${id}`);
                setOrden(response.data);
            } catch (error) {
                console.error('Error al obtener la orden de compra:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchOrden();
    }, [id]);

    return { orden, loading };
}
