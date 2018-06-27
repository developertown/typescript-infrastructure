"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid = require("uuid");
class UUIDProvider {
    next() {
        return uuid.v4();
    }
}
exports.UUIDProvider = UUIDProvider;
//# sourceMappingURL=uuidProvider.js.map