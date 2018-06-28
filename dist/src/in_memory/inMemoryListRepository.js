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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
const inversify_1 = require("inversify");
const _ = require("lodash");
require("reflect-metadata");
let InMemoryListRepository = class InMemoryListRepository {
    constructor(idFactory, mapper) {
        this.idFactory = idFactory;
        this.mapper = mapper;
        this.dbContext = new Map();
    }
    list(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const resources = Array.from(this.dbContext.values());
            const where = options && options.where ? options.where : {};
            const entities = _.filter(resources, where).map((resource) => this.mapper.map(resource));
            if (options && (options.offset || options.limit)) {
                const offset = options.offset || 0;
                const limit = options.limit || 20;
                return Promise.resolve(entities.slice(offset, offset + limit));
            }
            else {
                return Promise.resolve(entities);
            }
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const val = this.dbContext.get(id.toString());
            if (val) {
                return Promise.resolve(this.mapper.map(val));
            }
            else {
                return Promise.resolve(null);
            }
        });
    }
    add(entity) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = this.idFactory.createId();
            entity.id = id;
            this.dbContext.set(id.toString(), _.toPlainObject(entity));
            return Promise.resolve(entity);
        });
    }
    update(entity) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.getById(entity.id)) {
                this.dbContext.set(entity.id.toString(), _.toPlainObject(entity));
                return Promise.resolve();
            }
            else {
                return Promise.reject(undefined);
            }
        });
    }
    delete(entity) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.getById(entity.id)) {
                this.dbContext.delete(entity.id.toString());
                return Promise.resolve();
            }
            else {
                return Promise.reject(undefined);
            }
        });
    }
    drop() {
        return __awaiter(this, void 0, void 0, function* () {
            this.dbContext.clear();
        });
    }
};
InMemoryListRepository = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.unmanaged()), __param(1, inversify_1.unmanaged()),
    __metadata("design:paramtypes", [Object, Object])
], InMemoryListRepository);
exports.InMemoryListRepository = InMemoryListRepository;
//# sourceMappingURL=inMemoryListRepository.js.map