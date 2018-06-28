# DeveloperTown Infrastructure

A small library that adds common repository implementations

## Installation

`npm install @developertown/infrastructure`

## Usage

```ts
// core/src/townie.ts

import { BaseEntity } from "@developertown/core";

export class Townie extends BaseEntity {
  public firstName: string;
  public lastName: string;
}
```

```ts
// infrastructure/src/postgres/models/townie.ts

import { Column, CreatedAt, DeletedAt, Length, Model, Sequelize, Table, UpdatedAt } from "sequelize-typescript";

@Table({ tableName: "townies" })
export default class Townie extends Model<Townie> {
  @Length({ min: 1, max: 255 })
  @Column({ allowNull: false })
  public firstName: string;

  @Length({ min: 1, max: 255 })
  @Column({ allowNull: false })
  public lastName: string;

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
```

```ts
// infrastructure/src/townies/townieMapper.ts

import { IMapper } from "@developertown/core";
import { Townie } from "~/core";
import { Townie as SequelizeTownie } from "~/infrastructure";

class TownieMapper implements IMapper<Townie> {
  public map(resource: SequelizeTownie): Townie {
    // Convert DB Model to Domain Entity.  In some cases a library like automapper might be a good choice.
    return new Townie(resource);
  }
}
```

```ts
// infrastructure/src/townies/townieRepository.ts

import { SequelizeRepository } from "@developertown/infrastructure";
import { Townie } from "~/core";
import { Townie as SequelizeTownie } from "~/infrastructure";

export class TownieRepository extends SequelizeRepository<Townie, SequelizeTownie> {
  constructor() {
    super(SequelizeTownie, new TownieMapper());
  }
}
```

## Tests

### With Docker

```
docker-compose -p typescript-infrastructure -f ./deployment/development/docker-compose.yml -f ./deployment/development/docker-compose.test.yml run app
```