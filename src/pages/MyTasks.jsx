import { useEffect, useState } from "react";
import { DoerAPI } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function MyTasks() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [errMsg, setErrMsg] = useState("");

  const load = async () => {
    setErrMsg("");
    setLoading(true);
    try {
      const res = await DoerAPI.myTasks();
      setTasks(res.data?.tasks || res.data || []);
    } catch {
      setErrMsg("Could not load your tasks.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const statusTone = (s = "") => {
    const v = String(s).toLowerCase();
    if (v.includes("approved")) return "pillGreen";
    if (v.includes("rejected")) return "pillRed";
    if (v.includes("expired")) return "pillGray";
    if (v.includes("submitted")) return "pillBlue";
    return "pillGray";
  };

  return (
    <div className="page">
      <div className="container">
        <div className="card">
          <div className="headerRow">
            <div>
              <h1 className="title">My Tasks</h1>
              <p className="muted">
                Your claimed tasks — submit proof before time expires.
              </p>
            </div>
            <button className="btn btnLight" onClick={load} disabled={loading}>
              Refresh
            </button>
          </div>

          {errMsg && <div className="error">{errMsg}</div>}

          {loading ? (
            <div className="muted">Loading…</div>
          ) : tasks.length === 0 ? (
            <div className="empty">
              <div className="emptyTitle">No claimed tasks yet</div>
              <div className="muted">
                Go to <b>Tasks</b> and claim one.
              </div>
            </div>
          ) : (
            <div className="tableWrap">
              <table className="table">
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Task</th>
                    <th>Community</th>
                    <th>Reward</th>
                    <th>Status</th>
                    <th>Deadline</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((t) => {
                    const id = t._id || t.id;
                    const status = t.status || "claimed";
                    const deadline =
                      t.deadline || t.expiresAt || t.dueAt || "-";

                    return (
                      <tr key={id}>
                        <td>
                          <span className="pill">{t.type || "Task"}</span>
                        </td>
                        <td className="wide">{t.task || t.title || "-"}</td>
                        <td>{t.community || "-"}</td>
                        <td>
                          <b>${t.reward ?? "0.00"}</b>
                        </td>
                        <td>
                          <span className={`pill ${statusTone(status)}`}>
                            {String(status)}
                          </span>
                        </td>
                        <td>{deadline}</td>
                        <td className="right">
                          <button
                            className="btn"
                            onClick={() =>
                              navigate(`/submit-proof?taskId=${encodeURIComponent(id)}`)
                            }
                          >
                            Submit Proof
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              <div className="muted small">
                If rejected, provider may re-upload after confirmation (as per
                your rules).
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
