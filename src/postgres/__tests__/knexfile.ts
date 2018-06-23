"use strict";

import { Config } from "knex";
import { Database } from "./database";

const knexConfig: Config = {
  client: "pg",
  connection: {
    host: Database.host,
    port: Database.port,
    database: Database.database,
    user: Database.username,
    password: Database.password,
  },
  pool: {
    min: Database.pool.min,
    max: Database.pool.max,
    idleTimeoutMillis: Database.pool.idle,
  },
  migrations: {
    directory: "../migrations",
    tableName: "migrations",
  },
  debug: true,
};

module.exports = knexConfig;
export default knexConfig;
