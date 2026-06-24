"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { 
  Plus, Search, Edit2, Trash2, ExternalLink, 
  Globe, Eye, EyeOff, PlusCircle, X, 
  Images, FolderGit, LayoutGrid, List, SlidersHorizontal, Check
} from "lucide-react";
import { cn } from "@/lib/utils";

// Custom inline SVG for Github to avoid dependency issues with lucide-react versions
const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    width="16"
    height="16"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
    {...props}
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle 
} from "@/components/ui/card";
import {
  Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetFooter, SheetClose
} from "@/components/ui/sheet";
import { 
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle
} from "@/components/ui/dialog";
import { initialProjects, Project, Technology, Image as ProjectImage } from "@/app/data/projects";

const PREDEFINED_TECHS = [
  "NestJS", "Next.js", "React", "Vue.js", "Tailwind CSS", 
  "Prisma", "PostgreSQL", "MongoDB", "Docker", "Kafka", 
  "TypeScript", "GraphQL", "Express", "Node.js"
];

const generateSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [mounted, setMounted] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all");
  const [techFilter, setTechFilter] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Form States
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    content: "",
    coverImage: "",
    repoLink: "",
    demoLink: "",
    isPublished: false,
    technologies: [] as string[],
    images: [] as string[],
  });

  // Additional form helpers
  const [newTechInput, setNewTechInput] = useState("");
  const [newImageInput, setNewImageInput] = useState("");

  // Delete States
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  // Load from local storage
  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("the_projects_dummy_projects");
    if (stored) {
      try {
        setProjects(JSON.parse(stored));
      } catch (e) {
        setProjects(initialProjects);
      }
    } else {
      setProjects(initialProjects);
      localStorage.setItem("the_projects_dummy_projects", JSON.stringify(initialProjects));
    }
  }, []);

  // Save helper
  const saveProjects = (updatedProjects: Project[]) => {
    setProjects(updatedProjects);
    localStorage.setItem("the_projects_dummy_projects", JSON.stringify(updatedProjects));
  };

  // Sync title with slug
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setFormData(prev => ({
      ...prev,
      title: val,
      slug: editingId ? prev.slug : generateSlug(val) // only auto-generate slug for new items
    }));
  };

  // Handle Form Submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      toast.error("Title is required!");
      return;
    }
    if (!formData.coverImage.trim()) {
      toast.error("Cover image URL is required!");
      return;
    }

    const projectSlug = formData.slug.trim() || generateSlug(formData.title);

    // Check if slug is unique among other projects
    const isSlugTaken = projects.some(p => p.slug === projectSlug && p.id !== editingId);
    if (isSlugTaken) {
      toast.error("Project Slug must be unique!");
      return;
    }

    const timestamp = new Date().toISOString();

    if (editingId) {
      // Edit mode
      const updated = projects.map(p => {
        if (p.id === editingId) {
          const techs: Technology[] = formData.technologies.map((t, idx) => ({
            id: `tech-${editingId}-${idx}`,
            name: t,
            icon: t.toLowerCase()
          }));
          const imgs: ProjectImage[] = formData.images.map((url, idx) => ({
            id: `img-${editingId}-${idx}`,
            url,
            projectId: editingId
          }));
          
          return {
            ...p,
            title: formData.title,
            slug: projectSlug,
            description: formData.description,
            content: formData.content,
            coverImage: formData.coverImage,
            repoLink: formData.repoLink || null,
            demoLink: formData.demoLink || null,
            isPublished: formData.isPublished,
            updatedAt: timestamp,
            technologies: techs,
            images: imgs
          };
        }
        return p;
      });
      saveProjects(updated);
      toast.success("Project updated successfully!");
    } else {
      // Create mode
      const newId = `project-${Date.now()}`;
      const techs: Technology[] = formData.technologies.map((t, idx) => ({
        id: `tech-${newId}-${idx}`,
        name: t,
        icon: t.toLowerCase()
      }));
      const imgs: ProjectImage[] = formData.images.map((url, idx) => ({
        id: `img-${newId}-${idx}`,
        url,
        projectId: newId
      }));

      const newProject: Project = {
        id: newId,
        title: formData.title,
        slug: projectSlug,
        description: formData.description,
        content: formData.content,
        coverImage: formData.coverImage,
        repoLink: formData.repoLink || null,
        demoLink: formData.demoLink || null,
        isPublished: formData.isPublished,
        createdAt: timestamp,
        updatedAt: timestamp,
        technologies: techs,
        images: imgs
      };

      saveProjects([newProject, ...projects]);
      toast.success("Project created successfully!");
    }

    setIsOpen(false);
    resetForm();
  };

  // Delete Action
  const handleDelete = () => {
    if (!deleteTargetId) return;
    const updated = projects.filter(p => p.id !== deleteTargetId);
    saveProjects(updated);
    toast.success("Project deleted successfully!");
    setDeleteTargetId(null);
  };

  // Toggle publish quick action
  const togglePublish = (id: string, currentStatus: boolean) => {
    const updated = projects.map(p => {
      if (p.id === id) {
        return { ...p, isPublished: !currentStatus, updatedAt: new Date().toISOString() };
      }
      return p;
    });
    saveProjects(updated);
    toast.success(`Project ${!currentStatus ? "published" : "set to draft"}!`);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      slug: "",
      description: "",
      content: "",
      coverImage: "",
      repoLink: "",
      demoLink: "",
      isPublished: false,
      technologies: [],
      images: [],
    });
    setEditingId(null);
    setNewTechInput("");
    setNewImageInput("");
  };

  const handleEdit = (project: Project) => {
    setFormData({
      title: project.title,
      slug: project.slug,
      description: project.description,
      content: project.content,
      coverImage: project.coverImage,
      repoLink: project.repoLink || "",
      demoLink: project.demoLink || "",
      isPublished: project.isPublished,
      technologies: project.technologies.map(t => t.name),
      images: project.images.map(img => img.url),
    });
    setEditingId(project.id);
    setIsOpen(true);
  };

  const handleAddTech = () => {
    if (newTechInput.trim() && !formData.technologies.includes(newTechInput.trim())) {
      setFormData(prev => ({
        ...prev,
        technologies: [...prev.technologies, newTechInput.trim()]
      }));
      setNewTechInput("");
    }
  };

  const handleTogglePredefinedTech = (tech: string) => {
    setFormData(prev => {
      const exists = prev.technologies.includes(tech);
      if (exists) {
        return { ...prev, technologies: prev.technologies.filter(t => t !== tech) };
      } else {
        return { ...prev, technologies: [...prev.technologies, tech] };
      }
    });
  };

  const handleRemoveTech = (tech: string) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter(t => t !== tech)
    }));
  };

  const handleAddImage = () => {
    if (newImageInput.trim() && !formData.images.includes(newImageInput.trim())) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, newImageInput.trim()]
      }));
      setNewImageInput("");
    }
  };

  const handleRemoveImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, idx) => idx !== index)
    }));
  };

  // Filter projects logic
  const filteredProjects = projects.filter(p => {
    const matchesSearch = 
      p.title.toLowerCase().includes(search.toLowerCase()) || 
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      p.technologies.some(t => t.name.toLowerCase().includes(search.toLowerCase()));
      
    const matchesStatus = 
      statusFilter === "all" || 
      (statusFilter === "published" && p.isPublished) || 
      (statusFilter === "draft" && !p.isPublished);

    const matchesTech = 
      !techFilter || 
      p.technologies.some(t => t.name.toLowerCase() === techFilter.toLowerCase());

    return matchesSearch && matchesStatus && matchesTech;
  });

  if (!mounted) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Panel */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
            <FolderGit className="size-6 text-orange-600" />
            Portfolio Projects
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-xs">
            Manage your project portfolio and developer showcases.
          </p>
        </div>

        {/* Create Trigger Sheet */}
        <Sheet open={isOpen} onOpenChange={(open) => {
          setIsOpen(open);
          if (!open) resetForm();
        }}>
          <Button 
            onClick={() => {
              resetForm();
              setIsOpen(true);
            }}
            className="rounded-full bg-zinc-950 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200 shadow-md font-semibold text-xs py-2 px-5 flex items-center gap-1.5 transition-all duration-300 transform active:scale-95"
          >
            <Plus className="size-4" /> Create Project
          </Button>
          
          <SheetContent className="w-full sm:max-w-xl overflow-y-auto border-l border-zinc-200/50 bg-white dark:border-zinc-800/50 dark:bg-zinc-900 p-6 flex flex-col h-full rounded-l-[24px]">
            <SheetHeader className="mb-4">
              <SheetTitle className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
                {editingId ? "Edit Project Details" : "Create New Project"}
              </SheetTitle>
              <SheetDescription className="text-zinc-500 dark:text-zinc-400 text-xs">
                {editingId 
                  ? "Modifikasi data project portfolio Anda dan sinkronisasikan perubahannya." 
                  : "Tambahkan project baru ke dalam database portfolio Anda."
                }
              </SheetDescription>
            </SheetHeader>

            <form onSubmit={handleSubmit} className="flex-1 space-y-5 pb-6">
              {/* Title & Slug */}
              <div className="grid gap-3">
                <div className="grid gap-1">
                  <label htmlFor="title" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Project Title *</label>
                  <Input 
                    id="title"
                    placeholder="E.g. E-Commerce Microservices"
                    value={formData.title}
                    onChange={handleTitleChange}
                    className="rounded-xl border-zinc-200 dark:border-zinc-800 focus-visible:ring-orange-500"
                    required
                  />
                </div>

                <div className="grid gap-1">
                  <label htmlFor="slug" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Project Slug</label>
                  <Input 
                    id="slug"
                    placeholder="e-commerce-microservices"
                    value={formData.slug}
                    onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                    className="rounded-xl border-zinc-200 dark:border-zinc-800 focus-visible:ring-orange-500 bg-zinc-50 dark:bg-zinc-950/40"
                  />
                  <p className="text-[10px] text-zinc-400">Digunakan untuk URL web portfolio (harus unik).</p>
                </div>
              </div>

              {/* Cover Image */}
              <div className="grid gap-1">
                <label htmlFor="coverImage" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Cover Image URL *</label>
                <Input 
                  id="coverImage"
                  placeholder="https://images.unsplash.com/photo-..."
                  value={formData.coverImage}
                  onChange={(e) => setFormData(prev => ({ ...prev, coverImage: e.target.value }))}
                  className="rounded-xl border-zinc-200 dark:border-zinc-800 focus-visible:ring-orange-500"
                  required
                />
                {formData.coverImage && (
                  <div className="mt-2 relative rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 h-28 w-full bg-zinc-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={formData.coverImage} 
                      alt="Cover Preview" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1594729095022-e2f6d2eece9c?w=600";
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Links */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="grid gap-1">
                  <label htmlFor="repoLink" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-1">
                    <GithubIcon className="size-3" /> Repository Link
                  </label>
                  <Input 
                    id="repoLink"
                    placeholder="https://github.com/..."
                    value={formData.repoLink}
                    onChange={(e) => setFormData(prev => ({ ...prev, repoLink: e.target.value }))}
                    className="rounded-xl border-zinc-200 dark:border-zinc-800 focus-visible:ring-orange-500"
                  />
                </div>

                <div className="grid gap-1">
                  <label htmlFor="demoLink" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-1">
                    <Globe className="size-3" /> Live Demo Link
                  </label>
                  <Input 
                    id="demoLink"
                    placeholder="https://my-app.dev"
                    value={formData.demoLink}
                    onChange={(e) => setFormData(prev => ({ ...prev, demoLink: e.target.value }))}
                    className="rounded-xl border-zinc-200 dark:border-zinc-800 focus-visible:ring-orange-500"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="grid gap-1">
                <label htmlFor="description" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Short Description</label>
                <Textarea 
                  id="description"
                  placeholder="Ringkasan singkat mengenai tujuan dan teknologi project..."
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="rounded-xl border-zinc-200 dark:border-zinc-800 focus-visible:ring-orange-500 h-16 min-h-16"
                />
              </div>

              {/* Content */}
              <div className="grid gap-1">
                <label htmlFor="content" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Project Details (Markdown Supported)</label>
                <Textarea 
                  id="content"
                  placeholder="### Detail Proyek
Tuliskan deskripsi lengkap, tantangan, dan arsitektur sistem proyek di sini..."
                  value={formData.content}
                  onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  className="rounded-xl border-zinc-200 dark:border-zinc-800 focus-visible:ring-orange-500 h-28 min-h-28"
                />
              </div>

              {/* Technologies Manager */}
              <div className="grid gap-2 border border-zinc-200/60 dark:border-zinc-800/60 rounded-2xl p-3 bg-zinc-50/50 dark:bg-zinc-950/20">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Technologies / Stack</label>
                
                {/* Tech Input */}
                <div className="flex gap-2">
                  <Input 
                    placeholder="E.g. TanStack Query"
                    value={newTechInput}
                    onChange={(e) => setNewTechInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddTech();
                      }
                    }}
                    className="rounded-xl border-zinc-200 dark:border-zinc-800 focus-visible:ring-orange-500 h-9"
                  />
                  <Button type="button" onClick={handleAddTech} size="sm" variant="outline" className="rounded-xl">Add</Button>
                </div>

                {/* Predefined Techs list */}
                <div className="mt-2">
                  <p className="text-[10px] text-zinc-400 mb-1">Predefined Quick Tags:</p>
                  <div className="flex flex-wrap gap-1">
                    {PREDEFINED_TECHS.map(tech => {
                      const isSelected = formData.technologies.includes(tech);
                      return (
                        <button
                          key={tech}
                          type="button"
                          onClick={() => handleTogglePredefinedTech(tech)}
                          className={cn(
                            "text-[10px] px-2 py-0.5 rounded-full transition-all border",
                            isSelected 
                              ? "bg-zinc-900 text-white border-zinc-900 dark:bg-white dark:text-zinc-950 dark:border-white font-medium" 
                              : "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-400 dark:bg-zinc-900 dark:text-zinc-400 dark:border-zinc-800 dark:hover:border-zinc-600"
                          )}
                        >
                          {tech}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Selected Techs */}
                {formData.technologies.length > 0 && (
                  <div className="mt-2 pt-2 border-t border-zinc-200/50 dark:border-zinc-800/50">
                    <p className="text-[10px] text-zinc-400 mb-1">Selected Stack:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {formData.technologies.map(tech => (
                        <span key={tech} className="inline-flex items-center gap-1 bg-orange-50 text-orange-700 dark:bg-orange-950/30 dark:text-orange-400 text-xs px-2.5 py-0.5 rounded-full border border-orange-100 dark:border-orange-900/50">
                          {tech}
                          <button type="button" onClick={() => handleRemoveTech(tech)} className="hover:text-orange-900 dark:hover:text-orange-200">
                            <X className="size-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Gallery Images Manager */}
              <div className="grid gap-2 border border-zinc-200/60 dark:border-zinc-800/60 rounded-2xl p-3 bg-zinc-50/50 dark:bg-zinc-950/20">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                  <Images className="size-3.5 text-zinc-400" />
                  Project Gallery (Images URLs)
                </label>
                
                <div className="flex gap-2">
                  <Input 
                    placeholder="https://images.unsplash.com/..."
                    value={newImageInput}
                    onChange={(e) => setNewImageInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddImage();
                      }
                    }}
                    className="rounded-xl border-zinc-200 dark:border-zinc-800 focus-visible:ring-orange-500 h-9"
                  />
                  <Button type="button" onClick={handleAddImage} size="sm" variant="outline" className="rounded-xl">Add URL</Button>
                </div>

                {formData.images.length > 0 && (
                  <div className="mt-2 space-y-1.5 max-h-40 overflow-y-auto pr-1">
                    {formData.images.map((img, idx) => (
                      <div key={idx} className="flex items-center gap-2 bg-white dark:bg-zinc-950 p-1.5 rounded-xl border border-zinc-100 dark:border-zinc-800 text-xs">
                        <div className="size-8 rounded overflow-hidden shrink-0 bg-zinc-100 border border-zinc-200 dark:border-zinc-800">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={img} alt="preview" className="size-full object-cover" />
                        </div>
                        <span className="truncate flex-1 text-zinc-500 dark:text-zinc-400">{img}</span>
                        <button type="button" onClick={() => handleRemoveImage(idx)} className="text-zinc-400 hover:text-red-500 p-1">
                          <X className="size-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Is Published Toggle */}
              <div className="flex items-center justify-between border border-zinc-200/60 dark:border-zinc-800/60 rounded-2xl p-3 bg-zinc-50/50 dark:bg-zinc-950/20">
                <div>
                  <h4 className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Publish Status</h4>
                  <p className="text-[10px] text-zinc-400">Make this project public to visitor platforms immediately.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, isPublished: !prev.isPublished }))}
                  className={cn(
                    "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                    formData.isPublished ? "bg-orange-600" : "bg-zinc-200 dark:bg-zinc-800"
                  )}
                >
                  <span
                    className={cn(
                      "inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200",
                      formData.isPublished ? "translate-x-6" : "translate-x-1"
                    )}
                  />
                </button>
              </div>

              {/* Action Buttons */}
              <SheetFooter className="mt-8 flex items-center gap-2 border-t border-zinc-100 dark:border-zinc-800/60 pt-4">
                <SheetClose asChild>
                  <Button type="button" variant="outline" className="rounded-xl flex-1 text-xs">
                    Cancel
                  </Button>
                </SheetClose>
                <Button type="submit" className="rounded-xl bg-orange-600 hover:bg-orange-500 text-white flex-1 font-semibold text-xs">
                  {editingId ? "Save Changes" : "Create Project"}
                </Button>
              </SheetFooter>
            </form>
          </SheetContent>
        </Sheet>
      </div>

      {/* Control Bar (Search, Status Filter, Tech Filter, View Mode Toggle) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-4 rounded-3xl border border-zinc-200/40 bg-white/60 dark:border-zinc-800/40 dark:bg-zinc-900/60 backdrop-blur-md shadow-xs">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-zinc-400" />
          <Input 
            type="search"
            placeholder="Search projects by title, description or tag..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 rounded-2xl border-zinc-200 dark:border-zinc-800 focus-visible:ring-orange-500 text-xs h-9.5 w-full bg-white dark:bg-zinc-950/30"
          />
          {search && (
            <button 
              onClick={() => setSearch("")} 
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 p-0.5 rounded-full"
            >
              <X className="size-3" />
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Status filter buttons */}
          <div className="flex items-center rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 p-0.5 bg-zinc-50 dark:bg-zinc-950/40 text-xs">
            <button
              onClick={() => setStatusFilter("all")}
              className={cn(
                "px-3 py-1 rounded-xl transition-all font-medium text-[11px]",
                statusFilter === "all" 
                  ? "bg-white text-zinc-900 shadow-xs dark:bg-zinc-900 dark:text-zinc-50" 
                  : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
              )}
            >
              All
            </button>
            <button
              onClick={() => setStatusFilter("published")}
              className={cn(
                "px-3 py-1 rounded-xl transition-all font-medium text-[11px]",
                statusFilter === "published" 
                  ? "bg-white text-zinc-900 shadow-xs dark:bg-zinc-900 dark:text-zinc-50" 
                  : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
              )}
            >
              Published
            </button>
            <button
              onClick={() => setStatusFilter("draft")}
              className={cn(
                "px-3 py-1 rounded-xl transition-all font-medium text-[11px]",
                statusFilter === "draft" 
                  ? "bg-white text-zinc-900 shadow-xs dark:bg-zinc-900 dark:text-zinc-50" 
                  : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
              )}
            >
              Drafts
            </button>
          </div>

          {/* Active tech filter display */}
          {techFilter && (
            <span className="flex items-center gap-1 bg-orange-50 text-orange-700 dark:bg-orange-950/30 dark:text-orange-400 text-[11px] px-3 py-1 rounded-2xl border border-orange-100 dark:border-orange-900/50">
              Stack: {techFilter}
              <button onClick={() => setTechFilter(null)} className="hover:text-orange-950 dark:hover:text-orange-100">
                <X className="size-3" />
              </button>
            </span>
          )}

          <div className="h-6 w-px bg-zinc-200 dark:bg-zinc-800 mx-1" />

          {/* View mode toggle */}
          <div className="flex items-center rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 p-0.5 bg-zinc-50 dark:bg-zinc-950/40">
            <button
              onClick={() => setViewMode("grid")}
              className={cn(
                "p-1.5 rounded-xl transition-all",
                viewMode === "grid" 
                  ? "bg-white text-zinc-900 shadow-xs dark:bg-zinc-900 dark:text-zinc-50" 
                  : "text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300"
              )}
              title="Grid View"
            >
              <LayoutGrid className="size-3.5" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={cn(
                "p-1.5 rounded-xl transition-all",
                viewMode === "list" 
                  ? "bg-white text-zinc-900 shadow-xs dark:bg-zinc-900 dark:text-zinc-50" 
                  : "text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300"
              )}
              title="List View"
            >
              <List className="size-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Grid or List of Projects */}
      {filteredProjects.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-3xl bg-white/40 dark:bg-zinc-950/10 text-center">
          <div className="flex size-12 items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-900 text-zinc-400 dark:text-zinc-600 mb-3">
            <Search className="size-5" />
          </div>
          <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">No projects found</h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 max-w-xs">
            Coba ganti kata kunci pencarian Anda atau buat proyek baru untuk memulai portofolio.
          </p>
          {search || statusFilter !== "all" || techFilter ? (
            <Button 
              variant="link" 
              onClick={() => {
                setSearch("");
                setStatusFilter("all");
                setTechFilter(null);
              }}
              className="text-xs text-orange-600 hover:text-orange-500 mt-2 font-medium"
            >
              Reset all filters
            </Button>
          ) : null}
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {filteredProjects.map(project => (
            <Card key={project.id} className="group overflow-hidden rounded-3xl border border-zinc-200/50 bg-white/70 shadow-sm hover:shadow-md transition-all duration-300 dark:border-zinc-800/50 dark:bg-zinc-900/50 flex flex-col relative h-[380px]">
              {/* Cover Image Wrapper with hover Zoom */}
              <div className="relative h-44 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-950 shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={project.coverImage} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1594729095022-e2f6d2eece9c?w=600";
                  }}
                />

                {/* Published / Draft indicator overlay */}
                <div className="absolute top-3 left-3 flex gap-1.5 items-center">
                  <span className={cn(
                    "text-[10px] font-bold px-2.5 py-0.5 rounded-full backdrop-blur-md shadow-xs border text-white",
                    project.isPublished 
                      ? "bg-green-600/90 border-green-500/30" 
                      : "bg-zinc-700/90 border-zinc-600/30"
                  )}>
                    {project.isPublished ? "Published" : "Draft"}
                  </span>
                  
                  {project.images.length > 0 && (
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full backdrop-blur-md shadow-xs border text-white bg-black/60 border-white/10 flex items-center gap-1">
                      <Images className="size-3" /> {project.images.length}
                    </span>
                  )}
                </div>

                {/* Toggle Publish Quick Trigger */}
                <button
                  onClick={() => togglePublish(project.id, project.isPublished)}
                  className="absolute top-3 right-3 flex size-7 items-center justify-center rounded-full bg-white/90 dark:bg-zinc-900/90 text-zinc-600 dark:text-zinc-300 border border-zinc-200/50 dark:border-zinc-800/50 hover:bg-white dark:hover:bg-zinc-900 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  title={project.isPublished ? "Set to Draft" : "Publish Project"}
                >
                  {project.isPublished ? <EyeOff className="size-3.5 text-zinc-500" /> : <Eye className="size-3.5 text-green-600" />}
                </button>
              </div>

              {/* Card Header & Description */}
              <CardHeader className="p-4 flex-1">
                <div className="space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <CardTitle className="text-sm font-bold text-zinc-900 dark:text-zinc-50 line-clamp-1">
                      {project.title}
                    </CardTitle>
                    {/* Action buttons */}
                    <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <button 
                        onClick={() => handleEdit(project)}
                        className="p-1 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                        title="Edit Details"
                      >
                        <Edit2 className="size-3.5" />
                      </button>
                      <button 
                        onClick={() => setDeleteTargetId(project.id)}
                        className="p-1 text-zinc-400 hover:text-red-500 rounded-lg hover:bg-red-50/50 dark:hover:bg-red-950/20 transition-colors"
                        title="Delete Project"
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    </div>
                  </div>
                  <CardDescription className="text-zinc-500 dark:text-zinc-400 text-[11px] line-clamp-2 leading-relaxed">
                    {project.description}
                  </CardDescription>
                </div>
              </CardHeader>

              {/* Technologies Badges */}
              <CardContent className="px-4 pb-3 shrink-0">
                <div className="flex flex-wrap gap-1 max-h-[50px] overflow-hidden">
                  {project.technologies.map(tech => (
                    <button 
                      key={tech.id} 
                      onClick={() => setTechFilter(tech.name === techFilter ? null : tech.name)}
                      className={cn(
                        "text-[9px] px-2 py-0.5 rounded-full border transition-colors",
                        techFilter === tech.name 
                          ? "bg-orange-600 border-orange-600 text-white font-medium shadow-xs"
                          : "bg-zinc-50 text-zinc-600 border-zinc-100 hover:border-zinc-300 dark:bg-zinc-950/50 dark:text-zinc-400 dark:border-zinc-800 dark:hover:border-zinc-700"
                      )}
                    >
                      {tech.name}
                    </button>
                  ))}
                </div>
              </CardContent>

              {/* External Links */}
              <CardFooter className="px-4 py-3 border-t border-zinc-100 dark:border-zinc-800/60 flex items-center justify-between shrink-0 bg-zinc-50/30 dark:bg-zinc-950/10">
                <span className="text-[10px] text-zinc-400 font-medium">
                  {new Date(project.updatedAt).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                </span>
                
                <div className="flex items-center gap-2">
                  {project.repoLink && (
                    <a 
                      href={project.repoLink} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center gap-1 text-[10px] font-semibold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:underline"
                    >
                      <GithubIcon className="size-3" /> Code
                    </a>
                  )}
                  {project.demoLink && (
                    <a 
                      href={project.demoLink} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center gap-1 text-[10px] font-semibold text-orange-600 hover:text-orange-500 hover:underline"
                    >
                      <ExternalLink className="size-3" /> Demo
                    </a>
                  )}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        /* List / Table View Mode */
        <div className="overflow-hidden rounded-3xl border border-zinc-200/50 bg-white/70 dark:border-zinc-800/50 dark:bg-zinc-900/50 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-zinc-200/50 dark:border-zinc-800/50 bg-zinc-50/30 dark:bg-zinc-950/20 text-zinc-500 dark:text-zinc-400 font-semibold">
                  <th className="p-4 w-12">Preview</th>
                  <th className="p-4">Project Details</th>
                  <th className="p-4 w-28">Status</th>
                  <th className="p-4 w-44">Tech Stack</th>
                  <th className="p-4 w-32">Links</th>
                  <th className="p-4 w-24 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200/30 dark:divide-zinc-800/30">
                {filteredProjects.map(project => (
                  <tr key={project.id} className="group hover:bg-zinc-50/30 dark:hover:bg-zinc-950/10 transition-colors">
                    <td className="p-4 vertical-top">
                      <div className="size-12 rounded-xl overflow-hidden bg-zinc-100 border border-zinc-200 dark:border-zinc-800">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                          src={project.coverImage} 
                          alt="Thumbnail" 
                          className="size-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1594729095022-e2f6d2eece9c?w=600";
                          }}
                        />
                      </div>
                    </td>
                    <td className="p-4 max-w-sm">
                      <div className="space-y-0.5">
                        <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-50 flex items-center gap-1.5">
                          {project.title}
                          <span className="text-[10px] text-zinc-400 font-normal">({project.slug})</span>
                        </h4>
                        <p className="text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                          {project.description}
                        </p>
                      </div>
                    </td>
                    <td className="p-4">
                      <button 
                        onClick={() => togglePublish(project.id, project.isPublished)}
                        className={cn(
                          "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-bold text-[10px] border transition-colors",
                          project.isPublished 
                            ? "bg-green-50 text-green-700 border-green-200 dark:bg-green-950/20 dark:text-green-400 dark:border-green-900/30" 
                            : "bg-zinc-100 text-zinc-600 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-700/60"
                        )}
                      >
                        <span className={cn("size-1.5 rounded-full", project.isPublished ? "bg-green-600 animate-pulse" : "bg-zinc-400")} />
                        {project.isPublished ? "Published" : "Draft"}
                      </button>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1 max-h-16 overflow-y-auto max-w-[200px]">
                        {project.technologies.map(tech => (
                          <span key={tech.id} className="text-[9px] px-1.5 py-0.5 bg-zinc-100 text-zinc-600 border border-zinc-200 dark:bg-zinc-800/40 dark:text-zinc-400 dark:border-zinc-800 rounded">
                            {tech.name}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col gap-1 text-[10px]">
                        {project.repoLink && (
                          <a 
                            href={project.repoLink} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="inline-flex items-center gap-1 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:underline font-semibold"
                          >
                            <GithubIcon className="size-3" /> GitHub Repo
                          </a>
                        )}
                        {project.demoLink && (
                          <a 
                            href={project.demoLink} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="inline-flex items-center gap-1 text-orange-600 hover:text-orange-500 hover:underline font-semibold"
                          >
                            <ExternalLink className="size-3" /> Live URL
                          </a>
                        )}
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button 
                          onClick={() => handleEdit(project)}
                          className="p-1.5 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 dark:hover:text-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
                        >
                          <Edit2 className="size-3.5" />
                        </button>
                        <button 
                          onClick={() => setDeleteTargetId(project.id)}
                          className="p-1.5 text-zinc-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-colors"
                        >
                          <Trash2 className="size-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteTargetId} onOpenChange={(open) => {
        if (!open) setDeleteTargetId(null);
      }}>
        <DialogContent className="rounded-3xl border border-zinc-200/50 bg-white/95 dark:border-zinc-800/50 dark:bg-zinc-900/95 max-w-sm p-5 shadow-lg backdrop-blur-md">
          <DialogHeader className="gap-1">
            <DialogTitle className="text-base font-bold text-zinc-900 dark:text-zinc-50">
              Apakah Anda Yakin?
            </DialogTitle>
            <DialogDescription className="text-zinc-500 dark:text-zinc-400 text-xs">
              Tindakan ini tidak dapat dibatalkan. Project ini akan dihapus secara permanen dari dummy storage.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="mt-5 flex flex-row items-center gap-2 w-full justify-between sm:justify-between">
            <Button 
              variant="outline" 
              onClick={() => setDeleteTargetId(null)}
              className="rounded-xl flex-1 text-xs"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleDelete}
              className="rounded-xl bg-red-600 hover:bg-red-500 text-white flex-1 font-semibold text-xs"
            >
              Yes, Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
