# Desafío API de Joyería My Precious Spa
### Usando Node y Express

La API de Joyería My Precious Spa permite a los usuarios obtener información sobre las joyas almacenadas en la base de datos. La API permite la paginación, filtrado, ordenamiento y proporciona una estructura de datos HATEOAS para facilitar la navegación.

## Tabla de contenidos

- [Instalación](#instalación)
- [Endpoints](#endpoints)
  - [GET /joyas](#get-joyas)
  - [GET /joyas/filtros](#get-joyasfiltros)

## Instalación

1. Clona el repositorio en tu máquina local
2. Ejecuta `npm install` para instalar las dependencias necesarias
3. Configura tu base de datos PostgreSQL y ejecuta el script SQL proporcionado para crear la base de datos y la tabla requeridas
4. Configura las variables de entorno necesarias (por ejemplo, la cadena de conexión de la base de datos)
5. Ejecuta `node index.js` para iniciar el servidor

## Endpoints

### GET /joyas

Obtiene la lista de joyas con una estructura de datos HATEOAS.

**Parámetros de consulta:**

- `limits`: Limita la cantidad de joyas a devolver por página (opcional, predeterminado: 10)
- `page`: Define la página (opcional, predeterminado: 1)
- `order_by`: Ordena las joyas según el valor de este parámetro (opcional, ejemplo: `stock_ASC`, `precio_DESC`)

**Ejemplo de respuesta:**

```
{
  "totalJoyas": 3,
    "stockTotal": 15,
      "results": [
        {
          "name": "Collar Heart",
          "href": "/joyas/joya/1"
        },
        {
          "name": "Collar History",
          "href": "/joyas/joya/2"
        },
        {
          "name": "Aros Berry",
          "href": "/joyas/joya/3"
        }
      ]
}
```

### GET /joyas/filtros

Obtiene las joyas filtradas según los parámetros proporcionados.

**Parámetros de consulta:**

- `precio_min`: Filtrar las joyas con un precio mayor al valor recibido (opcional)
- `precio_max`: Filtrar las joyas con un precio menor al valor recibido (opcional)
- `categoria`: Filtrar las joyas por la categoría (opcional)
- `metal`: Filtrar las joyas por el metal (opcional)

**Ejemplo 1 de respuesta para la siguiente consulta:**
*http://localhost:3000/joyas?limits=3&page=2&order_by=stock_ASC*

```
{
  "totalJoyas": 3,
  "stockTotal": 19,
  "results": [
    {
      "name": "Anillo Wish",
      "href": "/joyas/joya/5"
    },
    {
      "name": "Collar History",
      "href": "/joyas/joya/2"
    },
    {
      "name": "Aros Berry",
      "href": "/joyas/joya/3"
    }
  ]
}
```

**Ejemplo 2 de respuesta para la siguiente consulta:**
*http://localhost:3000/joyas/filtros?precio_min=25000&precio_max=30000&categoria=aros&metal=plata*

```
[
  {
    "id": 5,
    "nombre": "Anillo Wish",
    "categoria": "aros",
    "metal": "plata",
    "precio": 30000,
    "stock": 4
  }
]
```



