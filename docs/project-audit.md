# Project Audit – MD Creative Event Booking System

## 1. Short Description of the Project

MD Creative Event Booking System is a full-stack web application designed for managing children’s parties and entertainment events. The system supports the organization of packages, mascots, bookings, decorations, activities, gallery content, and staff-related administration.

The main users of the system are:
- customers who want to explore services and submit booking requests;
- administrators or business staff who manage bookings, services, and internal data.

The core functionality of the project includes:
- presenting event packages and service options to customers;
- allowing customers to submit booking requests;
- managing public and admin-side resources such as packages, mascots, decorations, activities, and bookings;
- supporting the internal organization of business operations through the admin side of the system.

---

## 2. What Works Well?

### 1. The project has a realistic and meaningful domain
The system is built around a real business case rather than a simple academic demo. It focuses on event management for children’s entertainment services, which gives the project practical value and makes the requirements more realistic.

### 2. The backend structure is reasonably organized
The project separates routes, controllers, services, repositories, and configuration files. This shows a clear attempt to follow a layered and maintainable backend structure instead of mixing all logic in a single place.

### 3. The project includes both public and admin-oriented functionality
The application is not limited to one simple CRUD flow. It includes public-facing functionality for customers and separate admin functionality for management tasks, which makes the system more complete.

### 4. The project shows clear effort in scope and implementation
The repository contains multiple modules and demonstrates that the system has been expanded beyond a minimal prototype. It includes work on packages, mascots, bookings, decorations, activities, gallery, and supporting admin flows.

### 5. The project uses a repository pattern to separate data access from business logic
Key modules use dedicated PostgreSQL repository classes such as `PgPackageRepository` and `PgMascotRepository` that are kept separate from the service layer. This pattern makes the data access logic easier to replace or extend independently, and demonstrates an understanding of how to structure backend code for long-term maintainability.

---

## 3. Weaknesses of the Project

### 1. The persistence strategy is not fully consistent across the entire project
The main backend modules such as packages, mascots, and bookings are database-oriented, but authentication logic still uses file-based staff data. Because of this, the project does not yet follow one fully consistent persistence strategy across all modules. This inconsistency makes the codebase harder to maintain and extend as the project grows.

### 2. Validation is still limited in important parts of the system
Although validation exists in some flows, it is still basic in areas where stronger validation would improve reliability. Examples include booking-related checks such as input completeness, data format validation, guest count logic, and time/date consistency. Without proper input validation, invalid or malformed data can enter the system and cause unexpected errors deeper in the application logic.

### 3. Error handling is present but still too basic
The project includes an error middleware, but the overall handling of errors is still fairly simple. Some parts of the code rely on broad default responses instead of specific error messages that clearly describe what went wrong. The project would benefit from more precise and consistent error reporting across all routes and services, which would make debugging faster and the API more informative for frontend consumers.

### 4. Basic security is still weak in the current project
Security is one of the weaker aspects of the current system. While authentication exists, access control and request protection are still limited. In its current state, the project can allow login-related behavior or protected access flows without enough strict conditions, and it does not yet show stronger protection measures such as tighter credential validation, stronger authorization checks, rate limiting, request sanitization, or more defensive handling of sensitive operations. This makes the system less secure than it should be for a real-world application.

### 5. No automated testing exists in the project
The project shows manual development effort and structure, but there is no evidence of automated unit or integration tests. This means that bugs introduced during refactoring or future changes are harder to detect. Without tests, it is also difficult to verify that individual modules behave correctly under different conditions.

### 6. Some route and function naming is inconsistent across modules
Different modules in the backend use slightly different naming conventions for similar operations. Some controller functions use verbose names while others use shorter or different patterns for the same type of action. This kind of inconsistency makes the codebase harder to read and navigate, especially when multiple modules need to be maintained or extended at the same time.

