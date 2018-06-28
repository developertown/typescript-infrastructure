import { BaseEntity, IFindOptions, IMapper, IRepository, RepositoryId } from "@developertown/core";
import "reflect-metadata";
import { IdFactory } from "./factory/iIdFactory";
export declare class InMemoryListRepository<T extends BaseEntity> implements IRepository<T> {
    private idFactory;
    private mapper;
    protected dbContext: Map<string, object>;
    constructor(idFactory: IdFactory, mapper: IMapper<T>);
    list(options?: IFindOptions<T>): Promise<T[]>;
    getById(id: RepositoryId): Promise<T | null>;
    add(entity: T): Promise<T>;
    update(entity: T): Promise<void>;
    delete(entity: T): Promise<void>;
    drop(): Promise<void>;
}
