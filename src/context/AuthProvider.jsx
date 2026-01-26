import React, { useMemo, useState } from "react";
import { AuthContext } from "./AuthContext.jsx";

function safeJsonParse(value) {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  // ✅ initialize from localStorage WITHOUT useEffect
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? safeJsonParse(savedUser) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("token") || null;
  });

  const login = ({ user: userData, token: tokenValue }) => {
    setUser(userData || null);
    setToken(tokenValue || null);

    if (userData) localStorage.setItem("user", JSON.stringify(userData));
    else localStorage.removeItem("user");

    if (tokenValue) localStorage.setItem("token", tokenValue);
    else localStorage.removeItem("token");
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const value = useMemo(
    () => ({ user, token, login, logout, setUser, setToken }),
    [user, token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
