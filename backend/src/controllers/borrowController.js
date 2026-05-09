import { prisma } from "../config/db.js";
const DAY = 86400000; const LOAN_DAYS = 7; const FINE_PER_DAY = 1000;
const overdueDays = (dueDate, now = new Date()) => { const diff = now.getTime() - dueDate.getTime(); return diff <= 0 ? 0 : Math.ceil(diff / DAY); };

export async function borrowBook(req, res, next) {
  try {
    const userId = req.user.id;
    const bookId = Number(req.params.bookId);
    if (!Number.isInteger(bookId) || bookId <= 0) return next({ statusCode: 400, message: "Invalid book ID" });

    const book = await prisma.book.findUnique({ where: { id: bookId } });
    if (!book) return next({ statusCode: 404, message: "Book not found" });

    const borrowDate = new Date();
    const dueDate = new Date(borrowDate.getTime() + LOAN_DAYS * DAY);

    const data = await prisma.$transaction(async (tx) => {
      const active = await tx.borrowRecord.findFirst({ where: { userId, bookId, status: "BORROWED" } });
      if (active) throw Object.assign(new Error("You already borrowed this book"), { statusCode: 409 });

      const stockUpdate = await tx.book.updateMany({
        where: { id: bookId, availableCopies: { gt: 0 } },
        data: { availableCopies: { decrement: 1 } },
      });
      if (stockUpdate.count === 0) throw Object.assign(new Error("Book is out of stock."), { statusCode: 409 });

      return tx.borrowRecord.create({
        data: { userId, bookId, borrowDate, dueDate, status: "BORROWED" },
        include: { book: true },
      });
    });

    res.status(201).json({ success: true, message: "Book borrowed successfully.", data });
  } catch (e) { next(e); }
}

export async function extendBorrow(req, res, next) {
  try {
    const borrowId = Number(req.params.borrowId || req.params.id);
    if (!Number.isInteger(borrowId) || borrowId <= 0) return next({ statusCode: 400, message: "Invalid borrow record ID" });
    const record = await prisma.borrowRecord.findUnique({ where: { id: borrowId }, include: { user: true, book: true } });
    if (!record || record.userId !== req.user.id) return next({ statusCode: 404, message: "Borrow record not found" });
    if (record.status === "RETURNED") return next({ statusCode: 409, message: "Cannot extend a returned book" });
    if (record.extendedCount >= 1) return next({ statusCode: 409, message: "Extension already used" });
    if (record.user.memberId !== req.body.memberId) return next({ statusCode: 403, message: "Invalid member ID" });
    const data = await prisma.borrowRecord.update({ where: { id: record.id }, data: { dueDate: new Date(record.dueDate.getTime() + LOAN_DAYS * DAY), extendedCount: { increment: 1 } }, include: { book: true } });
    res.json({ success: true, message: "Borrow extended by 7 days.", data });
  } catch (e) { next(e); }
}

export async function returnBook(req, res, next) {
  try {
    const borrowId = Number(req.params.borrowId || req.params.id);
    if (!Number.isInteger(borrowId) || borrowId <= 0) return next({ statusCode: 400, message: "Invalid borrow record ID" });
    const record = await prisma.borrowRecord.findUnique({ where: { id: borrowId }, include: { book: true } });
    if (!record || record.userId !== req.user.id) return next({ statusCode: 404, message: "Borrow record not found" });
    if (record.status === "RETURNED") return next({ statusCode: 409, message: "Book already returned" });
    const returnDate = new Date(); const days = overdueDays(record.dueDate, returnDate); const fineAmount = days * FINE_PER_DAY;
    const data = await prisma.$transaction(async (tx) => {
      await tx.book.update({ where: { id: record.bookId }, data: { availableCopies: { increment: 1 } } });
      return tx.borrowRecord.update({ where: { id: record.id }, data: { status: "RETURNED", returnDate, overdueDays: days, fineAmount }, include: { book: true } });
    });
    res.json({ success: true, message: "Book returned successfully.", data });
  } catch (e) { next(e); }
}

export async function myBorrowedBooks(req, res, next) {
  try {
    const rows = await prisma.borrowRecord.findMany({ where: { userId: req.user.id }, include: { book: true }, orderBy: { borrowDate: "desc" } });
    const now = new Date();
    const data = rows.map((r) => {
      const od = r.status === "BORROWED" ? overdueDays(r.dueDate, now) : r.overdueDays;
      return { ...r, overdueDaysLive: od, fineAmountLive: r.status === "BORROWED" ? od * FINE_PER_DAY : r.fineAmount };
    });
    res.json({ success: true, data });
  } catch (e) { next(e); }
}
