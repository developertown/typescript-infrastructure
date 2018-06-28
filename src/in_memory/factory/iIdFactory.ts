"use strict";

import { RepositoryId } from "@developertown/core";

export interface IdFactory {
  createId(): RepositoryId;
}
