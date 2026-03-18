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

---

## Project Structure

```bash
Md-creative-event-booking-system/
├── docs/                  # Project documentation
├── frontend/              # React frontend application
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── data/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── types/
│   │   ├── utils/
│   │   ├── App.tsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.tsx
│   └── package.json
├── sql/                   # Database scripts
├── src/                   # Backend source code
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   └── app.js
├── server.js              # Backend entry point
├── package.json
└── README.md
```
# Current Status

This project is currently in the development phase.

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

# Author
**Flutura Hyseni**
Software Engineering Student
University of Mitrovica “Isa Boletini”