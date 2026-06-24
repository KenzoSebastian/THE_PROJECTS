"use client";

import React from "react";
import { Project } from "@/app/data/projects";
import { ProjectCard } from "./project-card";

interface ProjectGridProps {
  projects: Project[];
  onEdit: (project: Project) => void;
  onDeleteClick: (id: string) => void;
  onTogglePublish: (id: string, currentStatus: boolean) => void;
  techFilter: string | null;
  onTechFilterClick: (tech: string) => void;
}

export function ProjectGrid({
  projects,
  onEdit,
  onDeleteClick,
  onTogglePublish,
  techFilter,
  onTechFilterClick,
}: ProjectGridProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onEdit={onEdit}
          onDeleteClick={onDeleteClick}
          onTogglePublish={onTogglePublish}
          techFilter={techFilter}
          onTechFilterClick={onTechFilterClick}
        />
      ))}
    </div>
  );
}
