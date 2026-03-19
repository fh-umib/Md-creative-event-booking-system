# Class Diagram

This class diagram documents the main architectural components of the **MD Creative – Smart Event & Booking Management System**.

It reflects the layered backend structure of the project:
- **Models** for domain entities
- **Repositories** for data access and persistence
- **Services** for business logic
- **Controllers** for request handling
- **Routes** for API endpoint exposure

---

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

    class AuthController {
        +register(req, res)
        +login(req, res)
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

    class AuthRoutes {
        +POST register
        +POST login
    }

    class BookingRoutes {
        +GET bookings
        +GET bookingById
        +POST createBooking
    }

    class PackageRoutes {
        +GET packages
        +GET packageById
    }

    class MascotRoutes {
        +GET mascots
        +GET mascotById
    }

    class ExtraRoutes {
        +GET extras
        +GET extraById
    }

    IRepository <|.. FileRepository

    UserRepository --> FileRepository : uses
    BookingRepository --> FileRepository : uses
    PackageRepository --> FileRepository : uses
    MascotRepository --> FileRepository : uses
    ExtraRepository --> FileRepository : uses

    AuthService --> UserRepository : uses
    BookingService --> BookingRepository : uses
    PackageService --> PackageRepository : uses
    MascotService --> MascotRepository : uses
    ExtraService --> ExtraRepository : uses

    AuthController --> AuthService : uses
    BookingController --> BookingService : uses
    PackageController --> PackageService : uses
    MascotController --> MascotService : uses
    ExtraController --> ExtraService : uses

    AuthRoutes --> AuthController : calls
    BookingRoutes --> BookingController : calls
    PackageRoutes --> PackageController : calls
    MascotRoutes --> MascotController : calls
    ExtraRoutes --> ExtraController : calls

    User --> Booking : creates
    Package --> Booking : selected in
    Booking --> Mascot : includes
    Booking --> Extra : includes
```
---

# Relationships Summary
- A User can create one or more Bookings
- A Booking is linked to one selected Package
- A Booking may include multiple Mascots
- A Booking may include multiple Extras
- Routes forward API requests to controllers
- Controllers handle incoming HTTP requests and responses
- Services contain business logic
- Repositories manage data access and CSV/file persistence
- FileRepository provides reusable file-based storage operations
- IRepository defines the common repository contract

---

# Notes
## This diagram was designed to match the project architecture and to reflect the separation of concerns between:
- presentation and request handling
- business logic
- data access and persistence
- domain modeling

**It also documents the applied Repository Pattern in a clean and professional way.**

---