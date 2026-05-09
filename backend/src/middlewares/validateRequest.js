import { validationResult } from "express-validator";
export function validateRequest(req, _res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const details = errors.array();
    return next({ statusCode: 422, message: details[0]?.msg || "Validation failed", details });
  }
  next();
}
