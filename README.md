# api-control-inventario
Backend con Mongoose para el control de inventarios

## query para monday

````javascript  
    let query3 = 'mutation{ create_item (board_id:202977424, item_name:\"Enviado desde la api de grupo intecsa!\") { id } }';
    let getOnBoardId = 'query { boards(ids: 202977424 ) { items(limit: 10) { column_values { id value } } } }
````

## Lista de pendientes:

* crear para modelo de Labels un apartado de descripcion corta
* Obtener desde la api el numero piezas de categoria y marca (en proceso)
* Añadir slug de categorias y marca en la respuesta de la API Rest
* Crear ruta para muestra de inicio de productos, 6 productos solamente (listo)
* Crear pruebas con jast para configurar los rejects
* terminar CRUD de rutas
* 