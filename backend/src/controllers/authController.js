import bcrypt from "bcryptjs";
import { prisma } from "../config/db.js";
import { makeMemberId } from "../utils/memberId.js";
import { signToken } from "../utils/jwt.js";

export async function register(req, res, next) {
  try {
    const { name, email, password, phone } = req.body;
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return next({ statusCode: 409, message: "Email already in use" });

    let memberId = makeMemberId();
    let attempts = 0;
    while (attempts < 5) {
      const found = await prisma.user.findUnique({ where: { memberId } });
      if (!found) break;
      memberId = makeMemberId();
      attempts += 1;
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        passwordHash: await bcrypt.hash(password, 12),
        memberId,
        role: "USER",
      },
    });

    const token = signToken({ userId: user.id });
    res.status(201).json({
      success: true,
      message: "Registration successful",
      data: { token, user: { id: user.id, name: user.name, email: user.email, memberId: user.memberId } },
    });
  } catch (e) { next(e); }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return next({ statusCode: 401, message: "Invalid credentials" });
    if (!(await bcrypt.compare(password, user.passwordHash))) return next({ statusCode: 401, message: "Invalid credentials" });
    const token = signToken({ userId: user.id });
    res.json({ success: true, data: { token, user: { id: user.id, name: user.name, email: user.email, memberId: user.memberId } } });
  } catch (e) { next(e); }
}

export async function me(req, res, next) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { id: true, name: true, email: true, memberId: true, role: true, createdAt: true },
    });
    if (!user) return next({ statusCode: 404, message: "User not found" });
    res.json({ success: true, data: user });
  } catch (e) { next(e); }
}

export async function logout(_req, res) {
  res.json({ success: true, message: "Logged out successfully" });
}
