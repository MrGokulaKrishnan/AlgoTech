# AlgoVisual

AlgoVisual is an interactive data structures and algorithms learning platform for beginners. Each lesson connects a pure TypeScript step generator to an animated visualizer, plain-language explanation, synchronized Java code, and complexity guidance.

## Features

- Interactive array visualizers for Linear Search, Binary Search, Bubble Sort, Selection Sort, and Insertion Sort
- Play, pause, previous, next, reset, and adjustable playback speed
- Custom input validation and beginner-friendly step explanations
- Responsive dark learning interface, roadmap, catalog, and algorithm detail pages
- Spring Boot + MySQL REST API with Flyway migrations
- JWT registration/login, BCrypt password hashing, role-based authorization, and CORS protection
- Saved algorithm progress for authenticated learners
- Topic quizzes with immediate feedback and persisted attempts
- Admin API and dashboard for creating topics, algorithms, and quiz questions

> Screenshot placeholder: add a capture of the interactive Binary Search lesson here.

## Architecture

```text
Pure TypeScript algorithm
        ↓
AlgorithmStep[]
        ↓
Reusable playback controller
        ↓
Visualizer + code + explanation + complexity

React client ──Bearer JWT──> Spring Security filter chain ──> Services ──> JPA repositories ──> MySQL
```

Algorithm modules do not depend on React. New lessons can reuse the same playback controller and visualizer state model.

## Tech stack

Frontend:

- React, TypeScript, Vite, Tailwind CSS
- React Router, Framer Motion, Lucide React
- Vitest

Backend:

- Java 21, Spring Boot 3.5, Spring Web, Spring Data JPA, Spring Security
- MySQL, Flyway, Maven, JJWT

## Project structure

```text
algovisual/
├── frontend/
│   ├── src/
│   │   ├── algorithms/      # Pure visualizer step generators
│   │   ├── components/      # Controls and learning panels
│   │   ├── context/         # Authentication state
│   │   ├── pages/           # Learner, quiz, dashboard, and admin pages
│   │   └── services/        # API client modules
│   └── .env.example
├── backend/
│   ├── src/main/java/com/algovisual/
│   │   ├── controller/
│   │   ├── service/
│   │   ├── repository/
│   │   ├── entity/
│   │   ├── dto/
│   │   ├── security/
│   │   └── config/
│   ├── src/main/resources/db/migration/
│   └── .env.example
└── README.md
```

## Run the frontend

Prerequisite: Node.js 20.19+.

```powershell
cd frontend
npm install
npm run dev
```

The app opens on `http://localhost:5173`. Configure `frontend/.env` from `.env.example` if your API does not run at `http://localhost:8080/api`.

## Set up MySQL

Prerequisite: MySQL 8+.

```sql
CREATE DATABASE algovisual CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'algovisual_app'@'localhost' IDENTIFIED BY 'replace-with-a-strong-password';
GRANT ALL PRIVILEGES ON algovisual.* TO 'algovisual_app'@'localhost';
FLUSH PRIVILEGES;
```

## Run the backend

Prerequisites: Java 21 and Maven 3.6.3+.

Set the environment variables in the same terminal. Do not commit real values.

```powershell
$env:DB_URL='jdbc:mysql://localhost:3306/algovisual?useSSL=false&serverTimezone=UTC'
$env:DB_USERNAME='algovisual_app'
$env:DB_PASSWORD='replace-with-a-strong-password'
$env:JWT_SECRET='replace-with-a-unique-base64-secret-of-at-least-32-bytes'
$env:CORS_ALLOWED_ORIGIN='http://localhost:5173'

cd backend
mvn spring-boot:run
```

Generate a safe Base64 JWT secret, for example:

```powershell
$bytes = New-Object byte[] 64
[Security.Cryptography.RandomNumberGenerator]::Fill($bytes)
[Convert]::ToBase64String($bytes)
```

Flyway creates the schema automatically, then the application adds starter topics, algorithms, and a searching quiz question. To grant the first administrator role after registering normally:

```sql
UPDATE users SET role = 'ADMIN' WHERE email = 'your-admin-email@example.com';
```

## Run MySQL and the API with Docker

Prerequisite: Docker Desktop. Copy `.env.docker.example` to `.env`, replace every placeholder secret, then run:

```powershell
docker compose up --build
```

The API is exposed at `http://localhost:8080`; run the frontend separately with `npm run dev`.

## API overview

| Endpoint | Access | Purpose |
| --- | --- | --- |
| `POST /api/auth/register` | Public | Create an account and receive a JWT |
| `POST /api/auth/login` | Public | Sign in and receive a JWT |
| `GET /api/users/me` | Authenticated | Retrieve current user data |
| `GET /api/topics`, `GET /api/algorithms` | Public | Read learning content |
| `GET /api/quizzes/{topicId}` | Public | Get questions without answers |
| `POST /api/quizzes/{questionId}/submit` | Authenticated | Record an answer and receive feedback |
| `GET/POST/PUT /api/progress` | Authenticated | Read and save lesson progress |
| `/api/admin/**` | `ADMIN` only | Manage topics, algorithms, quizzes, and statistics |

Pass authenticated requests with `Authorization: Bearer <access-token>`.

## Verification

Frontend:

```powershell
cd frontend
npm run test
npm run build
```

Backend:

```powershell
cd backend
mvn test
mvn spring-boot:run
```

## Security notes

- Passwords are stored only as BCrypt hashes.
- JWT secrets and database credentials come from environment variables.
- API entities are mapped to DTOs before being returned to clients.
- The API is stateless; protected endpoints require a valid Bearer token.
- CORS is restricted to the configured frontend origin.

## Next enhancements

- Refresh-token rotation with `HttpOnly`, `Secure` cookies
- More array, linked-list, stack, queue, tree, and graph visualizers
- Quiz analytics and learner streak calculations
- Containerized MySQL and deployment configuration
