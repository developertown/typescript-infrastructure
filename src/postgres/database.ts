"use strict";

import { IDatabase, Identifiers, ILogger } from "@developertown/core";
import * as fs from "fs";
import * as Inflected from "inflected";
import { inject, injectable, unmanaged } from "inversify";
import { DefineAttributeColumnOptions, DefineAttributes, ValidationError } from "sequelize";
import { Sequelize } from "sequelize-typescript";

@injectable()
export class Database implements IDatabase {
  constructor(@unmanaged() protected sequelize: Sequelize, @inject(Identifiers.Logger) protected logger: ILogger) {}

  public async connect(): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      this.logger.info("Initializing Database...");
      try {
        this.sequelize.addHook("beforeDefine", (attributes: DefineAttributes) => {
          Object.keys(attributes).forEach((key: any) => {
            if (!(attributes[key] as DefineAttributeColumnOptions).field) {
              (attributes[key] as DefineAttributeColumnOptions).field = Inflected.underscore(key);
            }
          });
        });
        const modelPath = __dirname + "/models";
        if (fs.existsSync(modelPath)) {
          this.logger.debug("Adding models");
          this.sequelize.addModels([modelPath]);
          this.logger.debug("Done adding models");
        }

        const err: ValidationError = await this.sequelize.validate();
        if (err && err.errors.length > 0) {
          throw new Error("Error connecting to postgres: " + err.errors[0].message);
        }
        this.logger.info("Database initialized.");
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  }

  public healthcheck(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.sequelize
        .authenticate()
        .then(resolve)
        .catch(reject);
    });
  }

  public disconnect(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.logger.info("Stopping Database...");
      this.sequelize.close();
      this.logger.info("Database stopped.");
      resolve();
    });
  }
}
