"use strict";

import { RepositoryId } from "@developertown/core";
import { IdFactory } from "./iIdFactory";
import { IdSeedProvider } from "./iIdSeedProvider";

export class SimpleIdFactory implements IdFactory {
  constructor(private seedProvider: IdSeedProvider) {}

  public createId(): RepositoryId {
    return this.seedProvider.next();
  }
}
