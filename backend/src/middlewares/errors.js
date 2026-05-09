export function notFound(_req, _res, next) { next({ statusCode: 404, message: "Route not found" }); }
export function errorHandler(err, _req, res, _next) {
  res.status(err.statusCode || 500).json({ success: false, message: err.message || "Internal server error", ...(err.details ? { details: err.details } : {}) });
}
