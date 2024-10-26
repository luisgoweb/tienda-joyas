const pool = require("./conexion");
const format = require("pg-format");

const obtenerListadoJoyasBD = async (limits, order_by, page) => {
  try {
    let [campo, direccion] = order_by.split("_");
    direccion = direccion.toUpperCase();
    const offset = (page - 1) * limits;

    // Valida "limits"
    if (typeof limits !== "number" || limits <= 0) {
      console.log("El valor de limits debe ser un número mayor a 0");
      return false;
    }

    // Valida el campo y la dirección
    if (
      !["id", "nombre", "stock", "precio", "categoria", "metal"].includes(
        campo
      ) ||
      !["ASC", "DESC"].includes(direccion)
    ) {
      console.log("order_by no es válido");
      return false;
    }

    // Valida "page"
    if (typeof page !== "number" || page <= 0) {
      console.log("El valor de page debe ser un número mayor a 0");
      return false;
    }

    // Utiliza pg-format para construir la consulta SQL de forma segura
    const consulta = format(
      "SELECT id, nombre, stock FROM inventario ORDER BY %I %s LIMIT %L OFFSET %L",
      campo,
      direccion,
      limits,
      offset
    );
    const { rows } = await pool.query(consulta);
    return rows;
  } catch (error) {
    console.log(error);
    return false;
  }
};

// En lugar de tener una consulta SQL fija, se construye la consulta dinámicamente en función de los parámetros que se proporcionan
const filtrarJoyasBD = async ({ precio_min, precio_max, categoria, metal }) => {
  try {
    const condiciones = [];
    const valores = [];

    if (precio_min) {
      condiciones.push(`precio >= $${valores.length + 1}`);
      valores.push(precio_min);
    }

    if (precio_max) {
      condiciones.push(`precio <= $${valores.length + 1}`);
      valores.push(precio_max);
    }

    if (categoria) {
      condiciones.push(`categoria = $${valores.length + 1}`);
      valores.push(categoria);
    }

    if (metal) {
      condiciones.push(`metal = $${valores.length + 1}`);
      valores.push(metal);
    }

    let consulta =
      "SELECT id, nombre, categoria, metal, precio, stock FROM inventario";

    if (condiciones.length > 0) {
      consulta += " WHERE " + condiciones.join(" AND ");
    }

    const { rows } = await pool.query(consulta, valores);
    return rows;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = { obtenerListadoJoyasBD, filtrarJoyasBD };
