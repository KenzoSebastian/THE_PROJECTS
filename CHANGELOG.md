# 🗒️ Changelog

All notable changes to the **THE PROJECTS** project will be documented in this file. 

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and this project adheres to Semantic Versioning.

## [0.9.0] - 2026-06-24

### ✨ Added
- **Axios API Client Instance**: Initialized a global Axios instance at `dashboard/lib/api.ts` mapped to `NEXT_PUBLIC_API_URL` / `API_URL` environment variables, defaulting to Vercel host `https://the-projects-chi.vercel.app/`.
- **JWT Authorization Interceptor**: Configured an automatic request interceptor that extracts the client-side bearer token (`the_projects_token`) and binds it as an authorization header on outgoing client requests.

---

## [0.8.0] - 2026-06-24

### ✨ Added
- **NestJS JWT Authentication Service**: Created `/auth/login` for credentials authentication and JWT generation, alongside a protected `/auth/profile` endpoint.
- **Backend Auth Guard Security Gate**: Protected all critical write operations on portfolio projects (`POST /project`, `PATCH /project/:id`, `DELETE /project/:id`) using NestJS `@UseGuards(AuthGuard)`.
- **Bcrypt Password Protection**: Integrated 10-salt bcrypt hashing for user passwords during registration and updates.
- **Demo Database Seeding**: Developed `src/seed.ts` to automatically populate PostgreSQL with the default admin user credentials (`admin@theprojects.dev` / `admin`).

### ⚙️ Changed
- **Prisma Parameter Mapping Fix**: Refactored UserController route handlers to parse UUID strings directly instead of parsing them as numeric types.
- **Technical Specifications Documentation**: Updated backend `README.md` with instructions on JWT integration headers and new REST mapping tables.

---

## [0.7.0] - 2026-06-24

### ✨ Added
- **Login Page (`/login`)**: Built a premium, split-screen authentication console featuring credentials login, inline dark/light theme toggle, custom mock SSO buttons for Google and GitHub, validation feedback, and automated pre-filled credentials.
- **Client-Side Authentication Gate**: Secured all dashboard views inside the admin layout group (`/`, `/projects`, `/activity`, `/manage`) by checking auth state and redirecting unauthenticated users to `/login`.
- **Interactive Logout Pipeline**: Placed a clean logout button in the header profile section to remove authentication states with accompanying Sonner toasts and dynamic route resets.

---

## [0.6.0] - 2026-06-24

### ✨ Added
- **Global Theme Context System**: Implemented a custom React Context provider (`ThemeProvider`) and hook (`useTheme`) for managing light/dark themes with `localStorage` persistence, synced via `.dark` class.
- **Unified Color Transitions**: Configured a global transition CSS class (`transition-colors duration-300 ease-in-out`) on all elements (`*`) in `globals.css` so that all components transition colors synchronously in 300ms when the theme changes.
- **Activity Log Route (`/activity`)**: Built a creative dashboard feed showing a timeline of recent mock changes, mocked daily traffic data visualized using CSS grids, and storage usage metrics.
- **Maintenance & Control Route (`/manage`)**: Created a database control center containing connection diagnostics (pool status, response pings), schema metadata, a local cache reset button, and simulation controls for Cloudinary CDN cleanups.

### ⚙️ Changed
- **Full Shadcn Button & Input Integration**: Migrated all raw textfields and buttons to Shadcn UI components. Configured the root `Toaster` component with `theme="light"` to force light-mode notifications.
- **Enhanced Button Spacing & Padding**: Added vertical padding to all buttons (`py-2`, etc.) to prevent them from looking too flat or squished.
- **Form Sidebar Action Buttons Layout**: Rearranged the bottom action buttons (Submit and Cancel) in the Create and Update form sidebar sheets to align horizontally in a row (`flex-row`) instead of a vertical column.
- **Light Mode Sidebar Toggle Color Fix**: Corrected the active text color and hover state of the "Light" mode button in the sidebar, resolving the bug where active text hover color turned black on a black background.
- **Modular Codebase Refactoring**: Decomposed the monolithic projects page into 9 distinct subcomponents under `dashboard/components/projects/` to strictly adhere to the project standard of keeping each file under 300 lines of code.

