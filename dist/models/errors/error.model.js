"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = exports.ErrorType = void 0;
var ErrorType;
(function (ErrorType) {
  ErrorType[(ErrorType["BadRequest"] = 400)] = "BadRequest";
  ErrorType[(ErrorType["Unauthorized"] = 401)] = "Unauthorized";
  ErrorType[(ErrorType["Forbidden"] = 403)] = "Forbidden";
  ErrorType[(ErrorType["NotFound"] = 404)] = "NotFound";
  ErrorType[(ErrorType["MethodNotAllowed"] = 405)] = "MethodNotAllowed";
  ErrorType[(ErrorType["Conflict"] = 409)] = "Conflict";
  ErrorType[(ErrorType["UnprocessableEntity"] = 422)] = "UnprocessableEntity";
  ErrorType[(ErrorType["InternalServerError"] = 500)] = "InternalServerError";
})(ErrorType || (exports.ErrorType = ErrorType = {}));
class CustomError extends Error {
  constructor(message, status) {
    const errorName = ErrorType[status] || "Unknown Error";
    super(message);
    this.status = status;
    this.errorName = errorName;
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}
exports.CustomError = CustomError;
