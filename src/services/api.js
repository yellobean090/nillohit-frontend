import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;

// Main axios client
export const api = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});

// Attach token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Helpers (optional but nice)
export const AuthAPI = {
  signup: (payload) => api.post("/api/auth/signup", payload),
  login: (payload) => api.post("/api/auth/login", payload),
};

export const UserAPI = {
  profile: () => api.get("/api/user/profile"),
};

// ✅ so your other pages can import { DoerAPI }
export const DoerAPI = {
  listTasks: () => api.get("/api/tasks"),
  submitProof: (payload) => api.post("/api/submissions", payload),
};

export const ProviderAPI = {
  reviewSubmissions: () => api.get("/api/submissions"),
  approveSubmission: (id) => api.patch(`/api/submissions/${id}/approve`),
  rejectSubmission: (id) => api.patch(`/api/submissions/${id}/reject`),
};

export const AdminAPI = {
  listUsers: () => api.get("/api/admin/users"),
};