---

## [0.5.0] - 2026-06-24

### ✨ Added
- **Interactive Project CRUD UI**: Built a high-fidelity client-side CRUD dashboard for managing portfolio projects (`/projects`) using local component state with fallback to local storage persistence.
- **Relational Dummy Data Module**: Created a structured mock data file at `dashboard/app/data/projects.ts` that strictly reflects the NestJS backend PostgreSQL database models (`Project`, `Image`, `Technology`).
- **Dynamic Project Config Forms**: Developed forms inside slide-out sheets for creation and modification, supporting title-based slug generation, cover image previews, external links, rich markdown descriptions, multi-image gallery urls, and interactive quick-tag technology selections.
- **Dynamic Overview Landing Metrics**: Updated the Dashboard Landing Page (`/`) with dynamic overview metrics (Total Projects, Published, and Drafts) synchronized with the local storage dataset.
- **User Alerts & Confirmations**: Integrated Sonner toast notifications for operations feedback and Dialog confirmation popups for project deletions.

---

## [0.4.0] - 2026-06-23

### ✨ Added
- **Dynamic Relational Patch Engine (PATCH):** Implemented an enterprise-grade update module capable of processing granular textual modifications and relational media synchronization.
- **Stay, Remove, and Add Multi-Asset Logic:** Integrated state-tracking array payload (`retainedImageIds`) inside the `UpdateProjectDto` to selectively persist gallery assets, delete removed assets directly from Cloudinary storage, and concurrent-upload new file streams.
- **Strict-Gate Request Validation Infrastructure:** Configured global request interception using explicit DTO stripping (`whitelist: true`) combined with rejection rules (`forbidNonWhitelisted: true`) to immediately decline payloads containing typos or unregistered dynamic parameters prior to hitting internal services or database layers.

---

## [0.3.0] - 2026-06-23

### ✨ Added
- **Cloudinary Storage Service Integration:** Implemented `CloudinaryService` to stream binary data directly from NestJS interceptors into Cloudinary folders (`the_projects/`).
- **Multipart Form-Data Request Pipeline:** Reconfigured `CreateProjectDto` and `ProjectController` using `FileFieldsInterceptor` to process mixed-content text payloads and parallel multiple file uploads (`coverImageFile`, `imageFiles`, `technologyIconFiles`).
- **Many-to-Many Skill Relational Architecture:** Migrated Prisma schema to support an implicit Many-to-Many connection between `Project` and `Technology` tables with a strict `@unique` name constraint to prevent duplication.
- **Fault-Tolerant Asset Rollback System:** Implemented an automated asset cleanup mechanism that instantly deletes successfully uploaded Cloudinary files if a Prisma database validation or transaction exception occurs during project creation.

---

## [0.2.0] - 2026-06-23

### ✨ Added
- **Prisma ORM Ecosystem Setup:** Configured Prisma Client and initialized database access definitions targeting the cloud PostgreSQL layer.
- **Relational Project Schema:** Established core schema definitions featuring a 1-to-many cascading relationship model mapping `Project` data to `Image` gallery URLs and `Technology` badges.
- **Robust Project CRUD Module:** Implemented comprehensive relational CRUD services inside the NestJS engine equipped with request body validations (DTOs) and standardized `{ status, message, data }` response wrappers.

---

## [0.1.0] - 2026-06-22

### ✨ Added
- **Monorepo Structure Blueprint:** Locked in the global system context using a decoupled monorepo approach.
- **Master Documentation:** Initialized the master English `README.md` complete with an interactive system architecture diagram, visual repository structure (Mermaid.js), tech stack roadmap, and port mapping matrix.
- **Changelog Tracker:** Created this `CHANGELOG.md` repository log to monitor project milestones incrementally.