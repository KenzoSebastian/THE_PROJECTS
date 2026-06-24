"use client";

import React, { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetFooter, SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Project } from "@/app/data/projects";
import { Globe } from "lucide-react";
import { GithubIcon } from "./icons";
import { ProjectFormTechs } from "./project-form-techs";
import { ProjectFormGallery } from "./project-form-gallery";

interface ProjectFormSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  editingProject: Project | null;
  onSubmit: (formData: any) => void;
}

const generateSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
};

export function ProjectFormSheet({
  isOpen,
  onOpenChange,
  editingProject,
  onSubmit,
}: ProjectFormSheetProps) {
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

  // Sync form data when editingProject changes
  useEffect(() => {
    if (editingProject) {
      setFormData({
        title: editingProject.title,
        slug: editingProject.slug,
        description: editingProject.description,
        content: editingProject.content,
        coverImage: editingProject.coverImage,
        repoLink: editingProject.repoLink || "",
        demoLink: editingProject.demoLink || "",
        isPublished: editingProject.isPublished,
        technologies: editingProject.technologies.map((t) => t.name),
        images: editingProject.images.map((img) => img.url),
      });
    } else {
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
    }
  }, [editingProject, isOpen]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setFormData((prev) => ({
      ...prev,
      title: val,
      slug: editingProject ? prev.slug : generateSlug(val),
    }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-xl overflow-y-auto border-l border-zinc-200/50 bg-white dark:border-zinc-800/50 dark:bg-zinc-900 p-6 flex flex-col h-full rounded-l-[24px]">
        <SheetHeader className="mb-4">
          <SheetTitle className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
            {editingProject ? "Edit Project Details" : "Create New Project"}
          </SheetTitle>
          <SheetDescription className="text-zinc-500 dark:text-zinc-400 text-xs">
            {editingProject
              ? "Modifikasi data project portfolio Anda dan sinkronisasikan perubahannya."
              : "Tambahkan project baru ke dalam database portfolio Anda."}
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleFormSubmit} className="flex-1 space-y-5 pb-6">
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
                onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
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
              onChange={(e) => setFormData((prev) => ({ ...prev, coverImage: e.target.value }))}
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
                onChange={(e) => setFormData((prev) => ({ ...prev, repoLink: e.target.value }))}
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
                onChange={(e) => setFormData((prev) => ({ ...prev, demoLink: e.target.value }))}
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
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
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
              onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))}
              className="rounded-xl border-zinc-200 dark:border-zinc-800 focus-visible:ring-orange-500 h-28 min-h-28"
            />
          </div>

          {/* Technologies Selector Component */}
          <ProjectFormTechs
            selectedTechs={formData.technologies}
            onChange={(techs) => setFormData((prev) => ({ ...prev, technologies: techs }))}
          />

          {/* Gallery Images Component */}
          <ProjectFormGallery
            images={formData.images}
            onChange={(imgs) => setFormData((prev) => ({ ...prev, images: imgs }))}
          />

          {/* Is Published Toggle */}
          <div className="flex items-center justify-between border border-zinc-200/60 dark:border-zinc-800/60 rounded-2xl p-3 bg-zinc-50/50 dark:bg-zinc-950/20">
            <div>
              <h4 className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Publish Status</h4>
              <p className="text-[10px] text-zinc-400">Make this project public to visitor platforms immediately.</p>
            </div>
            <button
              type="button"
              onClick={() => setFormData((prev) => ({ ...prev, isPublished: !prev.isPublished }))}
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
          <SheetFooter className="mt-8 flex flex-row items-center gap-2 border-t border-zinc-100 dark:border-zinc-800/60 pt-4">
            <SheetClose asChild>
              <Button type="button" variant="outline" className="rounded-xl flex-1 text-xs py-2.5 h-auto">
                Cancel
              </Button>
            </SheetClose>
            <Button type="submit" className="rounded-xl bg-orange-600 hover:bg-orange-500 text-white flex-1 font-semibold text-xs py-2.5 h-auto">
              {editingProject ? "Save Changes" : "Create Project"}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
