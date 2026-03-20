# Class Diagram

This class diagram presents the main architectural components of the MD Creative – Smart Event & Booking Management System.

It reflects the layered backend structure of the project:
- Models for domain entities
- Repositories for data access and persistence
- Services for business logic
- Controllers for request handling
- Routes for API exposure

## UML Class Diagram

```mermaid
classDiagram
    direction TB

    class User {
        -id: number
        -fullName: string
        -email: string
        -password: string
        -role: string
    }

    class Booking {
        -id: number
        -userId: number
        -packageId: number
        -eventDate: string
        -location: string
        -status: string
    }

    class Package {
        -id: number
        -name: string
        -description: string
        -price: number
        -duration: number
    }

    class Mascot {
        -id: number
        -name: string
        -characterType: string
        -price: number
    }

    class Extra {
        -id: number
        -name: string
        -category: string
        -price: number
    }

    class Activity {
        -id: number
        -name: string
        -description: string
        -price: number
    }

    class InventoryItem {
        -id: number
        -name: string
        -quantity: number
        -availabilityStatus: string
    }

    class StaffAssignment {
        -id: number
        -bookingId: number
        -staffId: number
        -assignedRole: string
    }

    class IRepository {
        <<interface>>
        +getAll()
        +getById(id)
        +add(item)
        +save()
    }

    class FileRepository {
        -filePath: string
        -items: Array
        +load()
        +getAll()
        +getById(id)
        +add(item)
        +save()
    }

    class UserRepository {
        -fileRepository: FileRepository
        +getAll()
        +getById(id)
        +add(user)
        +save()
    }

    class BookingRepository {
        -fileRepository: FileRepository
        +getAll()
        +getById(id)
        +add(booking)
        +save()
    }

    class PackageRepository {
        -fileRepository: FileRepository
        +getAll()
        +getById(id)
        +add(package)
        +save()
    }

    class MascotRepository {
        -fileRepository: FileRepository
        +getAll()
        +getById(id)
        +add(mascot)
        +save()
    }

    class ExtraRepository {
        -fileRepository: FileRepository
        +getAll()
        +getById(id)
        +add(extra)
        +save()
    }

    class ActivityRepository {
        -fileRepository: FileRepository
        +getAll()
        +getById(id)
        +add(activity)
        +save()
    }

    class InventoryRepository {
        -fileRepository: FileRepository
        +getAll()
        +getById(id)
        +add(item)
        +save()
    }

    class StaffAssignmentRepository {
        -fileRepository: FileRepository
        +getAll()
        +getById(id)
        +add(assignment)
        +save()
    }

    class AuthService {
        -userRepository: UserRepository
        +register(data)
        +login(email, password)
    }

    class BookingService {
        -bookingRepository: BookingRepository
        +getAllBookings()
        +getBookingById(id)
        +createBooking(data)
    }

    class PackageService {
        -packageRepository: PackageRepository
        +getAllPackages()
        +getPackageById(id)
    }

    class MascotService {
        -mascotRepository: MascotRepository
        +getAllMascots()
        +getMascotById(id)
    }

    class ExtraService {
        -extraRepository: ExtraRepository
        +getAllExtras()
        +getExtraById(id)
    }

    class ActivityService {
        -activityRepository: ActivityRepository
        +getAllActivities()
        +getActivityById(id)
    }

    class InventoryService {
        -inventoryRepository: InventoryRepository
        +getAllInventoryItems()
        +getInventoryItemById(id)
    }

    class BookingController {
        +getAllBookings(req, res)
        +getBookingById(req, res)
        +createBooking(req, res)
    }

    class PackageController {
        +getAllPackages(req, res)
        +getPackageById(req, res)
    }

    class MascotController {
        +getAllMascots(req, res)
        +getMascotById(req, res)
    }

    class ExtraController {
        +getAllExtras(req, res)
        +getExtraById(req, res)
    }

    class ActivityController {
        +getAllActivities(req, res)
        +getActivityById(req, res)
    }

    class AuthController {
        +register(req, res)
        +login(req, res)
    }

    class BookingRoutes {
        +GET /api/bookings
        +GET /api/bookings/:id
        +POST /api/bookings
    }

    class PackageRoutes {
        +GET /api/packages
        +GET /api/packages/:id
    }

    class MascotRoutes {
        +GET /api/mascots
        +GET /api/mascots/:id
    }

    class ExtraRoutes {
        +GET /api/extras
        +GET /api/extras/:id
    }

    class ActivityRoutes {
        +GET /api/activities
        +GET /api/activities/:id
    }

    class AuthRoutes {
        +POST /api/auth/register
        +POST /api/auth/login
    }

    IRepository <|.. FileRepository

    UserRepository --> FileRepository : uses
    BookingRepository --> FileRepository : uses
    PackageRepository --> FileRepository : uses
    MascotRepository --> FileRepository : uses
    ExtraRepository --> FileRepository : uses
    ActivityRepository --> FileRepository : uses
    InventoryRepository --> FileRepository : uses
    StaffAssignmentRepository --> FileRepository : uses

    AuthService --> UserRepository : uses
    BookingService --> BookingRepository : uses
    PackageService --> PackageRepository : uses
    MascotService --> MascotRepository : uses
    ExtraService --> ExtraRepository : uses
    ActivityService --> ActivityRepository : uses
    InventoryService --> InventoryRepository : uses

    AuthController --> AuthService : uses
    BookingController --> BookingService : uses
    PackageController --> PackageService : uses
    MascotController --> MascotService : uses
    ExtraController --> ExtraService : uses
    ActivityController --> ActivityService : uses

    AuthRoutes --> AuthController : calls
    BookingRoutes --> BookingController : calls
    PackageRoutes --> PackageController : calls
    MascotRoutes --> MascotController : calls
    ExtraRoutes --> ExtraController : calls
    ActivityRoutes --> ActivityController : calls

    User --> Booking : creates
    Package --> Booking : selected in
    Booking --> Mascot : includes
    Booking --> Extra : includes
    Booking --> Activity : may include
    Booking --> StaffAssignment : has
    InventoryItem --> Booking : supports
    
 ```
 ---

