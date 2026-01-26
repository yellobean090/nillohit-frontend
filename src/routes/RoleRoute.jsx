import React from "react";
import { useAuth } from "../context/AuthContext.jsx";

export default function RoleRoute({ role, children }) {
  const { user, loading } = useAuth();

  if (loading) return <div style={{ padding: 20 }}>Loading...</div>;
  if (!user) return <div style={{ padding: 20 }}>Not logged in.</div>;

  if (user.role !== role) {
    return (
      <div style={{ padding: 20 }}>
        Access denied. Required role: <b>{role}</b>. Your role: <b>{user.role}</b>
      </div>
    );
  }

  return children;
}
