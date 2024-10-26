const { obtenerListadoJoyasBD, filtrarJoyasBD } = require("./consulta_joyas");

const obtenerListadoJoyas = async ({
  limits = 10,
  order_by = "id_ASC",
  page = 1,
}) => {
  const numLimits = parseInt(limits, 10);
  const numPage = parseInt(page, 10);
  const resultado = await obtenerListadoJoyasBD(numLimits, order_by, numPage);

  let resultado_final = [];

  let stockTotal = 0;

  if (resultado.length > 0) {
    let results = [];

    resultado.forEach((joya) => {
      results.push({
        name: joya.nombre,
        href: `/joyas/joya/${joya.id}`,
      });
      stockTotal += joya.stock;
    });

    resultado_final = {
      totalJoyas: results.length,
      stockTotal: stockTotal,
      results: results,
    };
  }
  return resultado_final;
};

const filtrarJoyas = async ({ precio_min, precio_max, categoria, metal }) => {
  const joyasFiltradas = await filtrarJoyasBD({
    precio_min,
    precio_max,
    categoria,
    metal,
  });

  return joyasFiltradas;
};

module.exports = { obtenerListadoJoyas, filtrarJoyas };
