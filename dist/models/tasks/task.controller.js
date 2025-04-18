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
    static checkIdFormat(id) {
        // Verify the ID format using the IdModel schema
        if (!task_model_1.IdModel.safeParse(id).success) {
            throw new errors_1.BadRequestError('Invalid ID format');
        }
    }
}
exports.TaskController = TaskController;
_a = TaskController;
TaskController.getAllTasks = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const filters = {};
    // Check if the query parameters are valid
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
    const { id } = req.params;
    _a.checkIdFormat(id);
    const task = yield new task_service_1.TaskService().getTask(id);
    // Verify if the task exists
    if (!task) {
        throw new errors_1.NotFoundError('Task not found');
    }
    res.status(200).json(task);
}));
TaskController.createTask = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsed = task_model_1.CreateTaskDto.safeParse(req.body);
    if (!parsed.success) {
        const message = parsed.error.errors
            .map((error) => `${error.path.join('.')}: ${error.message}`)
            .join(', ');
        throw new errors_1.ValidationError(message);
    }
    req.body = parsed.data;
    const task = yield new task_service_1.TaskService().createTask(req.body);
    res.status(201).json(task);
}));
TaskController.updateTask = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    _a.checkIdFormat(id);
    const parsed = task_model_1.UpdateTaskDto.safeParse(req.body);
    if (!parsed.success) {
        const message = parsed.error.errors
            .map((error) => `${error.path.join('.')}: ${error.message}`)
            .join(', ');
        throw new errors_1.ValidationError(message);
    }
    req.body = parsed.data;
    req.body.updatedAt = new Date(); // Set the updatedAt field to the current date
    const task = yield new task_service_1.TaskService().updateTask(id, req.body);
    res.status(201).json(task);
}));
TaskController.deleteTask = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    _a.checkIdFormat(id);
    const task = yield new task_service_1.TaskService().deleteTask(id);
    res.status(200).json(task);
}));
TaskController.toggleTaskComplete = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    _a.checkIdFormat(id);
    const task = yield new task_service_1.TaskService().toggleTaskComplete(id);
    res.status(200).json(task);
}));
