"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandlerMiddleware = void 0;
const errors_1 = require("../utils/errors");
const errorHandlerMiddleware = (err, req, res, next) => {
    if (err instanceof errors_1.AppError) {
        res.status(err.statusCode).json({
            status: 'error',
            code: err.code,
            message: err.message
        });
    }
    else
        // Manage unexpected errors
        res.status(500).json({
            status: 'error',
            message: 'An unexpected error occurred, please try again later or contact your system administrator'
        });
    next(); // For potental future logging
};
exports.errorHandlerMiddleware = errorHandlerMiddleware;
