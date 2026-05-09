# Library Management System (User View)

Modern full-stack LMS user-view with Next.js + Express + Prisma (SQLite dev, PostgreSQL-ready).

## Quick Start
1. Backend
```bash
cd backend
npm install
copy .env.example .env
npx prisma generate
npx prisma migrate dev --name init
npm run seed
npm run dev
```
2. Frontend
```bash
cd frontend
npm install
copy .env.local.example .env.local
npm run dev
```

## Core User Features
- Browse books with search + genre filter
- Book details + borrow button
- Register/login with JWT + bcrypt
- Member ID generation and validation for extension
- Borrow/extend/return with overdue fine (1000 MMK/day)
- User dashboard for borrowed books

## Future Admin Support
- `User.role` supports USER/ADMIN
- Modular route/controller structure for `/api/admin/*`
