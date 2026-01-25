export default function FAQ() {
  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>FAQs</h1>

      <div style={styles.item}>
        <strong>How do I earn?</strong>
        <p>Complete tasks honestly and get approved.</p>
      </div>

      <div style={styles.item}>
        <strong>What if my task is rejected?</strong>
        <p>You’ll be asked to delete it. Repeated rejections may lead to a ban.</p>
      </div>

      <div style={styles.item}>
        <strong>Payment currency?</strong>
        <p>USD only.</p>
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
  item: {
    background: "#f9fbff",
    padding: "16px",
    borderRadius: "12px",
    marginBottom: "12px",
    border: "1px solid #e5e7eb",
  },
};
