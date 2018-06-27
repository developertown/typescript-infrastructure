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
const core_1 = require("@developertown/core");
let SequelizeRepository = class SequelizeRepository {
    constructor(dbContext, mapper) {
        this.dbContext = dbContext;
        this.mapper = mapper;
    }
    list(options) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.dbContext
                .findAll(options)
                .then((resources) => {
                return resources.map((resource) => this.mapper.map(resource));
            })
                .catch((err) => {
                throw this.normalizedError(err);
            });
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.dbContext
                .findById(id)
                .then((resource) => {
                if (resource) {
                    return this.mapper.map(resource);
                }
                else {
                    return null;
                }
            })
                .catch((err) => {
                throw this.normalizedError(err);
            });
        });
    }
    add(entity, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.dbContext
                .create(entity, options)
                .then((resource) => this.mapper.map(resource))
                .catch((err) => {
                throw this.normalizedError(err);
            });
        });
    }
    update(entity) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.dbContext
                    .update(entity, { where: { id: entity.id } })
                    .then((result) => {
                    if (result[0] > 0) {
                        resolve();
                    }
                    else {
                        reject();
                    }
                })
                    .catch((err) => reject(this.normalizedError(err)));
            });
        });
    }
    delete(entity) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.dbContext
                    .destroy({ where: { id: entity.id } })
                    .then((result) => {
                    if (result > 0) {
                        resolve();
                    }
                    else {
                        reject();
                    }
                })
                    .catch((err) => reject(this.normalizedError(err)));
            });
        });
    }
    drop() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.dbContext.truncate({ cascade: true, force: true });
        });
    }
    normalizedError(err) {
        // TODO: map repository errors correctly
        if (err.name === "SequelizeUniqueConstraintError") {
            const validationError = err;
            const errors = validationError.errors.map((item) => item.message);
            return new core_1.UniqueConstraintError(validationError.message, errors);
        }
        else if (err.name === "SequelizeValidationError") {
            const validationError = err;
            const errors = validationError.errors.map((item) => item.message);
            return new core_1.ValidationError(validationError.message, errors);
        }
        else {
            return new core_1.BaseError(err.message);
        }
    }
};
SequelizeRepository = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.unmanaged()), __param(1, inversify_1.unmanaged()),
    __metadata("design:paramtypes", [Object, Object])
], SequelizeRepository);
exports.SequelizeRepository = SequelizeRepository;
//# sourceMappingURL=sequelizeRepository.js.map