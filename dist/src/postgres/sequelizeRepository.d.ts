import { BaseError as SequelizeBaseError } from "sequelize";
import { BaseEntity, BaseError, IFindOptions, IMapper, IRepository, RepositoryId } from "@developertown/core";
import BaseModel from "./models/baseModel";
export declare class SequelizeRepository<T extends BaseEntity, U extends BaseModel<U>> implements IRepository<T> {
    protected dbContext: typeof BaseModel;
    private mapper;
    constructor(dbContext: typeof BaseModel, mapper: IMapper<T>);
    list(options?: IFindOptions<T>): Promise<T[]>;
    getById(id: RepositoryId): Promise<T | null>;
    add(entity: T, options?: any): Promise<T>;
    update(entity: T): Promise<void>;
    delete(entity: T): Promise<void>;
    drop(): Promise<void>;
    protected normalizedError(err: SequelizeBaseError): BaseError;
}
