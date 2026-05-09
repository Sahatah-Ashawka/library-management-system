# Aurelia Library - Library Management System (User View)

A premium full-stack Library Management System focused on the **user view**.

## Features

- User registration with unique `memberId` (`LIB-YYYY-XXXXX`)
- User login/logout with JWT authentication
- Home page book listing with:
  - debounced search (title, author, description)
  - genre filter chips
  - out-of-stock badges
- Book details page with borrow action
- Borrow flow with stock checks and duplicate active-borrow prevention
- Dashboard with:
  - user profile summary (name, email, member ID)
  - active borrowed books list
  - extend one week (member ID verification)
  - return book flow with return summary modal
- Overdue fine calculation: **1000 MMK/day**

## Tech Stack

### Frontend
- Next.js 14 (App Router)
- React 18
- TypeScript

### Backend
- Node.js + Express
- Prisma ORM
- JWT + bcrypt
- express-validator

### Database
- SQLite (development)
- Prisma schema is structured for easy move to PostgreSQL later

## Project Structure

```text
library-management-system/
  backend/
    prisma/
      schema.prisma
      seed/seed.js
      migrations/
    src/
      app.js
      server.js
      config/
      controllers/
      middlewares/
      routes/
      utils/
      validation/
  frontend/
    src/
      app/
      components/
        auth/
        books/
        dashboard/
        ui/
      lib/
      types/
```

## Setup

## 1) Backend

```powershell
cd "C:\Users\M S I\Desktop\library-management-system\backend"
npm install
Copy-Item .env.example .env
npx prisma generate
npx prisma migrate dev --name init
npm run seed
npm run dev
```

Backend runs at: `http://localhost:5000`

## 2) Frontend

Open a new terminal:

```powershell
cd "C:\Users\M S I\Desktop\library-management-system\frontend"
npm install
Copy-Item .env.local.example .env.local
npm run dev
```

Frontend runs at: `http://localhost:3000`

## Environment Variables

### Backend (`backend/.env`)

```env
PORT=5000
DATABASE_URL="file:./dev.db"
JWT_SECRET="super-secret-change-me"
JWT_EXPIRES_IN="7d"
CLIENT_URL="http://localhost:3000"
```

### Frontend (`frontend/.env.local`)

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## API Endpoints

## Auth
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout` (protected)
- `GET /api/auth/me` (protected)

## Books
- `GET /api/books`
- `GET /api/books/:id`
- `GET /api/books?search=&genre=`

## Borrowing
- `POST /api/borrow/:bookId` (protected)
- `GET /api/my-borrowed-books` (protected)
- `POST /api/borrow-records/:id/extend` (protected)
- `POST /api/borrow-records/:id/return` (protected)

(Compatibility routes also exist under `/api/borrow/*`.)

## Validation and Error Handling

Implemented server-side validation + proper status codes:

- `400` invalid input/ID
- `401` unauthenticated or expired token
- `403` forbidden action (e.g. wrong member ID)
- `404` not found / record not owned by user
- `409` business-rule conflicts (duplicate active borrow, out-of-stock, etc.)
- `422` request validation errors

Frontend displays friendly messages from backend and redirects to login on protected-action auth failures.

## Business Rules Implemented

- Borrow requires login
- Borrow only when `availableCopies > 0`
- Borrow creates record with:
  - `borrowDate = now`
  - `dueDate = borrowDate + 7 days`
  - `status = BORROWED`
- Borrow decreases `availableCopies` by 1
- Duplicate active borrow by same user/book is blocked
- Extend requires:
  - ownership
  - active borrowed status
  - correct member ID
- Extend adds 7 days and increments `extendedCount`
- Return requires ownership and active status
- Return sets `returnDate`, `status = RETURNED`, increments `availableCopies`
- Overdue fine:
  - overdue days = days past due date
  - `fineAmount = overdueDays * 1000 MMK`

## Seed Data

Seed includes **12 books** with realistic descriptions across genres:

- Fiction
- Mystery
- Romance
- Science
- History
- Technology
- Biography
- Fantasy
- Education

Some books are seeded with `availableCopies = 0` for out-of-stock testing.

## Notes

- Dashboard currently shows **active borrowed books only** (`BORROWED` status).
- Returned books are removed from the active dashboard list after return.

## Future Admin View

The project is structured for extension with admin routes/pages later.
`User.role` already supports `USER` and `ADMIN`.
