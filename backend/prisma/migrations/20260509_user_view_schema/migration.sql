-- User-view schema migration (SQLite)
PRAGMA foreign_keys=OFF;

CREATE TABLE "User" (
  "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  "name" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "passwordHash" TEXT NOT NULL,
  "phone" TEXT NOT NULL,
  "memberId" TEXT NOT NULL,
  "role" TEXT NOT NULL DEFAULT 'USER',
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL
);

CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_memberId_key" ON "User"("memberId");

CREATE TABLE "Book" (
  "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  "title" TEXT NOT NULL,
  "author" TEXT NOT NULL,
  "genre" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "coverImage" TEXT NOT NULL,
  "totalCopies" INTEGER NOT NULL,
  "availableCopies" INTEGER NOT NULL,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL
);

CREATE TABLE "BorrowRecord" (
  "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  "userId" INTEGER NOT NULL,
  "bookId" INTEGER NOT NULL,
  "borrowDate" DATETIME NOT NULL,
  "dueDate" DATETIME NOT NULL,
  "returnDate" DATETIME,
  "status" TEXT NOT NULL DEFAULT 'BORROWED',
  "extendedCount" INTEGER NOT NULL DEFAULT 0,
  "overdueDays" INTEGER NOT NULL DEFAULT 0,
  "fineAmount" INTEGER NOT NULL DEFAULT 0,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL,
  CONSTRAINT "BorrowRecord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "BorrowRecord_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE INDEX "BorrowRecord_userId_status_idx" ON "BorrowRecord"("userId", "status");
CREATE INDEX "BorrowRecord_bookId_idx" ON "BorrowRecord"("bookId");

PRAGMA foreign_keys=ON;
