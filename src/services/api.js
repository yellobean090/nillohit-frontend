import axios from "axios";

const baseURL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export const api = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const AuthAPI = {
  signup: (payload) => api.post("/api/auth/signup", payload),
  login: (payload) => api.post("/api/auth/login", payload),
};

export const UserAPI = {
  profile: () => api.get("/api/user/profile"),
};
export const DoerAPI = {
  liveTasks: () => api.get("/api/doer/tasks/live"),
  claimTask: (taskId) => api.post(`/api/doer/tasks/${taskId}/claim`),
  myTasks: () => api.get("/api/doer/tasks/my"),
  submitProof: (taskId, payload) =>
    api.post(`/api/doer/tasks/${taskId}/submit-proof`, payload, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  wallet: () => api.get("/api/doer/wallet"),
  requestWithdrawal: (payload) => api.post("/api/doer/withdrawals", payload),
};