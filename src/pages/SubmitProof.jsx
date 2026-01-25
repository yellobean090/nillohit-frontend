import { useMemo, useState } from "react";
import { DoerAPI } from "../services/api";
import { useLocation, useNavigate } from "react-router-dom";

export default function SubmitProof() {
  const navigate = useNavigate();
  const location = useLocation();

  const taskId = useMemo(() => {
    const p = new URLSearchParams(location.search);
    return p.get("taskId") || "";
  }, [location.search]);

  const [link, setLink] = useState("");
  const [file, setFile] = useState(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  const onPick = (e) => {
    const f = e.target.files?.[0] || null;
    if (!f) return setFile(null);
    // 5MB limit client-side (server should also enforce)
    if (f.size > 5 * 1024 * 1024) {
      setMsg("Screenshot must be 5MB or less.");
      e.target.value = "";
      return setFile(null);
    }
    setMsg("");
    setFile(f);
  };

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");

    if (!taskId) {
      setMsg("Missing taskId. Go to My Tasks and click Submit Proof.");
      return;
    }
    if (!link.trim()) {
      setMsg("Paste the link of your completed task.");
      return;
    }
    if (!file) {
      setMsg("Upload a screenshot (max 5MB).");
      return;
    }

    try {
      setBusy(true);
      const fd = new FormData();
      fd.append("link", link.trim());
      fd.append("screenshot", file);

      await DoerAPI.submitProof(taskId, fd);
      setMsg("Submitted successfully ✅");
      setTimeout(() => navigate("/my-tasks", { replace: true }), 700);
    } catch {
      setMsg("Submit failed. Check backend endpoint / permissions.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="page">
      <div className="container">
        <div className="card formCard">
          <h1 className="title">Submit Proof</h1>
          <p className="muted">
            Submit the task link + screenshot. Provider will approve/reject.
          </p>

          {msg && <div className={msg.includes("✅") ? "success" : "error"}>{msg}</div>}

          <form onSubmit={submit} className="form">
            <label className="label">
              Task ID
              <input className="input" value={taskId} readOnly />
            </label>

            <label className="label">
              Task Link
              <input
                className="input"
                placeholder="Paste your Reddit post/comment link"
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
            </label>

            <label className="label">
              Screenshot (max 5MB)
              <input className="input" type="file" accept="image/*" onChange={onPick} />
            </label>

            <div className="row">
              <button className="btn" disabled={busy}>
                {busy ? "Submitting…" : "Submit"}
              </button>
              <button
                type="button"
                className="btn btnLight"
                onClick={() => navigate("/my-tasks")}
                disabled={busy}
              >
                Back
              </button>
            </div>

            <div className="muted small">
              If rejected, you may be asked to delete the post/comment from your
              side, then provider can re-upload.
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
