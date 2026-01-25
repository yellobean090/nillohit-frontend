import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header style={styles.header}>
      <h2 style={styles.logo}>NILLOHIT</h2>

      <nav style={styles.nav}>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
      </nav>
    </header>
  );
}

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    padding: "16px 32px",
    borderBottom: "1px solid #ddd",
  },
  nav: {
    display: "flex",
    gap: "16px",
  },
  logo: {
    margin: 0,
  },
};
