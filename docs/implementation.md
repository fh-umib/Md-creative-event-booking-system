# MD Creative – Implementation Documentation

## Overview

This document explains the practical implementation of the CRUD assignment in the **MD Creative – Smart Event Booking Platform** project.

In this phase, I implemented **three main models**:

- **Package**
- **Mascot**
- **Review**

For each model, I completed:

- the **model**
- a **CSV file** with initial records
- a **FileRepository** with CRUD operations
- a **service layer** with logic and validation
- a **controller**
- **routes**
- **admin and/or public UI**
- **testing in Postman and frontend**

---

## Project Architecture

The project is separated into **backend** and **frontend**.

### Backend structure

The backend is organized as follows:

- `models/` – main entities
- `data/storage/` – CSV files
- `data/repositories/` – `FileRepository` and model-specific repositories
- `services/` – business logic
- `ui/controllers/` – controllers
- `ui/routes/` – API routes

### Frontend structure

The frontend is organized as follows:

- `pages/` – public and admin pages
- `services/` – communication with API
- `hooks/` – reusable request logic
- `layouts/` – public and admin layouts
- `types/` – TypeScript types

This structure made the project easier to organize, understand, and maintain.

---

## Model 1: Package

### Purpose

The **Package** model is used to manage event packages offered by MD Creative.

### Model attributes

The `Package` model contains these main attributes:

- `id`
- `name`
- `description`
- `price`
- `imageUrl`
- `isActive`

This satisfies the requirement of having **more than 4 attributes**.

### CSV file

For this model, I created:

- `src/data/storage/packages.csv`

This file stores the initial records and works as the persistent file-based storage.

### Repository

I implemented `FilePackageRepository`, which uses file storage through `FileRepository`.

Implemented methods:

- `getAll()`
- `getById(id)`
- `add(item)`
- `update(id, data)`
- `delete(id)`
- `save()`

These methods handle reading, adding, updating, deleting, and saving data in the CSV file.

### Service

I created `packageService`, which receives the repository as a dependency.

Implemented features:

- listing packages
- filtering by name
- filtering by maximum price
- finding by ID
- creating with validation
- updating
- deleting

#### Validation

Before create and update:

- package name must not be empty
- price must be greater than 0

### API endpoints

The following endpoints were implemented:

- `GET /api/packages`
- `GET /api/packages/:id`
- `GET /api/packages?name=...`
- `GET /api/packages?maxPrice=...`
- `POST /api/packages`
- `PUT /api/packages/:id`
- `DELETE /api/packages/:id`

### UI

I connected:

- the **public packages page**
- the **admin packages page**

In the admin page, these features work:

- create
- update
- delete
- filter

In the public page, listing and filtering work correctly.

### Testing completed

I tested in Postman:

- list all packages
- filter by name
- filter by maximum price
- get by ID
- create package
- update package
- delete package

I also tested the package pages in the frontend.

### Screenshots

#### Postman

![Package Get All](screenshots/Package/package-get-all.png)
![Package Filter by Name](screenshots/Package/package-filter-name.png)
![Package Filter by Price](screenshots/Package/package-filter-price.png)
![Package Get By Id](screenshots/Package/package-get-by-id.png)
![Package Post](screenshots/Package/package-post.png)
![Package Put](screenshots/Package/package-put.png)
![Package Delete](screenshots/Package/package-delete.png)

#### Frontend

![Package Admin Page](screenshots/Package/package-admin-page.png)
![Package Public Page](screenshots/Package/package-public-page.png)

---

## Model 2: Mascot

### Purpose

The **Mascot** model is used to manage mascots that can be reserved for children’s events and themed parties.

### Model attributes

The `Mascot` model contains these attributes:

- `id`
- `name`
- `description`
- `price`
- `imageUrl`
- `isActive`

This model also satisfies the requirement of having **more than 4 attributes**.

### CSV file

For this model, I created:

- `src/data/storage/mascots.csv`

This file stores the initial mascot records.

### Repository

I implemented `FileMascotRepository` with these methods:

- `getAll()`
- `getById(id)`
- `add(item)`
- `update(id, data)`
- `delete(id)`
- `save()`

### Service

I created `mascotService`, which uses dependency injection.

Implemented features:

- list with filtering
- find by ID
- create with validation
- update
- delete

#### Filtering

For mascots, I implemented filters by:

- `name`
- `maxPrice`

#### Validation

Before create and update:

- mascot name must not be empty
- price must be greater than 0

### API endpoints

The following endpoints were implemented:

- `GET /api/mascots`
- `GET /api/mascots/:id`
- `GET /api/mascots?name=...`
- `GET /api/mascots?maxPrice=...`
- `POST /api/mascots`
- `PUT /api/mascots/:id`
- `DELETE /api/mascots/:id`

### UI

I connected:

- the **public mascots page**
- the **admin mascots page**

In the admin page, I implemented:

- create
- edit
- delete
- filter

In the public page, mascots are listed in a cleaner customer-facing format.

### Testing completed

In Postman, I tested:

- `GET /api/mascots`
- `GET /api/mascots?name=Spider`
- `GET /api/mascots?maxPrice=90`
- `GET /api/mascots/1`
- `POST /api/mascots`
- `PUT /api/mascots/1`
- `DELETE /api/mascots/1`

