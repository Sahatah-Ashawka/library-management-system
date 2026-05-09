import { Router } from "express";
import { requireAuth } from "../middlewares/auth.js";
import { extendBorrow, returnBook } from "../controllers/borrowController.js";
import { borrowIdParamValidator, extendValidator } from "../validation/bookValidation.js";
import { validateRequest } from "../middlewares/validateRequest.js";

const router = Router();
router.use(requireAuth);
router.post("/:id/extend", borrowIdParamValidator, extendValidator, validateRequest, extendBorrow);
router.post("/:id/return", borrowIdParamValidator, validateRequest, returnBook);

export default router;
