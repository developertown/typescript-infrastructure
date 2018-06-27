"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SimpleIdFactory {
    constructor(seedProvider) {
        this.seedProvider = seedProvider;
    }
    createId() {
        return this.seedProvider.next();
    }
}
exports.SimpleIdFactory = SimpleIdFactory;
//# sourceMappingURL=simpleIdFactory.js.map