# Relationships Summary

## This system defines several important relationships between domain entities:
- User → Booking (1:N)
**One user can create multiple bookings, but each booking belongs to a single user.**
- Package → Booking (1:N)
**A package can be selected in many bookings, while each booking is associated with one package.**
- Booking → Mascot (M:N)
**A booking can include multiple mascots, and a mascot can be part of multiple bookings.**
- Booking → Extra (M:N)
**A booking may include multiple extras, and extras can be reused across different bookings.**
- Booking → Activity (M:N)
**Activities are optional and can be included in multiple bookings.**
- Booking → StaffAssignment (1:N)
**One booking can have multiple staff assignments (e.g., different roles like animator, coordinator).**
- StaffAssignment → User (N:1) (recommended to consider)
**Each staff assignment refers to one staff member (user), while a user can be assigned to multiple bookings.**
- InventoryItem → Booking (M:N / logical association)
**Inventory items support bookings (e.g., costumes, equipment), and the same item may be used across multiple bookings.**

---

# Notes on Relationships
- Many-to-many (M:N) relationships can be implemented using junction tables (e.g., BookingMascots, BookingExtras, BookingActivities).
- These relationships are currently represented conceptually in the diagram and can be extended in implementation if needed.
- The design keeps flexibility for future scaling (e.g., adding availability tracking, conflicts, or scheduling).

# Notes
## This diagram was designed to match the current project architecture and to reflect the separation of concerns between:
- domain modeling
- request handling
- business logic
- data persistence

**It also documents the Repository Pattern through the use of IRepository and FileRepository.**