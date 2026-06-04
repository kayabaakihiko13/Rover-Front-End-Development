import axios from "axios";
import { STORAGE_KEYS,ROUTES} from "@/constants";
import router from "@/router";
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL?.replace(/\/$/, "") || "";

const createApiInstance = (tokenKey, authEventName, onUnauthorized) => {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  instance.interceptors.request.use((config) => {
    const token = localStorage.getItem(tokenKey);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      const isAuthPath = error.config?.url?.includes("/login") ||
        error.config?.url?.includes("/register");

      if (error.response?.status === 401) {
        // JANGAN jalankan alert jika ini request login/regis
        if (!isAuthPath) {
          localStorage.removeItem(tokenKey);
          if (onUnauthorized) localStorage.removeItem(onUnauthorized);
          window.dispatchEvent(new Event(authEventName));
          // redirect ke login kalau udah exp tokenya
          if(tokenKey === STORAGE_KEYS.USER_TOKEN){
            if (router.currentRoute.value.path !== ROUTES.LOGIN) {
                router.push({
                    path: ROUTES.LOGIN,
                    query: { expired: 'true', redirect: router.currentRoute.value.fullPath }
                });
            }
          }
        }
      }
      return Promise.reject(error);
    }
  );
  return instance;
};

// User API Instance
export const api = createApiInstance(
  STORAGE_KEYS.USER_TOKEN,
  'auth-changed',
  STORAGE_KEYS.USER_USERNAME
);

// Admin API Instance
export const adminApi = createApiInstance(
  STORAGE_KEYS.ADMIN_TOKEN,
  'admin-auth-changed',
  STORAGE_KEYS.ADMIN_USERNAME
);

// ========== User API Services ==========
export const authApi = {
  login: (username, password) => {
    const params = new URLSearchParams();
    params.append("username", username);
    params.append("password", password);
    return api.post("/users/login", params, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
  },
  register: (data) => api.post("/users/register", data),
  forgotPassword: (username) => api.post("/users/forgot-password", { username }),
  resetPassword: (token, newPassword) =>
    api.post(`/users/reset-password/?token=${token}`, { headers: { "Content-Type": "application/x-www-form-urlencoded" } }),
};

export const postsApi = {
  upload: (file) => {
    const formData = new FormData();
    formData.append("file", file);
    return api.post("/posts/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  getHistory: () => api.get("/posts/history"),
  deletePost: (postId) => api.delete(`/posts/${postId}`),
};

export const getImageUrl = async (path) => {
  if (!path) return "/placeholder-image.jpg";

  const cleanPath = path.replace(/^\/+/, "").replace(/\\/g, "/");
  const url = import.meta.env.DEV
    ? `/${cleanPath}`
    : `${API_BASE_URL}/${cleanPath}`;
  const token = localStorage.getItem(STORAGE_KEYS.USER_TOKEN);

  try {
    const response = await fetch(url, {
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    });

    if (!response.ok) throw new Error("Fetch failed");

    const blob = await response.blob();
    return URL.createObjectURL(blob);
  } catch {
    return "/placeholder-image.jpg";
  }
};

// ========== Admin API Services ==========
export const adminApiService = {
  login: (username, password) => {
    const params = new URLSearchParams();
    params.append("username", username);
    params.append("password", password);
    return adminApi.post("/admin/login", params, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
  },

  getDashboard: () => adminApi.get("/admin/dashboard"),
  getAnalytics: (days = 30) => adminApi.get(`/admin/analytics?days=${days}`),
  getUsers: (skip = 0, limit = 50) => adminApi.get(`/admin/users?skip=${skip}&limit=${limit}`),
  getUserDetail: (userId) => adminApi.get(`/admin/users/${userId}`),
  deleteUser: (userId) => adminApi.delete(`/admin/users/${userId}`),
  getHarvest: () => adminApi.get("/admin/harvests"),
  getAllPosts: () => adminApi.get("/admin/harvests"),
  deletePost: (postId) => adminApi.delete(`/admin/posts/${postId}`),
};
