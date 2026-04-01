# Sprint 2 Plan — Flutura Hyseni  

## 1. Current Project Status

**MD Creative – Smart Event & Booking Management System** is a full-stack project designed to manage event bookings, entertainment packages, mascot characters, extra services, and staff coordination. The long-term goal of the project is to become a complete, functional, and deployable real-world system rather than only a structural academic prototype.

At this stage, the project already has a strong technical foundation, a clear layered architecture, and professional documentation.

### What currently works?

| Area | Current Status |
|---|---|
| Repository Structure | The project repository is clearly separated into frontend and backend parts |
| Frontend | A frontend application exists using React, TypeScript, and Vite |
| Backend | A backend application exists using Node.js and Express |
| Database Direction | PostgreSQL is planned and used as a core part of the backend stack |
| Architecture | The backend follows a layered architecture |
| Layer Separation | The project is clearly divided into `models`, `services`, `data`, `ui`, and `utils` |
| Server Setup | Express server setup and base application configuration are in place |
| Authentication | Initial authentication structure has been prepared |
| Booking Logic | Initial booking service structure has been prepared |
| Repository Layer | Repository layer organization is already established |
| Repository Pattern | The project demonstrates the Repository Pattern using `IRepository`, `FileRepository`, and `FileBookingRepository` |
| Persistence Strategy | The project uses a hybrid persistence approach: PostgreSQL repositories for the main backend logic and CSV/file persistence for academic demonstration |
| Documentation | The `docs` folder contains technical documentation |
| README | The README clearly describes the system purpose, features, planned features, tech stack, project structure, backend architecture, repository pattern, and current status |

---

## 2. What Has Been Completed So Far

| Completed Part | Notes |
|---|---|
| Backend project structure | Established and organized |
| Frontend project structure | Established and organized |
| Layered backend architecture | Implemented as the main design approach |
| Express server setup | Configured and running |
| Authentication and booking service structure | Initial structure exists |
| Repository layer organization | Clearly separated and designed |
| Repository Pattern with CSV support | Demonstrated for academic and architectural purposes |
| UML documentation | Prepared |
| Architecture documentation | Prepared |

---

## 3. What Is Not Fully Completed Yet

Even though the project starts correctly and already has a solid base, several parts still need to be completed and stabilized at a final level.

| Incomplete / In Progress Part | What still needs improvement |
|---|---|
| Frontend UI | Needs refinement, cleanup, and better usability |
| Frontend–Backend Integration | Needs to be completed across the main workflows |
| Authentication | Needs to be expanded and strengthened |
| Booking Workflow | Needs to be completed end-to-end |
| PostgreSQL CRUD | Needs to be fully implemented |
| Validation and Error Handling | Needs to be unified across all layers |
| Business / Reporting Modules | Need further development |
| Unit Testing | Minimum sprint testing requirements are not yet fully covered |
| Public Deployment | The project is not yet deployed for cross-device access |

### Does the project compile and run?
**Yes.** The project starts successfully, but it is not yet fully functional in every module and in every real usage flow.

---

## 4. Sprint Goal

The goal of **Sprint 2** is to move the project from a strong architectural and structural foundation to a more complete, integrated, and demonstrable real-world application.

This sprint will focus on **one main end-to-end feature**, supported by several additional improvements that move the project closer to becoming fully functional.

---

## 5. Main New Feature

## **Create a New Booking (Main Sprint Feature)**

The main feature of this sprint will be the **creation of a new booking** in a complete and functional way from the frontend all the way to the database.

### Feature Description
The goal is to allow the user to fill out a booking form in the frontend and save that booking successfully in PostgreSQL, while following the application architecture in a clean and structured way.

### End-to-End Flow of the Feature

| Layer | Responsibility |
|---|---|
| UI / Frontend | The user fills out the booking form |
| API / Controller | The frontend sends a request to the booking endpoint |
| Service | The application validates the data and applies business logic |
| Repository | The booking data is saved into PostgreSQL |
| Response back to UI | The system returns success or error feedback and the frontend displays a proper message |

### What this feature will include

| Feature Part | Planned Work |
|---|---|
| Booking Form | Functional frontend form for creating a booking |
| API Integration | Real connection between the frontend form and backend API |
| Validation | Validation of required input fields before saving |
| Database Save | Real booking persistence in PostgreSQL |
| Success Feedback | Clear success message if the booking is created |
| Error Feedback | Clear error message if input is invalid or saving fails |

### Why this is the main feature
This feature represents the core business functionality of the MD Creative system, because the booking workflow is the central purpose of the project. For that reason, implementing this feature from beginning to end will be the main focus of the sprint and the clearest demonstration of the architecture:

**UI → Service → Repository**

---

## 6. Supporting Sprint Improvements

In addition to the main feature, this sprint will include several supporting improvements.

### 6.1 PostgreSQL CRUD Completion

| Planned Improvement | Description |
|---|---|
| Real PostgreSQL connection | Complete the real backend-to-database connection where CRUD is required |
| CRUD operations | Support create, read, update, and delete for the main entities |
| Layer flow improvement | Strengthen the `controller → service → repository → database` flow |
| Replace placeholders | Turn structural/incomplete parts into working implementations |

### 6.2 Frontend UI Finalization

