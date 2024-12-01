"use client"
import { useEffect, useState } from "react";
import { useParams } from "next/navigation"
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import api from "@/lib/api";
import { Producto } from "@/types/producto";
import { set } from "react-hook-form";
import useCategorias from "@/hooks/useCategorias";

 

export default function ProductForm() {
    const categorias = useCategorias()
    const router = useRouter()
    const params = useParams<{ id: string }>()
    const [formData, setFormData] = useState({
        nombre: '',
        categoria: '',
        precio: '',
        descripcion: '',
        marca: '',
        modelo: '',
        nivelMinimo: '',
        nivelMaximo: ''
      })

      useEffect(() => {
        
        if (params.id) {
          fetchProducto()
        }
      }, [params.id])
      async function fetchProducto() {
        const response = await api.get(`/productos/info/${params.id}`)
        setFormData({
          nombre: response.data.Nombre,
          categoria: String(response.data.CategoriaId),
          precio: String(response.data.Precio),
          descripcion: response.data.Descripcion,
          marca: response.data.Marca,
          modelo: response.data.Modelo,
          nivelMinimo: String(response.data.Nivel_Minimo),
          nivelMaximo: String(response.data.Nivel_Maximo)
        })
      }

      const handleChange = (e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prevData => ({
          ...prevData,
          [name]: value
        }))
      }
      const handleSelectChange = (value : string) => {
        setFormData(prevData => ({
          ...prevData,
          categoria: value
        }))
      }
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const newProduct = {
            ID:  Number(params.id) || 0, 
            nombre: formData.nombre,
            categoriaId: formData.categoria,
            precio: formData.precio,
            descripcion: formData.descripcion,
            marca: formData.marca,
            modelo: formData.modelo,
            nivelMinimo: formData.nivelMinimo,
            nivelMaximo: formData.nivelMaximo
        };
        if (params.id) {
            await api.put(`/productos/${params.id}`, newProduct);
            router.push('/productos');
            router.refresh();
        } else {
            await api.post('/productos', newProduct);
            router.push('/productos');
            router.refresh();
        }
    };

    return (
        <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Formulario de Producto</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre</Label>
              <Input id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="categoria">Categoría</Label>
              <Select name="categoria" value={formData.categoria} onValueChange={handleSelectChange} required>
                <SelectTrigger>
                    {formData.categoria ? <SelectValue /> : <SelectValue placeholder="Selecciona una categoría" />}
                </SelectTrigger>
                <SelectContent>
                  {
                    categorias.map((categoria) => (
                      <SelectItem key={categoria.ID} value={String(categoria.ID)}>
                        {categoria.Nombre}
                      </SelectItem>
                    ))
                  }
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="precio">Precio</Label>
              <Input id="precio" name="precio" type="number" value={formData.precio} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="marca">Marca</Label>
              <Input id="marca" name="marca" value={formData.marca} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="modelo">Modelo</Label>
              <Input id="modelo" name="modelo" value={formData.modelo} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nivelMinimo">Nivel Mínimo</Label>
              <Input id="nivelMinimo" name="nivelMinimo" type="number" value={formData.nivelMinimo} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nivelMaximo">Nivel Máximo</Label>
              <Input id="nivelMaximo" name="nivelMaximo" type="number" value={formData.nivelMaximo} onChange={handleChange} required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="descripcion">Descripción</Label>
            <Textarea id="descripcion" name="descripcion" value={formData.descripcion} onChange={handleChange} required />
          </div>
        <Button type="submit" className="w-full mt-6">{params.id ? 'Actualizar' : 'Crear'}</Button> 
        </form>
      </CardContent>
    </Card>
    );

}