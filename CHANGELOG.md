# 🗒️ Changelog

All notable changes to the **THE PROJECTS** project will be documented in this file. 

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and this project adheres to Semantic Versioning.

---

## [Unreleased]

### ✨ Added
- **Authentication Engine Plan:** Dedicated administrative authentication system using dynamic JWT guards.
- **Direct Object Storage Upload Integration:** Feature to handle media, project images, and asset uploads directly to Object Storage from the HTTP request body payload.

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