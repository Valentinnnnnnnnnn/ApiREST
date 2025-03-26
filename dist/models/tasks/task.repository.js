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
exports.TaskRepository = void 0;
const mongoose_1 = require("mongoose");
const task_model_1 = require("./task.model");
const generic_repository_1 = require("../generic/generic.repository");
class TaskRepository extends generic_repository_1.MongooseRepository {
  constructor() {
    super((0, mongoose_1.model)("Task", task_model_1.taskSchema));
  }
  findByStatus(status) {
    return __awaiter(this, void 0, void 0, function* () {
      return this.model.find({ completed: status }).exec();
    });
  }
  findByPriority(priority) {
    return __awaiter(this, void 0, void 0, function* () {
      return this.model.find({ priority }).exec();
    });
  }
}
exports.TaskRepository = TaskRepository;
