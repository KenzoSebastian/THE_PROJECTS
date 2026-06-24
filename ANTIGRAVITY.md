# 🛸 ANTIGRAVITY - Rules of Engagement

Selamat datang! File `ANTIGRAVITY.md` ini adalah gerbang utama dan acuan utama bagi AI Coding Assistant (Antigravity) dalam memahami struktur kode, aturan main proyek, gaya penulisan kode, serta alur kerja dalam monorepo **THE PROJECTS**.

---

## 📌 Aturan Utama (Core Rules)

Setiap kali memulai atau menyelesaikan tugas, patuhi aturan berikut:

### 1. Pahami Struktur Terlebih Dahulu (Read Files First)
*   **Sebelum mulai bekerja/menulis kode**, baca terlebih dahulu berkas-berkas dokumentasi penting seperti `README.md` di root dan sub-direktori (misal: `backend/README.md`) untuk memahami struktur sistem, relasi database, dan konfigurasi environment.

### 2. Pemeliharaan Catatan Perubahan (Changelog Maintenance)
*   **Setiap kali menyelesaikan 1 fitur besar/signifikan**, wajib memperbarui berkas `CHANGELOG.md` di root proyek.
*   Format pembaruan harus mengikuti standar **Keep a Changelog** dan **Semantic Versioning** (seperti contoh rilis `[0.4.0]`, `[0.3.0]`, dll.).

### 3. Pembaruan Aturan Secara Berkelanjutan (Rule Synchronization)
*   Setiap kali pengguna (USER) memberikan instruksi tentang aturan baru, gaya penulisan kode, atau batasan arsitektur baru, aturan tersebut **wajib didokumentasikan ke dalam file `ANTIGRAVITY.md` ini**.

### 4. Batasan Jumlah Baris Berkas (Max 300 Lines Rule)
*   **Setiap file kode tidak boleh melebihi 300 baris.** Hal ini bertujuan agar kode tetap modular, bersih, dan mudah dirawat (*maintainable*). Jika sebuah modul atau file bertambah besar, lakukan refactoring dan pisahkan ke dalam subkomponen atau file terpisah.

### 5. Pengujian Wajib Setiap Fitur Baru (Mandatory Testing Rule)
*   **Setiap kali menyelesaikan penulisan atau perubahan fitur (frontend, backend, atau skrip integrasi)**, wajib dilakukan pengujian (testing) secara langsung (misal: production build compilation, typescript checking, linting, api testing menggunakan skrip uji, dll.) untuk memastikan tidak ada bug yang lolos ke tahap commit. Jangan melakukan commit sebelum ada konfirmasi pengujian berhasil.

---

## 💻 Panduan & Gaya Penulisan Kode (Coding Guidelines)

*(Bagian ini akan terus diperbarui seiring berjalannya proyek)*

### Backend (NestJS + Prisma + PostgreSQL)
*   Menggunakan pemisahan modul yang terenkapsulasi (Controller, Service, DTO, Entity).
*   Gunakan validasi payload request yang ketat menggunakan DTO (`class-validator`) dengan menyalakan `whitelist: true` dan `forbidNonWhitelisted: true`.
*   Penanganan file stream menggunakan Cloudinary Integration (`CloudinaryService`).
*   Jika terjadi kesalahan/exception selama transaksi database yang melibatkan upload file, pastikan ada mekanisme rollback aset untuk menghapus file dari Cloudinary.

### Dashboard (Next.js - App Router)
*   Menggunakan App Router, Tailwind CSS, TanStack Query, dan Shadcn UI.
*   Gaya penulisan React modern (Functional Components, Hooks).

### Frontend (Vue.js + Vite)
*   Digunakan pada modul `personal` dan `library`.
*   Menggunakan Tailwind CSS untuk styling dan Pinia untuk state management jika diperlukan.

---

## 📂 Peta Monorepo (Monorepo Map)
*   Root Project: [README.md](file:///C:/Users/kenzo/ngoding/THE_PROJECTS/README.md) & [CHANGELOG.md](file:///C:/Users/kenzo/ngoding/THE_PROJECTS/CHANGELOG.md)
*   Backend API Engine: [backend/](file:///C:/Users/kenzo/ngoding/THE_PROJECTS/backend/)
*   Admin Control Panel: [dashboard/](file:///C:/Users/kenzo/ngoding/THE_PROJECTS/dashboard/)
*   Snippet Explorer: [library/](file:///C:/Users/kenzo/ngoding/THE_PROJECTS/library/)
*   Portfolio Site: [personal/](file:///C:/Users/kenzo/ngoding/THE_PROJECTS/personal/)

---

## 🧠 Memory Ledger & Riwayat Langkah Penting (Memory & Milestones Ledger)

Bagian ini mendokumentasikan langkah-langkah kritis yang telah selesai dikerjakan untuk memudahkan AI Agent berikutnya melakukan sinkronisasi memori secara instan:

### Sprint 1: Pondasi & API Gateway (Backend)
*   **Setup Database Relasional**: Mengonfigurasi Prisma ORM dengan PostgreSQL, mendefinisikan skema tabel `User`, `Project`, `Image` (galeri), dan `Technology` (tag stack).
*   **Asset Service**: Implementasi penanganan upload multi-file ke Cloudinary dengan fault-tolerant rollback (jika input data DB gagal, file yang sudah terunggah ke Cloudinary otomatis dihapus).
*   **Validasi Strict-Gate**: Konfigurasi ValidationPipe dengan parameter `whitelist` dan `forbidNonWhitelisted` untuk menyaring input body ilegal.

### Sprint 2: UI Dashboard & Autentikasi (Frontend + Backend)
*   **UI Dashboard Minimalis & Tema**: Refaktorisasi halaman proyek `/projects` Next.js menjadi 9 subkomponen modular (< 300 baris per file). Penambahan global `ThemeProvider` (Light/Dark mode) dengan transisi warna 300ms.
*   **Activity & Management Dashboard**: Implementasi UI dashboard statistik server, logs, database pool diagnostics, cache reset simulator di rute `/activity` dan `/manage`.
*   **Halaman Login & Client-Side Auth-Gate**: Pembuatan halaman login premium split-screen `/login` dengan mock credentials (`admin@theprojects.dev` / `admin`) dan penambahan guard di layout utama untuk menolak akses tanpa token.
*   **Backend JWT & Bcrypt Authentication**: Pembuatan `AuthModule` di backend dengan JWT token, integrasi `AuthGuard` di semua rute write (`POST`, `PATCH`, `DELETE` projects), dan hashing password menggunakan `bcryptjs` (salt rounds: 10).
*   **Seeding Data Demo**: Pembuatan skrip `src/seed.ts` menggunakan adapter-configured `PrismaService` untuk otomatis menanam data admin pertama (`admin@theprojects.dev` / `admin`).
*   **Verifikasi Integration Testing**: Pembuatan dan eksekusi skrip uji API otomatis `scratch/test-api.js` untuk membuktikan fungsionalitas login, pembatasan akses profil, dan gate-blocking JWT.
*   **Axios API Client**: Pembuatan api client Axios di `dashboard/lib/api.ts` yang membaca basis URL dari env `API_URL` (default: Vercel server) dan menyisipkan JWT Bearer token secara otomatis via request interceptors.
*   **TanStack Query Integration**: Pemasangan `@tanstack/react-query` dengan konfigurasi global `QueryClient` di `dashboard/lib/query-client.ts` dan client-wrapper `QueryProvider` di layout Next.js.
