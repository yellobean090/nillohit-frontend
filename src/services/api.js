// src/services/api.js
import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const api = axios.create({
  baseURL,
  withCredentials: true,
});

// ✅ Backward-compatible aliases (your existing code imports these)
export const DoerAPI = api;
export const ProviderAPI = api;
export const AdminAPI = api;

// Attach token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
