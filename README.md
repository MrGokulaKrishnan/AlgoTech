AlgoVisual

Interactive Data Structures and Algorithms Learning Platform

AlgoVisual is a full-stack web application for learning Data Structures and Algorithms through interactive, step-by-step visualizations.

The platform combines a React + TypeScript frontend, Spring Boot REST API, JWT-based authentication, and MongoDB Atlas to provide algorithm visualizations, learning content, quizzes, and persistent user progress.

---

Project Overview

AlgoVisual is designed around an interactive learning workflow rather than static algorithm documentation.

Users can:

- Explore DSA topics and algorithms
- Execute algorithms step by step
- Control visualization playback
- Inspect algorithm state changes
- Read algorithm explanations
- Test their understanding through quizzes
- Track learning progress

The backend provides authentication, content management, quiz APIs, and progress persistence through a RESTful architecture.

---

Technology Stack

Category| Technologies
Frontend| React 18, TypeScript, Vite
UI| Tailwind CSS, Framer Motion, Lucide
Backend| Java 17, Spring Boot 3.5
Security| Spring Security, JWT
API| RESTful APIs
Database| MongoDB Atlas
Data Access| Spring Data MongoDB
Containerization| Docker
Frontend Deployment| Vercel
Backend Deployment| Render

---

System Architecture

                         ┌─────────────────────┐
                         │        Client       │
                         │      Web Browser    │
                         └──────────┬──────────┘
                                    │
                                    │ HTTPS
                                    ▼
                         ┌─────────────────────┐
                         │      Frontend       │
                         │                     │
                         │ React 18            │
                         │ TypeScript          │
                         │ Vite                │
                         │ Tailwind CSS        │
                         │ Visualization Engine│
                         └──────────┬──────────┘
                                    │
                                    │ REST / JSON
                                    ▼
                         ┌─────────────────────┐
                         │       Backend       │
                         │                     │
                         │ Spring Boot 3.5     │
                         │ Java 17             │
                         │ Spring Security     │
                         │ JWT Authentication  │
                         │ REST Controllers    │
                         │ Service Layer       │
                         └──────────┬──────────┘
                                    │
                                    │ MongoDB Driver
                                    ▼
                         ┌─────────────────────┐
                         │     MongoDB Atlas   │
                         │                     │
                         │ Users               │
                         │ Topics              │
                         │ Algorithms          │
                         │ Quizzes             │
                         │ User Progress       │
                         └─────────────────────┘

---

Core Features

Algorithm Visualization

The visualization engine executes algorithms as a sequence of discrete states.

Supported controls include:

- Play / Pause
- Step Forward
- Step Backward
- Reset
- Animation Speed Control
- Step-by-Step Explanations
- Keyboard Navigation

Keyboard Controls

Shortcut| Action
"Space"| Play / Pause
"←"| Previous Step
"→"| Next Step
"R"| Reset

Authentication

- User registration
- User login
- JWT token-based authentication
- Spring Security filter chain
- Protected API endpoints
- Persistent user sessions

Learning Content

- DSA topics
- Algorithm descriptions
- Algorithm source code
- Topic-based organization
- Learning roadmaps

Quiz System

- Topic-based questions
- Answer submission
- Instant feedback
- Score calculation
- Explanation for answers

Progress Tracking

Authenticated users can persist their learning progress through the backend API.

Progress data is stored in MongoDB Atlas and associated with the authenticated user.

Administration

The application includes an administrative interface for managing:

- Algorithms
- Quiz questions
- Platform content
- Platform statistics

---

Visualization Engine

The frontend uses a state-driven visualization model.

Algorithm
    │
    ▼
Generate Execution States
    │
    ▼
State Sequence
    │
    ├── State 0
    ├── State 1
    ├── State 2
    ├── State 3
    └── ...
          │
          ▼
   Visualization Engine
          │
          ▼
      UI Rendering

This approach allows the user to move through an algorithm execution history instead of relying only on continuous animation.

It also enables:

- Forward and backward navigation
- Deterministic visualization states
- Reset functionality
- Playback control
- Step-specific explanations

---

API Architecture

The backend follows a layered Spring Boot architecture.

HTTP Request
     │
     ▼
Controller
     │
     ▼
Service
     │
     ▼
Repository
     │
     ▼
MongoDB Atlas

Authentication API

Method| Endpoint| Purpose
"POST"| "/api/auth/register"| Register user
"POST"| "/api/auth/login"| Authenticate user

Algorithm API

Method| Endpoint| Purpose
"GET"| "/api/topics"| Retrieve DSA topics
"GET"| "/api/algorithms"| Retrieve algorithms
"GET"| "/api/algorithms/{id}"| Retrieve algorithm details

Quiz API

Method| Endpoint| Purpose
"GET"| "/api/quizzes?topicId={id}"| Retrieve topic questions
"POST"| "/api/quizzes/{questionId}/submit"| Submit answer

Progress API

Method| Endpoint| Purpose
"GET"| "/api/progress"| Retrieve user progress
"POST"| "/api/progress"| Save user progress

---

Repository Structure

AlgoVisual/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── entities/
│   │   ├── repositories/
│   │   └── security/
│   │
│   ├── pom.xml
│   └── Dockerfile
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── visualizers/
│   │   └── data/
│   │
│   ├── vercel.json
│   └── tailwind.config.js
│
├── Dockerfile
├── docker-compose.yml
├── render.yaml
└── README.md

---

Local Development

Prerequisites

- Node.js 20+
- JDK 17+
- Maven 3.9+
- MongoDB or MongoDB Atlas

Backend

cd backend
mvn spring-boot:run

Backend:

http://localhost:8080

Frontend

cd frontend
npm install
npm run dev

Frontend:

http://localhost:5173

---

Production Deployment

                    Production Environment

                         Internet
                            │
                            ▼
                  ┌─────────────────┐
                  │     Vercel      │
                  │    Frontend     │
                  └────────┬────────┘
                           │
                           │ HTTPS
                           ▼
                  ┌─────────────────┐
                  │     Render      │
                  │     Backend     │
                  │  Spring Boot    │
                  └────────┬────────┘
                           │
                           │ TLS
                           ▼
                  ┌─────────────────┐
                  │ MongoDB Atlas   │
                  │    Database     │
                  └─────────────────┘

Production URLs

Frontend

https://algotech-seven.vercel.app/

Backend API

https://algovisual-hsrl.onrender.com

Database

MongoDB Atlas

---

Learning Flow

Topic
  │
  ▼
Algorithm
  │
  ▼
Explanation
  │
  ▼
Interactive Visualization
  │
  ▼
Quiz
  │
  ▼
Progress

---

Engineering Highlights

- Full-stack application using React and Spring Boot
- RESTful backend architecture
- JWT-based authentication and authorization
- MongoDB persistence using Spring Data MongoDB
- Docker-based backend deployment
- Client-side algorithm visualization engine
- Deterministic step-by-step algorithm execution
- Responsive frontend architecture
- Separate production frontend and backend deployments
- Persistent learning progress for authenticated users

---

Future Improvements

Potential extensions include:

- Additional graph and tree visualizations
- Graph traversal algorithms
- Dynamic programming visualizations
- Code execution support
- Algorithm complexity comparison
- User-specific learning analytics
- Expanded quiz and assessment system
- Additional administrator capabilities

---

License

This project is licensed under the MIT License.

See "LICENSE" (LICENSE) for details.

---

Author

Gokulakrishnan K

Computer Science Engineering
Java Backend / Full-Stack Developer

GitHub: "@MrGokulaKrishnan" (https://github.com/MrGokulaKrishnan)