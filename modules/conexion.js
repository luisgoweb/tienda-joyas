const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  user: "xxxxx",
  password: "xxxxx",
  database: "joyas",
  allowExitOnIdle: true,
});

module.exports = pool;
