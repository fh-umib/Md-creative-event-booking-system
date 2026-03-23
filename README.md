# MD Creative – Smart Event & Booking Management System

A full-stack web application for managing event bookings, mascot services, entertainment packages, and extra activities for children’s parties and celebrations.

---

## Overview

MD Creative is a smart event and booking management system created for a entertainment business.

The platform is designed to help manage:

- mascot characters
- event packages
- extra services and activities
- customer bookings
- staff coordination
- future reporting and analytics

Instead of booking every service separately, customers can explore available packages and customize their event by selecting mascots, activities, and additional extras.

---

## Main Idea

The goal of the platform is to make event organization easier, faster, and more flexible.

A customer should be able to:

- browse available packages
- choose one or more mascots
- add extra activities such as face painting
- include equipment or decorations
- create a customized booking based on their needs

This makes the system more practical for real event planning, where services are usually combined into one complete experience.

---

## Features

### For Customers

- Browse event packages and available offers
- View mascots and entertainment options
- Customize bookings with extras and activities
- Register and log in to manage bookings
- Access a personal dashboard

### For Staff and Business Management

- Manage bookings and reservation requests
- Organize services and availability
- Prepare for staff assignment and event coordination
- Support future reporting and business insights

### Planned System Features

- Authentication with role-based access
- Booking approval and status tracking
- Inventory and resource availability checks
- Staff assignment to events
- Revenue and analytics dashboard

---

## Tech Stack

### Backend

- Node.js
- Express.js
- PostgreSQL
- JWT
- bcrypt
- dotenv
- cors

### Frontend

- React
- TypeScript
- Vite
- React Router DOM
- CSS

### Tools

- Git & GitHub
- VS Code
- Postman

---

## Project Structure

```bash
Md-creative-event-booking-system/
├── docs/                        # Architecture and UML documentation
├── frontend/                    # React + Vite frontend
├── src/                         # Backend source code
│   ├── app.js                   # Express app configuration
│   ├── server.js                # Backend entry point
│   ├── models/                  # Domain entities
│   ├── services/                # Business logic layer
│   ├── data/                    # Data access layer
│   │   ├── db/                  # Database connection
│   │   ├── repositories/        # IRepository, FileRepository, entity repositories
│   │   └── storage/             # CSV storage files
│   ├── ui/                      # Presentation layer
│   │   ├── controllers/         # Request handlers
│   │   ├── routes/              # API routes
│   │   └── middleware/          # Express middleware
│   └── utils/                   # Helper utilities
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

---

## Backend Architecture

The backend follows a layered architecture to improve maintainability, readability, and separation of concerns.

### Main Layers

- **Models** – represent the core domain entities of the system
- **Services** – contain business logic and application rules
- **Data** – manage persistence through repositories, database access, and CSV/file storage
- **UI** – handle API requests through controllers, routes, and middleware

This layered structure makes the project easier to extend, test, and maintain.

---

## Repository Pattern

The project also demonstrates the **Repository Pattern**.

Implemented components include:

- `IRepository`
- `FileRepository`
- `FileBookingRepository`

This allows the system to demonstrate two persistence strategies:

- **PostgreSQL repositories** for the main backend logic
- **CSV-based file persistence** for educational demonstration of the Repository Pattern

This hybrid approach helps show how different storage strategies can coexist within the same system.

---

## Documentation

Project documentation is available in the `docs/` folder:

- `docs/architecture.md`
- `docs/class-diagram.md`

These documents explain:

- the layered architecture
- class relationships
- repository pattern usage
- architectural decisions

---

## Current Status

This project is currently in the development phase.

### Completed

- backend project structure
- frontend project structure
- layered backend architecture
- Express server setup
- authentication and booking service structure
- repository layer organization
- Repository Pattern demonstration with CSV support
- UML documentation
- architecture documentation

### In Progress

- frontend UI improvements
- backend API integration
- authentication expansion
- booking workflow improvements
- database CRUD completion
- additional business modules and reporting

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

Create a `.env` file in the root folder and add your configuration.

Example:

```env
DATABASE_URL=your_database_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

### 4. Run the backend

```bash
npm run dev
```

or

```bash
npm start
```

Backend runs on:

```bash
http://localhost:5000
```

### 5. Run the frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend usually runs on:

```bash
http://localhost:5173
```

---

## Frontend Pages

The frontend currently includes the base structure for:

- Home
- Packages
- Login
- Register
- Dashboard

These pages will be expanded further with real UI components and backend integration.

---

## Future Improvements

- Full authentication and authorization
- Real booking forms with validation
- Admin, staff, and client dashboards
- API connection between frontend and backend
- Database-driven package and mascot management
- Inventory and staff coordination improvements
- Reporting and analytics features

---

## Author

**Flutura Hyseni**  
Software Engineering Student  
University of Mitrovica “Isa Boletini”
