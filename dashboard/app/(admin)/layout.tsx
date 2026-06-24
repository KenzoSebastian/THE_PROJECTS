"use client";

import React, { useState, useEffect } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { Search, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("the_projects_logged_in");
    if (isLoggedIn !== "true") {
      router.replace("/login");
    } else {
      setAuthorized(true);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("the_projects_logged_in");
    toast.success("Logout Berhasil", {
      description: "Anda telah keluar dari sesi administrator.",
    });
    router.replace("/login");
  };

  if (!authorized) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950">
        <div className="flex flex-col items-center gap-3">
          <div className="size-8 animate-spin rounded-full border-4 border-orange-600 border-t-transparent" />
          <p className="text-xs text-zinc-500 font-medium dark:text-zinc-400">Memeriksa otorisasi...</p>
        </div>
      </div>
    );
  }

  return (
    // Background dasar abu-abu terang minimalis ala mockup premium
    <div className="flex h-screen w-screen p-5 overflow-hidden bg-[#f4f4f5] text-zinc-950 font-sans antialiased dark:bg-zinc-950 dark:text-zinc-50">
      <aside className="h-full shrink-0">
        <AppSidebar />
      </aside>

      <div className="flex-1 h-full min-w-0 pl-5 overflow-y-auto relative no-scrollbar">
        <header className="sticky top-0 left-0 right-0 z-50 flex h-14 w-full items-center justify-between px-6 rounded-full border border-zinc-200/40 bg-white/60 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.03)] dark:border-zinc-800/40 dark:bg-zinc-900/60 transition-all duration-300">
          <div className="flex items-center gap-2.5">
            <div className="flex size-5 items-center justify-center rounded-full bg-orange-600 text-white font-bold text-[9px]">
              ↗
            </div>
            <span className="font-bold text-xs tracking-tight">theprojects</span>
          </div>

          <div className="hidden md:flex items-center gap-1 text-xs font-medium text-zinc-600 dark:text-zinc-400">
            <Link
              href="/"
              className={cn(
                "px-4 py-1.5 rounded-full transition-colors",
                pathname === "/"
                  ? "bg-zinc-950 text-white font-semibold dark:bg-white dark:text-zinc-950"
                  : "hover:text-zinc-950 dark:hover:text-zinc-50"
              )}
            >
              Overview
            </Link>
            <Link
              href="/activity"
              className={cn(
                "px-4 py-1.5 rounded-full transition-colors",
                pathname === "/activity"
                  ? "bg-zinc-950 text-white font-semibold dark:bg-white dark:text-zinc-950"
                  : "hover:text-zinc-950 dark:hover:text-zinc-50"
              )}
            >
              Activity
            </Link>
            <Link
              href="/manage"
              className={cn(
                "px-4 py-1.5 rounded-full transition-colors",
                pathname === "/manage"
                  ? "bg-zinc-950 text-white font-semibold dark:bg-white dark:text-zinc-950"
                  : "hover:text-zinc-950 dark:hover:text-zinc-50"
              )}
            >
              Manage
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {/* Tombol Search Minimalis */}
            <button className="p-1.5 rounded-full hover:bg-zinc-200/50 text-zinc-500 dark:text-zinc-400 dark:hover:bg-zinc-800/50 transition-colors">
              <Search className="size-3.5" />
            </button>

            <div className="flex items-center gap-3 pl-3 border-l border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-1.5 text-xs font-semibold">
                <span className="text-zinc-900 dark:text-zinc-50">Kenzo Sebastian</span>
                <span className="text-zinc-400 dark:text-zinc-600 font-normal">/</span>
                <span className="text-zinc-500 dark:text-zinc-400 font-normal">Admin</span>
              </div>
              <div className="flex size-6 items-center justify-center rounded-full bg-linear-to-tr from-orange-500 to-amber-500 text-white font-bold text-[10px] shadow-xs">
                K
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                className="size-7 rounded-full text-zinc-400 hover:text-red-500 hover:bg-red-50/20 dark:hover:bg-red-950/20 cursor-pointer transition-colors"
                title="Keluar"
              >
                <LogOut className="size-3.5" />
              </Button>
            </div>
          </div>
        </header>

        <main className="w-full pt-8 pb-12">
          <div className="w-full px-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
