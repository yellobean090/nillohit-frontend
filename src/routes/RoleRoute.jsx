import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserAPI } from "../services/api";

export default function RoleRoute({ role, children }) {
  const [loading, setLoading] = useState(true);
  const [me, setMe] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    UserAPI.profile()
      .then((res) => setMe(res.data))
      .catch((err) => {
        console.error("RoleRoute profile error:", err);
        setError("Failed to load profile");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div style={{ padding: 30 }}>Loading...</div>;

  if (error) return <div style={{ padding: 30 }}>{error}</div>;

  if (!me) return <Navigate to="/login" replace />;

  if (me.role !== role) return <Navigate to="/" replace />;

  return children;
}
