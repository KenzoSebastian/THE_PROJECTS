# 🖥️ Administrative Console Dashboard (Next.js)

This page contains the detailed documentation of the administrative console application (**dashboard**) within the **THE PROJECTS** ecosystem. The application is built using Next.js App Router, Tailwind CSS, Axios Client, TanStack Query, and Shadcn UI.

---

## 🏗️ Core Features

This portfolio control dashboard integrates several advanced features ready to connect with the NestJS backend:

### 1. Authentication System & Route Gating (`/login`)
*   **Premium Login Page**: A responsive split-screen design featuring a glowing radial-gradient visual panel on the left and a credentials form on the right.
*   **Demo Credentials Sign-in**: Pre-filled with demo credentials (email: `admin@theprojects.dev`, password: `admin`), along with buttons simulating Google and GitHub SSO integrations.
*   **Client-Side Security Gate**: The primary routes (`/`, `/projects`, `/activity`, `/manage`) are fully protected via React state check in the main layout file, automatically redirecting users to `/login` if the session token is empty.
*   **Interactive Logout**: A logout trigger in the header admin panel profile section that clears local session storage and displays a Sonner notification.

### 2. Modular Portfolio Management (`/projects`)
The project management view is decomposed into 9 modular subcomponents to strictly keep files under the 300-line code limit:
*   `project-grid.tsx` & `project-card.tsx`: Display the catalog in a clean grid card layout with optimized spacing (`--card-spacing: 12px`) and cover height (`h-32`) to prevent content overflow.
*   `project-list.tsx`: Display a tabular list row representation of the catalog.
*   `project-control-bar.tsx`: Dynamic filters (draft, published, search query).
*   `project-form-sheet.tsx`: Slide-out panel form for project creation/modification.
*   `project-form-techs.tsx` & `project-form-gallery.tsx`: Modular technology badge selectors and multi-image URL gallery managers.
*   `delete-confirm-dialog.tsx`: Confirmation trigger dialog before permanent deletion.

### 3. Network Integration & State Management (API & Caching)
*   **Axios Client Instance**: Configured in `lib/api.ts` to parse environment variables `NEXT_PUBLIC_API_URL` or `API_URL` with a fallback default endpoint.
*   **JWT Request Interceptor**: Automatically scans local storage (`the_projects_token`) and appends the `Authorization: Bearer <token>` header to all outgoing HTTP calls.
*   **TanStack Query State**: Managed in `lib/query-client.ts` with centralized query/mutation error loggers, utilizing a 5-minute *staleTime* and 10-minute *gcTime* cache lifecycle.

### 4. Server Maintenance Control & Logs (`/manage` & `/activity`)
*   **Diagnostic Tools (`/manage`)**: Performance monitoring panel for database connection pools, local cache cleaners, response ping diagnostics, and simulated Cloudinary CDN asset cleaning triggers.
*   **Activity Timeline Feed (`/activity`)**: A log feed tracking portfolio modifications, complete with statistical charts and a CSS-based storage space usage graph.

---

## 📂 Dashboard Directory Structure

```plaintext
dashboard/
├── app/                  # Next.js App Router
│   ├── (admin)/          # Protected admin route group (Overview, Projects, Activity, Manage)
│   │   ├── activity/     # Activity logs route
│   │   ├── manage/       # Maintenance and diagnostic route
│   │   ├── projects/     # Portfolio projects CRUD route
│   │   └── layout.tsx    # Gated admin navigation layout (Sidebar, Header, Logout)
│   ├── data/             # TypeScript interface definitions & mock projects data
│   ├── login/            # Administrative login route
│   ├── globals.css       # Mapped Tailwind v4 layer & unified color transitions
│   └── layout.tsx        # Root HTML layout shell wrapping providers
├── components/           # React Components
│   ├── providers/        # Context Providers (QueryProvider)
│   ├── projects/         # Modular CRUD project components
│   └── ui/               # Shadcn UI primitives (Button, Card, Input, Separator, etc.)
├── context/              # Theme Context Provider (Light/Dark mode)
└── lib/                  # Axios api instance client & query-client setup
```

---

## 🛠️ Local Development Guide

### 1. Environment Variables Configuration (`.env.local`)
Create a `.env.local` file inside the `dashboard/` directory to configure the API endpoint:

```env
# URL address of the backend API service (local or production)
NEXT_PUBLIC_API_URL="https://api.example.com/"
```

### 2. CLI Commands

Run the following commands within the `dashboard/` directory:

```bash
# Install dependencies
npm install

# Run the local development server
npm run dev

# Compile the optimized production build
npm run build
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the dashboard.