### 7. Some admin pages existed visually but were not connected to the real backend
Several admin pages were present in the interface and looked functional, but were not actually connected to real backend endpoints. When interacting with these pages, no real data was loaded or saved. The UI gave the impression of a working admin panel, but the underlying integration was missing. This is a structural weakness because it creates a gap between what the system appears to do and what it actually does.

### 8. Response format mismatch between backend and frontend
The backend API returned responses wrapped in a structured object containing success, message, and data fields. However, several frontend pages expected raw arrays or raw objects directly. This caused data to not display correctly in the UI even when the API was returning valid results. The frontend was reading the wrong part of the response, which made debugging harder because the network request appeared successful but the page remained empty or broken.

### 9. Inconsistent naming conventions across backend modules
Different modules use different naming patterns for the same type of operation. For example, the bookings module uses getAllBookings to retrieve a list of records, while the packages module uses fetchPackages for the equivalent operation. These are the same kind of action but named differently across modules. This inconsistency makes the codebase harder to navigate, especially when working across multiple modules at the same time. A developer reading the code cannot predict what a function will be called in a new module without checking it manually. A consistent convention such as always using getAll, getById, create, update, delete across all modules would make the backend much easier to read and maintain.

---

## 4. Three Improvements I Would Implement

### Improvement 1: Strengthen validation and error handling
- **Problem:** Some important flows still use basic validation and broad error handling. Booking-related inputs, for example, are not fully validated before they reach the service layer, which allows incomplete or incorrect data to be processed.
- **Solution:** Add structured validation for required fields, data formats, and business rules in booking and other key flows. Replace generic error responses with specific messages that describe the actual problem, distinguishing between a missing field, an invalid format, and a resource that does not exist.
- **Why it matters:** Better validation and error handling improve reliability, prevent invalid data from entering the system, and make debugging easier for both developers and API consumers.

### Improvement 2: Improve basic security and access protection
- **Problem:** The current project has weak basic security in important areas, especially around authentication and protected flows. Login and access-related behavior are not yet strict enough for a stronger production-like system.
- **Solution:** Improve authentication checks, strengthen authorization for protected admin routes, validate credentials more strictly, and add safer request handling practices such as better token verification, input sanitization, and protection against careless access to sensitive operations.
- **Why it matters:** Security is essential in any system that manages bookings, staff-related data, or protected admin functionality. Improving security makes the application more trustworthy, more realistic, and more professionally engineered.

### Improvement 3: Standardize persistence and improve consistency
- **Problem:** Some parts of the project use PostgreSQL while others still rely on file-based data. Authentication-related logic in particular still reads from a file instead of using the database.
- **Solution:** Move the remaining file-based logic, especially in the authentication and staff-related modules, to the same database-driven repository pattern used in the main modules.
- **Why it matters:** A more consistent persistence strategy makes the architecture cleaner, easier to maintain, and more suitable for a larger real-world system. It also removes the technical inconsistency that currently makes the codebase harder to reason about as a whole.

---

## 5. One Part I Still Do Not Fully Understand

One area I still do not fully understand is how authentication middleware 
works at a deeper level. When I first added the auth middleware to protect 
admin routes, I did not clearly understand why it was needed or how it fit 
into the request flow. I knew the routes needed protection, but the concept 
of intercepting a request before it reaches the controller, extracting the 
token from the Authorization header, verifying it, and then passing control 
forward with `next()` was confusing at first. I made several mistakes before 
I understood why the middleware had to call `next()` on success and return an 
error response on failure — and not both.

A related area was token verification itself. I did not immediately understand 
the difference between a missing token, a malformed token, and an expired token, 
and why each of these needed to be handled separately instead of with one generic 
error.

The third area is API testing. Throughout the project, I relied entirely on 
Postman for testing endpoints manually. I did not know how to verify whether 
a route was working correctly without sending requests by hand. I still want 
to learn how to write automated integration tests so that I can test protected 
routes, validate responses, and catch regressions without depending on manual 
testing every time.