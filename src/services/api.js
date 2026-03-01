import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL?.replace(/\/$/, "") || "";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      window.dispatchEvent(new Event("auth-changed"));
    }
    return Promise.reject(error);
  }
);

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
  forgotPassword: (email) => api.post("/users/forgot-password", { email }),
  resetPassword: (token, newPassword) =>
    api.post("/users/reset-password", { token, new_password: newPassword }),
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

export const getImageUrl = (path) => {
  if (!path) return "/placeholder-image.jpg";
  const cleanPath = path.replace(/^\/+/, "").replace(/\\/g, "/");
  return `${API_BASE_URL}/${cleanPath}`;
};

export { api };
