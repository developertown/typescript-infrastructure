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
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
require("reflect-metadata");
const Winston = require("winston");
let ConsoleLogger = class ConsoleLogger {
    constructor(level, enabled) {
        this.logger = new Winston.Logger({
            transports: [
                new Winston.transports.Console({
                    silent: !enabled,
                    level,
                    colorize: true,
                    timestamp: true,
                }),
            ],
        });
    }
    debug(format, ...params) {
        this.logger.debug.apply(this, [format].concat(params));
    }
    info(format, ...params) {
        this.logger.info.apply(this, [format].concat(params));
    }
    warn(format, ...params) {
        this.logger.warn.apply(this, [format].concat(params));
    }
    error(format, ...params) {
        this.logger.error.apply(this, [format].concat(params));
    }
};
ConsoleLogger = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [String, Boolean])
], ConsoleLogger);
exports.ConsoleLogger = ConsoleLogger;
//# sourceMappingURL=consoleLogger.js.map