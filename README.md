# MD Creative – Smart Event & Booking Management System

A full-stack web application for managing children’s event bookings, mascot services, decorations, activities, entertainment packages, and admin-side business operations.

---

## Table of Contents

- [Overview](#overview)
- [Project Goal](#project-goal)
- [Current Project State](#current-project-state)
- [Main Users](#main-users)
- [Core Functionalities](#core-functionalities)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Backend Architecture](#backend-architecture)
- [Frontend Structure](#frontend-structure)
- [Main Modules](#main-modules)
- [Documentation](#documentation)
- [How to Run the Project](#how-to-run-the-project)
- [Environment Variables](#environment-variables)
- [Current Notes and Future Direction](#current-notes-and-future-direction)
- [Author](#author)

---

## Overview

**MD Creative** is a smart event and booking management system built for a real entertainment business domain.

The project is designed to support both:

- the **public side** of the platform, where customers can explore services and booking options
- the **admin side**, where bookings, services, content, and operational data can be managed in a more organized way

This project goes beyond a basic CRUD exercise and is structured as a full-stack academic software engineering system with a realistic business use case.

---

## Project Goal

The main goal of the platform is to make event organization:

| Goal | Meaning |
|------|---------|
| Easier | Customers can view multiple services in one place |
| Faster | Booking-related information is organized more efficiently |
| More flexible | Events can be customized through packages, mascots, decorations, and activities |
| More professional | The business side can manage services and bookings in a structured digital system |

Instead of handling every event service separately, the system aims to support a complete event-planning flow in one platform.

---

## Current Project State

The project has evolved significantly from its earlier version and now has a clearer and stronger structure.

### Current state summary

| Area | Current State |
|------|---------------|
| Backend | Organized, modular, and built with layered structure |
| Database | Main project logic is built around PostgreSQL-based modules |
| Frontend | Functional across the main pages and flows |
| UI/UX | Improved and visually cleaner than before |
| Project Structure | Updated and more professional than the earlier version |
| Documentation | Available in `docs/`, with README now aligned more closely to the real structure |

### Important note

The frontend is no longer just a placeholder or an early prototype. It has been worked on page by page and now functions across the main parts of the project. The current version already works well and presents the system more clearly. In the future, the interface can still be made even more polished and visually advanced, but the present state is already usable, functional, and much stronger than before.

---

## Main Users

| User Type | Description |
|----------|-------------|
| Customers | Browse event services, packages, mascots, decorations, and booking-related options |
| Admin / Business Side | Manage bookings, service content, and administrative workflows |
| Future Staff Flow | The structure also supports future expansion for coordination and staff-related operations |

---

## Core Functionalities

| Module Area | Functionality |
|-------------|---------------|
| Packages | View and manage entertainment and event packages |
| Mascots | Explore mascot characters and service options |
| Decorations | View and manage decoration-related offers |
| Activities | Support additional entertainment activities |
| Bookings | Handle reservation requests and booking workflow |
| Gallery | Present visual and event-related content |
| Admin Management | Manage operational data from the admin side |
| Authentication | Support protected admin access |

---

## Tech Stack

### Backend

| Technology | Purpose |
|-----------|---------|
| Node.js | Backend runtime |
| Express.js | Server and API structure |
| PostgreSQL | Main database |
| `pg` | PostgreSQL client |
| JWT | Authentication support |
| bcrypt | Password hashing |
| dotenv | Environment variable management |
| cors | Cross-origin request handling |
| multer | File and image upload support where needed |

### Frontend

| Technology | Purpose |
|-----------|---------|
| React | User interface |
| TypeScript | Strong typing in frontend development |
| Vite | Frontend build tool and dev server |
| React Router DOM | Routing and page navigation |
| CSS | Styling |

### Development Tools

| Tool | Usage |
|------|-------|
| Git & GitHub | Version control |
| VS Code | Development environment |
| Postman | API testing |

---

## Project Structure

```bash
MD-CREATIVE-EVENT-BOOKING-SYSTEM/
├── docs/
│   ├── screenshots/
│   ├── architecture.md
│   ├── class-diagram.md
│   ├── implementation.md
│   ├── project-audit.md
│   └── sprint-plan.md
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── data/
│   │   ├── hooks/
│   │   ├── layouts/
│   │   ├── mocks/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── types/
│   │   ├── utils/
│   │   ├── App.tsx
│   │   ├── index.css
│   │   └── main.tsx
│   ├── .env
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
│
├── src/
│   ├── data/
│   │   ├── config/
│   │   ├── repositories/
│   │   └── storage/
│   ├── models/
│   ├── services/
│   ├── ui/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   └── routes/
│   ├── utils/
│   ├── app.js
│   └── server.js
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

---

## Backend Architecture

The backend follows a layered structure to improve maintainability, readability, and separation of concerns.

### Request Flow

```text
Request → Route → Controller → Service → Repository → Database
```

### Layer Explanation

| Layer | Responsibility |
|------|----------------|
| Routes | Define endpoints and connect middleware |
| Controllers | Receive requests and return responses |
| Services | Contain business logic and application rules |
| Repositories | Handle persistence and data access |
| Database / Storage | Store the application data |

This structure makes the project easier to expand, maintain, and improve.

---

## Frontend Structure

The frontend has been reorganized and improved compared to the earlier project state.

### Frontend Includes

| Folder | Purpose |
|--------|---------|
| `assets` | Static files such as images and design resources |
| `components` | Reusable UI components |
| `context` | Shared application state and React context |
| `data` | Static or prepared frontend data sources |
| `hooks` | Custom React hooks |
| `layouts` | Public and admin layout structures |
| `mocks` | Mocked data used during development where needed |
| `pages` | Main pages of the application |
| `routes` | Frontend route organization |
| `services` | API communication logic |
| `types` | TypeScript type definitions |
| `utils` | Helper utilities |

### Frontend Status

The frontend currently works across the main pages of the project and is now in a much better state structurally and visually. The pages are functional, organized, and present the system more clearly. Future work may focus on making the design even more refined and visually stronger, but the current version is already a major improvement and is usable in its present state.

---

## Main Modules

| Module | Description |
|--------|-------------|
| Packages | Entertainment packages for events |
| Mascots | Mascot characters and related services |
| Decorations | Decoration service options |
| Activities | Additional children’s entertainment activities |
| Bookings | Reservation and booking flow |
| Gallery | Presentation of visual and event content |
| Authentication | Admin access and protected flows |
| Admin | Internal management of project data |

---

## Documentation

Project documentation is available in the `docs/` folder.

| File | Purpose |
|------|---------|
| `architecture.md` | Explains the architecture of the system |
| `class-diagram.md` | Shows the class-level design and relationships |
| `implementation.md` | Describes implementation-related work |
| `project-audit.md` | Contains project audit analysis |
| `sprint-plan.md` | Documents sprint planning and work progress |

---

## How to Run the Project

### 1. Clone the repository

```bash
git clone https://github.com/fh-umib/Md-creative-event-booking-system.git
cd Md-creative-event-booking-system
```

### 2. Install backend dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root folder and add your backend configuration.

### 4. Run the backend

```bash
npm run dev
```

or

```bash
npm start
```

### 5. Run the frontend

```bash
cd frontend
npm install
npm run dev
```

### Default local development ports

| Service | Default URL |
|---------|-------------|
| Backend | `http://localhost:5000` |
| Frontend | `http://localhost:5173` |

---

## Environment Variables

Example backend `.env` configuration:

```env
DATABASE_URL=your_database_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

> Make sure `.env` files are not pushed to GitHub.

---

## Current Notes and Future Direction

### Current Notes

| Area | Note |
|------|------|
| Frontend | Functional and improved across all pages |
| UI | Cleaner, stronger, and better organized than before |
| Structure | Updated and more professional |
| Documentation | Should continue to stay aligned with future code changes |

### Future Direction

In the future, the project can still be improved further in areas such as:

- more advanced UI/UX polish
- stronger validation and reliability improvements
- further consistency across all modules
- additional refinement in admin-side workflows
- even better visual presentation and interaction design

The current version is already functional and much more complete than the earlier stage, but the long-term goal is to continue improving it into an even more polished and professional system.

---

## Author

**Flutura Hyseni**  
Software Engineering Student  
University of Mitrovica "Isa Boletini"
