# MD Creative – Smart Event & Booking Management System

**Author:** Flutura Hyseni  
**Technologies:** JavaScript, Node.js, Express.js, PostgreSQL, bcrypt, JWT

---

# Project Overview

**MD Creative – Smart Event & Booking Management System** is a backend application designed to manage event bookings, entertainment services, and event resources for a family business called **MD Creative**.

MD Creative offers a wide variety of services including mascots such as **Spider-Man, Elsa, Anna**, and many more characters. The business also provides:

- Birthday decorations
- Wedding decorations
- Bounce houses
- Chairs and tables
- Red carpets
- Event equipment

This system aims to **digitize and simplify the process of managing customer reservations, assigning staff members, validating inventory availability, and tracking event services.**

---

# Main Goals of the System

The main goal of the application is to provide a **centralized platform** for managing:

- Customer bookings and reservations
- Event services and decorations
- Staff assignment to events
- Inventory and equipment availability
- Event management and scheduling
- Business analytics and reporting

By using this system, the business can:

- Avoid **double bookings**
- Manage resources **more efficiently**
- Improve **overall organization**

---

# Planned Features

## Authentication and Security

- Secure user registration and login
- Password hashing using **bcrypt**
- Authentication using **JWT tokens**
- Role-based authorization for:
  - **Admin**
  - **Staff**
  - **Client**

---

## Booking Management

- Create and manage event bookings
- Support **multiple services in one event**
- Prevent **double booking** for the same service and time

Track booking status:

- Pending
- Approved
- Completed
- Cancelled

---

## Inventory Management

- Track available inventory items
- Validate equipment availability before confirming a booking
- Prevent booking when **inventory is insufficient**

---

## Staff Management

- Assign staff members to specific events
- Allow staff to **view assigned events** in their dashboard

---

## Reporting and Analytics

- Generate **monthly revenue reports**
- View **service popularity statistics**
- Export reports in **PDF format**

---

# Project Structure

```
src
├── config
├── controllers
├── middleware
├── models
├── routes
├── services
├── utils
└── app.js
```

This structure helps keep the project **organized** and follows a **modular backend architecture**.

---

# Technologies Used

- JavaScript
- Node.js
- Express.js
- PostgreSQL
- bcrypt
- jsonwebtoken (JWT)
- dotenv
- cors
- nodemon

---

# How to Run the Project

## 1. Clone the repository

```bash
git clone https://github.com/fh-umib/Md-creative-event-booking-system.git
```

## 2. Move into the project folder

```bash
cd Md-creative-event-booking-system
```

## 3. Install dependencies

```bash
npm install
```

## 4. Run the project

Development mode:

```bash
npm run dev
```

Or run normally with:

```bash
node server.js
```

---

# Project Status

This project is currently in the **initial development phase**.

At this stage, the repository includes:

- Backend project structure
- Initial API architecture
- Organized modular folders
- Preparation for **authentication, booking, and inventory modules**

Future updates will include the **full implementation of all major system features.**

---

# Author

**Flutura Hyseni**  
Software Engineering Student  
University of Mitrovica “Isa Boletini”  
2026