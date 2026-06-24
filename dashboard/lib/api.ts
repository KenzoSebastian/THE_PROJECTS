import axios from "axios";

// Ambil BASE URL dari environment variable, fallback ke URL Vercel backend
const baseURL =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.API_URL ||
  "https://the-projects-chi.vercel.app/";

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor untuk menyisipkan JWT Token dari localStorage secara otomatis
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("the_projects_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
