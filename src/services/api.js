import axios from "axios";

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") || "http://localhost:5000";

export const api = axios.create({
  baseURL: `${BASE_URL}/api`,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// ---- Auth ----
export const AuthAPI = {
  signup: (payload) => api.post("/auth/signup", payload),
  login: (payload) => api.post("/auth/login", payload),
  me: () => api.get("/auth/me"),
  logout: () => api.post("/auth/logout"),
};

// ---- User/Doer ----
export const DoerAPI = {
  dashboard: () => api.get("/user/dashboard"),
  tasks: () => api.get("/tasks"),
  submitProof: (payload) => api.post("/submissions", payload),
};

// ---- Provider ----
export const ProviderAPI = {
  myTasks: () => api.get("/tasks/provider"),
  bulkCreate: (payload) => api.post("/tasks/provider/bulk", payload),
  review: () => api.get("/submissions/provider"),
  approveReject: (id, payload) => api.patch(`/submissions/${id}`, payload),
};

// ---- Admin ----
export const AdminAPI = {
  stats: () => api.get("/admin/stats"),
  users: () => api.get("/admin/users"),
};
