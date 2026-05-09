import { prisma } from "../config/db.js";

export async function getBooks(req, res, next) {
  try {
    const search = req.query.search?.trim() || "";
    const genre = req.query.genre?.trim() || "";
    const books = await prisma.book.findMany({
      where: {
        AND: [
          genre ? { genre: { equals: genre } } : {},
          search ? { OR: [
            { title: { contains: search } },
            { author: { contains: search } },
            { description: { contains: search } },
          ] } : {},
        ],
      }, orderBy: { createdAt: "desc" },
    });
    const genres = await prisma.book.findMany({ select: { genre: true }, distinct: ["genre"], orderBy: { genre: "asc" } });
    res.json({ success: true, data: { books, genres: genres.map((g) => g.genre) } });
  } catch (e) { next(e); }
}

export async function getBookById(req, res, next) {
  try {
    const book = await prisma.book.findUnique({ where: { id: Number(req.params.id) } });
    if (!book) return next({ statusCode: 404, message: "Book not found" });
    res.json({ success: true, data: book });
  } catch (e) { next(e); }
}
