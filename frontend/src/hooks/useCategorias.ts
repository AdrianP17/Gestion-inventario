import api from "@/lib/api"
import { useState, useEffect } from "react"
import { Categoria } from "@/types/categoria"
function useCategorias() {
    const [categorias, setCategorias] = useState<Categoria[]>([])

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const response = await api.get('/categorias');
                setCategorias(response.data);
            } catch (error) {
                throw new Error('Error al obtener las categorias');
            }
        }
        fetchCategorias();
    }, [])
  return categorias
}
export default useCategorias