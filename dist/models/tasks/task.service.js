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
exports.TaskService = void 0;
const task_repository_1 = require("./task.repository");
class TaskService {
    constructor() {
        this.taskRepository = new task_repository_1.TaskRepository();
    }
    getAllTasks() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.taskRepository.getAll();
        });
    }
    createTask(task) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('task', task);
            return this.taskRepository.create(task);
        });
    }
}
exports.TaskService = TaskService;
