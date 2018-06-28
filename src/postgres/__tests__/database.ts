"use strict";

import { Secrets } from "./secrets";

interface IConnectionPool {
  min: number;
  max: number;
  idle?: number;
}

export interface IDatabaseConfig {
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
  pool: IConnectionPool;
  encoding: string;
  timeout: number;
}

export class Database {
  public static readonly host: string = Secrets.DBHost;
  public static readonly port: number = Secrets.DBPort;
  public static readonly database: string = Secrets.DBName;
  public static readonly username: string = Secrets.DBUser;
  public static readonly password: string = Secrets.DBPass;
  public static readonly pool = {
    min: 0,
    max: 10,
    idle: 1000,
  };
  public static readonly encoding: string = "utf8";
  public static readonly timeout: number = 5000;
}
