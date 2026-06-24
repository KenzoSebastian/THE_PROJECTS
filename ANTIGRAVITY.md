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
