"use client";

import React, { useState } from "react";
import { X, Images } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ProjectFormGalleryProps {
  images: string[];
  onChange: (images: string[]) => void;
}

export function ProjectFormGallery({ images, onChange }: ProjectFormGalleryProps) {
  const [inputVal, setInputVal] = useState("");

  const handleAdd = () => {
    const trimmed = inputVal.trim();
    if (trimmed && !images.includes(trimmed)) {
      onChange([...images, trimmed]);
      setInputVal("");
    }
  };

  const handleRemove = (index: number) => {
    onChange(images.filter((_, idx) => idx !== index));
  };

  return (
    <div className="grid gap-2 border border-zinc-200/60 dark:border-zinc-800/60 rounded-2xl p-3 bg-zinc-50/50 dark:bg-zinc-950/20">
      <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
        <Images className="size-3.5 text-zinc-400" />
        Project Gallery (Images URLs)
      </label>

      {/* Image Input */}
      <div className="flex gap-2">
        <Input
          placeholder="https://images.unsplash.com/..."
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
        <Button type="button" onClick={handleAdd} size="sm" variant="outline" className="rounded-xl h-9">Add URL</Button>
      </div>

      {/* Images List */}
      {images.length > 0 && (
        <div className="mt-2 space-y-1.5 max-h-40 overflow-y-auto pr-1">
          {images.map((img, idx) => (
            <div key={idx} className="flex items-center gap-2 bg-white dark:bg-zinc-950 p-1.5 rounded-xl border border-zinc-100 dark:border-zinc-800 text-xs">
              <div className="size-8 rounded overflow-hidden shrink-0 bg-zinc-100 border border-zinc-200 dark:border-zinc-800">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img} alt="preview" className="size-full object-cover" />
              </div>
              <span className="truncate flex-1 text-zinc-500 dark:text-zinc-400">{img}</span>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => handleRemove(idx)}
                className="h-6 w-6 text-zinc-400 hover:text-red-500 hover:bg-transparent"
              >
                <X className="size-3.5" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
