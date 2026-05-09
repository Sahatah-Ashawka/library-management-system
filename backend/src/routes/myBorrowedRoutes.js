import { Router } from "express";
import { requireAuth } from "../middlewares/auth.js";
import { myBorrowedBooks } from "../controllers/borrowController.js";

const router = Router();
router.get("/", requireAuth, myBorrowedBooks);

export default router;
