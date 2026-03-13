MD Creative – Smart Event & Booking Management System
Project Overview
MD Creative – Smart Event & Booking Management System is a backend application designed to manage event bookings, entertainment services, and event resources for a family business called MD Creative.

MD Creative offers a wide variety of services including mascots (such as Spider-Man, Elsa, Anna and many more), birthday and wedding decorations, bounce houses, chairs, tables, red carpets and other event equipment.

This system aims to digitize and simplify the process of managing customer reservations, assigning staff members, validating inventory availability, and tracking event services.

The project is being developed as part of the Software Engineering course (Java 3) at the University of Mitrovica “Isa Boletini” – 2026.

Main Goals of the System
The main goal of the application is to provide a centralized platform for managing:

Customer bookings and reservations

Event services and decorations

Staff assignment to events

Inventory and equipment availability

Event management and scheduling

Business analytics and reporting

By using this system, the business can avoid double bookings, manage resources efficiently, and improve overall organization.

Key Features (Planned)
The system is designed to support the following functionalities.

Authentication & Security
Secure user registration and login

Password hashing using bcrypt

Authentication using JWT tokens

Role-based authorization (Admin, Staff, Client)

Booking Management
Create and manage event bookings

Support multiple services in one event

Prevent double booking for the same service and time

Track booking status (Pending, Approved, Completed, Cancelled)

Inventory Management
Track available inventory items

Validate equipment availability before booking confirmation

Prevent booking when inventory is insufficient

Staff Management
Assign staff members to specific events

Allow staff to view assigned events in their dashboard

Reporting & Analytics
Generate monthly revenue reports

View service popularity statistics

Export reports in PDF format

Project Architecture
The project follows a modular backend architecture, separating responsibilities into different layers.

src
│
├── config        # Database configuration
├── controllers   # Request handling logic
├── middleware    # Authentication and error handling
├── models        # Database models
├── routes        # API routes
├── services      # Business logic
├── utils         # Utility functions
└── app.js        # Express application setup
This structure helps maintain a clear separation between:

API routing

business logic

database interaction

middleware handling

Technologies Used
The system is built using modern backend technologies:

JavaScript

Node.js

Express.js

PostgreSQL

bcrypt (password hashing)

jsonwebtoken (JWT authentication)

dotenv (environment variables)

cors

nodemon

Installation and Setup
To run this project locally, follow these steps.

1. Clone the repository
git clone https://github.com/your-username/md-creative-event-booking-system.git
2. Navigate to the project folder
cd md-creative-event-booking-system
3. Install dependencies
npm install
4. Run the development server
npm run dev
Or run normally:

node server.js
Project Status
This project is currently in initial development phase.

At this stage the repository contains:

backend project structure

API architecture

modular folder organization

preparation for authentication, booking, and inventory modules

Future updates will include full implementation of all system features.

Author
Flutura Hyseni
Software Engineering Student
University of Mitrovica “Isa Boletini”