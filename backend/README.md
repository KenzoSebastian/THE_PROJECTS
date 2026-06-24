# 📁 Backend Service Engine (NestJS)

This directory houses the core REST API application powered by NestJS, Prisma ORM, and PostgreSQL. It serves as the single source of truth for all frontend clients within the ecosystem.

---

## 🏗️ Database Architecture & ERD (Entity-Relationship Diagram)

Below is the structured representation of the data models, attributes, data types, and core constraints managed via Prisma ORM and PostgreSQL.

```mermaid
erDiagram
    User {
        string id PK
        string email UK
        string password
        datetime createdAt
        datetime updatedAt
    }

    Project {
        string id PK
        string title
        string slug UK
        string description
        string content
        string coverImage
        string repoLink
        string demoLink
        boolean isPublished
        datetime createdAt
        datetime updatedAt
    }

    Image {
        string id PK
        string url
        string projectId FK
        datetime createdAt
        datetime updatedAt
    }

    Technology {
        string id PK
        string name
        string icon
        string projectId FK
        datetime createdAt
        datetime updatedAt
    }

    Project ||--o{ Image : "has many (onDelete: Cascade)"
    Project ||--o{ Technology : "has many (onDelete: Cascade)"
```

---

## 📡 REST API Specifications & Endpoint Matrix

### 1. Root & Utility Base (`/`)

| Method | Endpoint  | Access | Description                                   |
| :----- | :-------- | :----- | :-------------------------------------------- |
| `GET`  | `/`       | Public | Application root welcome status check         |
| `GET`  | `/health` | Public | System health checks for service availability |

### 2. Authentication Gateway (`/auth`)

| Method | Endpoint        | Access    | Description                                                 |
| :----- | :-------------- | :-------- | :---------------------------------------------------------- |
| `POST` | `/auth/login`   | Public    | Authenticate credentials and receive a JWT access token      |
| `GET`  | `/auth/profile` | Protected | Retrieve user session payload decoded from the active token |

### 3. User Management (`/user`)

| Method   | Endpoint    | Access | Description                                                    |
| :------- | :---------- | :----- | :------------------------------------------------------------- |
| `POST`   | `/user`     | Public | Register/create a new administrative or member user account    |
| `GET`    | `/user`     | Public | Retrieve a complete list of registered users                   |
| `GET`    | `/user/:id` | Public | Fetch unique profiling and identifier data for a specific user |
| `PATCH`  | `/user/:id` | Public | Modify specific user profile parameters securely               |
| `DELETE` | `/user/:id` | Public | Terminate and erase a user account record permanently          |

### 4. Portfolio Project Management (`/project`)

| Method   | Endpoint       | Access    | Description                                                               |
| :------- | :------------- | :-------- | :------------------------------------------------------------------------ |
| `POST`   | `/project`     | Protected | Create a new portfolio project mapping with multi-file binary uploads     |
| `GET`    | `/project`     | Public    | Retrieve all recorded portfolio projects along with relational nodes      |
| `GET`    | `/project/:id` | Public    | Fetch comprehensive details of a specific project by identity key         |
| `PATCH`  | `/project/:id` | Protected | Execute strict relational sync update (Stay, Add, or Delete media assets) |
| `DELETE` | `/project/:id` | Protected | Permanently remove a project card and cascade erase associated images     |

---

## 🔒 Authentication Integration Guide

To interact with Protected endpoints, you must include the JWT token in your HTTP headers:

1. **Obtain Token**: Send a `POST` request to `/auth/login` with your credentials:
   ```json
   {
     "email": "admin@theprojects.dev",
     "password": "admin"
   }
   ```
   On success, you will receive an `access_token`.
2. **Authorize Request**: Add the token as a Bearer token in the `Authorization` header:
   ```http
   Authorization: Bearer <your_access_token_here>
   ```

---

## ⚙️ Module Internal Architecture

The NestJS application’s internal modular layout follows structural encapsulation design principles. Each domain contains its own Controller, Service, and DTO layers.

```plaintext
src/
├── common/         # Global custom exceptions, guards, and dynamic filters
│   └── filters/    # UniversalExceptionFilter for processing strict validation formats
├── project/        # Portfolio projects handling engine and relational operations
├── storage/        # Cloudinary binary stream storage service orchestration
├── user/           # User management and profile handling engine
├── main.ts         # Core application bootstrap file, global pipes, and filters config
├── app.module.ts   # Root container importing and wiring all core modules together
└── prisma.service.ts # Centralized Prisma Service database instance provider
```

---

## 🛠️ Local Integration & Scripts

### 1. Automated Lifecycle Scripts

The backend engine leverages NPM lifecycle hooks to automate internal configurations. Core developmental operational commands available:

- **`npm install`** : Installs all required dependencies and automatically triggers `npx prisma generate` via the postinstall hook.
- **`npm run start:dev`** : Launches the local NestJS server with hot-reload enabled (watches file changes).
- **`npm run build`** : Compiles the TypeScript source code into a production-ready `/dist` directory.
- **`npm run start:prod`** : Executes the pre-compiled production build.

### 2. Environment Variables Configuration (`.env`)

Create a `.env` file inside the root of this `/backend` directory and populate it with the required integration parameters below (replace with your actual credentials):

```env
# Central PostgreSQL Database Connection (Prisma Infrastructure Data Node)
DATABASE_URL="postgresql://username:password@localhost:5432/database_name?sslmode=verify-full"

# Cloudinary Binary Stream Media Storage Integration
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# JWT Authentication Config node
JWT_SECRET=super-secret-key-123
```
