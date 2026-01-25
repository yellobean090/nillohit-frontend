import axios from "axios";

// In Vercel you MUST set VITE_API_URL to your Railway backend base URL
// Example: https://nillohit-backend-production.up.railway.app
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Attach token automatically (if you store it)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ---- APIs (Exports expected by your pages) ----
export const AuthAPI = {
  signup: (data) => api.post("/api/auth/signup", data),
  login: (data) => api.post("/api/auth/login", data),
  me: () => api.get("/api/auth/me"),
};

export const DoerAPI = {
  listTasks: () => api.get("/api/tasks"),
  submitProof: (payload) => api.post("/api/submissions", payload),
};

export const ProviderAPI = {
  createTasksBulk: (payload) => api.post("/api/tasks/provider/bulk", payload),
  reviewSubmissions: () => api.get("/api/submissions/provider"),
  approveSubmission: (id, payload) => api.post(`/api/submissions/${id}/approve`, payload),
};

export const AdminAPI = {
  listUsers: () => api.get("/api/admin/users"),
  setRole: (userId, role) => api.patch(`/api/admin/users/${userId}/role`, { role }),
};