| Planned Improvement | Description |
|---|---|
| Layout refinement | Improve the layout and structure of key pages |
| Form improvements | Improve inputs, forms, and usability |
| Component organization | Make the frontend structure cleaner and easier to maintain |
| Better presentation | Display data in a more professional and user-friendly way |
| State handling | Improve loading, empty-state, and error-state handling |

### 6.3 Frontend–Backend API Integration

| Planned Improvement | Description |
|---|---|
| Connect forms to API | Link frontend components to backend endpoints |
| Use real backend data | Display actual data coming from the backend and database |
| Improve request/response flow | Make communication between layers more reliable |
| Better UI reaction | Improve how the UI reacts to success and failure responses |

### 6.4 Authentication Expansion

| Planned Improvement | Description |
|---|---|
| Login/Register validation | Improve input validation for authentication flows |
| Credential handling | Strengthen credential verification |
| Unauthorized access handling | Show clear responses when access is denied |
| Route protection | Improve route protection where required |
| Role-based preparation | Prepare the system better for role-based access if included in this sprint |

### 6.5 Booking Workflow Improvements

| Planned Improvement | Description |
|---|---|
| Better booking creation flow | Make the booking process more complete |
| Entity relationships | Connect bookings with packages, mascots, and extras where required |
| Stronger validation | Validate booking-related inputs more carefully |
| Missing data handling | Handle incomplete booking submissions correctly |
| Logic improvement | Improve the full booking flow from user input to storage |

### 6.6 Search / Filter Improvements

| Planned Improvement | Description |
|---|---|
| Search by name | Allow searching for items, packages, or bookings by name |
| Easier filtering | Improve filtering of existing data lists |
| Clearer results | Display search/filter results more clearly |
| Better empty-state feedback | Show understandable messages when no results are found |

### 6.7 Deployment

| Planned Improvement | Description |
|---|---|
| Frontend deployment | Deploy the frontend to a platform such as Vercel or a similar service |
| Backend deployment | Deploy the backend to a suitable hosting platform |
| Environment configuration | Configure environment variables correctly |
| Live integration | Ensure the deployed frontend communicates correctly with the deployed backend |
| Cross-device access | Make the project accessible on laptops, phones, and other devices |

---

## 7. Error Handling

One of the most important sprint goals is to make sure the application does not crash and always provides clear user-facing feedback.

### Error cases that will be handled

| Error Type | Planned Handling |
|---|---|
| Database / file read-write errors | Catch failures during persistence operations and return controlled messages |
| Input validation errors | Prevent invalid or incomplete input from being processed |
| Missing resource / not found errors | Return clear messages when a booking, item, or user does not exist |
| Authentication / authorization errors | Deny access safely and show proper feedback |
| API response errors | Handle frontend-backend communication issues in a controlled way |

### Where error handling will be added

| Layer | Planned Handling |
|---|---|
| Repository | Database and file operation handling |
| Service | Validation, business rule checks, and safe processing |
| UI / Frontend | Form validation and user-facing messages |
| API Layer | Request/response handling and controlled status codes |

### Concrete examples

| Scenario | Expected Behavior |
|---|---|
| User submits a booking form with empty required fields | The booking is not saved and the frontend shows a message such as `Please fill in all required fields` |
| A booking ID does not exist | The backend returns `404 Not Found` and the UI shows `Booking not found` |
| Database save fails | The system returns a controlled error response and does not crash |
| User enters incorrect login credentials | The system denies access safely and displays a clear error message |

### Goal
The system should continue running, avoid unexpected crashes, and communicate clearly with the user even when errors occur.

---

## 8. Testing Plan

This sprint will also include automated testing for the most important implemented or improved parts.

### Methods / flows to be tested

| Area | What will be tested |
|---|---|
| Booking Service | Methods related to booking creation |
| Booking Logic | Core booking workflow behavior |
| Authentication | Login-related logic and validation |
| Search / Filter | Search and filtering methods |
| Validation | Handling of invalid and edge-case input |
| Error Responses | Basic behavior in failure scenarios |

### Test cases

| Test Case Type | Example |
|---|---|
| Normal case | A booking is created successfully and saved in the database |
| Negative case | Booking creation fails because required data is missing or an entity does not exist |
| Edge case | Empty input, invalid input, or incomplete data |
| Error case | Failure in database persistence, file layer, or API flow |

### Minimum testing target
- The test project must exist and compile
- At least **3 tests** must pass
- The tests must cover at least:
  - one normal case
  - one negative case
  - one edge case

### Example tests I plan to include

| Planned Test | Expected Result |
|---|---|
| Creating a valid booking returns success | Pass |
| Creating a booking with empty required fields is rejected | Pass |
| Searching for an existing booking returns a result | Pass |
| Searching for a non-existing booking returns no result | Pass |

---

## 9. Expected Sprint 2 Outcome

By the end of this sprint, I aim for the project to have:

| Expected Outcome | Result |
|---|---|
| Main end-to-end feature | New booking creation implemented through the full flow |
| PostgreSQL functionality | Backend more fully connected to PostgreSQL |
| Frontend quality | Cleaner, more professional frontend |
| Integration | Better frontend-backend integration |
| Authentication | Stronger authentication flow |
| Booking workflow | More complete and practical |
| Search / filter | Improved usability |
| Error handling | Safer and clearer behavior |
| Testing | Basic automated tests for key parts |
| Deployment | Public access across multiple devices |

---