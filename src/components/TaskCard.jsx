export default function TaskCard({ task }) {
  return (
    <div style={styles.card}>
      <h3 style={styles.title}>{task.title}</h3>
      <p style={styles.desc}>{task.description}</p>

      <div style={styles.footer}>
        <span style={styles.reward}>${task.reward}</span>
        <button style={styles.btn}>View</button>
      </div>
    </div>
  );
}

const styles = {
  card: {
    background: "#f9fbff",
    borderRadius: "12px",
    padding: "16px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    border: "1px solid #e5e7eb",
  },
  title: {
    color: "#0b3c8d",
    marginBottom: "8px",
  },
  desc: {
    color: "#555",
    fontSize: "14px",
    marginBottom: "12px",
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  reward: {
    fontWeight: "bold",
    color: "#0f766e", // teal accent
  },
  btn: {
    background: "#0b3c8d",
    color: "#fff",
    border: "none",
    padding: "6px 14px",
    borderRadius: "6px",
    cursor: "pointer",
  },
};
