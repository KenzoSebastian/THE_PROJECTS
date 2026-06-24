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
      { id: "tech-1", name: "NestJS", icon: "nestjs" },
      { id: "tech-2", name: "PostgreSQL", icon: "postgresql" },
      { id: "tech-3", name: "Kafka", icon: "kafka" },
      { id: "tech-4", name: "Docker", icon: "docker" }
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
      { id: "tech-1", name: "NestJS", icon: "nestjs" },
      { id: "tech-5", name: "Next.js", icon: "nextjs" },
      { id: "tech-6", name: "Vue.js", icon: "vuejs" },
      { id: "tech-7", name: "Prisma", icon: "prisma" }
    ]
  }
];
