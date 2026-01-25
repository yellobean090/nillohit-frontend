import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function RoleRoute({ role, children }) {
  const { user, ready } = useAuth();

  if (!ready) return null;

  if (!user) return <Navigate to="/login" replace />;

  if (user.role !== role) {
    if (user.role === "admin") return <Navigate to="/admin" replace />;
    if (user.role === "provider") return <Navigate to="/provider" replace />;
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