In the frontend, I tested:

- public mascots page
- filters
- admin CRUD

### Screenshots

#### Postman

![Mascot Get All](screenshots/Mascot/mascot-get-all.png)
![Mascot Filter by Name](screenshots/Mascot/mascot-filter-name.png)
![Mascot Filter by Price](screenshots/Mascot/mascot-filter-price.png)
![Mascot Get By Id](screenshots/Mascot/mascot-get-by-id.png)
![Mascot Post](screenshots/Mascot/mascot-post.png)
![Mascot Put](screenshots/Mascot/mascot-put.png)
![Mascot Delete](screenshots/Mascot/mascot-delete.png)

#### Frontend

![Mascot Admin Page](screenshots/Mascot/mascot-admin-page.png)
![Mascot Public Page](screenshots/Mascot/mascot-public-page.png)

---

## Model 3: Review

### Purpose

The **Review** model is used to store and manage customer reviews about MD Creative services.

### Model attributes

The `Review` model contains:

- `id`
- `customerName`
- `comment`
- `rating`
- `isApproved`

### CSV file

For this model, I created:

- `src/data/storage/reviews.csv`

This file contains the initial review records and additional test records created during implementation.

### Repository

I implemented `FileReviewRepository` with these methods:

- `getAll()`
- `getById(id)`
- `add(item)`
- `update(id, data)`
- `delete(id)`
- `save()`

### Service

I created `reviewService`, which uses the repository as a dependency.

Implemented features:

- list reviews with filtering
- find review by ID
- create review with validation
- update review
- delete review

#### Filtering

For reviews, I implemented filters by:

- `customerName`
- `minRating`
- `onlyApproved`

#### Validation

Before create and update:

- `customerName` must not be empty
- `comment` must not be empty
- `rating` must be between 1 and 5

### API endpoints

The following endpoints were implemented:

- `GET /api/reviews`
- `GET /api/reviews/:id`
- `GET /api/reviews?customerName=...`
- `GET /api/reviews?minRating=...`
- `GET /api/reviews?onlyApproved=true`
- `POST /api/reviews`
- `PUT /api/reviews/:id`
- `DELETE /api/reviews/:id`

### UI

I connected:

- the **public reviews page**
- the **admin reviews page**

In the admin page, I implemented:

- create
- update
- delete
- filter

In the public page, reviews are displayed in a cleaner format for users, with filtering connected to the backend.

### Testing completed

In Postman, I tested:

- list all reviews
- filter by customer name
- filter by minimum rating
- filter only approved reviews
- get by ID
- create review
- update review
- delete review

In the frontend, I tested:

- public reviews page
- admin reviews page
- filters
- edit
- delete

### Screenshots

#### Postman

![Review Get All](screenshots/Review/review-get-all.png)
![Review Filter by Name](screenshots/Review/review-filter-name.png)
![Review Filter by Rating](screenshots/Review/review-filter-rating.png)
![Review Filter Approved](screenshots/Review/review-filter-approved.png)
![Review Get By Id](screenshots/Review/review-get-by-id.png)
![Review Post](screenshots/Review/review-post.png)
![Review Put](screenshots/Review/review-put.png)
![Review Delete](screenshots/Review/review-delete.png)

#### Frontend

![Review Admin Page](screenshots/Review/review-admin-page.png)
![Review Public Page](screenshots/Review/review-public-page.png)

---

## End-to-End Flow

For each model, the full system flow is:

**UI → Service → Repository → CSV File**

This means:

1. the user performs an action from frontend or Postman
2. the request goes to the route
3. the controller calls the service
4. the service applies validation and logic
5. the repository reads from or writes to the CSV file
6. the response is returned to the user

This flow works end-to-end for all three implemented models.

---

## Update and Delete

This part was an extra requirement of the assignment and it was implemented for all three models.

### Package

- update in repository, service, controller, and UI
- delete in repository, service, controller, and UI

### Mascot

- update in repository, service, controller, and UI
- delete in repository, service, controller, and UI

### Review

- update in repository, service, controller, and UI
- delete in repository, service, controller, and UI

So this requirement is fully completed.

---

## Screenshots Folder

Inside `docs/`, I created a screenshots folder to document the implementation visually.

Project documentation structure:

```bash
docs/
├── implementation.md
└── screenshots/
    ├── Package/
    ├── Mascot/
    └── Review/
```

These screenshots prove that CRUD, filtering, UI integration, and testing were completed successfully.

---

## Conclusion

With this implementation, I moved from last week’s project skeleton to a working CRUD system.

I successfully implemented:

- file-based repository storage
- service layer with logic and validation
- UI connected to backend
- create, read, update, delete
- filtering for multiple models
- real testing in Postman and frontend

The three implemented models are:

- **Package**
- **Mascot**
- **Review**

This means the assignment was not completed only at the minimum level, but expanded with multiple real models and full end-to-end functionality.

---

## Final Submission Steps

Before submission, the final steps are:

1. save screenshots inside `docs/screenshots/`
2. keep this file as `docs/implementation.md`
3. commit and push the project to GitHub
4. submit the GitHub repository link
