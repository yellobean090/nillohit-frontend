import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext.js";
import { api } from "../services/api";

/**
 * AuthProvider
 * - Holds authenticated user
 * - Persists session via token
 * - Provides login / logout helpers
 */
export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  // Called after successful login
  const login = (token, userData) => {
    if (token) {
      localStorage.setItem("token", token);
    }
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  // Restore session on page refresh
  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setReady(true);
        return;
      }

      try {
        const res = await api.get("/api/user/profile");
        setUser(res.data);
      } catch (err) {
        console.error(err);
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setReady(true);
      }
    };

    init();
  }, []);

  // Prevent rendering until auth check completes
  if (!ready) return null;

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
