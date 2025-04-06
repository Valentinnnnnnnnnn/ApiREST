"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskSchema = exports.Priority = void 0;
const mongoose_1 = require("mongoose");
var Priority;
(function (Priority) {
    Priority["Low"] = "low";
    Priority["Medium"] = "medium";
    Priority["High"] = "high";
})(Priority || (exports.Priority = Priority = {}));
exports.taskSchema = new mongoose_1.Schema({
    id: { type: Number },
    title: { type: String, required: true },
    description: { type: String },
    completed: { type: Boolean, default: false },
    dueDate: { type: Date },
    priority: { type: String, enum: Object.values(Priority) },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});
