"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookRouters_1 = require("../module/book/bookRouters");
const router = express_1.default.Router();
const modulesRouters = [
    {
        pathName: "/book",
        routeName: bookRouters_1.BookRouters,
    },
];
modulesRouters.forEach((route) => router.use(route.pathName, route.routeName));
exports.default = router;
