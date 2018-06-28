import { RepositoryId } from "@developertown/core";
import { IdSeedProvider } from "./factory/iIdSeedProvider";
export declare class UUIDProvider implements IdSeedProvider {
    next(): RepositoryId;
}
