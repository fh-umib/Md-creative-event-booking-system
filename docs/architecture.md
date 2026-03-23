# Architecture Documentation

## Overview

The **MD Creative – Smart Event & Booking Management System** follows a layered backend architecture to improve maintainability, readability, and separation of concerns.

The system is organized into the following main layers:

- **Models**
- **Services**
- **Data**
- **UI**

This structure makes the application easier to extend, test, and maintain as the project grows.

---

## 1. Models Layer

The **Models** layer contains the core domain entities of the system.

Examples include:
- `User`
- `Booking`
- `Package`
- `Mascot`

### Responsibilities
- Represent the main business entities
- Store object attributes
- Provide a clean domain structure for the rest of the application

### Why this layer is important
Keeping models separate helps define the system clearly and avoids mixing domain definitions with business logic or database operations.

---

## 2. Services Layer

The **Services** layer contains the business logic of the application.

Examples include:
- `AuthService`
- `BookingService`

### Responsibilities
- Process business rules
- Validate and transform data
- Coordinate operations between controllers and repositories

### Why this layer is important
This layer keeps controllers lightweight and prevents business logic from being scattered across routes or repository classes.

---

## 3. Data Layer

The **Data** layer is responsible for persistence and data access.

It includes:
- database repositories such as `BookingRepository`, `UserRepository`, `PackageRepository`, and `MascotRepository`
- repository abstractions such as `IRepository`
- file-based persistence through `FileRepository`
- CSV storage files such as `bookings.csv`

### Responsibilities
- Read and write data
- Communicate with PostgreSQL for the main application data
- Demonstrate CSV-based persistence using the Repository Pattern

### Why this layer is important
Separating data access from business logic makes the system easier to maintain and allows different persistence strategies to coexist.

---

## 4. UI Layer

The **UI** layer handles incoming HTTP requests and outgoing responses.

It includes:
- routes
- controllers
- middleware

Examples include:
- `authRoutes`
- `bookingRoutes`
- `AuthController`
- `BookingController`

### Responsibilities
- Expose API endpoints
- Receive requests from clients
- Delegate logic to services or repositories
- Return JSON responses

### Why this layer is important
This separation ensures that request handling stays clean and focused, while business and data logic remain in their own layers.

---

## Repository Pattern

The project applies the **Repository Pattern** to separate persistence logic from the rest of the system.

### Implementations
- `IRepository` defines the common contract:
  - `getAll()`
  - `getById(id)`
  - `add(entity)`
  - `save()`
- `FileRepository` provides a generic CSV-based implementation
- `FileBookingRepository` is a concrete repository for booking data stored in `bookings.csv`

### Purpose
This pattern improves abstraction and demonstrates how the same architecture can support both:
- **database repositories** for the main application
- **file-based repositories** for CSV persistence

---

## Architectural Decisions

### 1. Layered Structure
A layered structure was chosen to improve separation of concerns and make the application easier to understand.

### 2. Thin Controllers
Controllers are kept focused on request/response handling, while services and repositories perform the actual application work.

### 3. Mixed Persistence Strategy
The project uses PostgreSQL repositories for the main backend logic and a CSV-based file repository to demonstrate the Repository Pattern in a simpler persistence form.

### 4. Scalable Organization
The architecture is designed so new entities, routes, services, and repositories can be added without heavily restructuring the codebase.

---

## Benefits of This Architecture

- Better separation of concerns
- Easier maintenance
- Cleaner code organization
- Better scalability
- Clear demonstration of the Repository Pattern
- Support for both database and file-based persistence

---

## Conclusion

This architecture provides a clear and modular foundation for the **MD Creative – Smart Event & Booking Management System**.

By separating the project into **Models**, **Services**, **Data**, and **UI**, the system becomes easier to manage and extend.  
The addition of `IRepository`, `FileRepository`, and `FileBookingRepository` also strengthens the design by clearly demonstrating the Repository Pattern in practice.