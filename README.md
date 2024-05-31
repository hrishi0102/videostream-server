# Blogsphere

## Introduction

This project is a modern blogging platform designed to provide a seamless and efficient writing experience. It leverages a robust tech stack to ensure performance, scalability, and ease of use.

## Features

- **User Authentication**: Secure login and registration using JWT.
- **Post Management**: Create, edit, delete, and view blog posts.
- **Validation**: Input validation using Zod.
- **Type Safety**: Full type inference for frontend types using TypeScript.
- **Database Management**: Efficient database operations with Prisma ORM and PostgreSQL.
- **Scalability**: Backend services powered by Cloudflare Workers and Hono for scalable and fast performance.

## Technologies Used

- **Frontend**: React
- **Backend**: Hono with Cloudflare Workers
- **Validation Library**: Zod
- **Programming Language**: TypeScript
- **ORM**: Prisma with connection pooling
- **Database**: PostgreSQL
- **Authentication**: JWT (JSON Web Tokens)

### You can find the published NPM package for zod validations (typescript) here:
(https://www.npmjs.com/package/@hrishi0102/blogging-site)
```bash
   npm i @hrishi0102/blogging-site
   ```

## Installation

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL
- Cloudflare account

### Backend Setup

### Backend Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/blogging-platform.git
   cd blogging-platform
   ```

2. **Get Neon DB and Prisma Accelerate URL for connection pooling**:

   - Sign up for a [Neon](https://neon.tech/) account and create a new PostgreSQL database.
   - Obtain the connection URL.

3. **Add Neon DB URL in `.env`**:
   ```env
   DATABASE_URL=postgresql://user:password@localhost:5432/mydb
   JWT_SECRET=your_jwt_secret
   ```
4. **Add Prisma Accelerate API in `wrangler.toml` in `vars`**:
   ```toml
   [vars]
   PRISMA_ACCELERATE_URL = "your_prisma_accelerate_api_url"
   ```
5. **Run Prisma migrations**:
   ```bash
   npx prisma migrate dev --name init_schema
   ```
6. **Generate Prisma client**:
   ```bash
   npx prisma generate --no-engine
   ```
7. **Log in to Cloudflare**:
   ```bash
   npx wrangler login
   ```
8. **Deploy to Cloudflare Workers**:
   ```bash
   npm run deploy
   ```
9. **Update environment variables from Cloudflare dashboard**:
   - Go to the Cloudflare dashboard and navigate to your Worker.
   - Update the environment variables (`DATABASE_URL`, `JWT_SECRET`, etc.) as needed.

### Frontend Setup

1. **Navigate to the frontend directory**:

   ```bash
   cd frontend
   ```

2. **Install frontend dependencies**:

   ```bash
   npm install
   ```

3. **Run the frontend**:
   ```bash
   npm run dev
   ```

## Usage

- **Creating a Post**: Navigate to the "Create Post" page, fill in the details, and click "Submit".
- **Editing a Post**: Click on the "Edit" button next to the post you want to edit, make your changes, and click "Update".
- **Deleting a Post**: Click on the "Delete" button next to the post you want to remove.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
