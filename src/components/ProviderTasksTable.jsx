import { useState } from "react";

export default function ProviderTasksTable() {
  const [tasks, setTasks] = useState([
    {
      type: "Comment",
      task: "",
      community: "",
      duration: "",
      reward: "",
      remark: "",
      user: "-"
    }
  ]);

  const updateTask = (index, key, value) => {
    const copy = [...tasks];
    copy[index][key] = value;
    setTasks(copy);
  };

  const addRow = () => {
    setTasks([
      ...tasks,
      {
        type: "Comment",
        task: "",
        community: "",
        duration: "",
        reward: "",
        remark: "",
        user: "-"
      }
    ]);
  };

  return (
    <div
      style={{
        background: "#fff",
        padding: 20,
        borderRadius: 8,
        border: "1px solid #e5e7eb"
      }}
    >
      <h3>Upload Tasks</h3>

      <div style={{ overflowX: "auto" }}>
        <table width="100%" border="1" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>TYPE</th>
              <th>TASK</th>
              <th>COMMUNITY</th>
              <th>DURATION</th>
              <th>REWARD ($)</th>
              <th>REMARK</th>
              <th>USER</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((t, i) => (
              <tr key={i}>
                <td>
                  <select
                    value={t.type}
                    onChange={e => updateTask(i, "type", e.target.value)}
                  >
                    <option>Comment</option>
                    <option>Post</option>
                  </select>
                </td>
                <td>
                  <input onChange={e => updateTask(i, "task", e.target.value)} />
                </td>
                <td>
                  <input onChange={e => updateTask(i, "community", e.target.value)} />
                </td>
                <td>
                  <input onChange={e => updateTask(i, "duration", e.target.value)} />
                </td>
                <td>
                  <input onChange={e => updateTask(i, "reward", e.target.value)} />
                </td>
                <td>
                  <input onChange={e => updateTask(i, "remark", e.target.value)} />
                </td>
                <td>{t.user}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button style={{ marginTop: 16 }} onClick={addRow}>
        + Add Task
      </button>
    </div>
  );
}
