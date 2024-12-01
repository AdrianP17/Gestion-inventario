# Sistema de Gestión de Inventario - Frontend
## Estructura
```
/app
  ├── /dashboard                  # Dashboard principal con métricas clave
  │   └── page.tsx
  ├── /productos                  # Gestión de productos
  │   ├── page.tsx                # Ver lista de productos
  │   ├── /nuevo                  # Crear nuevo producto
  │   │   └── page.tsx
  │   ├── /[id]                   # Rutas dinámicas para cada producto
  │   │   ├── page.tsx            # Detalle del producto
  │   │   └── editar              # Editar producto
  │   │       └── page.tsx
  ├── /proveedores                # Gestión de proveedores
  │   ├── page.tsx                # Ver lista de proveedores
  │   ├── /nuevo                  # Crear nuevo proveedor
  │   │   └── page.tsx
  │   ├── /[id]                   # Rutas dinámicas para cada proveedor
  │   │   ├── page.tsx            # Detalle del proveedor
  │   │   └── editar              # Editar proveedor
  │   │       └── page.tsx
  ├── /ordenes-compra             # Gestión de órdenes de compra
  │   ├── page.tsx                # Ver lista de órdenes de compra
  │   ├── /nuevo                  # Crear nueva orden de compra
  │   │   └── page.tsx
  │   ├── /[id]                   # Detalle y edición de orden de compra
  │   │   └── page.tsx
  ├── /kardex                     # Control de inventario
  │   ├── page.tsx                # Ver todos los movimientos
  │   └── /nuevo                  # Registrar nuevo movimiento
  │       └── page.tsx
  ├── /salidas-inventario         # Gestión de salidas de inventario
  │   ├── page.tsx                # Ver lista de salidas
  │   └── /nuevo                  # Registrar nueva salida
  │       └── page.tsx

```

