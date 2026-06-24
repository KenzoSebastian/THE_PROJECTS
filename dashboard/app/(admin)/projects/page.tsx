"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { Plus, FolderGit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { initialProjects, Project, Technology, Image as ProjectImage } from "@/app/data/projects";
import { ProjectControlBar } from "@/components/projects/project-control-bar";
import { ProjectGrid } from "@/components/projects/project-grid";
import { ProjectList } from "@/components/projects/project-list";
import { ProjectFormSheet } from "@/components/projects/project-form-sheet";
import { DeleteConfirmDialog } from "@/components/projects/delete-confirm-dialog";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [mounted, setMounted] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all");
  const [techFilter, setTechFilter] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Dialog and Modal states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  // Load from local storage
  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("the_projects_dummy_projects");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length === 2 && parsed.some(p => p.id === "project-1") && parsed.some(p => p.id === "project-2")) {
          setProjects(initialProjects);
          localStorage.setItem("the_projects_dummy_projects", JSON.stringify(initialProjects));
        } else {
          setProjects(parsed);
        }
      } catch (e) {
        setProjects(initialProjects);
      }
    } else {
      setProjects(initialProjects);
      localStorage.setItem("the_projects_dummy_projects", JSON.stringify(initialProjects));
    }
  }, []);

  const saveProjects = (updatedProjects: Project[]) => {
    setProjects(updatedProjects);
    localStorage.setItem("the_projects_dummy_projects", JSON.stringify(updatedProjects));
  };

  const handleFormSubmit = (formData: any) => {
    const timestamp = new Date().toISOString();
    const projectSlug = formData.slug.trim() || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    const isSlugTaken = projects.some(p => p.slug === projectSlug && p.id !== editingProject?.id);
    if (isSlugTaken) {
      toast.error("Project Slug must be unique!");
      return;
    }

    if (editingProject) {
      // Edit
      const updated = projects.map(p => {
        if (p.id === editingProject.id) {
          const techs: Technology[] = formData.technologies.map((t: string, idx: number) => ({
            id: `tech-${editingProject.id}-${idx}`,
            name: t,
            icon: t.toLowerCase()
          }));
          const imgs: ProjectImage[] = formData.images.map((url: string, idx: number) => ({
            id: `img-${editingProject.id}-${idx}`,
            url,
            projectId: editingProject.id
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
      // Create
      const newId = `project-${Date.now()}`;
      const techs: Technology[] = formData.technologies.map((t: string, idx: number) => ({
        id: `tech-${newId}-${idx}`,
        name: t,
        icon: t.toLowerCase()
      }));
      const imgs: ProjectImage[] = formData.images.map((url: string, idx: number) => ({
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

    setIsFormOpen(false);
    setEditingProject(null);
  };

  const handleDelete = () => {
    if (!deleteTargetId) return;
    const updated = projects.filter(p => p.id !== deleteTargetId);
    saveProjects(updated);
    toast.success("Project deleted successfully!");
    setDeleteTargetId(null);
  };

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

  // Filter logic
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

        <Button
          onClick={() => {
            setEditingProject(null);
            setIsFormOpen(true);
          }}
          className="rounded-full bg-zinc-950 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200 shadow-md font-semibold text-xs py-2 px-5 flex items-center gap-1.5 transition-all duration-300 transform active:scale-95"
        >
          <Plus className="size-4" /> Create Project
        </Button>
      </div>

      {/* Control Bar (Search, Status Filter, Tech Filter, View Mode Toggle) */}
      <ProjectControlBar
        search={search}
        onSearchChange={setSearch}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        techFilter={techFilter}
        onClearTechFilter={() => setTechFilter(null)}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      {/* Grid or List of Projects */}
      {filteredProjects.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-3xl bg-white/40 dark:bg-zinc-950/10 text-center">
          <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">No projects found</h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 max-w-xs">
            Coba ganti kata kunci pencarian Anda atau buat proyek baru untuk memulai portofolio.
          </p>
        </div>
      ) : viewMode === "grid" ? (
        <ProjectGrid
          projects={filteredProjects}
          onEdit={(p) => {
            setEditingProject(p);
            setIsFormOpen(true);
          }}
          onDeleteClick={setDeleteTargetId}
          onTogglePublish={togglePublish}
          techFilter={techFilter}
          onTechFilterClick={(tech) => setTechFilter(tech === techFilter ? null : tech)}
        />
      ) : (
        <ProjectList
          projects={filteredProjects}
          onEdit={(p) => {
            setEditingProject(p);
            setIsFormOpen(true);
          }}
          onDeleteClick={setDeleteTargetId}
          onTogglePublish={togglePublish}
        />
      )}

      {/* Form Sheet Component */}
      <ProjectFormSheet
        isOpen={isFormOpen}
        onOpenChange={(open) => {
          setIsFormOpen(open);
          if (!open) setEditingProject(null);
        }}
        editingProject={editingProject}
        onSubmit={handleFormSubmit}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        isOpen={!!deleteTargetId}
        onOpenChange={(open) => {
          if (!open) setDeleteTargetId(null);
        }}
        onConfirm={handleDelete}
      />
    </div>
  );
}
