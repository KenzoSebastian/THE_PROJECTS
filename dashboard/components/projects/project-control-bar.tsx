"use client";

import React from "react";
import { Search, X, LayoutGrid, List } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ProjectControlBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  statusFilter: "all" | "published" | "draft";
  onStatusFilterChange: (status: "all" | "published" | "draft") => void;
  techFilter: string | null;
  onClearTechFilter: () => void;
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
}

export function ProjectControlBar({
  search,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  techFilter,
  onClearTechFilter,
  viewMode,
  onViewModeChange,
}: ProjectControlBarProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-4 rounded-3xl border border-zinc-200/40 bg-white/60 dark:border-zinc-800/40 dark:bg-zinc-900/60 backdrop-blur-md shadow-xs">
      {/* Search Bar */}
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-zinc-400" />
        <Input
          type="search"
          placeholder="Search projects by title, description or tag..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 rounded-2xl border-zinc-200 dark:border-zinc-800 focus-visible:ring-orange-500 text-xs h-9.5 w-full bg-white dark:bg-zinc-950/30"
        />
        {search && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onSearchChange("")}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 size-6 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            <X className="size-3" />
          </Button>
        )}
      </div>

      {/* Filters & Toggles */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Status filters - using Shadcn Button */}
        <div className="flex items-center rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 p-0.5 bg-zinc-50 dark:bg-zinc-950/40 text-xs">
          {(["all", "published", "draft"] as const).map((status) => (
            <Button
              key={status}
              variant="ghost"
              size="sm"
              onClick={() => onStatusFilterChange(status)}
              className={cn(
                "px-3.5 py-1.5 h-auto rounded-xl transition-all font-medium text-[11px] capitalize hover:bg-transparent",
                statusFilter === status
                  ? "bg-white text-zinc-900 shadow-xs dark:bg-zinc-900 dark:text-zinc-50 hover:bg-white dark:hover:bg-zinc-900"
                  : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
              )}
            >
              {status === "all" ? "All" : status === "published" ? "Published" : "Drafts"}
            </Button>
          ))}
        </div>

        {/* Tech filter active badge */}
        {techFilter && (
          <span className="flex items-center gap-1 bg-orange-50 text-orange-700 dark:bg-orange-950/30 dark:text-orange-400 text-[11px] px-3 py-1 rounded-2xl border border-orange-100 dark:border-orange-900/50">
            Stack: {techFilter}
            <Button
              variant="ghost"
              size="icon"
              onClick={onClearTechFilter}
              className="h-4 w-4 text-orange-700 hover:text-orange-950 hover:bg-transparent dark:text-orange-400 dark:hover:text-orange-200 ml-1 rounded-full"
            >
              <X className="size-2.5" />
            </Button>
          </span>
        )}

        <div className="h-6 w-px bg-zinc-200 dark:bg-zinc-800 mx-1" />

        {/* View Mode - using Shadcn Button */}
        <div className="flex items-center rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 p-0.5 bg-zinc-50 dark:bg-zinc-950/40">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onViewModeChange("grid")}
            className={cn(
              "size-7 rounded-xl transition-all hover:bg-transparent",
              viewMode === "grid"
                ? "bg-white text-zinc-900 shadow-xs dark:bg-zinc-900 dark:text-zinc-50 hover:bg-white dark:hover:bg-zinc-900"
                : "text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300"
            )}
            title="Grid View"
          >
            <LayoutGrid className="size-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onViewModeChange("list")}
            className={cn(
              "size-7 rounded-xl transition-all hover:bg-transparent",
              viewMode === "list"
                ? "bg-white text-zinc-900 shadow-xs dark:bg-zinc-900 dark:text-zinc-50 hover:bg-white dark:hover:bg-zinc-900"
                : "text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300"
            )}
            title="List View"
          >
            <List className="size-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
