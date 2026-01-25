export default function Guide() {
  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>How It Works</h1>

      <div style={styles.section}>
        <h3>For Task Providers</h3>
        <p>• Upload tasks</p>
        <p>• Review submissions</p>
        <p>• Approve or reject tasks</p>
      </div>

      <div style={styles.section}>
        <h3>For Task Doers</h3>
        <p>• Pick a live task</p>
        <p>• Complete it honestly</p>
        <p>• Upload proof</p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    padding: "24px",
    background: "#ffffff",
    minHeight: "100vh",
  },
  heading: {
    color: "#0b3c8d",
    marginBottom: "20px",
  },
  section: {
    background: "#f9fbff",
    padding: "16px",
    borderRadius: "12px",
    marginBottom: "16px",
    border: "1px solid #e5e7eb",
  },
};
