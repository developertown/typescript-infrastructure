"use strict";

export class Secrets {
  public static readonly DBHost: string = process.env.DB_HOST || "localhost";
  public static readonly DBPort: number = Number(process.env.DB_PORT || 5432);
  public static readonly DBName: string = process.env.DB_NAME || "infrastructure-test";
  public static readonly DBUser: string = process.env.DB_USER || "infrastructure";
  public static readonly DBPass: string = process.env.DB_PASS || "infrastructure";
}
