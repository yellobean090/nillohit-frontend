import Navbar from "../components/Navbar";

export default function Signup() {
  return (
    <>
      <Navbar />

      <div style={styles.page}>
        <div style={styles.card}>
          <h2 style={styles.title}>Create Account</h2>
          <p style={styles.subtitle}>
            Join NILLOHIT and start earning
          </p>

          <input style={styles.input} placeholder="Username" />
          <input style={styles.input} placeholder="Email" />
          <input style={styles.input} type="password" placeholder="Password" />
          <input style={styles.input} placeholder="Reddit Profile Link" />
          <input style={styles.input} placeholder="Quora Profile Link (Optional)" />

          <button style={styles.button}>Sign Up</button>

          <p style={styles.footer}>
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>
      </div>
    </>
  );
}

const styles = {
  page: {
    minHeight: "calc(100vh - 70px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f9fbff",
  },
  card: {
    width: "360px",
    background: "#ffffff",
    padding: "28px",
    borderRadius: "16px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
  },
  title: {
    textAlign: "center",
    color: "#0b3c8d",
    marginBottom: "6px",
  },
  subtitle: {
    textAlign: "center",
    color: "#6b7280",
    fontSize: "14px",
    marginBottom: "22px",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "12px",
    borderRadius: "10px",
    border: "1px solid #d1d5db",
    outline: "none",
    fontSize: "14px",
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "#0b3c8d",
    color: "#ffffff",
    border: "none",
    borderRadius: "10px",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "8px",
  },
  footer: {
    marginTop: "14px",
    textAlign: "center",
    fontSize: "14px",
  },
};
