import express from "express";
import { BookController } from "./bookController";
const router = express.Router();

router.post("/", BookController.createBook);
router.post("/:id", BookController.reviewBook);

router.get("/", BookController.getAllBook);
router.get("/:id", BookController.getSingleBook);
router.patch("/:id", BookController.updateBook);
router.delete("/:id", BookController.deleteBook);

export const BookRouters = router;
