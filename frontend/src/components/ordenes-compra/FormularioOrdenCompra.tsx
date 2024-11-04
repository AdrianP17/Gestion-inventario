"use client";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { OrdenCompraSchema } from "@/schema/ordenCompra.schema";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect } from "react";

interface FormularioOrdenCompraProps {
    proveedores: { id: number; nombre: string }[];
    productos: { id: number; nombre: string; precio: number }[];
    onSuccess: () => void;
}

interface DetallePedido {
    productoId: number | null;
    nombreProducto: string;
    cantidad: number;
    precioUnitario: number;
    subtotal: number;
}

interface OrdenCompraFormulario {
    proveedorId: number | null;
    detalles: DetallePedido[];
    totalCompra: number;
}

export default function FormularioOrdenCompra({ proveedores, productos, onSuccess }: FormularioOrdenCompraProps) {
    const { control, register, handleSubmit, watch, setValue, getValues } = useForm<OrdenCompraFormulario>({
        resolver: zodResolver(OrdenCompraSchema),
        defaultValues: {
            proveedorId: 0,
            detalles: [],
            totalCompra: 0,
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "detalles",
    });

    const detalles = watch("detalles");

    useEffect(() => {
        calcularTotal();
    }, [detalles]);

    const calcularTotal = () => {
        const total = detalles.reduce((sum, detalle) => sum + (detalle.subtotal || 0), 0);
        setValue("totalCompra", total);
    };

    // Actualiza el subtotal y el total cuando la cantidad o el producto cambian
    const handleDetalleChange = (index: number) => {
        const detallesActuales = getValues("detalles");
        const detalle = detallesActuales[index];
        if (detalle && detalle.cantidad > 0) {
            detalle.subtotal = detalle.cantidad * detalle.precioUnitario;
            setValue(`detalles.${index}.subtotal`, detalle.subtotal);
            calcularTotal();
        }
    };

    const onSubmit = async (data: OrdenCompraFormulario) => {
        try {
            const response = await api.post("/api/ordenes", {
                ...data,
                fechaCompra: new Date().toISOString(), // Asigna la fecha actual automáticamente
                estado: "Pendiente", // Asigna el estado predeterminado
            });
            onSuccess();
            alert("Orden de compra creada exitosamente");
        } catch (error) {
            console.error("Error al crear la orden de compra:", error);
            alert("Error al crear la orden de compra");
        }
    };

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Formulario de Orden de Compra</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <Label htmlFor="proveedor">Proveedor</Label>
                        <Controller
                            name="proveedorId"
                            control={control}
                            render={({ field }) => (
                                <select
                                    {...field}
                                    className="w-full border p-1"
                                    id="proveedor"
                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                >
                                    <option value="">Seleccione un proveedor</option>
                                    {proveedores.map((proveedor) => (
                                        <option key={proveedor.id} value={proveedor.id}>
                                            {proveedor.nombre}
                                        </option>
                                    ))}
                                </select>
                            )}
                        />
                    </div>

                    <h2 className="mb-2">Detalles de Pedido</h2>
                    {fields.map((field, index) => (
                        <div key={field.id} className="border p-2 mb-2 rounded">
                            <div className="mb-2">
                                <Label htmlFor={`producto-${index}`}>Producto</Label>
                                <select
                                    id={`producto-${index}`}
                                    className="w-full border p-1"
                                    {...register(`detalles.${index}.productoId`, { required: true })}
                                    onChange={(e) => {
                                        const producto = productos.find((p) => p.id === Number(e.target.value));
                                        setValue(`detalles.${index}.nombreProducto`, producto ? producto.nombre : "");
                                        setValue(`detalles.${index}.precioUnitario`, producto ? producto.precio : 0);
                                        handleDetalleChange(index);
                                    }}
                                >
                                    <option value="">Seleccione un producto</option>
                                    {productos.map((producto) => (
                                        <option key={producto.id} value={producto.id}>
                                            {producto.nombre}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-2">
                                <Label htmlFor={`cantidad-${index}`}>Cantidad</Label>
                                <Input
                                    type="number"
                                    id={`cantidad-${index}`}
                                    {...register(`detalles.${index}.cantidad`, { required: true, min: 1 })}
                                    onChange={() => handleDetalleChange(index)}
                                />
                            </div>
                            <div className="mb-2">
                                <Label htmlFor={`precioUnitario-${index}`}>Precio Unitario</Label>
                                <Input
                                    type="number"
                                    id={`precioUnitario-${index}`}
                                    {...register(`detalles.${index}.precioUnitario`)}
                                    readOnly
                                />
                            </div>
                            <div className="mb-2">
                                <Label htmlFor={`subtotal-${index}`}>Subtotal</Label>
                                <Input
                                    type="number"
                                    id={`subtotal-${index}`}
                                    {...register(`detalles.${index}.subtotal`)}
                                    readOnly
                                />
                            </div>
                            <Button
                                variant="destructive"
                                type="button"
                                onClick={() => {
                                    remove(index);
                                    calcularTotal(); // Recalcular el total al eliminar un detalle
                                }}
                            >
                                Eliminar
                            </Button>
                        </div>
                    ))}

                    <Button
                        type="button"
                        onClick={() =>
                            append({ productoId: null, nombreProducto: "", cantidad: 1, precioUnitario: 0, subtotal: 0 })
                        }
                    >
                        Agregar Detalle
                    </Button>

                    <div className="mt-4">
                        <h3>Total: ${watch("totalCompra")}</h3>
                    </div>

                    <CardFooter>
                        <Button type="submit">Crear Orden de Compra</Button>
                    </CardFooter>
                </form>
            </CardContent>
        </Card>
    );
}
