import { useEffect, useState } from "react";
import { UserAPI } from "../services/api";

export default function Dashboard() {
  const [me, setMe] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    UserAPI.profile()
      .then((res) => setMe(res.data))
      .catch((err) => {
        console.error("Dashboard profile error:", err);
        setError("Dashboard failed to load profile");
      });
  }, []);

  if (error) return <div style={{ padding: 30 }}>{error}</div>;
  if (!me) return <div style={{ padding: 30 }}>Loading dashboard...</div>;

  return (
    <div style={{ padding: 30 }}>
      <h1>Dashboard</h1>
      <p><b>Username:</b> {me.username}</p>
      <p><b>Email:</b> {me.email}</p>
      <p><b>Role:</b> {me.role}</p>
    </div>
  );
}
