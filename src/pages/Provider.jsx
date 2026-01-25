import { useEffect, useState } from "react";
import { api } from "../services/api";

export default function Provider() {
  const [tasks, setTasks] = useState([]);
  const [rows, setRows] = useState([
    {
      type: "comment",
      task: "",
      community: "",
      durationMinutes: 20,
      rewardUsd: 0.05,
      remark: ""
    }
  ]);

  // ✅ load tasks safely
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await api.get("/api/tasks/provider/my");
        setTasks(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTasks();
  }, []);

  const addRow = () =>
    setRows(prev => [...prev, { ...prev[0] }]);

  const update = (i, key, value) => {
    setRows(prev => {
      const copy = [...prev];
      copy[i] = { ...copy[i], [key]: value };
      return copy;
    });
  };

  const submit = async () => {
    try {
      await api.post("/api/tasks/provider/bulk", { tasks: rows });
      setRows([rows[0]]);
      const res = await api.get("/api/tasks/provider/my");
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>Provider Dashboard</h2>

      <h3>Create Tasks</h3>

      {rows.map((r, i) => (
        <div
          key={i}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 2fr 1fr 1fr 1fr 1fr",
            gap: 8,
            marginBottom: 8
          }}
        >
          <select onChange={e => update(i, "type", e.target.value)}>
            <option value="comment">Comment</option>
            <option value="post">Post</option>
          </select>

          <input placeholder="Task" onChange={e => update(i, "task", e.target.value)} />
          <input placeholder="Subreddit" onChange={e => update(i, "community", e.target.value)} />
          <input type="number" placeholder="Minutes" onChange={e => update(i, "durationMinutes", e.target.value)} />
          <input type="number" step="0.01" placeholder="USD" onChange={e => update(i, "rewardUsd", e.target.value)} />
          <input placeholder="Remark" onChange={e => update(i, "remark", e.target.value)} />
        </div>
      ))}

      <button onClick={addRow}>+ Add Row</button>
      <button onClick={submit} style={{ marginLeft: 8 }}>Upload</button>

      <h3 style={{ marginTop: 32 }}>My Tasks</h3>
      {tasks.map(t => (
        <div key={t._id}>
          {t.task} — <b>{t.status}</b>
        </div>
      ))}
    </div>
  );
}
