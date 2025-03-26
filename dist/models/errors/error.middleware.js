"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const error_model_1 = require("./error.model");
const errorMiddleware = (err, req, res, next) => {
  if (err instanceof error_model_1.CustomError) {
    res.status(err.status).json({ error: err.errorName, message: err.message });
  } else {
    console.error("Unexpected error:", err);
    res
      .status(500)
      .json({
        error: "Internal Server Error",
        message: "An unexpected error occurred",
      });
  }
};
exports.errorMiddleware = errorMiddleware;
