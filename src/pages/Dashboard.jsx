import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div style={{ maxWidth: 900, margin: "40px auto", padding: 20 }}>
      <h1 style={{ fontSize: 28, marginBottom: 8 }}>Dashboard</h1>
      <p style={{ marginBottom: 20 }}>
        Logged in as: <b>{user?.username}</b> ({user?.email}) — role: <b>{user?.role}</b>
      </p>

      {!user?.isApproved && (
        <div style={{ padding: 12, background: "#fff3cd", borderRadius: 8, marginBottom: 20 }}>
          ⏳ Your account is not approved yet. A provider must approve before you can do tasks.
        </div>
      )}

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <Link to="/tasks">View Tasks</Link>
        <Link to="/submit-proof">Submit Proof</Link>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}
