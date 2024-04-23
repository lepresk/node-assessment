# Node.js Project with Express.js and SQLite3

This project is a Node.js application using Express.js as a web framework and SQLite3 as a database. The application provides endpoints to manage categories, posts, and tasks.

## Installation

1. Clone this repository:

   ```
   git clone https://github.com/lepresk/node-assessment
   ```

2. Install dependencies:

   ```
   pnpm install
   ```

3. Run the application:

   ```
   pnpm start
   ```

## Available Endpoints

### Categories

- `GET /categories` : Get all categories.

### Posts

- `GET /posts` : Get all posts.
- `GET /posts/:id` : Get a post by ID.
- `POST /posts` : Create a new post.
- `PUT /posts/:id` : Update an existing post.
- `DELETE /posts/:id` : Delete an existing post.

### Tasks

- `GET /tasks` : Get all tasks.
- `GET /tasks/:id` : Get a task by ID.
- `POST /tasks` : Create a new task.
- `PUT /tasks/:id` : Update an existing task.
- `DELETE /tasks/:id` : Delete an existing task.

## Project Structure

- `db.mjs` : Database connection management.
- `post_repository.mjs` : Functions to interact with post and task data.
- `router.mjs` : API route definitions.
- `index.mjs` : Entry point of the application.

## Development

- The database is initialized with tables for categories, posts, and tasks on the first startup of the application.
- API routes are defined in `router.mjs`.
- Functions to interact with the database are located in `post_repository.mjs`.