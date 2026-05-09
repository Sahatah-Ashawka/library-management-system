import { Router } from "express";
import { getBookById, getBooks } from "../controllers/bookController.js";
import { booksQueryValidator } from "../validation/bookValidation.js";
import { validateRequest } from "../middlewares/validateRequest.js";
const router = Router();
router.get("/", booksQueryValidator, validateRequest, getBooks);
router.get("/:id", getBookById);
export default router;
