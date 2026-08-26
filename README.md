AlgoVisual — Interactive Data Structures & Algorithms Platform

«An interactive platform for learning Data Structures and Algorithms through step-by-step visualizations, algorithm explanations, quizzes, and progress tracking.»

""Frontend - Vercel" (https://img.shields.io/badge/Frontend-Vite%20%7C%20React%2018%20%7C%20TypeScript-10B981?style=for-the-badge&logo=react)" (https://algotech-seven.vercel.app/)
""Backend - Render" (https://img.shields.io/badge/Backend-Spring%20Boot%203.5%20%7C%20Java%2017-00E676?style=for-the-badge&logo=springboot)" (https://algovisual-hsrl.onrender.com)
""Database - MongoDB Atlas" (https://img.shields.io/badge/Database-MongoDB%20Atlas-47A248?style=for-the-badge&logo=mongodb)" (https://www.mongodb.com/cloud/atlas)
""License - MIT" (https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)" (LICENSE)

---

Live Deployments

- Frontend: https://algotech-seven.vercel.app/
- Backend API: https://algovisual-hsrl.onrender.com
- Database: MongoDB Atlas M0 Cluster

---

Overview

AlgoVisual is a full-stack educational platform designed to make Data Structures and Algorithms easier to understand through interactive visualizations.

The platform combines a React-based visualization engine with a Spring Boot REST API and MongoDB Atlas for authentication, content management, quizzes, and user progress persistence.

The application currently focuses on interactive Searching and Sorting visualizations with step-by-step execution, playback controls, keyboard shortcuts, algorithm explanations, and learning progress tracking.

---

Architecture

                         PRODUCTION ARCHITECTURE

                             Users
                               |
                               | HTTPS
                               v
                  +---------------------------+
                  |      Vercel Frontend      |
                  |---------------------------|
                  | React 18                  |
                  | Vite + TypeScript         |
                  | Tailwind CSS               |
                  | Client-side DSA Engine     |
                  | Responsive UI              |
                  +-------------+-------------+
                                |
                                | REST API
                                v
                  +---------------------------+
                  |       Render Backend      |
                  |---------------------------|
                  | Spring Boot 3.5            |
                  | Java 17                    |
                  | JWT Authentication         |
                  | Spring Security            |
                  | REST Controllers           |
                  | Service Layer              |
                  +-------------+-------------+
                                |
                                | MongoDB Driver
                                | TLS Connection
                                v
                  +---------------------------+
                  |      MongoDB Atlas        |
                  |---------------------------|
                  | Users                      |
                  | Topics                     |
                  | Algorithms                 |
                  | Quizzes                    |
                  | User Progress              |
                  +---------------------------+

---

Key Features

Interactive Algorithm Visualizations

- Step-by-step visualization of Searching and Sorting algorithms
- Play and pause animation controls
- Adjustable animation speed
- Step forward and backward controls
- Algorithm state management
- Detailed step-by-step explanations
- Reset functionality

Keyboard Controls

Key| Action
"Space"| Play / Pause
"ArrowLeft"| Previous Step
"ArrowRight"| Next Step
"R"| Reset

Authentication and Progress Tracking

- User registration and login
- JWT-based authentication
- Spring Security integration
- Secure API endpoints
- Persistent user progress
- MongoDB-backed learning history

Quiz System

- Topic-based quizzes
- Instant answer validation
- Score calculation
- Explanation cards
- Learning progress integration

Admin Dashboard

- Platform statistics
- Algorithm management
- Quiz question management
- Content administration

Design System

- AMOLED-inspired pure black interface
- Emerald accent color palette
- High-contrast UI
- Responsive layouts
- Tailwind CSS design tokens
- Framer Motion animations
- Lucide icon system

---

Technology Stack

Layer| Technology| Purpose
Frontend| React 18| User interface
Build Tool| Vite| Development and production builds
Language| TypeScript| Type-safe frontend development
Styling| Tailwind CSS| UI styling and design system
Animation| Framer Motion| Interface and visualization animations
Icons| Lucide| UI iconography
Backend| Spring Boot 3.5| REST API and application services
Language| Java 17| Backend development
Security| Spring Security + JWT| Authentication and authorization
Database| MongoDB Atlas| Cloud document database
Data Access| Spring Data MongoDB| Database integration
Containerization| Docker| Backend containerization
Frontend Hosting| Vercel| Production frontend deployment
Backend Hosting| Render| Production API deployment

---

Repository Structure

AlgoVisual/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── entities/
│   │   ├── repositories/
│   │   └── security/
│   ├── pom.xml
│   └── Dockerfile
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── visualizers/
│   │   └── data/
│   ├── vercel.json
│   └── tailwind.config.js
│
├── Dockerfile
├── render.yaml
├── docker-compose.yml
└── README.md

---

Local Development

Prerequisites

Ensure the following are installed:

- Node.js 20+ or 22+
- JDK 17+
- Maven 3.9+
- MongoDB or a MongoDB Atlas connection

Backend

cd backend
mvn spring-boot:run

The backend API will be available at:

http://localhost:8080

Frontend

cd frontend
npm install
npm run dev

The frontend development server will be available at:

http://localhost:5173

---

API Reference

Authentication

Method| Endpoint| Description
"POST"| "/api/auth/register"| Register a new user
"POST"| "/api/auth/login"| Authenticate and receive a JWT

Topics and Algorithms

Method| Endpoint| Description
"GET"| "/api/topics"| Retrieve available DSA topics
"GET"| "/api/algorithms"| Retrieve algorithms
"GET"| "/api/algorithms/{id}"| Retrieve algorithm details

Quizzes and Progress

Method| Endpoint| Description
"GET"| "/api/quizzes?topicId={id}"| Retrieve topic quiz questions
"POST"| "/api/quizzes/{questionId}/submit"| Submit a quiz answer
"GET"| "/api/progress"| Retrieve authenticated user progress
"POST"| "/api/progress"| Save learning progress

---

Deployment

AlgoVisual uses a separated frontend and backend deployment architecture.

Frontend
React + Vite
      |
      v
   Vercel
      |
      | HTTPS REST API
      v
Backend
Spring Boot + Java
      |
      v
   Render
      |
      v
MongoDB Atlas

Production Services

- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas
- Containerization: Docker

---

Learning Workflow

The platform follows a structured learning workflow:

Select Topic
     |
     v
Explore Algorithm
     |
     v
Read Explanation
     |
     v
Run Visualization
     |
     v
Control Execution
     |
     v
Complete Quiz
     |
     v
Track Progress

---

Project Goals

AlgoVisual is designed to:

- Make algorithm execution easier to understand visually
- Provide an interactive alternative to static algorithm explanations
- Help beginners understand algorithm state changes step by step
- Combine visualization, explanations, quizzes, and progress tracking
- Provide a practical full-stack implementation using modern web technologies

---

License

This project is open-source and available under the "MIT License" (LICENSE).