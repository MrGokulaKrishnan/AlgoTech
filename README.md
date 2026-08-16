# 🚀 AlgoVisual — Interactive Data Structures & Algorithms Platform

> **Visualizing Data Structures and Algorithms with Pure AMOLED Dark Emerald Aesthetics.**

[![Frontend - Vercel](https://img.shields.io/badge/Frontend-Vite%20%7C%20React%2018%20%7C%20TypeScript-10B981?style=for-the-badge&logo=react)](https://algotech-seven.vercel.app/)
[![Backend - Render](https://img.shields.io/badge/Backend-Spring%20Boot%203.5%20%7C%20Java%2017-00E676?style=for-the-badge&logo=springboot)](https://algovisual-hsrl.onrender.com)
[![Database - MongoDB Atlas](https://img.shields.io/badge/Database-MongoDB%20Atlas-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/cloud/atlas)
[![License - MIT](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

---

## 🌐 Live Production Deployments ($0/mo Stack)

- **Frontend App (Vercel)**: [https://algotech-seven.vercel.app/](https://algotech-seven.vercel.app/)
- **Backend API (Render)**: [https://algovisual-hsrl.onrender.com](https://algovisual-hsrl.onrender.com)
- **Cloud Database (MongoDB Atlas)**: Replica Set Cluster (`algo.bumnypm.mongodb.net`)

---

## 🏗️ Architecture Overview

```
                      PROD DEPLOYMENT ARCHITECTURE
                      
  USERS (Browser)
        │
        ▼
┌─────────────────────────┐
│     Vercel Frontend     │  • AMOLED Pure Black (#000000) & Emerald Theme
│ https://algotech-seven  │  • Step-by-Step DSA State Engine (Client-side)
│       .vercel.app       │  • Responsive Layout & Custom Nanobanana SVG Logo
└────────────┬────────────┘
             │
             │ HTTPS REST Requests
             ▼
┌─────────────────────────┐
│      Render Backend     │  • Spring Boot 3.5 Docker Web Service (Java 17)
│https://algovisual-hsrl  │  • JWT Authentication & Security Filter Chain
│      .onrender.com      │  • Multi-Origin CORS & Non-Blocking Auto-Seeder
└────────────┬────────────┘
             │
             │ MongoDB Driver (TLS)
             ▼
┌─────────────────────────┐
│   MongoDB Atlas Cloud   │  • Free M0 Replica Set Cluster
│algo.bumnypm.mongodb.net │  • Persistent Collections: Users, Topics, Algorithms,
└─────────────────────────┘    Quizzes, and User Progress Tracking
```

---

## ✨ Key Features

- ⚡ **Interactive Animation Engine**: Step-by-step state machine visualizers for Searching & Sorting algorithms with speed control, play/pause, step backward/forward, and step-by-step explanations.
- ⌨️ **Keyboard Shortcuts**: Full keyboard control on visualizer workspace:
  - `Space`: Play / Pause animation
  - `ArrowLeft` / `ArrowRight`: Step backward / Step forward
  - `R`: Reset animation
- 🎨 **Pure AMOLED Dark Emerald Design System**: High-contrast `#000000` AMOLED theme with dark emerald accents (`#10B981`, `#00E676`), sharp modern rectangular badges, and clean dot-free buttons.
- 🔐 **JWT Authentication & Progress Persistence**: Secure registration, login, and user progress tracking backed by MongoDB Atlas.
- 🎯 **Knowledge Check Quiz System**: Topic quizzes with instant feedback, score calculation, and explanation cards.
- 🛡️ **Admin Dashboard**: Management panel for viewing platform stats and adding algorithms and quiz questions.

---

## 🛠️ Technology Stack

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | React 18, Vite, TypeScript, Tailwind CSS | Single Page App with Framer Motion animations & Lucide icons |
| **Backend** | Spring Boot 3.5, Java 17 | RESTful API server with JWT authentication |
| **Database** | MongoDB Atlas, Spring Data MongoDB | Cloud document database with 100% free M0 cluster |
| **Containerization** | Docker, Multi-Stage Builds | Lightweight Temurin 17 JRE production container |
| **Hosting** | Vercel (Frontend), Render (Backend) | Free tier deployment configuration |

---

## 📁 Repository Structure

```
AlgoVisual/
├── backend/                 # Spring Boot 3.5 REST API (Java 17)
│   ├── src/                 # Controllers, Services, Entities, Repositories, Security
│   ├── pom.xml              # Maven project file
│   └── Dockerfile           # Backend container build definition
├── frontend/                # React 18 + Vite Single Page Application
│   ├── src/                 # Visualizer engine, pages, components, data
│   ├── vercel.json          # SPA route rewrites for Vercel
│   └── tailwind.config.js   # Custom AMOLED dark emerald theme tokens
├── Dockerfile               # Root Docker build for Render deployment
├── render.yaml              # Render Blueprint deployment definition
├── docker-compose.yml       # Local multi-container development environment
└── README.md                # Project documentation
```

---

## 💻 Local Quick Start

### 1. Prerequisites
- **Node.js** 20+ or 22+
- **JDK** 17+
- **Maven** 3.9+
- **MongoDB** (Local instance or MongoDB Atlas Connection String)

### 2. Running the Backend Locally
```bash
cd backend
mvn spring-boot:run
```
*The Spring Boot API will start on `http://localhost:8080`.*

### 3. Running the Frontend Locally
```bash
cd frontend
npm install
npm run dev
```
*Open `http://localhost:5173` in your browser.*

---

## 📡 API Endpoint Reference

### Auth Endpoints
- `POST /api/auth/register` — Create a new user account
- `POST /api/auth/login` — Authenticate and receive JWT token

### Content Endpoints
- `GET /api/topics` — List all DSA topics and roadmaps
- `GET /api/algorithms` — List all algorithms or filter by topic
- `GET /api/algorithms/{id}` — Get algorithm detail and source code

### Quiz & Progress Endpoints
- `GET /api/quizzes?topicId={id}` — Fetch quiz questions for a topic
- `POST /api/quizzes/{questionId}/submit` — Submit quiz answer
- `GET /api/progress` — Fetch authenticated user progress
- `POST /api/progress` — Save algorithm learning progress

---

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).
