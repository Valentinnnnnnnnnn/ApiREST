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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
const asyncHandler_1 = require("../../shared/utils/asyncHandler");
const task_service_1 = require("./task.service");
const errors_1 = require("../../shared/utils/errors");
const task_model_1 = require("./task.model");
class TaskController {
}
exports.TaskController = TaskController;
_a = TaskController;
TaskController.getAllTasks = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const filters = {};
    if (query.status) {
        const statusQuery = query.status.toString().toLowerCase();
        if (statusQuery !== 'true' && statusQuery !== 'false') {
            throw new errors_1.BadRequestError('Filter "status" is invalid');
        }
        filters.status = statusQuery === 'true';
    }
    if (query.priority) {
        const priorityQuery = query.priority.toString().toLowerCase();
        const allowedPriorities = Object.values(task_model_1.Priority);
        const priorities = priorityQuery.split(',').map((p) => p.trim());
        priorities.forEach((priority) => {
            if (!allowedPriorities.includes(priority)) {
                throw new errors_1.BadRequestError('Filter "priority" is invalid');
            }
        });
        filters.priority = priorities;
    }
    const tasks = yield new task_service_1.TaskService().getAllTasks(filters);
    res.status(200).json(tasks);
}));
TaskController.getTask = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const task = yield new task_service_1.TaskService().getTask(req.params.id);
    res.status(200).json(task);
}));
TaskController.createTask = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const task = yield new task_service_1.TaskService().createTask(req.body);
    res.status(201).json(task);
}));
TaskController.updateTask = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const task = yield new task_service_1.TaskService().updateTask(req.body);
    res.status(200).json(task);
}));
TaskController.deleteTask = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const task = yield new task_service_1.TaskService().deleteTask(req.body);
    res.status(200).json(task);
}));
TaskController.toggleTaskComplete = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const task = yield new task_service_1.TaskService().toggleTaskComplete(req.params.id);
    res.status(200).json(task);
}));
