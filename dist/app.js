"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const error_middleware_1 = require("./shared/middleware/error.middleware");
const task_routes_1 = require("./models/tasks/task.routes");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_js_1 = require("./swagger.js");
exports.app = (0, express_1.default)();
exports.app.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_js_1.swaggerSpec));
exports.app.use(express_1.default.json()); // Parse JSON
exports.app.use((0, cors_1.default)()); // Enable CORS
exports.app.use((0, helmet_1.default)()); // Set security headers
exports.app.use('/tasks', task_routes_1.taskRouter); // Task routes
exports.app.use(error_middleware_1.errorHandlerMiddleware); // Error handling middleware
