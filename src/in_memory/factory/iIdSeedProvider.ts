"use strict";

import { RepositoryId } from "@developertown/core";

export interface IdSeedProvider {
  next(): RepositoryId;
}
