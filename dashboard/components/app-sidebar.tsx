"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FolderCode, LayoutDashboard, Settings, Terminal, Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/theme-context";

const navItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Projects", url: "/projects", icon: FolderCode },
  { title: "Dev Server", url: "/server", icon: Terminal },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  return (
    <div className="group/sidebar flex flex-col gap-4 items-center h-full select-none w-20 hover:w-56 transition-all duration-300 ease-in-out">
      <nav className="w-full flex-1 flex flex-col items-center gap-2 p-2 rounded-[32px] border border-zinc-200/50 bg-white shadow-[0_8px_24px_rgba(0,0,0,0.02)] dark:border-zinc-800/50 dark:bg-zinc-900 overflow-hidden transition-all duration-300">
        {navItems.map((item) => {
          const isActive = pathname === item.url;
          return (
            <Link
              key={item.title}
              href={item.url}
              className={cn(
                "w-full flex items-center justify-start group-hover/sidebar:px-4 py-3 rounded-full transition-all duration-300 relative h-12",
                isActive
                  ? "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 shadow-xs"
                  : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100",
              )}
            >
              <div className="w-full group-hover/sidebar:w-6 flex justify-center shrink-0 transition-all duration-300">
                <item.icon className="size-4.5" />
              </div>

              <span className="text-xs font-medium tracking-wide opacity-0 pointer-events-none group-hover/sidebar:opacity-100 group-hover/sidebar:pointer-events-auto transition-opacity duration-300 ml-2 whitespace-nowrap">
                {item.title}
              </span>
            </Link>
          );
        })}

        {/* Theme Toggles - using Shadcn Buttons with custom layout class overrides */}
        <div className="mt-auto w-full pt-2 border-t border-zinc-100 dark:border-zinc-800/60 flex flex-col gap-1">
          <Button
            variant="ghost"
            onClick={() => setTheme("light")}
            className={cn(
              "w-full flex items-center justify-start group-hover/sidebar:px-4 py-3 rounded-full transition-all duration-300 relative h-12 hover:bg-zinc-100 dark:hover:bg-zinc-800",
              theme === "light"
                ? "bg-zinc-950 text-white hover:bg-zinc-950 hover:text-white dark:bg-white dark:text-zinc-950 dark:hover:bg-white dark:hover:text-zinc-950 shadow-xs"
                : "text-zinc-500 dark:text-zinc-400"
            )}
          >
            <div className="w-full group-hover/sidebar:w-6 flex justify-center shrink-0 transition-all duration-300">
              <Sun className="size-4.5" />
            </div>
            <span className="text-xs font-medium tracking-wide opacity-0 pointer-events-none group-hover/sidebar:opacity-100 group-hover/sidebar:pointer-events-auto transition-opacity duration-300 ml-2 whitespace-nowrap">
              Light
            </span>
          </Button>

          <Button
            variant="ghost"
            onClick={() => setTheme("dark")}
            className={cn(
              "w-full flex items-center justify-start group-hover/sidebar:px-4 py-3 rounded-full transition-all duration-300 relative h-12 hover:bg-zinc-100 dark:hover:bg-zinc-800",
              theme === "dark"
                ? "bg-zinc-950 text-white hover:bg-zinc-950 hover:text-white dark:bg-white dark:text-zinc-950 dark:hover:bg-white dark:hover:text-zinc-950 shadow-xs"
                : "text-zinc-500 dark:text-zinc-400"
            )}
          >
            <div className="w-full group-hover/sidebar:w-6 flex justify-center shrink-0 transition-all duration-300">
              <Moon className="size-4.5" />
            </div>
            <span className="text-xs font-medium tracking-wide opacity-0 pointer-events-none group-hover/sidebar:opacity-100 group-hover/sidebar:pointer-events-auto transition-opacity duration-300 ml-2 whitespace-nowrap">
              Dark
            </span>
          </Button>
        </div>
      </nav>
    </div>
  );
}
