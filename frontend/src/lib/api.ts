// /lib/api.ts
import axios from 'axios';
import { OrdenCompra } from '../types/ordenCompra';

const api = axios.create({
    baseURL: 'http://localhost:3001/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getOrdenesCompra = async () => {
    const response = await api.get<OrdenCompra[]>('/ordenes');
    return response.data;
};
export const getOrdenCompraById = async (id: string) => {
    const response = await api.get<OrdenCompra>(`/ordenes/${id}`);
    return response.data;
};

export const createOrdenCompra = async (orden: Partial<OrdenCompra>) => {
    const response = await api.post<OrdenCompra>('/ordenes', orden);
    return response.data;
};

export const updateOrdenCompra = async (id: string, orden: Partial<OrdenCompra>) => {
    const response = await api.put<OrdenCompra>(`/ordenes/${id}`, orden);
    return response.data;
};

export const deleteOrdenCompra = async (id: string) => {
    const response = await api.delete<OrdenCompra>(`/ordenes/${id}`);
    return response.data;
};

export default api;
