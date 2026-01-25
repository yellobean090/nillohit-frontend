import Navbar from "../components/Navbar";

export default function ReviewTasks() {
  return (
    <>
      <Navbar />

      <div style={styles.page}>
        <h1 style={styles.heading}>Task Review</h1>

        <div style={styles.card}>
          <h3>Comment on Reddit post</h3>
          <p>User submitted proof:</p>

          <div style={styles.proofBox}>
            <span>📎 screenshot.png</span>
          </div>

          <textarea
            style={styles.textarea}
            placeholder="Reason (required if rejecting)"
          />

          <div style={styles.actions}>
            <button style={styles.reject}>Reject</button>
            <button style={styles.approve}>Approve</button>
          </div>
        </div>
      </div>
    </>
  );
}

const styles = {
  page: {
    padding: "32px",
    background: "#f9fbff",
    minHeight: "100vh",
  },
  heading: {
    color: "#0b3c8d",
    marginBottom: "20px",
  },
  card: {
    background: "#ffffff",
    padding: "24px",
    borderRadius: "16px",
    maxWidth: "520px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
  },
  proofBox: {
    background: "#f1f5f9",
    padding: "12px",
    borderRadius: "8px",
    margin: "10px 0",
  },
  textarea: {
    width: "100%",
    minHeight: "80px",
    borderRadius: "10px",
    border: "1px solid #d1d5db",
    padding: "10px",
    marginTop: "10px",
  },
  actions: {
    display: "flex",
    gap: "10px",
    marginTop: "14px",
  },
  reject: {
    flex: 1,
    padding: "10px",
    background: "#ef4444",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
  },
  approve: {
    flex: 1,
    padding: "10px",
    background: "#22c55e",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
  },
};
