"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskSchema = exports.CreateTaskDto = exports.Priority = void 0;
const mongoose_1 = require("mongoose");
const zod_1 = require("zod");
var Priority;
(function (Priority) {
    Priority["Low"] = "low";
    Priority["Medium"] = "medium";
    Priority["High"] = "high";
})(Priority || (exports.Priority = Priority = {}));
exports.CreateTaskDto = zod_1.z.object({
    title: zod_1.z.string().min(1).max(100),
    description: zod_1.z.string().min(1).max(1000).optional(),
    dueDate: zod_1.z.coerce.date().optional(),
    priority: zod_1.z.enum([Priority.Low, Priority.Medium, Priority.High])
});
exports.taskSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String },
    completed: { type: Boolean, default: false },
    dueDate: { type: Date },
    priority: { type: String, enum: Object.values(Priority) },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});
