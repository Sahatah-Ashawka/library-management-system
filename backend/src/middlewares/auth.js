import { verifyToken } from "../utils/jwt.js";
import { prisma } from "../config/db.js";
export async function requireAuth(req, _res, next) {
  try {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith("Bearer ")) return next({ statusCode: 401, message: "Authentication required" });
    const payload = verifyToken(auth.split(" ")[1]);
    const user = await prisma.user.findUnique({ where: { id: payload.userId } });
    if (!user) return next({ statusCode: 401, message: "Invalid user" });
    req.user = { id: user.id, memberId: user.memberId, email: user.email };
    next();
  } catch {
    next({ statusCode: 401, message: "Invalid or expired token" });
  }
}
