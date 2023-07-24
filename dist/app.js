"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const globalErrorHandler_1 = __importDefault(require("./middleware/globalErrorHandler"));
const http_status_1 = __importDefault(require("http-status"));
const routers_1 = __importDefault(require("./app/routers"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
//parse
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/api/v1", routers_1.default);
// Global Error Handler
app.use(globalErrorHandler_1.default);
// if API not found
app.use((req, res, next) => {
    res.status(http_status_1.default.NOT_FOUND).json({
        success: false,
        message: "Not Found !",
        errorMessage: [
            {
                path: req.originalUrl,
                message: "API not found !",
            },
        ],
    });
    next();
});
exports.default = app;
