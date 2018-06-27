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
export declare class Database {
    static readonly host: string;
    static readonly port: number;
    static readonly database: string;
    static readonly username: string;
    static readonly password: string;
    static readonly pool: {
        min: number;
        max: number;
        idle: number;
    };
    static readonly encoding: string;
    static readonly timeout: number;
}
export {};
