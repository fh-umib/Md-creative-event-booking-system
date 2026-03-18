# Architecture

## Overview
MD Creative is a backend system for managing event bookings, packages, mascots, add-on activities, extras, inventory, and staff assignments for a family entertainment business.

The application follows a layered architecture to keep responsibilities separate and to make the code easier to maintain, test, and scale.

## Main architectural idea
The project is organized around the principle of Separation of Concerns.

Each layer has one clear responsibility:

- Routes define API endpoints.
- Controllers handle HTTP request and response flow.
- Services contain business logic and validation.
- Repositories contain database queries.
- Models represent the main entities of the system.
- Middleware handles cross-cutting concerns such as authentication and error handling.

This avoids mixing SQL, validation, and HTTP response logic in the same place.

## Why Repository Pattern is used
The Repository Pattern is used to isolate database access from the rest of the application.

Without repositories, controllers or services would contain raw SQL queries. That would make the project harder to maintain and harder to change later.

With repositories:
- services stay focused on rules and workflows
- SQL stays in one place
- the database layer can be improved without changing the service layer structure

Example:
BookingService should decide whether a booking is valid and whether inventory can be reserved.
BookingRepository should only execute SQL such as INSERT, SELECT, and UPDATE.

## Layers

### 1. Models
Models represent the main business entities:
- User
- Package
- Mascot
- Activity
- Extra
- Booking
- InventoryItem
- StaffAssignment

These classes help create consistent data objects inside the application.

### 2. Repositories
Repositories communicate with PostgreSQL.

Examples:
- UserRepository
- PackageRepository
- MascotRepository
- BookingRepository
- InventoryRepository

Responsibilities:
- create records
- get records by id
- list records
- update records
- execute relationship queries

### 3. Services
Services contain business logic.

Examples:
- AuthService handles register and login logic
- BookingService validates bookings, calculates totals, and performs inventory reservation
- PackageService validates package creation rules
- InventoryService enforces availability rules

This layer is where rules such as these belong:
- a booking must have a customer
- event date is required
- inventory cannot go below zero
- status must be one of the allowed values

### 4. Controllers
Controllers receive requests and return responses.

They should remain thin.
A controller should not:
- write SQL
- calculate totals
- contain complex business rules

Instead, controllers pass work to services and return JSON responses.

### 5. Routes
Routes map endpoints to controllers.

Examples:
- POST /api/auth/register
- POST /api/auth/login
- GET /api/packages
- POST /api/bookings
- PATCH /api/bookings/:id/status

### 6. Middleware
Middleware is used for:
- JWT authentication
- role checks
- centralized error handling

This keeps shared logic out of individual controllers.

## Database-first design
The project starts directly with PostgreSQL instead of fake arrays.
This is better for the MD Creative system because the project already needs:
- real relationships
- many-to-many mappings
- inventory tracking
- booking history
- staff assignment
- status tracking
- payment tracking

The database schema includes:
- users
- packages
- mascots
- activities
- extras
- inventory_items
- bookings
- package relationship tables
- booking relationship tables
- staff_assignments

## Main business flow
A normal booking creation flow works like this:

1. The client sends a booking request.
2. The route forwards it to the controller.
3. The controller calls BookingService.
4. BookingService validates customer, package, and inventory.
5. BookingService opens a database transaction.
6. BookingRepository creates the booking.
7. Related selected mascots, activities, extras, and inventory reservations are inserted.
8. Inventory quantities are reduced.
9. The transaction is committed.
10. A response is returned to the client.

This flow keeps the project predictable and easier to debug.

## Benefits of this architecture
- Cleaner code organization
- Easier maintenance
- Easier feature growth
- Better readability
- Better separation between API logic and data logic
- Easier future testing
- Better alignment with software engineering principles

## SOLID alignment
This structure especially supports:
- Single Responsibility Principle
- Open/Closed thinking for adding new modules
- Dependency awareness between layers

## Conclusion
The chosen architecture is appropriate for the course requirements and for the future growth of the MD Creative system.
It clearly shows software engineering thinking, not only code writing.
