# Architecture Documentation

## Overview

The backend of the **MD Creative – Smart Event & Booking Management System** is organized using a layered architecture.

The purpose of this architecture is to separate responsibilities across different parts of the system, making the code easier to understand, maintain, and extend.

The project is structured around four main layers:
- Model Layer
- Service Layer
- Data Layer
- UI Layer

This organization supports cleaner code structure and follows good software engineering practices.

---

## Layers of the Project

### 1. Model Layer

The Model Layer contains the main domain entities of the system.

Examples include:
- User
- Booking
- Package
- Mascot
- Extra
- Activity
- InventoryItem
- StaffAssignment

Responsibilities of this layer:
- represent the structure of domain data
- define the core entities used in the application
- provide a clear separation between data models and business logic

This layer does not handle HTTP requests, persistence, or application rules.

---

### 2. Service Layer

The Service Layer contains the business logic of the application.

Responsibilities of this layer:
- process application rules
- coordinate operations between controllers and repositories
- keep controllers lightweight
- isolate business logic from request handling and persistence

Examples:
- BookingService
- PackageService
- MascotService
- ExtraService
- ActivityService
- InventoryService
- AuthService

This layer improves maintainability because business rules are managed in one place.

---

### 3. Data Layer

The Data Layer is responsible for data access and persistence.

Responsibilities of this layer:
- provide repository-based access to stored data
- abstract file operations from the service layer
- manage reading and saving records through CSV files
- support the Repository Pattern

This layer includes:
- IRepository
- FileRepository
- entity-specific repositories
- storage folder with CSV files

### Repository Pattern

The Repository Pattern is used to separate business logic from storage logic.

The repository contract is represented through `IRepository`, which defines the following methods:
- `getAll()`
- `getById(id)`
- `add(item)`
- `save()`

`FileRepository` implements this behavior using file-based CSV persistence.

In the current version of the project, the file-based repository is used as a simple persistence mechanism for demonstrating repository-based architecture without coupling the service layer directly to raw file operations.

This makes the code cleaner and easier to extend in the future.

---

### 4. UI Layer

The UI Layer handles incoming API requests.

Responsibilities of this layer:
- define API routes
- receive HTTP requests
- call the appropriate service methods
- return responses to the client

This layer contains:
- controllers
- routes

Controllers are responsible for request and response handling, while routes define the API endpoints.

This keeps the entry points of the application organized and separated from business logic.

---

## Request Flow

The request flow in the system follows this path:

Route → Controller → Service → Repository → Storage

This means:
1. a route receives the request
2. the controller handles the request and response
3. the service processes the business logic
4. the repository manages data access
5. the storage layer reads or saves data in CSV files

This flow keeps each layer focused on a single responsibility.

---

## Architectural Decisions

### Why layered architecture was used

Layered architecture was chosen because it:
- improves separation of concerns
- makes the project easier to maintain
- allows clearer organization of code
- makes future expansion easier
- helps document the system in a structured way

### Why repository pattern was used

The Repository Pattern was used because it:
- isolates persistence logic from business logic
- avoids direct file access inside services
- keeps data handling centralized
- makes the design cleaner and more reusable

### Why CSV storage was used

CSV file storage was used because:
- it is simple for demonstration purposes
- it supports file-based persistence without requiring a full database integration
- it clearly shows the role of the repository layer in the current phase of the project

---

## SOLID Principle Applied

### Single Responsibility Principle (SRP)

The project applies the **Single Responsibility Principle**.

This principle states that each class or component should have one main responsibility.

In this project:
- models represent domain entities
- repositories handle data access and persistence
- services handle business logic
- controllers handle request and response processing
- `server.js` handles application startup only

This improves:
- readability
- maintainability
- debugging
- extensibility

Applying SRP makes the architecture more structured and easier to manage.

---

## Frontend Integration (Optional Layer)

Although this documentation focuses on the backend architecture, the system is designed to be used together with a frontend application.

The frontend is responsible for:
- user interaction and UI rendering
- sending HTTP requests to the backend API
- displaying data received from the system

The communication between frontend and backend follows a standard client-server model using HTTP requests.
This separation ensures that the backend remains independent and can support different types of clients (web, mobile, etc.).

---

## Conclusion

The architecture of the project has been improved by organizing the backend into distinct layers and by applying the Repository Pattern.

The system now has:
- clearer responsibility separation
- better code organization
- documented UML structure
- documented architecture decisions
- a cleaner and more professional backend design
