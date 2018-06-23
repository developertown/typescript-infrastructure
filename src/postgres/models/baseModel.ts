"use strict";

import {Column, CreatedAt, DeletedAt, Model, Sequelize, UpdatedAt} from "sequelize-typescript";

export default abstract class BaseModel<T> extends Model<T> {
  @CreatedAt
  @Column({ type: Sequelize.DATE })
  public createdAt: Date;

  @UpdatedAt
  @Column({ type: Sequelize.DATE })
  public updatedAt: Date;

  @DeletedAt
  @Column({ type: Sequelize.DATE })
  public deletedAt: Date | null;
}
