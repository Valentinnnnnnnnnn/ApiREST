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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
const asyncHandler_1 = require("../../shared/utils/asyncHandler");
const task_service_1 = require("./task.service");
class TaskController {}
exports.TaskController = TaskController;
_a = TaskController;
TaskController.getAllTasks = (0, asyncHandler_1.asyncHandler)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const tasks = yield new task_service_1.TaskService().getAllTasks();
    res.status(200).json(tasks);
  }),
);
TaskController.createTask = (0, asyncHandler_1.asyncHandler)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const task = yield new task_service_1.TaskService().createTask(req.body);
    res.status(201).json(task);
  }),
);
