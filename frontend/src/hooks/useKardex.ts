"use client"
import { useEffect, useState } from "react"
import api from "../lib/api"
import { Kardex } from "../types/kardex"

export const useKardex = () => {
    const [kardex, setKardex] = useState<Kardex[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    useEffect(() => {
        const fetchKardex = async () => {
            try {
                const response = await api.get('/kardex')
                setKardex(response.data)

            } catch (error) {
                console.error('Error al obtener el kardex:', error)
            }
            finally {
                setLoading(false)
            }
        }
        fetchKardex()
    }, [])
    return { kardex, loading }
    }