# Estructura de Proyecto Backend
### Explicación de los Módulos

1. **`src/application/`**: Lógica de negocio y casos de uso.
    - **use-cases**: Contiene los casos de uso principales del negocio. Cada caso de uso corresponde a una operación específica (crear un producto, actualizarlo, etc.). Esto separa la lógica del negocio del acceso a datos.
2. **`src/domain/`**: Representación de entidades y contratos de repositorios.
    - **entities**: Contiene las entidades del negocio (Producto, Proveedor, OrdenCompra, etc.). Estas entidades representan objetos y su comportamiento en el dominio del problema.
    - **repositories**: Define las interfaces de los repositorios que deben implementar las diferentes bases de datos. De esta forma, se mantiene el desacoplamiento entre la lógica del negocio y la implementación de la base de datos.
3. **`src/infrastructure/`**: Implementación concreta de los repositorios y otros servicios.
    - **database**: Implementación específica de acceso a bases de datos. Aquí se encuentran los repositorios que cumplen las interfaces definidas en el dominio.
        - **mysql**: Implementación de los repositorios para MySQL. Podrías agregar la conexión a la base de datos, consultas SQL y otros detalles específicos de MySQL.
        - **mongodb**: Implementación alternativa para MongoDB (futura migración). Esto hará que sea más sencillo migrar, ya que solo tendrás que implementar los métodos usando MongoDB.
    - **services**: Servicios adicionales que puedan ser necesarios (por ejemplo, servicios de notificación, como envío de emails).
4. **`src/interfaces/`**: Comunicación entre la aplicación y el mundo exterior.
    - **controllers**: Define los controladores que gestionan las peticiones HTTP y devuelven respuestas. Estos controladores se comunican con los casos de uso, lo cual permite mantener la lógica de negocio fuera de esta capa.
    - **routes**: Define las rutas de la API, enlazando los endpoints a los controladores. Esto hace que sea más claro qué endpoints están disponibles y facilita su configuración.
5. **`server/index.ts`**: Punto de entrada principal de la aplicación. Aquí se configura el servidor Express y se inicializan las rutas.

### Resumen de los Pasos Siguientes
1. **Crear Repositorios**:
    - Define las interfaces (`domain/repositories`) y sus implementaciones (`infrastructure/database`).
2. **Implementar Casos de Uso**:
    - Crea la lógica del negocio que utilizará las entidades y repositorios (`application/use-cases`).
3. **Controladores**:
    - Desarrolla los controladores que manejarán las solicitudes HTTP y ejecutarán los casos de uso (`interfaces/controllers`).
4. **Definir Rutas**:
    - Define las rutas de la API y conéctalas con los controladores (`interfaces/routes`).
5. **Configurar el Servidor**:
    - Configura Express para manejar las rutas y permitir solicitudes (`server.ts`).

### Explicación de las Interfaces

1. **`ICategoriaRepository`**: Permite manejar categorías, lo cual es útil para organizar los productos.
2. **`IProductoRepository`**: Permite gestionar todos los productos en la tienda, incluyendo la posibilidad de buscarlos por categoría.
3. **`IKardexRepository`**: Este repositorio es clave para mantener el registro histórico de entradas y salidas de inventario. Facilitará la generación de reportes y la actualización del stock disponible.
4. **`IProveedorRepository`**: Permite manejar la información de los proveedores que abastecen la tienda.
5. **`IOrdenCompraRepository`**: Gestiona las órdenes de compra realizadas a los proveedores. Es importante para realizar un seguimiento del abastecimiento de inventario.
6. **`IDetalleCompraRepository`**: Gestiona los detalles específicos de cada orden de compra, como qué productos fueron comprados y en qué cantidad.
7. **`ISalidaInventarioRepository`**: Permite registrar y gestionar las salidas de productos del inventario, ya sea para ventas o para otros fines.
8. **`IDetalleSalidaRepository`**: Mantiene los detalles de cada salida de inventario, indicando exactamente qué productos fueron sacados y en qué cantidades.
### Qué Hacer con Estas Interfaces?
1. **Implementarlas para la Base de Datos Actual (MySQL, MongoDB, etc.)**:
    - Implementa estas interfaces en la carpeta `infrastructure/database`. Por ejemplo, puedes tener `MySQLProductoRepository` o `MongoProductoRepository`, dependiendo de la base de datos que estés usando.
    - Cada implementación manejará la interacción directa con la base de datos (como consultas SQL para MySQL o llamadas a MongoDB).
2. **Integrarlas con los Casos de Uso**:
    - Los **casos de uso** en la carpeta `application/use-cases` utilizarán estas interfaces para interactuar con la base de datos sin depender de una implementación específica. Esto hace que la lógica de negocio esté desacoplada del tipo de almacenamiento de datos que estás utilizando.
3. **Desarrollar los Controladores y las Rutas**: 
    - Los controladores deben invocar a los **casos de uso**, que a su vez interactuarán con los repositorios. Así, si en el futuro necesitas cambiar la base de datos, solo necesitas cambiar la implementación de los repositorios.

### Ejemplo Completo del Flujo

1. Un **usuario** realiza una solicitud HTTP para crear un nuevo producto.
2. El **controlador** maneja la solicitud, valida los datos y llama al **caso de uso** correspondiente (`CrearProductoUseCase`).
3. El **caso de uso** ejecuta la lógica de negocio, validando cualquier regla (ej. que el precio sea válido).
4. El caso de uso llama al método `crear` del **repositorio de productos (`IProductoRepository`)**.
5. La implementación del repositorio (`MySQLProductoRepository` o `MongoProductoRepository`) realiza la operación en la base de datos.