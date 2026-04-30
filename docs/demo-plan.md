# MD Creative Event Booking System – Demo Plan

---

## 1. Project Title

**MD Creative Event Booking System**  
**Smart Event Booking & Management Platform**

MD Creative Event Booking System is a full-stack web application built to present and manage the services of a creative event business. The system includes two main parts:

- **Public Website** – the part used by clients to explore services and submit booking requests;
- **Admin Panel** – the part used by the administrator to manage bookings, packages, mascots, and other business data.

The goal of the project is to give MD Creative a professional digital platform where services are presented clearly, booking requests are collected in a structured way, and the business data can be managed from one organized admin panel.

---

## 2. Problem the Project Solves

MD Creative offers many different event services, including:

- mascots for children’s events;
- decorations for birthdays, engagements, weddings, baby showers, and family events;
- entertainment activities;
- photo booth and photo box services;
- bounce house and bubble show services;
- combined event packages;
- gallery albums from previous events;
- team and staff presentation.

Without an organized system, clients may find it difficult to understand:

- what services are available;
- which categories and packages exist;
- which package fits their event best;
- how to submit a booking request;
- how to communicate their event details in a structured way.

At the same time, the business needs a simpler way to manage information such as packages, mascots, bookings, and service content.

This project solves that problem by creating a platform where the client can browse services and submit an event request, while the administrator can manage the system from a separate admin panel.

---

## 3. Project Goal

The main goal of the project is to create a practical, clear, and professional system for managing MD Creative’s event services.

The main objectives are:

1. To present the business services in a modern and understandable way.
2. To create a clear client flow from service discovery to booking request.
3. To separate the public side from the admin side.
4. To allow the administrator to manage business data from the admin panel.
5. To create a strong base for future improvements such as online payments, email notifications, advanced roles, and more detailed analytics.

---

## 4. Main Users

The system has two main user groups.

### 4.1 Client

The client is the public user who visits the website to explore MD Creative’s services.

The client can:

- view the home page;
- read about the services;
- browse packages;
- view mascots;
- view decorations and categories;
- view the gallery;
- view the team;
- complete the booking form.

The client’s goal is to get clear information and submit an event request.

### 4.2 Administrator

The administrator is the user who has access to the admin panel.

The administrator can:

- log in through the admin login page;
- view the dashboard;
- manage packages;
- manage mascots;
- check bookings;
- manage system content;
- update data that appears on the public website.

The administrator’s goal is to have better control over the business content and data without changing everything directly in the code.

---

## 5. Demo Flow

The main flow that will be demonstrated live is:

```text
Home Page
→ Packages
→ Booking Page
→ Admin Login
→ Admin Dashboard
→ Admin Packages / Admin Bookings
```

This flow was chosen because it shows the system from beginning to end.

First, the public side is presented. The client enters the website, sees the services, checks the packages, and moves to the booking form.

Then, the admin side is demonstrated. The administrator logs in and manages the data from the admin panel.

This flow is important because it shows that the project is not only a static website, but a system with two user roles and a real usage flow.

---

## 6. Why This Flow Was Chosen

This flow was chosen because it best represents the main purpose of the system.

Instead of showing many pages without a clear connection, this flow tells a complete story:

1. The client enters the website.
2. The client understands what MD Creative offers.
3. The client views the packages.
4. The client goes to the booking form.
5. The admin logs in.
6. The admin manages the data.

This makes the presentation clearer, more professional, and easier for the audience to follow.

---

## 7. What Works Live

During the demo, the following parts will be shown as working live.

### Public Side

- The Home Page opens and presents the business identity.
- The Packages Page opens and shows the package categories.
- The Mascots Page opens and presents the mascot section.
- The Decorations Page opens and presents decoration services.
- The Booking Page opens and allows the user to fill in event details.
- Navigation works without visible errors.
- The public pages are organized and responsive.

### Admin Side

- The Admin Login page opens.
- The Admin Dashboard opens.
- The Admin Packages page opens.
- The Admin Bookings page opens.
- The Admin Panel clearly separates management features from the public website.
- The administrator can view and manage system data.

---

## 8. Real Problem Solved

A real problem solved during the project was stabilizing the connection between the frontend, backend, and routing structure.

Earlier in the project, there were several issues, such as:

- pages that did not open correctly;
- routes that opened the wrong page;
- blank screens in the frontend;
- 404 and 500 errors;
- mismatches between the backend response format and what the frontend expected;
- confusion between public pages and admin pages;
- incorrect imports and file paths;
- modules that were not properly connected to the API.

