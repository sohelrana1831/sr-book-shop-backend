"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handelValidationError = (error) => {
    const errors = Object.values(error.errors).map((el) => {
        return {
            path: el.path,
            message: el.message,
        };
    });
    const statusCode = 400;
    return {
        statusCode,
        message: "Validation Error",
        errorMessage: errors,
    };
};
exports.default = handelValidationError;
