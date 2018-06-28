import { IDatabase, ILogger } from "@developertown/core";
import { Sequelize } from "sequelize-typescript";
export declare class Database implements IDatabase {
    protected sequelize: Sequelize;
    protected logger: ILogger;
    constructor(sequelize: Sequelize, logger: ILogger);
    connect(): Promise<void>;
    healthcheck(): Promise<void>;
    disconnect(): Promise<void>;
}
