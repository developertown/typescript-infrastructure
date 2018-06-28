"use strict";
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
const simpleIdFactory_1 = require("../factory/simpleIdFactory");
const inMemoryListRepository_1 = require("../inMemoryListRepository");
const uuidProvider_1 = require("../uuidProvider");
class FakeEntity extends core_1.BaseEntity {
    constructor(options) {
        super(options);
        this.name = options.name;
    }
}
class FakeEntityMapper {
    map(resource) {
        return new FakeEntity(resource);
    }
}
describe("InMemoryListRepository", () => {
    let repository;
    beforeEach(() => {
        repository = new inMemoryListRepository_1.InMemoryListRepository(new simpleIdFactory_1.SimpleIdFactory(new uuidProvider_1.UUIDProvider()), new FakeEntityMapper());
    });
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
//# sourceMappingURL=inMemoryListRepository.test.js.map