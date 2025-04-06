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
const errors_1 = require("../../shared/utils/errors");
class TaskService {
    constructor() {
        this.taskRepository = new task_repository_1.TaskRepository();
    }
    getAllTasks(filters) {
        return __awaiter(this, void 0, void 0, function* () {
            if (filters.status !== undefined && filters.priority) {
                // Filtre par status et par priorité
                return yield this.taskRepository.findByStatusAndPriorities(filters.status, filters.priority);
            }
            else if (filters.status !== undefined) {
                // Filtre uniquement par status
                return yield this.taskRepository.findByStatus(filters.status);
            }
            else if (filters.priority && filters.priority.length > 0) {
                // Filtre uniquement par priorité
                return yield this.taskRepository.findByPriorities(filters.priority);
            }
            else {
                // Aucun filtre appliqué
                return yield this.taskRepository.getAll();
            }
        });
    }
    getTask(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.taskRepository.getById(id);
        });
    }
    createTask(task) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.taskRepository.create(task);
        });
    }
    updateTask(task) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!task.id || typeof task.id !== 'string') {
                throw new errors_1.ValidationError('Invalid ID formattt');
            }
            return this.taskRepository.update(task.id, task);
        });
    }
    deleteTask(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.taskRepository.delete(id);
        });
    }
    toggleTaskComplete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const task = yield this.taskRepository.getById(id);
            if (!task) {
                throw new Error('Task not found');
            }
            task.completed = !task.completed;
            return this.taskRepository.update(id, task);
        });
    }
}
exports.TaskService = TaskService;
