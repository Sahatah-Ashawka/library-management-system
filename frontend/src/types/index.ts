export type Book = { id: number; title: string; author: string; genre: string; description: string; coverImage: string; totalCopies: number; availableCopies: number; };
export type User = { id: number; name: string; email: string; memberId: string; };
export type BorrowRecord = { id: number; borrowDate: string; dueDate: string; returnDate: string | null; status: "BORROWED" | "RETURNED"; extendedCount: number; overdueDays: number; fineAmount: number; overdueDaysLive: number; fineAmountLive: number; book: Book; };
