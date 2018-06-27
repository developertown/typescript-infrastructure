"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable:max-classes-per-file */
const core_1 = require("@developertown/core");
const Faker = require("faker");
const Knex = require("knex");
const sequelize_typescript_1 = require("sequelize-typescript");
const database_1 = require("../database");
const baseModel_1 = require("../models/baseModel");
const sequelizeRepository_1 = require("../sequelizeRepository");
const database_2 = require("./database");
class FakeEntity extends core_1.BaseEntity {
    constructor(options) {
        super(options);
        this.name = options.name;
    }
}
let FakeModel = class FakeModel extends baseModel_1.default {
};
__decorate([
    sequelize_typescript_1.Length({ min: 1, max: 255 }),
    sequelize_typescript_1.Column({ unique: true, allowNull: false }),
    __metadata("design:type", String)
], FakeModel.prototype, "name", void 0);
FakeModel = __decorate([
    sequelize_typescript_1.Table({ tableName: "fakes" })
], FakeModel);
class FakeEntityMapper {
    map(resource) {
        return new FakeEntity(resource);
    }
}
class FakeRepository extends sequelizeRepository_1.SequelizeRepository {
}
describe("SequelizeRepository", () => {
    const logger = console;
    const sequelize = new sequelize_typescript_1.Sequelize({
        dialect: "postgres",
        host: database_2.Database.host,
        port: database_2.Database.port,
        database: database_2.Database.database,
        username: database_2.Database.username,
        password: database_2.Database.password,
        pool: {
            min: database_2.Database.pool.min,
            max: database_2.Database.pool.max,
            idle: database_2.Database.pool.idle,
        },
        logging: (msg, timing) => logger.info(`${msg} (${timing}ms)`),
        benchmark: false,
        define: {
            underscored: true,
            underscoredAll: true,
            paranoid: true,
            timestamps: true,
        },
    });
    const database = new database_1.Database(sequelize, logger);
    beforeAll(() => __awaiter(this, void 0, void 0, function* () {
        yield database.connect();
        sequelize.addModels([FakeModel]);
        const knex = Knex(require("./knexfile"));
        const schema = knex.schema;
        if (!(yield schema.hasTable("fakes"))) {
            yield schema.createTable("fakes", (table) => {
                table.increments();
                table
                    .string("name")
                    .notNullable()
                    .unique();
                table.timestamps(true, true);
                table.timestamp("deleted_at");
            });
        }
        yield knex.destroy();
    }));
    afterAll(() => __awaiter(this, void 0, void 0, function* () {
        yield database.disconnect();
    }));
    let repository;
    beforeEach(() => __awaiter(this, void 0, void 0, function* () {
        repository = new FakeRepository(FakeModel, new FakeEntityMapper());
        yield repository.drop();
    }));
    describe("List", () => __awaiter(this, void 0, void 0, function* () {
        test("returns all resources", () => __awaiter(this, void 0, void 0, function* () {
            const entity = new FakeEntity({ name: Faker.lorem.sentence() });
            yield repository.add(entity);
            const result = yield repository.list();
            expect(result.length).toEqual(1);
        }));
    }));
    test("returns specific page", () => __awaiter(this, void 0, void 0, function* () {
        const entity = new FakeEntity({ name: Faker.lorem.sentence() });
        yield repository.add(entity);
        const result = yield repository.list({ limit: 1, offset: 1 });
        expect(result.length).toEqual(0);
    }));
    describe("GetById", () => {
        const entity = new FakeEntity({ name: Faker.lorem.sentence() });
        test("that is found", () => __awaiter(this, void 0, void 0, function* () {
            const resource = yield repository.add(entity);
            const result = yield repository.getById(resource.id);
            expect(result).not.toBeNull();
        }));
        test("that is unknown", () => __awaiter(this, void 0, void 0, function* () {
            const result = yield repository.getById(-999);
            expect(result).toBeNull();
        }));
    });
    describe("Add", () => {
        test("creates a new resource", () => __awaiter(this, void 0, void 0, function* () {
            const name = Faker.random.alphaNumeric(Faker.random.number({ min: 1, max: 255 }));
            const entity = new FakeEntity({ name });
            const result = yield repository.add(entity);
            expect(result.id).toBeDefined();
        }));
    });
    describe("Update", () => {
        const name = Faker.lorem.sentence();
        const entity = new FakeEntity({ name: Faker.lorem.sentence() });
        let resource;
        beforeEach(() => __awaiter(this, void 0, void 0, function* () {
            resource = (yield repository.add(entity));
        }));
        test("updates to new name", () => __awaiter(this, void 0, void 0, function* () {
            resource.name = name;
            yield repository.update(resource);
            const result = yield repository.getById(resource.id);
            expect(result.name).toEqual(name);
        }));
        test("reuses same name", () => __awaiter(this, void 0, void 0, function* () {
            yield repository.update(resource);
            const result = yield repository.getById(resource.id);
            expect(result.name).toEqual(resource.name);
        }));
        test("that is unknown", () => __awaiter(this, void 0, void 0, function* () {
            resource.id = -999;
            resource.name = name;
            yield expect(repository.update(resource)).rejects.toEqual(undefined);
        }));
    });
    describe("Delete", () => {
        const entity = new FakeEntity({ name: Faker.lorem.sentence() });
        let resource;
        beforeEach(() => __awaiter(this, void 0, void 0, function* () {
            resource = (yield repository.add(entity));
        }));
        test("removes resource", () => __awaiter(this, void 0, void 0, function* () {
            yield repository.delete(resource);
            const result = yield repository.getById(resource.id);
            expect(result).toBeNull();
        }));
        test("that is unknown", () => __awaiter(this, void 0, void 0, function* () {
            resource.id = -999;
            yield expect(repository.delete(resource)).rejects.toEqual(undefined);
        }));
    });
});
//# sourceMappingURL=sequelizeRepository.test.js.map