This was an important problem because even if the user interface looked good, the project could not be demonstrated professionally unless the main flow was stable.

The problem was solved by:

- checking the route structure;
- clearly separating public routes and admin routes;
- fixing imports and paths;
- standardizing frontend-backend connections;
- checking the main endpoints;
- testing the key pages;
- fixing errors that caused blank screens or crashes;
- making sure the demo flow opens without errors.

After these fixes, the project became more stable and ready for a live demo.

---

## 9. Most Important Technical Part

The most important technical part of the project is the separation of the system into clear layers and roles.

In the backend, the project follows an organized structure with:

- routes;
- controllers;
- services;
- repositories / database logic;
- middleware;
- error handling.

In the frontend, the project is organized with:

- pages;
- layouts;
- services;
- hooks;
- components;
- routes;
- types.

This structure makes the project easier to maintain, debug, and extend in the future.

---

## 10. Technologies Used

### Frontend

- React
- TypeScript
- Vite
- React Router DOM
- CSS / inline styling / responsive design

### Backend

- Node.js
- Express.js
- PostgreSQL
- pg
- dotenv
- cors
- bcrypt
- JWT authentication

### Tools

- GitHub for version control
- VS Code for development
- Postman and browser testing for API testing
- pgAdmin for database control
- PowerPoint for demo presentation support

---

## 11. Presentation Structure: 5–7 Minutes

| Time | Section | What Will Be Shown |
|---|---|---|
| 0:00 – 0:40 | Introduction | Project title, problem, and main users |
| 0:40 – 1:30 | Home Page | Public side, navigation, and business identity |
| 1:30 – 2:30 | Packages Page | Organized offers and categories |
| 2:30 – 3:40 | Booking Page | Booking form and client flow |
| 3:40 – 4:30 | Admin Login | Public/admin separation and authentication |
| 4:30 – 5:30 | Admin Dashboard | Admin overview and management structure |
| 5:30 – 6:30 | Admin Packages / Bookings | Data management and booking overview |
| 6:30 – 7:00 | Closing | Solved problem and future improvements |

---

## 12. Detailed Demo Script

This section explains exactly what will be done and said during the live demo.

### 12.1 Introduction

I will start by opening the project on the Home Page.

I will say:

> This project is called MD Creative Event Booking System. It is a full-stack web application built for an event business that offers mascots, decorations, activities, photo booth services, bounce house services, and event packages.
>
> The main problem this project solves is the lack of an organized system where clients can clearly view services and send a structured booking request, while the business can manage the data from an admin panel.
>
> The project has two main sides: the public website for clients and the admin panel for management.

Then I will briefly show the navigation bar and explain that the website contains the main public sections of the business.

---

### 12.2 Home Page

I will show the Home Page first.

I will say:

> This is the public Home Page. It introduces the identity of MD Creative and presents the business in a professional way.
>
> From this page, the client can understand what the company offers and can navigate to packages, mascots, decorations, gallery, team, reviews, or the booking page.

I will point out:

- the brand identity;
- the navigation menu;
- the main call-to-action button;
- the connection to the booking flow.

---

### 12.3 Packages Page

Next, I will click on **Packages**.

I will say:

> This is the Packages Page. Here, the client can explore the available event package categories.
>
> This page is important because it helps the client understand the structure of the offers before submitting a booking request.
>
> Instead of contacting the business without knowing what they need, the client can first browse the available package types and choose the one that fits their event.

I will show how the page presents package categories and explain that packages are one of the main parts that connect the public website with the admin management side.

---

### 12.4 Booking Page

Then I will open the **Booking Page**.

I will say:

> After viewing the services and packages, the client can continue to the booking form.
>
> This page collects the main event information in a structured way. The client can enter personal details, event information, location, selected package, and special requests.

I will explain the form sections:

- client details;
- event information;
- location;
- selected package;
- special requests.

If I fill the form during the demo, I will use demo data such as:

```text
Username: Demo Client
Email: demo@example.com
Phone: +383 44 111 222
Guests: 30
Event Type: Birthday
Event Title: Birthday Party
Location: Vushtrri
Special Request: Mascot and decoration setup
```

I will say:

> This part represents the main client flow. The client moves from viewing the services to sending a structured event request.
>
> This is useful for the business because it collects the important details in one place instead of receiving unorganized messages from different channels.

---

### 12.5 Admin Login

After the public flow, I will open **Admin Login**.

I will say:

