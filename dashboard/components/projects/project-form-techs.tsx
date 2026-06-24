"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const PREDEFINED_TECHS = [
  "NestJS", "Next.js", "React", "Vue.js", "Tailwind CSS",
  "Prisma", "PostgreSQL", "MongoDB", "Docker", "Kafka",
  "TypeScript", "GraphQL", "Express", "Node.js"
];

interface ProjectFormTechsProps {
  selectedTechs: string[];
  onChange: (techs: string[]) => void;
}

export function ProjectFormTechs({ selectedTechs, onChange }: ProjectFormTechsProps) {
  const [inputVal, setInputVal] = useState("");

  const handleAdd = () => {
    const trimmed = inputVal.trim();
    if (trimmed && !selectedTechs.includes(trimmed)) {
      onChange([...selectedTechs, trimmed]);
      setInputVal("");
    }
  };

  const handleTogglePredefined = (tech: string) => {
    const exists = selectedTechs.includes(tech);
    if (exists) {
      onChange(selectedTechs.filter((t) => t !== tech));
    } else {
      onChange([...selectedTechs, tech]);
    }
  };

  const handleRemove = (tech: string) => {
    onChange(selectedTechs.filter((t) => t !== tech));
  };

  return (
    <div className="grid gap-2 border border-zinc-200/60 dark:border-zinc-800/60 rounded-2xl p-3 bg-zinc-50/50 dark:bg-zinc-950/20">
      <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Technologies / Stack</label>

      {/* Tech Input */}
      <div className="flex gap-2">
        <Input
          placeholder="E.g. TanStack Query"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAdd();
            }
          }}
          className="rounded-xl border-zinc-200 dark:border-zinc-800 focus-visible:ring-orange-500 h-9"
        />
        <Button type="button" onClick={handleAdd} size="sm" variant="outline" className="rounded-xl h-9">Add</Button>
      </div>

      {/* Predefined Quick Tags */}
      <div className="mt-2">
        <p className="text-[10px] text-zinc-400 mb-1">Predefined Quick Tags:</p>
        <div className="flex flex-wrap gap-1">
          {PREDEFINED_TECHS.map((tech) => {
            const isSelected = selectedTechs.includes(tech);
            return (
              <Button
                key={tech}
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleTogglePredefined(tech)}
                className={cn(
                  "text-[10px] py-1 px-3 h-auto rounded-full transition-all border font-normal",
                  isSelected
                    ? "bg-zinc-900 text-white border-zinc-900 dark:bg-white dark:text-zinc-950 dark:border-white font-medium hover:bg-zinc-900 dark:hover:bg-white"
                    : "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-400 dark:bg-zinc-900 dark:text-zinc-400 dark:border-zinc-800 dark:hover:border-zinc-600 dark:hover:text-zinc-200"
                )}
              >
                {tech}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Selected tags */}
      {selectedTechs.length > 0 && (
        <div className="mt-2 pt-2 border-t border-zinc-200/50 dark:border-zinc-800/50">
          <p className="text-[10px] text-zinc-400 mb-1">Selected Stack:</p>
          <div className="flex flex-wrap gap-1.5">
            {selectedTechs.map((tech) => (
              <span key={tech} className="inline-flex items-center gap-1 bg-orange-50 text-orange-700 dark:bg-orange-950/30 dark:text-orange-400 text-xs px-2.5 py-0.5 rounded-full border border-orange-100 dark:border-orange-900/50">
                {tech}
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemove(tech)}
                  className="h-4 w-4 text-orange-700 hover:text-orange-950 hover:bg-transparent dark:text-orange-400 dark:hover:text-orange-200 ml-1 rounded-full p-0"
                >
                  <X className="size-2.5" />
                </Button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
