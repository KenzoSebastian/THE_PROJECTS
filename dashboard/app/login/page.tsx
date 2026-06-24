"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTheme } from "@/context/theme-context";
import { Sun, Moon, Eye, EyeOff, Loader2, Mail, Lock } from "lucide-react";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [email, setEmail] = useState("admin@theprojects.dev");
  const [password, setPassword] = useState("admin");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Redirect if already logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("the_projects_logged_in");
    if (isLoggedIn === "true") {
      router.replace("/");
    }
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email dan password wajib diisi.");
      return;
    }

    setLoading(true);

    // Mock network request delay
    setTimeout(() => {
      if (email === "admin@theprojects.dev" && password === "admin") {
        localStorage.setItem("the_projects_logged_in", "true");
        toast.success("Login Berhasil", {
          description: "Selamat datang kembali di The Projects Console!",
        });
        router.replace("/");
      } else {
        setError("Email atau password yang Anda masukkan salah.");
        setLoading(false);
      }
    }, 1200);
  };

  const handleMockSSO = (provider: string) => {
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem("the_projects_logged_in", "true");
      toast.success(`Login via ${provider} Berhasil`, {
        description: "Autentikasi otomatis berhasil disimulasikan.",
      });
      router.replace("/");
    }, 1000);
  };

  return (
    <div className="flex min-h-screen w-screen overflow-hidden bg-zinc-50 text-zinc-950 font-sans antialiased dark:bg-zinc-950 dark:text-zinc-50 transition-colors duration-300">
      {/* Light/Dark Toggle di Pojok Kanan Atas */}
      <div className="absolute top-6 right-6 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleTheme}
          className="rounded-full shadow-sm bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 cursor-pointer"
        >
          {theme === "light" ? <Moon className="size-4" /> : <Sun className="size-4" />}
        </Button>
      </div>

      {/* Grid Split Screen */}
      <div className="grid w-full grid-cols-1 md:grid-cols-2">
        {/* Sisi Kiri: Branding & Visuals (Hanya muncul di md+) */}
        <div className="relative hidden flex-col justify-between bg-zinc-900 p-12 text-white dark:bg-zinc-950 md:flex border-r border-zinc-800/20 overflow-hidden">
          {/* Glowing Gradients in Background */}
          <div className="absolute inset-0 z-0">
            <div className="absolute top-[-10%] left-[-10%] size-96 rounded-full bg-orange-600/20 blur-3xl" />
            <div className="absolute bottom-[20%] right-[-10%] size-96 rounded-full bg-amber-500/10 blur-3xl" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_100%_200px,rgba(251,146,60,0.08),transparent)]" />
            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
          </div>

          <div className="relative z-10 flex items-center gap-2">
            <div className="flex size-7 items-center justify-center rounded-full bg-orange-600 font-bold text-[12px] shadow-lg">
              ↗
            </div>
            <span className="font-extrabold text-sm tracking-tight">theprojects</span>
          </div>

          <div className="relative z-10 my-auto max-w-md space-y-4">
            <h1 className="text-4xl font-extrabold tracking-tight leading-tight text-white">
              Craft beautiful workspaces.
            </h1>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Selamat datang di portal kontrol manajemen portofolio Anda. Kelola proyek, rilis pembaruan, dan pantau status server dalam satu dasbor minimalis yang terintegrasi.
            </p>
          </div>

          <div className="relative z-10 flex items-center justify-between text-xs text-zinc-500">
            <span>© 2026 The Projects Co.</span>
            <div className="flex gap-4">
              <span className="hover:text-zinc-300 cursor-pointer">Privacy</span>
              <span className="hover:text-zinc-300 cursor-pointer">Terms</span>
            </div>
          </div>
        </div>

        {/* Sisi Kanan: Formulir Login */}
        <div className="flex items-center justify-center p-6 relative">
          {/* Subtle Grid for Right Side */}
          <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.01)_1px,transparent_1px)] bg-[size:3rem_3rem] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)]" />

          <Card className="w-full max-w-[420px] border-zinc-200/50 bg-white/70 backdrop-blur-xl shadow-xl dark:border-zinc-800/50 dark:bg-zinc-900/50 rounded-3xl relative z-10 overflow-hidden transition-all duration-300">
            <CardHeader className="space-y-1.5 pb-6">
              <div className="flex items-center gap-2 mb-2 md:hidden">
                <div className="flex size-6 items-center justify-center rounded-full bg-orange-600 text-white font-bold text-[10px]">
                  ↗
                </div>
                <span className="font-extrabold text-xs tracking-tight">theprojects</span>
              </div>
              <CardTitle className="text-xl font-bold tracking-tight">Sign in to console</CardTitle>
              <CardDescription className="text-xs">
                Masukkan email Anda di bawah untuk mengelola platform.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-3 text-xs font-medium text-red-600 bg-red-50 dark:bg-red-950/20 dark:text-red-400 rounded-xl border border-red-200/50 dark:border-red-900/30">
                    {error}
                  </div>
                )}

                {/* Input Email */}
                <div className="space-y-1">
                  <label htmlFor="email" className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3 size-4 text-zinc-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-10.5 rounded-xl border-zinc-200 dark:border-zinc-800 focus-visible:ring-orange-600 focus-visible:border-orange-600 text-xs"
                      disabled={loading}
                    />
                  </div>
                </div>

                {/* Input Password */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                      Password
                    </label>
                    <span className="text-[11px] font-semibold text-orange-600 hover:underline cursor-pointer">
                      Forgot?
                    </span>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-3 size-4 text-zinc-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10 h-10.5 rounded-xl border-zinc-200 dark:border-zinc-800 focus-visible:ring-orange-600 focus-visible:border-orange-600 text-xs"
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-3 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-pointer"
                      disabled={loading}
                    >
                      {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-10.5 rounded-xl bg-orange-600 text-white font-semibold hover:bg-orange-700 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer text-xs"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="size-4 animate-spin" />
                      Sign In...
                    </span>
                  ) : (
                    "Sign In with Credentials"
                  )}
                </Button>
              </form>

              {/* Separator */}
              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-zinc-200 dark:border-zinc-800"></div>
                <span className="flex-shrink mx-4 text-[10px] text-zinc-400 uppercase tracking-widest font-semibold">Or continue with</span>
                <div className="flex-grow border-t border-zinc-200 dark:border-zinc-800"></div>
              </div>

              {/* SSO Buttons */}
              <div className="grid grid-cols-2 gap-3">
                {/* Google Button */}
                <Button
                  variant="outline"
                  onClick={() => handleMockSSO("Google")}
                  disabled={loading}
                  className="h-10.5 rounded-xl border-zinc-200 dark:border-zinc-800 bg-white hover:bg-zinc-50 dark:bg-zinc-900 dark:hover:bg-zinc-800 cursor-pointer flex items-center justify-center gap-2 text-xs"
                >
                  <svg className="size-4" viewBox="0 0 24 24" width="24" height="24">
                    <path
                      fill="#EA4335"
                      d="M12 5.04c1.67 0 3.2.58 4.39 1.71l3.27-3.27C17.68 1.54 14.98 1 12 1 7.35 1 3.37 3.67 1.39 7.56l3.87 3C6.18 7.6 8.85 5.04 12 5.04z"
                    />
                    <path
                      fill="#4285F4"
                      d="M23.49 12.27c0-.81-.07-1.59-.2-2.34H12v4.44h6.44c-.28 1.47-1.11 2.72-2.36 3.56l3.66 2.84c2.14-1.97 3.75-4.87 3.75-8.5z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.26 14.12c-.24-.72-.38-1.5-.38-2.3s.14-1.58.38-2.3L1.39 6.52C.5 8.32 0 10.32 0 12s.5 3.68 1.39 5.48l3.87-3.36z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c3.24 0 5.97-1.07 7.96-2.91l-3.66-2.84c-1.1.74-2.52 1.18-4.3 1.18-3.15 0-5.82-2.56-6.74-5.52L1.39 16.27C3.37 20.33 7.35 23 12 23z"
                    />
                  </svg>
                  <span>Google</span>
                </Button>

                {/* Github Button */}
                <Button
                  variant="outline"
                  onClick={() => handleMockSSO("GitHub")}
                  disabled={loading}
                  className="h-10.5 rounded-xl border-zinc-200 dark:border-zinc-800 bg-white hover:bg-zinc-50 dark:bg-zinc-900 dark:hover:bg-zinc-800 cursor-pointer flex items-center justify-center gap-2 text-xs"
                >
                  <svg className="size-4 fill-current text-zinc-950 dark:text-zinc-50" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  <span>GitHub</span>
                </Button>
              </div>

              {/* Credentials Hint Banner */}
              <div className="p-3 text-[10px] bg-zinc-50 border border-zinc-150 rounded-2xl text-zinc-500 dark:bg-zinc-950 dark:border-zinc-800/60 dark:text-zinc-400">
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">Tip Demo:</span> Gunakan email <code className="font-mono text-orange-600 bg-orange-50 dark:bg-orange-950/40 px-1 py-0.5 rounded">admin@theprojects.dev</code> dan password <code className="font-mono text-orange-600 bg-orange-50 dark:bg-orange-950/40 px-1 py-0.5 rounded">admin</code> untuk masuk.
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
