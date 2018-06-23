"use strict";

import { injectable, unmanaged } from "inversify";
import {
  BaseError as SequelizeBaseError,
  UniqueConstraintError as SequelizeUniqueConstraintError,
  ValidationError as SequelizeValidationError,
  ValidationErrorItem,
} from "sequelize";
import { IFindOptions as ISequelizeFindOptions } from "sequelize-typescript";

import {
  BaseEntity,
  BaseError,
  IFindOptions,
  IMapper,
  IRepository,
  RepositoryId,
  UniqueConstraintError,
  ValidationError,
} from "@developertown/core";
import BaseModel from "./models/baseModel";

@injectable()
export class SequelizeRepository<T extends BaseEntity, U extends BaseModel<U>> implements IRepository<T> {
  constructor(@unmanaged() protected dbContext: typeof BaseModel, @unmanaged() private mapper: IMapper<T>) {}

  public async list(options?: IFindOptions<T>): Promise<T[]> {
    return this.dbContext
      .findAll(options as ISequelizeFindOptions)
      .then((resources: Array<BaseModel<U>>) => {
        return resources.map((resource: BaseModel<U>) => this.mapper.map(resource));
      })
      .catch((err: SequelizeBaseError) => {
        throw this.normalizedError(err);
      });
  }

  public async getById(id: RepositoryId): Promise<T | null> {
    return this.dbContext
      .findById(id)
      .then((resource: BaseModel<U> | null) => {
        if (resource) {
          return this.mapper.map(resource);
        } else {
          return null;
        }
      })
      .catch((err: SequelizeBaseError) => {
        throw this.normalizedError(err);
      });
  }

  public async add(entity: T, options: any = {}): Promise<T> {
    return this.dbContext
      .create(entity, options)
      .then((resource: BaseModel<U>) => this.mapper.map(resource))
      .catch((err: SequelizeBaseError) => {
        throw this.normalizedError(err);
      });
  }

  public async update(entity: T): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.dbContext
        .update(entity, { where: { id: entity.id } })
        .then((result: [number, Array<BaseModel<U>>]) => {
          if (result[0] > 0) {
            resolve();
          } else {
            reject();
          }
        })
        .catch((err: SequelizeBaseError) => reject(this.normalizedError(err)));
    });
  }

  public async delete(entity: T): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.dbContext
        .destroy({ where: { id: entity.id } })
        .then((result: number) => {
          if (result > 0) {
            resolve();
          } else {
            reject();
          }
        })
        .catch((err: SequelizeBaseError) => reject(this.normalizedError(err)));
    });
  }

  public async drop(): Promise<void> {
    return this.dbContext.truncate({ cascade: true, force: true });
  }
  protected normalizedError(err: SequelizeBaseError): BaseError {
    // TODO: map repository errors correctly
    if (err.name === "SequelizeUniqueConstraintError") {
      const validationError = err as SequelizeUniqueConstraintError;
      const errors = validationError.errors.map((item: ValidationErrorItem) => item.message);
      return new UniqueConstraintError(validationError.message, errors);
    } else if (err.name === "SequelizeValidationError") {
      const validationError = err as SequelizeValidationError;
      const errors = validationError.errors.map((item: ValidationErrorItem) => item.message);
      return new ValidationError(validationError.message, errors);
    } else {
      return new BaseError(err.message);
    }
  }
}
