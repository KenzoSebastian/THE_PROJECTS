# 🗒️ Changelog

All notable changes to the **THE PROJECTS** project will be documented in this file. 

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and this project adheres to Semantic Versioning.

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