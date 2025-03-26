"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongooseRepository = void 0;
const error_model_1 = require("../errors/error.model");
class MongooseRepository {
  constructor(model) {
    this.model = model;
  }
  create(item) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        console.log("item", item);
        return yield this.model.create(item);
      } catch (error) {
        throw new error_model_1.CustomError(
          "Failed to create item",
          error_model_1.ErrorType.InternalServerError,
        );
      }
    });
  }
  getById(id) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const result = yield this.model.findById(String(id)).exec();
        return result;
      } catch (error) {
        throw new error_model_1.CustomError(
          "Invalid ID format",
          error_model_1.ErrorType.BadRequest,
        );
      }
    });
  }
  getAll() {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        return yield this.model.find().exec();
      } catch (error) {
        throw new error_model_1.CustomError(
          "Failed to retrieve items",
          error_model_1.ErrorType.InternalServerError,
        );
      }
    });
  }
  update(id, item) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const result = yield this.model
          .findByIdAndUpdate(id, item, { new: true })
          .exec();
        if (!result) {
          throw new error_model_1.CustomError(
            "Item not found for update",
            error_model_1.ErrorType.NotFound,
          );
        }
        return result;
      } catch (error) {
        throw new error_model_1.CustomError(
          "Invalid update request",
          error_model_1.ErrorType.BadRequest,
        );
      }
    });
  }
  delete(id) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const result = yield this.model.findByIdAndDelete(String(id)).exec();
        if (!result) {
          throw new error_model_1.CustomError(
            "Item not found for deletion",
            error_model_1.ErrorType.NotFound,
          );
        }
        return true;
      } catch (error) {
        throw new error_model_1.CustomError(
          "Invalid delete request",
          error_model_1.ErrorType.BadRequest,
        );
      }
    });
  }
}
exports.MongooseRepository = MongooseRepository;
