'use client'
import { useState, useEffect } from 'react';
import api from '../lib/api';
import { Proveedor } from '@/types/proveedor';
export function useProveedores() {
    const [proveedores, setProveedores] = useState<Proveedor[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function fetchProveedores() {
            try {
                const response = await api.get(`/proveedores`);
                setProveedores(response.data);
            } catch (error) {
                console.error('Error al obtener los Proveedores:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchProveedores();
    }, []);

    return { proveedores, loading };
}
