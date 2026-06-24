export interface Technology {
  id: string;
  name: string;
  icon?: string | null;
}

export interface Image {
  id: string;
  url: string;
  projectId: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  coverImage: string;
  repoLink?: string | null;
  demoLink?: string | null;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  images: Image[];
  technologies: Technology[];
}

export const initialProjects: Project[] = [
  {
    id: "project-1",
    title: "E-Commerce Microservices",
    slug: "e-commerce-microservices",
    description: "Sistem e-commerce berskala besar menggunakan arsitektur microservices dengan NestJS, Kafka, dan Docker.",
    content: "### Detail Proyek\nProyek ini diimplementasikan menggunakan NestJS sebagai framework utama, dengan komunikasi antar layanan menggunakan Apache Kafka. Database yang digunakan adalah PostgreSQL untuk data transaksi dan MongoDB untuk katalog produk.\n\n### Fitur Utama\n- Autentikasi JWT dengan OAuth2\n- Payment Gateway Integration (Midtrans)\n- Real-time Notifications via WebSockets\n- Distributed Tracing dengan Jaeger",
    coverImage: "https://images.unsplash.com/photo-1557821552-17105176677c?w=600&auto=format&fit=crop&q=60",
    repoLink: "https://github.com/kenzo/ecommerce-microservices",
    demoLink: "https://ecommerce.kenzo.dev",
    isPublished: true,
    createdAt: "2026-06-20T08:00:00.000Z",
    updatedAt: "2026-06-23T10:00:00.000Z",
    images: [
      { id: "img-1-1", url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=60", projectId: "project-1" },
      { id: "img-1-2", url: "https://images.unsplash.com/photo-1508873535684-277a3cbcc4e8?w=600&auto=format&fit=crop&q=60", projectId: "project-1" }
    ],
    technologies: [
      { id: "tech-1-1", name: "NestJS", icon: "nestjs" },
      { id: "tech-1-2", name: "PostgreSQL", icon: "postgresql" },
      { id: "tech-1-3", name: "Kafka", icon: "kafka" },
      { id: "tech-1-4", name: "Docker", icon: "docker" }
    ]
  },
  {
    id: "project-2",
    title: "Personal Portfolio & Snippet Library",
    slug: "personal-portfolio-snippet-library",
    description: "Monorepo modern untuk web portfolio personal, snippet library, dan dashboard admin kontrol.",
    content: "### Latar Belakang\nProyek ini adalah monorepo tempat Anda berada sekarang! Dirancang untuk mengelola seluruh ekosistem web portofolio personal dan library kode snippet yang sering digunakan agar tidak perlu mencarinya berulang kali di github.\n\n### Struktur Modul\n1. **Backend**: NestJS Core API Engine\n2. **Dashboard**: Next.js Admin Control Panel\n3. **Library**: Vue.js Snippet Explorer\n4. **Personal**: Vue.js Portfolio Site",
    coverImage: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=600&auto=format&fit=crop&q=60",
    repoLink: "https://github.com/kenzo/the-projects",
    demoLink: null,
    isPublished: false,
    createdAt: "2026-06-22T09:00:00.000Z",
    updatedAt: "2026-06-24T16:00:00.000Z",
    images: [
      { id: "img-2-1", url: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=600&auto=format&fit=crop&q=60", projectId: "project-2" }
    ],
    technologies: [
      { id: "tech-2-1", name: "NestJS", icon: "nestjs" },
      { id: "tech-2-2", name: "Next.js", icon: "nextjs" },
      { id: "tech-2-3", name: "Vue.js", icon: "vuejs" },
      { id: "tech-2-4", name: "Prisma", icon: "prisma" }
    ]
  },
  {
    id: "project-3",
    title: "DevFlow Chat Application",
    slug: "devflow-chat-application",
    description: "Aplikasi obrolan real-time untuk developer terintegrasi dengan syntax highlighting share.",
    content: "### Ringkasan Aplikasi\nDevFlow adalah platform diskusi instan di mana developer dapat berdiskusi sambil melampirkan blok kode pemrograman yang terformat dengan warna syntax sesuai bahasanya.\n\n### Stack Utama\n- Socket.io untuk protokol WebSocket dua arah secara instan.\n- Express.js & MongoDB untuk backend storage penyimpanan pesan.\n- React & Tailwind CSS di sisi klien.",
    coverImage: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&auto=format&fit=crop&q=60",
    repoLink: "https://github.com/kenzo/devflow-chat",
    demoLink: "https://devflow.kenzo.dev",
    isPublished: true,
    createdAt: "2026-06-18T10:00:00.000Z",
    updatedAt: "2026-06-19T14:30:00.000Z",
    images: [],
    technologies: [
      { id: "tech-3-1", name: "React", icon: "react" },
      { id: "tech-3-2", name: "Node.js", icon: "nodejs" },
      { id: "tech-3-3", name: "Tailwind CSS", icon: "tailwindcss" },
      { id: "tech-3-4", name: "MongoDB", icon: "mongodb" }
    ]
  },
  {
    id: "project-4",
    title: "Antigravity CLI Agent",
    slug: "antigravity-cli-agent",
    description: "Perkakas CLI berbasis AI untuk otomatisasi pengerjaan kode terstruktur dan refactoring proyek.",
    content: "### Otomatisasi CLI\nCLI ini diintegrasikan langsung dengan LLM Gemini 1.5 Pro/Flash untuk membaca struktur workspace lokal pengguna secara aman dan memberikan saran perbaikan kode secara otomatis.\n\n### Fitur Utama\n- Membaca file workspace dan menghasilkan diff edit.\n- Manajemen task background interaktif.\n- Pelacakan error type-checking otomatis.",
    coverImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=60",
    repoLink: "https://github.com/kenzo/antigravity-cli",
    demoLink: null,
    isPublished: true,
    createdAt: "2026-06-15T07:20:00.000Z",
    updatedAt: "2026-06-21T09:15:00.000Z",
    images: [],
    technologies: [
      { id: "tech-4-1", name: "TypeScript", icon: "typescript" },
      { id: "tech-4-2", name: "Node.js", icon: "nodejs" }
    ]
  },
  {
    id: "project-5",
    title: "Vue Code Snippet Explorer",
    slug: "vue-code-snippet-explorer",
    description: "Penjelajah snippet kode Vue.js berkinerja tinggi yang ditenagai oleh Shiki untuk render visual berkilau.",
    content: "### Library Explorer\nSistem front-end yang dirancang menggunakan Vue 3 dan Vite untuk mengkatalogkan pustaka potongan kode reusable personal agar dapat diakses dengan cepat.\n\n### Fitur Utama\n- Render syntax highlighting Shiki secara client-side.\n- Fitur salin sekali klik (*one-click copy*).\n- Pencarian instan (instant filtering) bebas lag.",
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=60",
    repoLink: "https://github.com/kenzo/vue-snippet-library",
    demoLink: "https://library.kenzo.dev",
    isPublished: true,
    createdAt: "2026-06-12T04:10:00.000Z",
    updatedAt: "2026-06-22T08:00:00.000Z",
    images: [
      { id: "img-5-1", url: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=600&auto=format&fit=crop&q=60", projectId: "project-5" }
    ],
    technologies: [
      { id: "tech-5-1", name: "Vue.js", icon: "vuejs" },
      { id: "tech-5-2", name: "Tailwind CSS", icon: "tailwindcss" },
      { id: "tech-5-3", name: "TypeScript", icon: "typescript" }
    ]
  },
  {
    id: "project-6",
    title: "Task Orchestrator Dashboard",
    slug: "task-orchestrator-dashboard",
    description: "Dashboard kontrol terpusat untuk monitoring job queue secara real-time.",
    content: "### Latar Belakang\nSebuah portal web yang dikhususkan untuk melacak ribuan pekerjaan background antrean (queue) yang sedang diproses di server agar transparan.\n\n### Fitur Utama\n- Visualisasi grafik diagram batang performa pemrosesan antrean.\n- Dukungan dark mode penuh.\n- Integrasi polling berkala via TanStack Query.",
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=60",
    repoLink: "https://github.com/kenzo/task-orchestrator",
    demoLink: null,
    isPublished: false,
    createdAt: "2026-06-08T09:00:00.000Z",
    updatedAt: "2026-06-14T11:00:00.000Z",
    images: [],
    technologies: [
      { id: "tech-6-1", name: "Next.js", icon: "nextjs" },
      { id: "tech-6-2", name: "PostgreSQL", icon: "postgresql" },
      { id: "tech-6-3", name: "Docker", icon: "docker" }
    ]
  },
  {
    id: "project-7",
    title: "Cloud Metric Monitor CLI",
    slug: "cloud-metric-monitor-cli",
    description: "Perkakas CLI dalam bahasa Go untuk melacak penggunaan CPU/Memory cloud server Anda.",
    content: "### Pemantauan Server\nMetrik performa dikirimkan dari agen server lokal yang ditulis dalam bahasa Go ke server pusat data, yang kemudian dipetakan ke database relasional PostgreSQL.\n\n### Kelebihan\n- Sangat hemat memori (under 10MB RAM usage pada server).\n- Keamanan tinggi menggunakan TLS handshake mutual (mTLS).",
    coverImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=60",
    repoLink: "https://github.com/kenzo/metric-monitor",
    demoLink: "https://status.kenzo.dev",
    isPublished: true,
    createdAt: "2026-06-05T03:00:00.000Z",
    updatedAt: "2026-06-11T12:00:00.000Z",
    images: [],
    technologies: [
      { id: "tech-7-1", name: "PostgreSQL", icon: "postgresql" },
      { id: "tech-7-2", name: "React", icon: "react" }
    ]
  }
];
