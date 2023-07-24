"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRouters = void 0;
const express_1 = __importDefault(require("express"));
const bookController_1 = require("./bookController");
const router = express_1.default.Router();
router.post("/", bookController_1.BookController.createBook);
router.post("/:id", bookController_1.BookController.reviewBook);
router.get("/", bookController_1.BookController.getAllBook);
router.get("/:id", bookController_1.BookController.getSingleBook);
router.patch("/:id", bookController_1.BookController.updateBook);
router.delete("/:id", bookController_1.BookController.deleteBook);
exports.BookRouters = router;
