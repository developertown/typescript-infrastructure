import { ILogger } from "@developertown/core";
import "reflect-metadata";
export declare class ConsoleLogger implements ILogger {
    private logger;
    constructor(level: string, enabled: boolean);
    debug(format: string, ...params: any[]): void;
    info(format: string, ...params: any[]): void;
    warn(format: string, ...params: any[]): void;
    error(format: string | Error, ...params: any[]): void;
}
