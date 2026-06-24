"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings, Shield, RefreshCw, Database, Trash2, HeartPulse, User } from "lucide-react";
import { initialProjects } from "@/app/data/projects";

export default function ManagePage() {
  const [dbStatus, setDbStatus] = useState<"connected" | "disconnected" | "checking">("connected");
  const [pingTime, setPingTime] = useState("12ms");
  const [checkingDiagnostics, setCheckingDiagnostics] = useState(false);

  // Trigger Schema Validation (Mocked action)
  const handleCheckDatabase = () => {
    setDbStatus("checking");
    setTimeout(() => {
      setDbStatus("connected");
      setPingTime(`${Math.floor(Math.random() * 20) + 5}ms`);
      toast.success("Database schema integrity check passed successfully!");
    }, 1200);
  };

  // Reset local storage database (Clean cache)
  const handleResetData = () => {
    if (confirm("Apakah Anda yakin ingin menyetel ulang data dummy ke default? Semua proyek kustom Anda akan terhapus.")) {
      localStorage.setItem("the_projects_dummy_projects", JSON.stringify(initialProjects));
      toast.success("Database dummy disetel ulang ke default! Silakan muat ulang halaman untuk menyinkronkan.");
    }
  };

  // Cloudinary cleanup simulation
  const handleCloudinaryCleanup = () => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1500)),
      {
        loading: "Mencari file media yatim piatu (orphan assets)...",
        success: "Pembersihan selesai! 0 gambar yatim piatu terdeteksi.",
        error: "Gagal membersihkan media.",
      }
    );
  };

  // Run full system diagnostics simulation
  const handleDiagnostics = () => {
    setCheckingDiagnostics(true);
    setTimeout(() => {
      setCheckingDiagnostics(false);
      toast.success("Semua sistem berjalan normal! (Diagnostics complete)");
    }, 1800);
  };

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
          <Settings className="size-6 text-orange-600" />
          System Maintenance & Control
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-xs">
          Lakukan pemeliharaan database, bersihkan berkas sampah CDN, dan kelola integritas API gateway.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Database & Diagnostics Column */}
        <div className="space-y-6">
          <Card className="rounded-3xl border border-zinc-200/50 bg-white/70 shadow-sm dark:border-zinc-800/50 dark:bg-zinc-900/50 p-4">
            <CardHeader className="p-0 mb-4">
              <CardTitle className="text-sm font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-1.5">
                <Database className="size-4.5 text-orange-600" />
                PostgreSQL + Prisma Status
              </CardTitle>
              <CardDescription className="text-[10px]">Pengecekan pool koneksi database relasional.</CardDescription>
            </CardHeader>
            <CardContent className="p-0 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3 py-2 border-b border-zinc-100 dark:border-zinc-800/50">
                <span className="text-zinc-500">Connection Status</span>
                <span className="font-semibold text-right flex items-center justify-end gap-1.5">
                  <span className={`size-2 rounded-full ${dbStatus === "connected" ? "bg-green-600 animate-pulse" : dbStatus === "checking" ? "bg-yellow-500 animate-spin" : "bg-red-500"}`} />
                  {dbStatus === "connected" ? "Connected" : dbStatus === "checking" ? "Checking Status..." : "Disconnected"}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 py-2 border-b border-zinc-100 dark:border-zinc-800/50">
                <span className="text-zinc-500">API Response Ping</span>
                <span className="font-bold text-zinc-900 dark:text-zinc-50 text-right">{pingTime}</span>
              </div>
              <div className="grid grid-cols-2 gap-3 py-2">
                <span className="text-zinc-500">Schema Version</span>
                <span className="font-mono text-zinc-500 text-right">0.4.0 (relational_sync)</span>
              </div>

              <div className="pt-2">
                <Button
                  onClick={handleCheckDatabase}
                  disabled={dbStatus === "checking"}
                  variant="outline"
                  className="w-full text-xs rounded-xl py-2 h-auto"
                >
                  <RefreshCw className={`size-3.5 mr-1.5 ${dbStatus === "checking" ? "animate-spin" : ""}`} />
                  Check Database Integrity
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border border-zinc-200/50 bg-white/70 shadow-sm dark:border-zinc-800/50 dark:bg-zinc-900/50 p-4">
            <CardHeader className="p-0 mb-4">
              <CardTitle className="text-sm font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-1.5">
                <HeartPulse className="size-4.5 text-red-500" />
                System Health Check
              </CardTitle>
              <CardDescription className="text-[10px]">Diagnostik status runtime modul API backend NestJS.</CardDescription>
            </CardHeader>
            <CardContent className="p-0 space-y-3 text-xs">
              <p className="text-zinc-500 leading-relaxed text-[11px]">
                Jalankan tes menyeluruh untuk memverifikasi fungsionalitas server, JWT token middleware, CORS policy, dan webhook Cloudinary.
              </p>
              <Button
                onClick={handleDiagnostics}
                disabled={checkingDiagnostics}
                className="w-full text-xs rounded-xl bg-zinc-950 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200 py-2 h-auto"
              >
                <RefreshCw className={`size-3.5 mr-1.5 ${checkingDiagnostics ? "animate-spin" : ""}`} />
                {checkingDiagnostics ? "Running Diagnostics..." : "Run Complete Diagnostics"}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Maintenance Actions Column */}
        <div className="space-y-6">
          <Card className="rounded-3xl border border-zinc-200/50 bg-white/70 shadow-sm dark:border-zinc-800/50 dark:bg-zinc-900/50 p-4">
            <CardHeader className="p-0 mb-4">
              <CardTitle className="text-sm font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-1.5">
                <Trash2 className="size-4.5 text-zinc-500" />
                Data & Media Clean Up
              </CardTitle>
              <CardDescription className="text-[10px]">Bersihkan cache dummy data local dan folder media CDN.</CardDescription>
            </CardHeader>
            <CardContent className="p-0 space-y-4 text-xs">
              <div className="space-y-2 pb-2 border-b border-zinc-100 dark:border-zinc-800/50">
                <h4 className="font-bold text-zinc-800 dark:text-zinc-200">Reset Local Storage Cache</h4>
                <p className="text-[10px] text-zinc-400">Kembalikan basis data dummy portofolio Anda ke kondisi default awal (7 proyek bawaan).</p>
                <Button onClick={handleResetData} variant="destructive" className="w-full text-xs rounded-xl py-2 h-auto">
                  Reset Local Storage Database
                </Button>
              </div>

              <div className="space-y-2 pt-2">
                <h4 className="font-bold text-zinc-800 dark:text-zinc-200">Sync Unused CDN Images</h4>
                <p className="text-[10px] text-zinc-400">Pindai database PostgreSQL Anda dan hapus otomatis media gambar Cloudinary yang tidak lagi ditautkan ke proyek mana pun.</p>
                <Button onClick={handleCloudinaryCleanup} variant="outline" className="w-full text-xs rounded-xl py-2 h-auto">
                  Scan & Delete Orphan CDN Images
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border border-zinc-200/50 bg-white/70 shadow-sm dark:border-zinc-800/50 dark:bg-zinc-900/50 p-4">
            <CardHeader className="p-0 mb-4">
              <CardTitle className="text-sm font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-1.5">
                <Shield className="size-4.5 text-orange-600" />
                Admin Credentials
              </CardTitle>
              <CardDescription className="text-[10px]">Informasi akun administrator aktif.</CardDescription>
            </CardHeader>
            <CardContent className="p-0 space-y-4 text-xs">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-full bg-linear-to-tr from-orange-500 to-amber-500 text-white font-extrabold text-sm flex items-center justify-center shrink-0 shadow-sm">
                  K
                </div>
                <div className="space-y-0.5">
                  <h4 className="font-bold text-zinc-900 dark:text-zinc-50">Kenzo Sebastian</h4>
                  <p className="text-[10px] text-zinc-400">Root Administrator • Last log: Today, 16:08</p>
                </div>
              </div>

              <div className="border-t border-zinc-100 dark:border-zinc-800/50 pt-3">
                <div className="grid grid-cols-2 gap-2 text-[11px] mb-2">
                  <span className="text-zinc-500">Security Access Level</span>
                  <span className="font-semibold text-right text-orange-600">Level 3 (Root Override)</span>
                </div>
                <Button variant="outline" className="w-full text-xs rounded-xl py-2 h-auto" disabled>
                  <User className="size-3.5 mr-1.5" />
                  Edit Profile Credentials
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
