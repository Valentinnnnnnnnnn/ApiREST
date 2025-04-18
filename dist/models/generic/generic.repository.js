"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongooseRepository = void 0;
const errors_1 = require("../../shared/utils/errors");
class MongooseRepository {
    constructor(model) {
        this.model = model;
    }
    create(item) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.create(item);
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.model.findById(String(id)).exec();
            return result;
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.find().exec();
        });
    }
    update(id, item) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.model
                .findByIdAndUpdate(id, item, { new: true })
                .exec();
            if (result === null) {
                throw new errors_1.NotFoundError('Item not found');
            }
            return result;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.model.findByIdAndDelete(String(id)).exec();
            if (!result) {
                throw new errors_1.NotFoundError('Item not found');
            }
            return true;
        });
    }
}
exports.MongooseRepository = MongooseRepository;
