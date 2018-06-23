"use strict";

import { BaseEntity, IFindOptions, IMapper, IRepository, RepositoryId } from "@developertown/core";
import { injectable, unmanaged } from "inversify";
import * as _ from "lodash";
import "reflect-metadata";
import { IdFactory } from "./factory/iIdFactory";

@injectable()
export class InMemoryListRepository<T extends BaseEntity> implements IRepository<T> {
  protected dbContext = new Map<string, object>();

  constructor(@unmanaged() private idFactory: IdFactory, @unmanaged() private mapper: IMapper<T>) {}

  public async list(options?: IFindOptions<T>): Promise<T[]> {
    const resources = Array.from(this.dbContext.values());
    const where = options && options.where ? options.where : {};
    const entities = _.filter(resources, where).map((resource: object) => this.mapper.map(resource));
    if (options && (options.offset || options.limit)) {
      const offset = options.offset || 0;
      const limit = options.limit || 20;
      return Promise.resolve(entities.slice(offset, offset + limit));
    } else {
      return Promise.resolve(entities);
    }
  }

  public async getById(id: RepositoryId): Promise<T | null> {
    const val = this.dbContext.get(id.toString());
    if (val) {
      return Promise.resolve(this.mapper.map(val));
    } else {
      return Promise.resolve(null);
    }
  }

  public async add(entity: T): Promise<T> {
    const id = this.idFactory.createId();
    entity.id = id;
    this.dbContext.set(id.toString(), _.toPlainObject(entity));
    return Promise.resolve(entity);
  }

  public async update(entity: T): Promise<void> {
    if (await this.getById(entity.id)) {
      this.dbContext.set(entity.id.toString(), _.toPlainObject(entity));
      return Promise.resolve();
    } else {
      return Promise.reject(undefined);
    }
  }

  public async delete(entity: T): Promise<void> {
    if (await this.getById(entity.id)) {
      this.dbContext.delete(entity.id.toString());
      return Promise.resolve();
    } else {
      return Promise.reject(undefined);
    }
  }

  public async drop(): Promise<void> {
    this.dbContext.clear();
  }
}
