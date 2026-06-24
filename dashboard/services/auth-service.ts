import api from "@/lib/api";

// Types are defined inline for clear type bindings
export interface LoginPayload {
  email: string;
  password?: string;
}

export interface LoginResponse {
  access_token: string;
  user: {
    id: string;
    email: string;
  };
}

export interface UserProfile {
  sub: string;
  email: string;
  iat: number;
  exp: number;
}

/**
 * Mengirim kredensial pengguna ke endpoint login backend.
 */
export async function loginService(payload: LoginPayload): Promise<LoginResponse> {
  const { data } = await api.post<LoginResponse>("/auth/login", payload);
  return data;
}

/**
 * Mengambil profil pengguna yang terautentikasi berdasarkan JWT token saat ini.
 */
export async function getProfileService(): Promise<UserProfile> {
  const { data } = await api.get<UserProfile>("/auth/profile");
  return data;
}
