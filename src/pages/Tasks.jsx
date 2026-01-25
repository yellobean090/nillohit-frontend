import { useEffect, useMemo, useState } from "react";
import { DoerAPI } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Tasks() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const [busyId, setBusyId] = useState(null);

  const canStartAt = useMemo(() => {
    const v = localStorage.getItem("doer_nextAllowedAt");
    return v ? Number(v) : 0;
  }, []);

  const cooldownLeftMs = Math.max(0, canStartAt - Date.now());
  const cooldownText = cooldownLeftMs
    ? `${Math.ceil(cooldownLeftMs / (60 * 60 * 1000))} hour(s) left`
    : "";

  const load = async () => {
    setErrMsg("");
    setLoading(true);
    try {
      const res = await DoerAPI.liveTasks();
      setTasks(res.data?.tasks || res.data || []);
    } catch {
      setErrMsg("Could not load tasks. Check backend or API URL.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const claim = async (taskId) => {
    setErrMsg("");

    // Client-side cooldown (server should also enforce)
    if (Date.now() < canStartAt) {
      setErrMsg(`You must wait before claiming another task. (${cooldownText})`);
      return;
    }

    try {
      setBusyId(taskId);
      const res = await DoerAPI.claimTask(taskId);

      // Store cooldown for 6 hours (as per your requirement)
      localStorage.setItem(
        "doer_nextAllowedAt",
        String(Date.now() + 6 * 60 * 60 * 1000)
      );

      // Go to My Tasks after claiming
      const claimedId =
        res.data?.taskId || res.data?._id || res.data?.task?._id || taskId;

      // Optional: open submit page directly
      navigate("/my-tasks", { replace: true });
      return claimedId;
    } catch {
      setErrMsg("Claim failed. Someone else may have claimed it already.");
    } finally {
      setBusyId(null);
      load();
    }
  };

  return (
    <div className="page">
      <div className="container">
        <div className="card">
          <div className="headerRow">
            <div>
              <h1 className="title">Live Tasks</h1>
              <p className="muted">
                First come, first served. Once you claim a task, it disappears
                for others.
              </p>
            </div>
            <button className="btn btnLight" onClick={load} disabled={loading}>
              Refresh
            </button>
          </div>

          {cooldownLeftMs > 0 && (
            <div className="notice">
              <b>Cooldown Active:</b> You can claim next task in{" "}
              <b>{cooldownText}</b>.
            </div>
          )}

          {errMsg && <div className="error">{errMsg}</div>}

          {loading ? (
            <div className="muted">Loading tasks…</div>
          ) : tasks.length === 0 ? (
            <div className="empty">
              <div className="emptyTitle">No Tasks Found</div>
              <div className="muted">
                Provider hasn’t uploaded tasks yet, or all tasks are claimed.
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
                    <th>Duration</th>
                    <th>Reward</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((t) => (
                    <tr key={t._id || t.id}>
                      <td>
                        <span className="pill">
                          {t.type || t.taskType || "Task"}
                        </span>
                      </td>
                      <td className="wide">{t.task || t.title || "-"}</td>
                      <td>{t.community || t.subreddit || "-"}</td>
                      <td>{t.duration || t.timeLimit || "-"}</td>
                      <td>
                        <b>${t.reward ?? t.amount ?? "0.00"}</b>
                      </td>
                      <td className="right">
                        <button
                          className="btn"
                          onClick={() => claim(t._id || t.id)}
                          disabled={busyId === (t._id || t.id) || cooldownLeftMs > 0}
                        >
                          {busyId === (t._id || t.id) ? "Claiming…" : "Claim"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="muted small">
                Tip: After claiming, go to <b>My Tasks</b> to submit proof.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
