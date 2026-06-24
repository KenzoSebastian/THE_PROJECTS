"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, GitMerge, Users, Cloud, RefreshCw, FileCode } from "lucide-react";

interface ActivityLog {
  id: string;
  time: string;
  type: "project" | "system" | "media" | "visitor";
  message: string;
  user: string;
}

const recentActivities: ActivityLog[] = [
  {
    id: "act-1",
    time: "Baru saja",
    type: "project",
    message: "Melakukan refaktorisasi modularitas halaman portofolio proyek (9 komponen baru)",
    user: "Kenzo Sebastian (AI Pair)",
  },
  {
    id: "act-2",
    time: "10 menit yang lalu",
    type: "system",
    message: "Mengaktifkan Global State Context untuk konfigurasi tema Light & Dark Mode",
    user: "Kenzo Sebastian",
  },
  {
    id: "act-3",
    time: "2 jam yang lalu",
    type: "project",
    message: "Menambahkan 5 data dummy proyek baru untuk pengisian grid tampilan penuh",
    user: "Kenzo Sebastian",
  },
  {
    id: "act-4",
    time: "Kemarin, 15:40",
    type: "media",
    message: "Berhasil mengunggah cover image proyek 'E-Commerce Microservices' ke Cloudinary folder the_projects/",
    user: "Kenzo Sebastian (System API)",
  },
  {
    id: "act-5",
    time: "2 hari yang lalu",
    type: "visitor",
    message: "Pengunjung dari Jakarta membuka halaman portofolio utama & menyalin snippet 'NestAuth Setup'",
    user: "Public Visitor",
  },
  {
    id: "act-6",
    time: "3 hari yang lalu",
    type: "system",
    message: "Menerapkan Validasi Gatekeeper Ketat (whitelist DTO) di endpoint POST/PATCH backend",
    user: "System Daemon",
  }
];

export default function ActivityPage() {
  // Mock Weekly Traffic (views/day)
  const trafficData = [
    { day: "Sen", views: 120 },
    { day: "Sel", views: 250 },
    { day: "Rab", views: 190 },
    { day: "Kam", views: 340 },
    { day: "Jum", views: 280 },
    { day: "Sab", views: 420 },
    { day: "Min", views: 310 }
  ];

  const maxViews = Math.max(...trafficData.map(d => d.views));

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
          <Activity className="size-6 text-orange-600" />
          System Activity Log
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-xs">
          Pantau aktivitas pengeditan admin dan statistik lalu lintas pengunjung portofolio Anda.
        </p>
      </div>

      {/* Summary Cards Grid */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="rounded-3xl border border-zinc-200/50 bg-white/70 shadow-sm dark:border-zinc-800/50 dark:bg-zinc-900/50 [--card-spacing:12px]">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider flex items-center justify-between">
              Total Page Views
              <Users className="size-4 text-orange-600" />
            </CardTitle>
            <CardDescription className="text-[10px]">Lalu lintas kumulatif minggu ini</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-50">1,910</p>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border border-zinc-200/50 bg-white/70 shadow-sm dark:border-zinc-800/50 dark:bg-zinc-900/50 [--card-spacing:12px]">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider flex items-center justify-between">
              Media CDN Load
              <Cloud className="size-4 text-green-600" />
            </CardTitle>
            <CardDescription className="text-[10px]">Cloudinary API Usage quota</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-extrabold text-green-600 dark:text-green-400">8.4% <span className="text-[10px] text-zinc-400 font-normal">/ 100MB</span></p>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border border-zinc-200/50 bg-white/70 shadow-sm dark:border-zinc-800/50 dark:bg-zinc-900/50 [--card-spacing:12px]">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider flex items-center justify-between">
              Sync Operations
              <RefreshCw className="size-4 text-blue-500" />
            </CardTitle>
            <CardDescription className="text-[10px]">Aktivitas build & database</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-extrabold text-blue-500">24 <span className="text-[10px] text-zinc-400 font-normal">Succeed</span></p>
          </CardContent>
        </Card>
      </div>

      {/* Traffic Chart & Activity Timeline */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Weekly Traffic Chart (Grid Column Bars) */}
        <Card className="md:col-span-1 rounded-3xl border border-zinc-200/50 bg-white/70 dark:border-zinc-800/50 dark:bg-zinc-900/50 p-4 flex flex-col justify-between h-[340px]">
          <div className="space-y-1 mb-4">
            <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-50">Lalu Lintas Harian</h3>
            <p className="text-zinc-500 dark:text-zinc-400 text-[10px]">Jumlah views pengunjung dalam seminggu</p>
          </div>

          <div className="flex-1 flex items-end justify-between gap-1.5 h-36 px-2">
            {trafficData.map((d) => {
              const pct = (d.views / maxViews) * 100;
              return (
                <div key={d.day} className="flex flex-col items-center gap-2 flex-1 group">
                  {/* Tooltip value */}
                  <div className="text-[9px] bg-zinc-950 text-white rounded px-1 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 font-bold mb-1">
                    {d.views}
                  </div>
                  {/* Bar column */}
                  <div
                    style={{ height: `${pct}%` }}
                    className="w-full bg-orange-600/10 hover:bg-orange-600 rounded-t-lg transition-all duration-300 min-h-[4px]"
                  />
                  <span className="text-[10px] font-semibold text-zinc-500 dark:text-zinc-400">{d.day}</span>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Activity Timeline List */}
        <Card className="md:col-span-2 rounded-3xl border border-zinc-200/50 bg-white/70 dark:border-zinc-800/50 dark:bg-zinc-900/50 p-4 h-[340px] flex flex-col">
          <div className="space-y-1 mb-4 shrink-0">
            <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-50">Log Aktivitas Terbaru</h3>
            <p className="text-zinc-500 dark:text-zinc-400 text-[10px]">Riwayat pembaruan sistem dan log transaksi</p>
          </div>

          {/* Timeline Feed Container */}
          <div className="flex-1 overflow-y-auto pr-1 space-y-4 no-scrollbar">
            {recentActivities.map((act) => (
              <div key={act.id} className="flex gap-3 text-xs items-start">
                {/* Timeline Icon Badge */}
                <div className="size-8 rounded-full shrink-0 flex items-center justify-center border border-zinc-100 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
                  {act.type === "project" && <FileCode className="size-4 text-orange-600" />}
                  {act.type === "system" && <GitMerge className="size-4 text-blue-500" />}
                  {act.type === "media" && <Cloud className="size-4 text-green-600" />}
                  {act.type === "visitor" && <Users className="size-4 text-purple-600" />}
                </div>

                {/* Timeline description */}
                <div className="flex-1 space-y-0.5 border-b border-zinc-100 dark:border-zinc-800/50 pb-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-zinc-900 dark:text-zinc-50">{act.user}</span>
                    <span className="text-[10px] text-zinc-400 font-medium">{act.time}</span>
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-400 text-[11px] leading-relaxed">
                    {act.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
