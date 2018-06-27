"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Secrets {
}
Secrets.DBHost = process.env.DB_HOST || "localhost";
Secrets.DBPort = Number(process.env.DB_PORT || 5432);
Secrets.DBName = process.env.DB_NAME || "infrastructure-test";
Secrets.DBUser = process.env.DB_USER || "infrastructure";
Secrets.DBPass = process.env.DB_PASS || "infrastructure";
exports.Secrets = Secrets;
//# sourceMappingURL=secrets.js.map