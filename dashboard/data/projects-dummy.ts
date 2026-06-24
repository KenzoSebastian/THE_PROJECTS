export interface Technology {
  id: string;
  name: string;
  icon: string;
}

export interface ProjectImage {
  id: string;
  url: string;
}

export interface ProjectDashboardData {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  coverImage: string;
  repoLink: string | null;
  demoLink: string | null;
  isPublished: boolean;
  createdAt: string;
  images: ProjectImage[];
  technologies: Technology[];
}

export const mockProjects: ProjectDashboardData[] = [
  {
    id: "proj-1",
    title: "Energi Link Admin Dashboard",
    slug: "energi-link-admin-dashboard",
    description: "Management interface for electricity payment and utility billing application.",
    content: "## System Overview\nDetailed layout and charts for managing consumer transactions.",
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600",
    repoLink: "https://github.com/kenzosebastian/energi-link",
    demoLink: "https://energi-link.vercel.app",
    isPublished: true,
    createdAt: "2026-06-24T07:00:00.000Z",
    images: [{ id: "img-1", url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=500" }],
    technologies: [
      { id: "tech-1", name: "React", icon: "react" },
      { id: "tech-2", name: "Next.js", icon: "nextjs" },
      { id: "tech-3", name: "Tailwind CSS", icon: "tailwind" },
    ],
  },
  {
    id: "proj-2",
    title: "Expired Date Hypermart App",
    slug: "expired-date-hypermart-app",
    description: "Mobile application built using Expo and React Native to track product expiry.",
    content: "## Mobile Architecture\nAutomated push notifications for warehouse tracking.",
    coverImage: "https://images.unsplash.com/photo-1510519138101-570d1dca3d66?q=80&w=600",
    repoLink: null,
    demoLink: null,
    isPublished: false,
    createdAt: "2026-06-24T07:00:00.000Z",
    images: [],
    technologies: [
      { id: "tech-4", name: "React Native", icon: "react" },
      { id: "tech-5", name: "Expo", icon: "expo" },
    ],
  },
];
