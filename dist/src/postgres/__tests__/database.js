"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const secrets_1 = require("./secrets");
class Database {
}
Database.host = secrets_1.Secrets.DBHost;
Database.port = secrets_1.Secrets.DBPort;
Database.database = secrets_1.Secrets.DBName;
Database.username = secrets_1.Secrets.DBUser;
Database.password = secrets_1.Secrets.DBPass;
Database.pool = {
    min: 0,
    max: 10,
    idle: 1000,
};
Database.encoding = "utf8";
Database.timeout = 5000;
exports.Database = Database;
//# sourceMappingURL=database.js.map