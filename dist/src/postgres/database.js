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
const core_1 = require("@developertown/core");
const fs = require("fs");
const Inflected = require("inflected");
const inversify_1 = require("inversify");
const sequelize_typescript_1 = require("sequelize-typescript");
let Database = class Database {
    constructor(sequelize, logger) {
        this.sequelize = sequelize;
        this.logger = logger;
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                this.logger.info("Initializing Database...");
                try {
                    this.sequelize.addHook("beforeDefine", (attributes) => {
                        Object.keys(attributes).forEach((key) => {
                            if (!attributes[key].field) {
                                attributes[key].field = Inflected.underscore(key);
                            }
                        });
                    });
                    const modelPath = __dirname + "/models";
                    if (fs.existsSync(modelPath)) {
                        this.logger.debug("Adding models");
                        this.sequelize.addModels([modelPath]);
                        this.logger.debug("Done adding models");
                    }
                    const err = yield this.sequelize.validate();
                    if (err && err.errors.length > 0) {
                        throw new Error("Error connecting to postgres: " + err.errors[0].message);
                    }
                    this.logger.info("Database initialized.");
                    resolve();
                }
                catch (err) {
                    reject(err);
                }
            }));
        });
    }
    healthcheck() {
        return new Promise((resolve, reject) => {
            this.sequelize
                .authenticate()
                .then(resolve)
                .catch(reject);
        });
    }
    disconnect() {
        return new Promise((resolve, reject) => {
            this.logger.info("Stopping Database...");
            this.sequelize.close();
            this.logger.info("Database stopped.");
            resolve();
        });
    }
};
Database = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.unmanaged()), __param(1, inversify_1.inject(core_1.Logger)),
    __metadata("design:paramtypes", [sequelize_typescript_1.Sequelize, Object])
], Database);
exports.Database = Database;
//# sourceMappingURL=database.js.map