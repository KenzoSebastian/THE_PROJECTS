"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { loginService, getProfileService, LoginPayload, LoginResponse, UserProfile } from "@/services/auth-service";
import { toast } from "sonner";

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  loginMutation: UseMutationResult<LoginResponse, Error, LoginPayload>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Verifikasi token saat pertama kali aplikasi dimuat
  useEffect(() => {
    async function loadUser() {
      const token = localStorage.getItem("the_projects_token");
      if (token) {
        try {
          const profile = await getProfileService();
          setUser(profile);
        } catch (error) {
          console.error("Token verification failed:", error);
          // Token tidak valid atau kedaluwarsa, bersihkan storage
          localStorage.removeItem("the_projects_token");
          localStorage.removeItem("the_projects_logged_in");
          setUser(null);
        }
      }
      setLoading(false);
    }
    loadUser();
  }, []);

  // Mutasi untuk Login memanggil API service
  const loginMutation = useMutation<LoginResponse, Error, LoginPayload>({
    mutationFn: loginService,
    onSuccess: (data) => {
      localStorage.setItem("the_projects_token", data.access_token);
      localStorage.setItem("the_projects_logged_in", "true");
      
      setUser({
        sub: data.user.id,
        email: data.user.email,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 86400, // 1 day
      });

      toast.success("Login Berhasil", {
        description: "Selamat datang kembali di dasbor administrasi!",
      });

      router.replace("/");
    },
    onError: (error: any) => {
      const errMsg = error?.response?.data?.message || "Email atau password salah.";
      toast.error("Login Gagal", {
        description: Array.isArray(errMsg) ? errMsg[0] : errMsg,
      });
    },
  });

  const logout = () => {
    localStorage.removeItem("the_projects_token");
    localStorage.removeItem("the_projects_logged_in");
    setUser(null);
    toast.success("Sesi Berakhir", {
      description: "Anda telah keluar dari platform.",
    });
    router.replace("/login");
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginMutation, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
