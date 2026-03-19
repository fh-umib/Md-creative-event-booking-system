# Class Diagram

This class diagram presents the main architectural components of the **MD Creative – Smart Event & Booking Management System**.

It reflects the layered structure of the backend:
- **Models** for domain entities
- **Repositories** for data access
- **Services** for business logic
- **Controllers** for request handling

---

## UML Class Diagram

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

    class Booking {
        -id: number
        -userId: number
        -packageId: number
        -eventDate: string
        -location: string
        -status: string
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

    class BookingRepository
    class PackageRepository
    class MascotRepository
    class ExtraRepository
    class UserRepository

    class BookingService
    class PackageService
    class MascotService
    class AuthService

    class BookingController
    class PackageController
    class MascotController
    class AuthController

    class BookingRoutes
    class PackageRoutes
    class MascotRoutes
    class AuthRoutes

    IRepository <|.. FileRepository

    FileRepository --> Booking
    FileRepository --> Package
    FileRepository --> Mascot
    FileRepository --> Extra
    FileRepository --> User

    BookingRepository --> FileRepository
    PackageRepository --> FileRepository
    MascotRepository --> FileRepository
    ExtraRepository --> FileRepository
    UserRepository --> FileRepository

    BookingService --> BookingRepository
    PackageService --> PackageRepository
    MascotService --> MascotRepository
    AuthService --> UserRepository

    BookingController --> BookingService
    PackageController --> PackageService
    MascotController --> MascotService
    AuthController --> AuthService

    BookingRoutes --> BookingController
    PackageRoutes --> PackageController
    MascotRoutes --> MascotController
    AuthRoutes --> AuthController

    User --> Booking
    Package --> Booking
    Booking --> Mascot
    Booking --> Extra
  ```

---

# Relationships Summary
- A User can create one or more Bookings
- A Booking is linked to one selected Package
- A Booking may include multiple Mascots
- A Booking may include multiple Extras
- Controllers handle incoming HTTP requests
- Services contain business logic
- Repositories manage data access and CSV persistence
- FileRepository provides a reusable file-based storage mechanism
- IRepository defines the repository contract

---
# Notes
## This diagram was designed to match the current architecture of the project and reflect the separation of concerns between:
- presentation/request handling
- business logic
- data persistence
- domain modeling

**It also supports the applied Repository Pattern and helps document the project structure in a clear and professional way.**


---