> The second part of the system is the Admin Panel.
>
> This part is separated from the public website because the client and the administrator do not perform the same actions.
>
> The client uses the public side to explore services and request a booking, while the administrator uses the admin side to manage the system.

Then I will log in as admin.

---

### 12.6 Admin Dashboard

After logging in, I will open the **Admin Dashboard**.

I will say:

> This is the Admin Dashboard. It gives the administrator an overview of the system and access to the main management sections.
>
> From here, the administrator can move to bookings, packages, mascots, decorations, gallery, staff, and other admin modules.

I will point out:

- the sidebar;
- the dashboard cards;
- the overview section;
- the admin navigation structure.

---

### 12.7 Admin Packages

Next, I will open **Admin Packages**.

I will say:

> This is the package management section. Here, the administrator can view and manage the available packages.
>
> This is important because business offers can change over time. The admin needs a place where packages can be maintained without editing the public page manually.

I will explain that this page represents the management side of the package data.

If CRUD actions are shown live, I can briefly show adding, editing, or deleting a test package. If not, I will only explain the structure to keep the demo clean.

---

### 12.8 Admin Bookings

Then I will open **Admin Bookings**.

I will say:

> This is the bookings section. Here, the administrator can view client booking requests, check statuses, payments, dates, packages, and other booking details.
>
> This page connects the client flow with the internal business management flow. The client submits information from the public side, and the administrator reviews or manages it from the admin side.

I will point out:

- booking list;
- status badges;
- payment status;
- search and filter area;
- booking summary cards.

---

### 12.9 Real Problem Solved

After showing the main demo flow, I will explain the real problem that I solved.

I will say:

> One real problem I solved during development was stabilizing the flow between the public pages, admin pages, frontend routes, and backend API.
>
> Earlier, some pages did not open correctly, some routes pointed to the wrong component, and in some cases the frontend expected a different response format from the backend.
>
> I solved this by separating public and admin routes more clearly, fixing imports, checking endpoint responses, and testing the main demo flow until it worked without visible errors.

---

### 12.10 Future Improvements

I will present the future improvements as extensions, not as unfinished core work.

I will say:

> The project is ready for demo and the main flow works. In the future, it can be extended with stronger backend validation, automated tests, email notifications, online payments, more advanced roles, and a more dynamic analytics dashboard.
>
> These are not blockers for the current demo, but they show how the project can grow into a more complete business platform.

---

### 12.11 Closing

I will close the demo by saying:

> In conclusion, MD Creative Event Booking System provides a practical solution for an event business.
>
> It helps clients understand services and submit event requests, while giving the administrator a panel to manage the business data.
>
> The demo flow shows the most important part of the system: client discovery, booking request, admin login, and management.

---

## 13. Future Improvements and Extensions

The project is functional and ready for demo, but it can be extended further in future versions.

Possible improvements include:

1. **Stronger backend validation**  
   More detailed validation can be added for every form field and request payload.

2. **Automated testing**  
   Unit tests and integration tests can be added to verify the main logic.

3. **More dynamic analytics dashboard**  
   The admin panel could include more real-time statistics, reports, and charts.

4. **Advanced roles**  
   Roles such as staff, manager, and client could be added.

5. **Online payments**  
   A future version could include deposit payments or full online payment integration.

6. **More complete database integration for every module**  
   All modules can be standardized further with full CRUD and consistent API structure.

These improvements do not block the current demo. They show the direction in which the project can continue to develop.

---

## 14. Plan B if Something Does Not Work Live

If something unexpected happens during the live demo, such as:

- backend does not start;
- frontend does not load;
- database connection fails;
- internet connection has problems;
- an endpoint returns an error;
- a page does not load during the presentation;

then Plan B will be used.

Plan B includes:

- README.md;
- docs/demo-plan.md;
- prepared screenshots of the main pages;
- the PowerPoint presentation;
- verbal explanation of the flow;
- showing the code structure in VS Code;
- explaining routes, services, controllers, and public/admin structure;
- showing previous testing outputs if needed.

This makes sure the presentation can continue even if a technical issue happens during the live demo.

---


## 15. Conclusion

MD Creative Event Booking System is a project that provides a real solution for an event business.

The project includes a public side where clients can view services and submit booking requests, and an admin side where the administrator can manage business data.

The demo will focus on the main flow:

```text
Client views services
→ client checks packages
→ client completes the booking form
→ admin logs in
→ admin manages the data
```

This flow clearly shows that the project has a practical purpose, an organized structure, and strong potential for future development.
