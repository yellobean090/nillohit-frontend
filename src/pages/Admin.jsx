import { useEffect, useState } from "react";
import { api } from "../services/api";

export default function Admin() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("/api/admin/users");
        setUsers(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUsers();
  }, []);

  const setRole = async (id, role) => {
    await api.post("/api/admin/set-role", { userId: id, role });
    const res = await api.get("/api/admin/users");
    setUsers(res.data);
  };

  const setStatus = async (id, status) => {
    await api.post("/api/admin/set-status", { userId: id, status });
    const res = await api.get("/api/admin/users");
    setUsers(res.data);
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>Admin Panel</h2>

      {users.map(u => (
        <div key={u._id} style={{ borderBottom: "1px solid #ddd", padding: 8 }}>
          <b>{u.username}</b> — {u.email}

          <div>
            Role:
            <select value={u.role} onChange={e => setRole(u._id, e.target.value)}>
              <option value="user">User</option>
              <option value="provider">Provider</option>
              <option value="admin">Admin</option>
            </select>

            Status:
            <select value={u.status} onChange={e => setStatus(u._id, e.target.value)}>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="banned">Banned</option>
            </select>
          </div>
        </div>
      ))}
    </div>
  );
}
