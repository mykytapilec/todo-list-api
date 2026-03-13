# Todo List API

Simple Todo List API built with Node.js, TypeScript, Express, and Prisma.

Project task from the roadmap: [https://roadmap.sh/projects/todo-list-api]

## Features

- User authentication with JWT
- CRUD operations for todos
- Filtering by completion status
- Sorting by `createdAt` or `title`
- Pagination support

## Tech Stack

- Node.js
- TypeScript
- Express
- Prisma (PostgreSQL)
- JWT for authentication
- Jest + Supertest for testing

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/mykytapilec/todo-list-api.git
cd todo-list-api

### 2. Install dependencies
npm install

### 3. Create .env file

Create a .env file in the root directory with the following variables:

DATABASE_URL="postgresql://user:password@localhost:5432/todo_db"
JWT_SECRET="your_jwt_secret"
PORT=3000

### 4. Run migrations (Prisma)
npx prisma migrate dev --name init

### 5. Run the application

Development mode:
npm run dev

Build and run:
npm run build
npm start

### 6. Running Tests
npm run test

Watch mode:
npm run test:watch

## API Endpoints

- Auth

POST /api/login
Request body:

{
  "email": "user@example.com",
  "password": "password123"
}

Response:

{
  "token": "<JWT_TOKEN>"
}

- Todos

All endpoints below require Authorization: Bearer <JWT_TOKEN> header.

POST /api/todos – create a todo
Request body:

{
  "title": "Buy milk",
  "description": "2 liters of milk"
}

GET /api/todos – list todos
Query parameters (optional):

page (default 1)

limit (default 10)

completed (true/false)

sortBy (createdAt | title)

order (asc | desc)

title (filter by title substring)

PATCH /api/todos/:id – update a todo
Request body:

{
  "title": "Updated title",
  "description": "Updated description",
  "completed": true
}

DELETE /api/todos/:id – delete a todo

License

MIT
