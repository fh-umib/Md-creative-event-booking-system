#  MD Creative – Smart Event & Booking Management System

A full-stack web application for managing event bookings, mascot services, entertainment packages, and extra activities for children’s parties and celebrations.

---

## Overview

**MD Creative** is a smart event and booking management system created for a family entertainment business.

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

This makes the system more practical for real event planning, where services are usually combined into one experience.

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

| Layer       | Technology         | Purpose |
|------------|------------------|---------|
| Backend Runtime | Node.js           | JavaScript runtime for server-side code |
| Backend Framework | Express.js       | API routing, middleware, and server logic |
| Database    | PostgreSQL        | Relational database for bookings, users, and inventory |
| Authentication | JWT + bcrypt     | Authentication, password hashing, and token management |
| Configuration | dotenv           | Environment variable management |
| CORS        | cors              | Enable cross-origin requests |
| Frontend Framework | React          | Component-based UI |
| Language    | TypeScript        | Type safety across frontend and backend |
| Build Tool  | Vite              | Fast development server and bundling |
| Routing     | React Router DOM  | Client-side navigation |
| Styling     | CSS               | Layout and presentation |

---

## Project Structure

```bash
Md-creative-event-booking-system/
├── docs/                   # Architecture and UML documentation
├── frontend/               # React + Vite application with base pages and components
├── sql/                    # Database scripts
├── src/                    # Backend source code
│   ├── config/             # Configuration files
│   ├── data/               # Data access layer
│   │   ├── repositories/   # IRepository, FileRepository, entity repositories
│   │   └── storage/        # CSV storage files
│   ├── middleware/         # Express middleware
│   ├── models/             # Domain entities
│   ├── services/           # Business logic layer
│   ├── ui/                 # Presentation layer
│   │   ├── controllers/    # Request handlers
│   │   └── routes/         # API routes
│   ├── utils/              # Helper utilities
│   └── app.js              # Express app configuration
├── .gitignore
├── package.json
├── server.js               # Application entry point
└── README.md
```

---

# Project architecture is organized into four main layers:
- Models: represent the core domain entities of the system
- Services: contain business logic and application rules
- Data: manage persistence through repositories and CSV/file storage
- UI: handle API requests through controllers and routes

**This layered structure improves separation of concerns, readability, and maintainability.**

---

# Current Status

**This project is currently in the development phase.**

---

# Completed
- backend project structure
- frontend project structure
- basic frontend routing
- service layer preparation
- Express server setup

---

# In Progress
- frontend UI improvements
- backend API integration
- authentication system
- booking logic
- database connection and full CRUD functionality

---

# How to Run the Project

## 1. Clone the repository
```bash
git clone https://github.com/fh-umib/Md-creative-event-booking-system.git
```
```bash
cd Md-creative-event-booking-system
```

## 2. Run the backend
```bash
npm install
```
```bash
npm run dev
```
or 

```bash
node server.js
```

**Backend runs on:**

http://localhost:5000

## 3. Run the frontend
```bash
cd frontend
```

```bash
npm install
```

```bash
npm run dev 
```

**Frontend usually runs on:**

http://localhost:5173

---

# Frontend Pages

## The frontend currently includes the base structure for:
- Home
- Packages
- Login
- Register
- Dashboard

These pages will be expanded further with real UI components and backend integration.

---

# Future Improvements
- Full authentication and authorization
- Real booking forms with validation
- Admin, staff, and client dashboards
- API connection between frontend and backend
- Database-driven package and mascot management
- Reporting and analytics features
- Improved UI/UX design

---

## Author

**Flutura Hyseni**  
Software Engineering Student  
University of Mitrovica “Isa Boletini”