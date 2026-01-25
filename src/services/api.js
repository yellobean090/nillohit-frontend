import axios from "axios";

// Put this in Vercel env as VITE_API_BASE_URL
// Example: https://nillohit-backend-production.up.railway.app
const BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export const api = axios.create({
  baseURL: BASE,
  withCredentials: true,
});

// Helper: attach token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// AUTH
export const AuthAPI = {
  signup: (payload) => api.post("/api/auth/signup", payload),
  login: (payload) => api.post("/api/auth/login", payload),
  me: () => api.get("/api/user/me"),
};

// DOER (User)
export const DoerAPI = {
  listTasks: () => api.get("/api/tasks"),
  submitProof: (payload) => api.post("/api/submissions", payload),
};

// PROVIDER
export const ProviderAPI = {
  createTask: (payload) => api.post("/api/tasks/provider", payload),
  bulkCreate: (payload) => api.post("/api/tasks/provider/bulk", payload),
  review: () => api.get("/api/tasks/provider/review"),
  approve: (id) => api.post(`/api/submissions/${id}/approve`),
  reject: (id) => api.post(`/api/submissions/${id}/reject`),
};

// ADMIN
export const AdminAPI = {
  listUsers: () => api.get("/api/admin/users"),
  setRole: (userId, role) => api.post("/api/admin/set-role", { userId, role }),
};
