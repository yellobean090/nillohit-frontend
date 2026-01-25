import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

/**
 * IMPORTANT:
 * If your backend endpoints are different, change ONLY these paths below.
 */
export const DoerAPI = {
  // Live tasks list for doers
  liveTasks: () => api.get("/api/tasks/live"),

  // Claim a task (first come first served)
  claimTask: (taskId) => api.post(`/api/tasks/${taskId}/claim`),

  // Doer’s claimed tasks (claimed/approved/rejected/expired)
  myTasks: () => api.get("/api/tasks/my"),

  // Submit proof (multipart: screenshot + link)
  submitProof: (taskId, formData) =>
    api.post(`/api/tasks/${taskId}/submit`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  // Wallet info
  wallet: () => api.get("/api/wallet/me"),

  // Request withdrawal
  requestWithdrawal: (payload) => api.post("/api/withdrawals/request", payload),
};
