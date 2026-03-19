# Class Diagram

This class diagram presents the main architectural components of the **MD Creative – Smart Event & Booking Management System**.

It reflects the layered structure of the backend:
- **Models** for domain entities
- **Repositories** for data access
- **Services** for business logic
- **Controllers** for request handling

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
        +constructor(id, fullName, email, password, role)
    }

    class Package {
        -id: number
        -name: string
        -description: string
        -price: number
        -duration: number
        +constructor(id, name, description, price, duration)
    }

    class Mascot {
        -id: number
        -name: string
        -characterType: string
        -price: number
        +constructor(id, name, characterType, price)
    }

    class Extra {
        -id: number
        -name: string
        -category: string
        -price: number
        +constructor(id, name, category, price)
    }

    class Booking {
        -id: number
        -userId: number
        -packageId: number
        -eventDate: string
        -location: string
        -status: string
        +constructor(id, userId, packageId, eventDate, location, status)
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

    class UserRepository {
        -fileRepository: FileRepository
        +getAll()
        +getById(id)
        +add(user)
        +save()
    }

    class BookingService {
        -bookingRepository: BookingRepository
        +getAllBookings()
        +getBookingById(id)
        +createBooking(data)
        +saveBookings()
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

    class AuthService {
        -userRepository: UserRepository
        +register(data)
        +login(email, password)
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

    class AuthRoutes {
        +POST /api/auth/register
        +POST /api/auth/login
    }

    IRepository <|.. FileRepository

    FileRepository --> Booking : stores
    FileRepository --> Package : stores
    FileRepository --> Mascot : stores
    FileRepository --> Extra : stores
    FileRepository --> User : stores

    BookingRepository --> FileRepository : uses
    PackageRepository --> FileRepository : uses
    MascotRepository --> FileRepository : uses
    ExtraRepository --> FileRepository : uses
    UserRepository --> FileRepository : uses

    BookingService --> BookingRepository : uses
    PackageService --> PackageRepository : uses
    MascotService --> MascotRepository : uses
    AuthService --> UserRepository : uses

    BookingController --> BookingService : uses
    PackageController --> PackageService : uses
    MascotController --> MascotService : uses
    AuthController --> AuthService : uses

    BookingRoutes --> BookingController : calls
    PackageRoutes --> PackageController : calls
    MascotRoutes --> MascotController : calls
    AuthRoutes --> AuthController : calls

    User --> Booking : creates
    Package --> Booking : selected in
    Booking --> Mascot : includes
    Booking --> Extra : includes

Relationships Summary
A User can create one or more Bookings

A Booking is linked to one selected Package

A Booking may include multiple Mascots

A Booking may include multiple Extras

Controllers handle incoming HTTP requests

Services contain business logic

Repositories manage data access and CSV persistence

FileRepository provides a reusable file-based storage mechanism

IRepository defines the repository contract

Notes
This diagram was designed to match the current architecture of the project and reflect the separation of concerns between:

presentation/request handling

business logic

data persistence

domain modeling

It also supports the applied Repository Pattern and helps document the project structure in a clear and professional way.


---