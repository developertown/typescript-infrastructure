import { RepositoryId } from "@developertown/core";
import { IdFactory } from "./iIdFactory";
import { IdSeedProvider } from "./iIdSeedProvider";
export declare class SimpleIdFactory implements IdFactory {
    private seedProvider;
    constructor(seedProvider: IdSeedProvider);
    createId(): RepositoryId;
}
