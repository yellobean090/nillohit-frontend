import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div style={styles.sidebar}>
      <h3 style={styles.logo}><a href="/">NILLOHIT</a></h3>

      <Link to="/dashboard" style={styles.link}>Dashboard</Link>
      <Link to="/provider" style={styles.link}>Provider</Link>
      <Link to="/admin" style={styles.link}>Admin</Link>
    </div>
  );
}

const styles = {
  sidebar: {
    width: "220px",
    minHeight: "100vh",
    background: "#0f172a",
    color: "#fff",
    padding: "20px",
    boxSizing: "border-box"
  },
  logo: {
    marginBottom: "20px",
    color: "#3b82f6"
  },
  link: {
    display: "block",
    color: "#e5e7eb",
    textDecoration: "none",
    marginBottom: "12px"
  }
};
