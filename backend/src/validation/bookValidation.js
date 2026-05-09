import { body, param, query } from "express-validator";
export const booksQueryValidator = [query("search").optional().isString(), query("genre").optional().isString()];
export const extendValidator = [body("memberId").trim().notEmpty().withMessage("Member ID is required")];
export const bookIdParamValidator = [param("bookId").isInt({ gt: 0 }).withMessage("Valid book ID is required")];
export const borrowIdParamValidator = [param("borrowId").optional().isInt({ gt: 0 }).withMessage("Valid borrow record ID is required"), param("id").optional().isInt({ gt: 0 }).withMessage("Valid borrow record ID is required")];
