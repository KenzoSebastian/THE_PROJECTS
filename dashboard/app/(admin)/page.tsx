"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { initialProjects, Project } from "@/app/data/projects";
import { FolderGit, Eye, EyeOff, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    total: 0,
    published: 0,
    drafts: 0
  });

  useEffect(() => {
    const stored = localStorage.getItem("the_projects_dummy_projects");
    let list: Project[] = initialProjects;
    if (stored) {
      try {
        list = JSON.parse(stored);
      } catch (e) {
        list = initialProjects;
      }
    }
    setStats({
      total: list.length,
      published: list.filter(p => p.isPublished).length,
      drafts: list.filter(p => !p.isPublished).length
    });
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
          <LayoutDashboard className="size-6 text-orange-600" />
          Dashboard Overview
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-xs">
          Selamat datang kembali, Kenzo! Ini panggung kontrol ekosistem portofoliomu.
        </p>
      </div>

      {/* Grid Status Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* Total Projects Card */}
        <Card className="rounded-3xl border border-zinc-200/50 bg-white/70 shadow-sm hover:shadow-md transition-all duration-300 dark:border-zinc-800/50 dark:bg-zinc-900/50 overflow-hidden relative group">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider flex items-center justify-between">
              Total Projects
              <FolderGit className="size-4 text-orange-600" />
            </CardTitle>
            <CardDescription className="text-[10px]">Jumlah portfolio terdaftar</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-50 group-hover:scale-105 transition-transform duration-300 origin-left">
              {stats.total}
            </p>
          </CardContent>
        </Card>

        {/* Published Projects Card */}
        <Card className="rounded-3xl border border-zinc-200/50 bg-white/70 shadow-sm hover:shadow-md transition-all duration-300 dark:border-zinc-800/50 dark:bg-zinc-900/50 overflow-hidden relative group">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider flex items-center justify-between">
              Published
              <Eye className="size-4 text-green-600" />
            </CardTitle>
            <CardDescription className="text-[10px]">Project yang online & publik</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-extrabold text-green-600 dark:text-green-400 group-hover:scale-105 transition-transform duration-300 origin-left">
              {stats.published}
            </p>
          </CardContent>
        </Card>

        {/* Draft Projects Card */}
        <Card className="rounded-3xl border border-zinc-200/50 bg-white/70 shadow-sm hover:shadow-md transition-all duration-300 dark:border-zinc-800/50 dark:bg-zinc-900/50 overflow-hidden relative group">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider flex items-center justify-between">
              Drafts
              <EyeOff className="size-4 text-zinc-500" />
            </CardTitle>
            <CardDescription className="text-[10px]">Project dalam bentuk draf</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-extrabold text-zinc-500 dark:text-zinc-400 group-hover:scale-105 transition-transform duration-300 origin-left">
              {stats.drafts}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Action Banner */}
      <div className="p-6 rounded-3xl border border-zinc-200/40 bg-zinc-900 text-white dark:border-zinc-800/40 dark:bg-zinc-950 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
        <div className="space-y-1">
          <h3 className="font-bold text-sm">Kelola Portofolio Anda Sekarang</h3>
          <p className="text-zinc-400 text-xs max-w-md">
            Tambah proyek baru, unggah gambar aset gallery, atau kelola teknologi stack untuk ditampilkan di halaman portfolio utama.
          </p>
        </div>
        <Link href="/projects" passHref>
          <Button className="rounded-full bg-white text-zinc-950 hover:bg-zinc-200 font-semibold text-xs py-2 px-5 transition-transform active:scale-95">
            Mulai Manage Projects →
          </Button>
        </Link>
      </div>
    </div>
  );
}
