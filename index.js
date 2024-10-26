const express = require("express");
const cors = require("cors");

const {
  obtenerListadoJoyas,
  filtrarJoyas,
} = require("./modules/controlador_joyas");

const app = express();
app.listen(3000, console.log("Server UP AND RUNNING on port 3000"));

app.use(express.json());

app.use(cors());

// -------- Rutas --------

app.get("/joyas", async (req, res) => {
  const queryString = req.query;
  const listado_joyas = await obtenerListadoJoyas(queryString);

  if (listado_joyas) {
    res.json(listado_joyas);
  } else {
    res.status(500).json("Error al obtener el listado de joyas");
  }
});

app.get("/joyas/filtros", async (req, res) => {
  const { precio_min, precio_max, categoria, metal } = req.query;
  const joyasFiltradas = await filtrarJoyas({
    precio_min,
    precio_max,
    categoria,
    metal,
  });

  if (joyasFiltradas) {
    res.json(joyasFiltradas);
  } else {
    res.status(500).json("Error al obtener las joyas filtradas");
  }
});
