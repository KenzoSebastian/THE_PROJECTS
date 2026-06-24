# 🖥️ Administrative Console Dashboard (Next.js)

Halaman ini berisi dokumentasi detail mengenai aplikasi dasbor administratif (**dashboard**) pada ekosistem **THE PROJECTS**. Aplikasi ini dibangun menggunakan Next.js App Router, Tailwind CSS, Axios Client, TanStack Query, dan Shadcn UI.

---

## 🏗️ Fitur Utama (Core Features)

Dasbor kontrol portfolio ini mengintegrasikan beberapa fitur canggih yang siap terhubung dengan backend NestJS:

### 1. Sistem Autentikasi & Gating Rute (`/login`)
*   **Halaman Login Premium**: Desain split-screen responsif dengan panel visual gradien bersinar (glowing radial-gradient) di sisi kiri dan formulir kredensial di sisi kanan.
*   **Demo Sign-in Kredensial**: Dilengkapi info pre-fill dengan email `admin@theprojects.dev` dan sandi `admin` serta tombol simulasi integrasi SSO Google dan GitHub.
*   **Client-Side Security Gate**: Rute utama (`/`, `/projects`, `/activity`, `/manage`) terproteksi penuh menggunakan otentikasi berbasis status React di file layout utama, mengalihkan pengguna ke `/login` jika sesi token kosong.
*   **Interactive Logout**: Menu keluar di header panel admin yang membersihkan data lokal sesi dan memicu notifikasi visual Sonner.

### 2. Manajemen Portofolio Modular (`/projects`)
Halaman pengelolaan proyek dipecah menjadi 9 subkomponen modular terpisah untuk menjaga batas kode di bawah 300 baris:
*   `project-grid.tsx` & `project-card.tsx`: Menampilkan katalog proyek dalam tata letak kartu grid dengan spacing optimal (`--card-spacing: 12px`) dan tinggi sampul visual (`h-32`) untuk mencegah konten meluap.
*   `project-list.tsx`: Visualisasi katalog berbentuk tabel/baris list ringkas.
*   `project-control-bar.tsx`: Filter pencarian dinamis (draf, rilis, teks pencarian).
*   `project-form-sheet.tsx`: Panel geser (*sheet*) formulir tambah/edit proyek.
*   `project-form-techs.tsx` & `project-form-gallery.tsx`: Selektor badge tag teknologi modular dan manajemen URL galeri multi-gambar.
*   `delete-confirm-dialog.tsx`: Dialog konfirmasi Sonner sebelum penghapusan permanen.

### 3. Jaringan Integrasi & Manajemen Status (API & Caching)
*   **Axios Client Instance**: Dikonfigurasi di `lib/api.ts` membaca variabel env `NEXT_PUBLIC_API_URL` or `API_URL` dengan fallback otomatis ke server Vercel `https://the-projects-chi.vercel.app/`.
*   **JWT Request Interceptor**: Secara otomatis memindai penyimpanan lokal (`the_projects_token`) dan menyematkan header `Authorization: Bearer <token>` pada setiap permintaan jaringan HTTP.
*   **TanStack Query State**: Diatur di `lib/query-client.ts` menggunakan query/mutation error loggers terpusat, dengan data *staleTime* 5 menit dan *gcTime* 10 menit untuk optimasi transfer data.

### 4. Pusat Kontrol Server & Timeline (`/manage` & `/activity`)
*   **Diagnostic Tools (`/manage`)**: Panel pengecekan performa pool database relasional, tombol reset penyimpanan cache lokal, status response ping server, serta simulasi pembersihan aset CDN.
*   **Activity Timeline Feed (`/activity`)**: Jalur log historis melacak aktivitas manipulasi portofolio lengkap dengan statistik ringkasan dan diagram batang CSS penggunaan penyimpanan media.

---

## 📂 Struktur Direktori Dashboard

```plaintext
dashboard/
├── app/                  # Next.js App Router
│   ├── (admin)/          # Grouping rute terproteksi login (Overview, Projects, Activity, Manage)
│   │   ├── activity/     # Rute halaman log aktivitas
│   │   ├── manage/       # Rute diagnostik maintenance
│   │   ├── projects/     # Rute pengelolaan portfolio CRUD
│   │   └── layout.tsx    # Gated admin navigation layout (Sidebar & Header & Logout)
│   ├── data/             # Struktur antarmuka tipe data TypeScript & projects dummy data
│   ├── login/            # Rute login panel administratif
│   ├── globals.css       # Mapped Tailwind v4 layer & unified color transitions
│   └── layout.tsx        # Root HTML shell wrapping Providers
├── components/           # React Components
│   ├── providers/        # Context Providers (QueryProvider)
│   ├── projects/         # Subkomponen modular CRUD project panel
│   └── ui/               # Shadcn UI primitives (Button, Card, Input, Separator, etc.)
├── context/              # Theme Context Provider (Light/Dark mode)
└── lib/                  # Axios api instance client & query-client setup
```

---

## 🛠️ Panduan Menjalankan Secara Lokal

### 1. Konfigurasi Environment (`.env.local`)
Buat berkas `.env.local` di dalam folder `dashboard/` untuk mengarahkan API endpoint:

```env
# Alamat Server Backend API (Local maupun Cloud Production)
NEXT_PUBLIC_API_URL="https://the-projects-chi.vercel.app/"
```

### 2. Perintah Pengembangan

Luncurkan perintah berikut di dalam direktori `dashboard/`:

```bash
# Pasang dependensi paket
npm install

# Jalankan server lokal (Development mode)
npm run dev

# Jalankan kompilasi optimasi produksi
npm run build
```

Akses dasbor melalui peramban di alamat `http://http://localhost:3000`.
