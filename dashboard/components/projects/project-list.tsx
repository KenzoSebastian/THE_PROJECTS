"use client";

import React from "react";
import { Project } from "@/app/data/projects";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Edit2, Trash2, ExternalLink } from "lucide-react";
import { GithubIcon } from "./icons";

interface ProjectListProps {
  projects: Project[];
  onEdit: (project: Project) => void;
  onDeleteClick: (id: string) => void;
  onTogglePublish: (id: string, currentStatus: boolean) => void;
}

export function ProjectList({
  projects,
  onEdit,
  onDeleteClick,
  onTogglePublish,
}: ProjectListProps) {
  return (
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
            {projects.map((project) => (
              <tr key={project.id} className="group hover:bg-zinc-50/30 dark:hover:bg-zinc-950/10 transition-colors">
                <td className="p-4 align-top">
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
                  {/* Status Toggle - using Shadcn Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onTogglePublish(project.id, project.isPublished)}
                    className={cn(
                      "inline-flex items-center gap-1.5 px-3 py-1 h-auto rounded-full font-bold text-[10px] border transition-colors bg-white dark:bg-zinc-900",
                      project.isPublished
                        ? "text-green-700 border-green-200 hover:text-green-800 hover:bg-green-50 dark:text-green-400 dark:border-green-900/30 dark:hover:bg-green-950/20"
                        : "text-zinc-600 border-zinc-200 hover:bg-zinc-50 dark:text-zinc-400 dark:border-zinc-700/60 dark:hover:bg-zinc-800"
                    )}
                  >
                    <span className={cn("size-1.5 rounded-full", project.isPublished ? "bg-green-600 animate-pulse" : "bg-zinc-400")} />
                    {project.isPublished ? "Published" : "Draft"}
                  </Button>
                </td>
                <td className="p-4">
                  <div className="flex flex-wrap gap-1 max-h-16 overflow-y-auto max-w-[200px]">
                    {project.technologies.map((tech) => (
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
                  {/* Action buttons - using Shadcn Button */}
                  <div className="flex items-center justify-end gap-1.5">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(project)}
                      className="h-8 w-8 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 dark:hover:text-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
                    >
                      <Edit2 className="size-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDeleteClick(project.id)}
                      className="h-8 w-8 text-zinc-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-colors"
                    >
                      <Trash2 className="size-3.5" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
