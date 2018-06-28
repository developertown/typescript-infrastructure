"use strict";

import { ILogger } from "@developertown/core";
import { injectable } from "inversify";
import "reflect-metadata";
import * as Rollbar from "rollbar";

@injectable()
export class RollbarLogger implements ILogger {
  private logger: Rollbar;
  public constructor(accessToken: string, enabled: boolean) {
    this.logger = new Rollbar({ accessToken, enabled });
  }

  public debug(format: string, ...params: any[]): void {
    this.logger.debug(format, params);
  }

  public info(format: string, ...params: any[]): void {
    this.logger.info(format, params);
  }

  public warn(format: string, ...params: any[]): void {
    this.logger.warn(format, params);
  }

  public error(format: string | Error, ...params: any[]): void {
    this.logger.error(format, params);
  }
}
