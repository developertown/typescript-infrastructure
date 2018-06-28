"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
const knexConfig = {
    client: "pg",
    connection: {
        host: database_1.Database.host,
        port: database_1.Database.port,
        database: database_1.Database.database,
        user: database_1.Database.username,
        password: database_1.Database.password,
    },
    pool: {
        min: database_1.Database.pool.min,
        max: database_1.Database.pool.max,
        idleTimeoutMillis: database_1.Database.pool.idle,
    },
    migrations: {
        directory: "../migrations",
        tableName: "migrations",
    },
    debug: true,
};
module.exports = knexConfig;
exports.default = knexConfig;
//# sourceMappingURL=knexfile.js.map