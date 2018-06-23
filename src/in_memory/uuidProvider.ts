"use strict";

import { RepositoryId } from "@developertown/core";
import * as uuid from "uuid";
import { IdSeedProvider } from "./factory/iIdSeedProvider";

export class UUIDProvider implements IdSeedProvider {
  public next(): RepositoryId {
    return uuid.v4();
  }
}
