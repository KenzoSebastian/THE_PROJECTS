"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Project } from "@/app/data/projects";
import { Edit2, Trash2, ExternalLink, Eye, EyeOff, Images } from "lucide-react";
import { GithubIcon } from "./icons";

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDeleteClick: (id: string) => void;
  onTogglePublish: (id: string, currentStatus: boolean) => void;
  techFilter: string | null;
  onTechFilterClick: (tech: string) => void;
}

export function ProjectCard({
  project,
  onEdit,
  onDeleteClick,
  onTogglePublish,
  techFilter,
  onTechFilterClick,
}: ProjectCardProps) {
  return (
    <Card className="group overflow-hidden rounded-3xl border border-zinc-200/50 bg-white/70 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 dark:border-zinc-800/50 dark:bg-zinc-900/50 flex flex-col relative h-[380px] [--card-spacing:12px]">
      {/* Cover Image Wrapper nested with standard card spacing */}
      <div className="px-3 shrink-0">
        <div className="relative h-32 w-full overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-950">
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
          <div className="absolute top-2.5 left-2.5 flex gap-1 items-center">
            <span className={cn(
              "text-[9px] font-bold px-2 py-0.5 rounded-full backdrop-blur-md shadow-xs border text-white",
              project.isPublished
                ? "bg-green-600/90 border-green-500/30"
                : "bg-zinc-700/90 border-zinc-600/30"
            )}>
              {project.isPublished ? "Published" : "Draft"}
            </span>

            {project.images.length > 0 && (
              <span className="text-[9px] font-bold px-2 py-0.5 rounded-full backdrop-blur-md shadow-xs border text-white bg-black/60 border-white/10 flex items-center gap-1">
                <Images className="size-2.5" /> {project.images.length}
              </span>
            )}
          </div>

          {/* Toggle Publish Quick Trigger - using Shadcn Button */}
          <Button
            variant="outline"
            size="icon"
            onClick={() => onTogglePublish(project.id, project.isPublished)}
            className="absolute top-2.5 right-2.5 flex size-6.5 items-center justify-center rounded-full bg-white/90 dark:bg-zinc-900/90 text-zinc-600 dark:text-zinc-300 border border-zinc-200/50 dark:border-zinc-800/50 hover:bg-white dark:hover:bg-zinc-900 shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-300"
            title={project.isPublished ? "Set to Draft" : "Publish Project"}
          >
            {project.isPublished ? <EyeOff className="size-3 text-zinc-500" /> : <Eye className="size-3 text-green-600" />}
          </Button>
        </div>
      </div>

      {/* Card Header & Description */}
      <CardHeader className="px-3 pt-2 pb-0 flex-1">
        <div className="space-y-1">
          <div className="flex items-center justify-between gap-2">
            <CardTitle className="text-xs font-bold text-zinc-900 dark:text-zinc-50 line-clamp-1">
              {project.title}
            </CardTitle>
            {/* Action buttons - using Shadcn Button */}
            <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onEdit(project)}
                className="h-7 w-7 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                title="Edit Details"
              >
                <Edit2 className="size-3" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDeleteClick(project.id)}
                className="h-7 w-7 text-zinc-400 hover:text-red-500 rounded-lg hover:bg-red-50/50 dark:hover:bg-red-950/20 transition-colors"
                title="Delete Project"
              >
                <Trash2 className="size-3" />
              </Button>
            </div>
          </div>
          <CardDescription className="text-zinc-500 dark:text-zinc-400 text-[10px] line-clamp-2 leading-relaxed">
            {project.description}
          </CardDescription>
        </div>
      </CardHeader>

      {/* Technologies Badges - using Shadcn Button styled as badge */}
      <CardContent className="px-3 pb-1 shrink-0">
        <div className="flex flex-wrap gap-1 max-h-[50px] overflow-hidden">
          {project.technologies.map(tech => (
            <Button
              key={tech.id}
              variant="outline"
              size="sm"
              onClick={() => onTechFilterClick(tech.name)}
              className={cn(
                "text-[9px] py-1 px-2.5 h-auto rounded-full border font-normal transition-colors",
                techFilter === tech.name
                  ? "bg-orange-600 border-orange-600 text-white font-medium hover:bg-orange-500 hover:text-white"
                  : "bg-zinc-50 text-zinc-600 border-zinc-100 hover:border-zinc-300 dark:bg-zinc-950/50 dark:text-zinc-400 dark:border-zinc-800 dark:hover:border-zinc-700 dark:hover:text-zinc-200"
              )}
            >
              {tech.name}
            </Button>
          ))}
        </div>
      </CardContent>

      {/* External Links */}
      <CardFooter className="px-3 py-3 border-t border-zinc-100 dark:border-zinc-800/60 flex items-center justify-between shrink-0 bg-zinc-50/30 dark:bg-zinc-950/10 rounded-b-[24px]">
        <span className="text-[9px] text-zinc-400 font-medium">
          {new Date(project.updatedAt).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
        </span>

        <div className="flex items-center gap-2">
          {project.repoLink && (
            <a
              href={project.repoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[9px] font-semibold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:underline"
            >
              <GithubIcon className="size-2.5" /> Code
            </a>
          )}
          {project.demoLink && (
            <a
              href={project.demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[9px] font-semibold text-orange-600 hover:text-orange-500 hover:underline"
            >
              <ExternalLink className="size-2.5" /> Demo
            </a>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
