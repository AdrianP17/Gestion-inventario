"use client";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { OrdenCompraSchema } from "@/schema/ordenCompra.schema";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect } from "react";
import { OrdenCompraFormulario, DetallePedido } from "@/schema/ordenCompra.schema";
import { useRouter } from "next/navigation";
interface FormularioOrdenCompraProps {
    proveedores: { id: number; nombre: string }[];
    productos: { id: number; nombre: string; precio: number }[];
}

export default function FormularioOrdenCompra({ proveedores, productos }: FormularioOrdenCompraProps) {
    const router = useRouter();
    const { control, register, handleSubmit, watch, setValue, getValues, formState: { errors } } = useForm<OrdenCompraFormulario>({
        resolver: zodResolver(OrdenCompraSchema),
        defaultValues: {
            proveedorId: "0",
            fechaCompra: new Date().toISOString(),
            estado: "Pendiente",
            detalles: [],
            totalCompra: "0",
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
        const total = detalles.reduce((sum, detalle) => sum + (Number(detalle.subtotal) || 0), 0);
        setValue("totalCompra", String(total));
    };

    const handleDetalleChange = (index: number) => {
        const detallesActuales = getValues("detalles");
        const detalle = detallesActuales[index];
        if (detalle && Number(detalle.cantidad) > 0) {
            detalle.subtotal = String(Number(detalle.cantidad) * Number(detalle.precioUnitario));
            setValue(`detalles.${index}.subtotal`, detalle.subtotal);
            calcularTotal();
        }
    };

    const onSubmit = async (data: OrdenCompraFormulario) => {
        try {
            const response = await api.post("/ordenes", data);
            console.log("Respuesta del backend:", response); // Verifica la respuesta del backend
            alert("Orden de compra creada exitosamente");
            router.push("/ordenes-compra");
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
                                    className="w-full border rounded-md bg-white p-2"
                                    id="proveedor"
                                    onChange={(e) => field.onChange(e.target.value)}
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
                        {errors.proveedorId && <p className="text-red-500">Este campo es obligatorio</p>}
                    </div>

                    <h2 className="mb-2">Detalles de Pedido</h2>
                    {fields.map((field, index) => (
                        <div key={field.id} className="border p-2 mb-2 rounded">
                            <div className="mb-2">
                                <Label htmlFor={`producto-${index}`}>Producto</Label>
                                <Controller
                                    name={`detalles.${index}.productoId`}
                                    control={control}
                                    rules={{ required: "Este campo es obligatorio" }}
                                    render={({ field }) => (
                                        <select
                                            {...field}
                                            className="w-full border rounded-md bg-white p-2"
                                            id={`producto-${index}`}
                                            onChange={(e) => {
                                                field.onChange(e);
                                                const producto = productos.find((p) => p.id === Number(e.target.value));
                                                setValue(`detalles.${index}.nombreProducto`, producto ? producto.nombre : "");
                                                setValue(`detalles.${index}.precioUnitario`, producto ? String(producto.precio) : "0");
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
                                    )}
                                />
                                {errors.detalles?.[index]?.productoId && <p className="text-red-500">{errors.detalles[index].productoId.message}</p>}
                            </div>
                            <div className="mb-2">
                                <Label htmlFor={`cantidad-${index}`}>Cantidad</Label>
                                <Controller
                                    name={`detalles.${index}.cantidad`}
                                    control={control}
                                    rules={{ required: "Este campo es obligatorio y debe ser mayor a 0", min: 1 }}
                                    render={({ field }) => (
                                        <Input
                                            type="number"
                                            {...field}
                                            id={`cantidad-${index}`}
                                            onChange={(e) => {
                                                field.onChange(e);
                                                handleDetalleChange(index);
                                            }}
                                        />
                                    )}
                                />
                                {errors.detalles?.[index]?.cantidad && <p className="text-red-500">{errors.detalles[index].cantidad.message}</p>}
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
                                    calcularTotal();
                                }}
                            >
                                Eliminar
                            </Button>
                        </div>
                    ))}

                    <Button
                        type="button"
                        onClick={() =>
                            append({ productoId: "0", nombreProducto: "", cantidad: "1", precioUnitario: "0", subtotal: "0" })
                        }
                    >
                        Agregar Detalle
                    </Button>
                    {errors.detalles && <p className="text-red-500">{errors.detalles.message} detalles</p>}
                    {errors.estado && <p className="text-red-500">{errors.estado.message} estado</p>}
                    {errors.fechaCompra && <p className="text-red-500">{errors.fechaCompra.message} fecha</p>}
                    {errors.proveedorId && <p className="text-red-500">{errors.proveedorId.message} proveedor</p>}
                    {errors.totalCompra && <p className="text-red-500">{errors.totalCompra.message} total</p>}
                    <h3>Total: ${watch("totalCompra")}</h3>
                    <Button className="mt-4 text-lg py-7 px-6" type="submit">Crear Orden de Compra</Button>
                </form>
            </CardContent>
        </Card>
    );
}
