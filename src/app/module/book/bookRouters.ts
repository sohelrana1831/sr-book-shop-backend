import express from "express";
import { BookController } from "./BookController";
const router = express.Router();

router.post("/", BookController.createBook);

router.get("/", BookController.getAllBook);
router.get("/:id", BookController.getSingleBook);
router.patch("/:id", BookController.updateBook);
router.delete("/:id", BookController.deleteBook);

export const BookRouters = router;
