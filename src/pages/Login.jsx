// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { AuthAPI } from "../services/api";
import  useAuth  from "../context/useAuth";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");

    const e1 = email.trim();
    const p1 = password.trim();
    if (!e1 || !p1) {
      setMsg("Please enter email and password.");
      return;
    }

    try {
      setBusy(true);

      // Expected backend: POST /api/auth/login => { token, user }
      const res = await AuthAPI.login({
        email: e1,
        password: p1,
      });

      const token = res?.data?.token;
      const user = res?.data?.user;

      if (!token || !user) {
        setMsg("Login failed: invalid server response.");
        return;
      }

      // Store session (your AuthProvider should handle token storage too, but safe to keep here)
      localStorage.setItem("token", token);
      login(token, user);

      // Route by role
      const role = (user.role || "").toLowerCase();
      if (role === "admin") navigate("/admin", { replace: true });
      else if (role === "provider") navigate("/provider", { replace: true });
      else navigate("/dashboard", { replace: true });
    } catch {
      setMsg("Invalid email/password or server not reachable.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <Navbar />
      <div
        style={{
          minHeight: "calc(100vh - 72px)",
          display: "grid",
          placeItems: "center",
          padding: "28px 16px",
          background: "linear-gradient(180deg, #f7f9ff 0%, #ffffff 55%)",
        }}
      >
        <div
          style={{
            width: "min(560px, 92vw)",
            background: "#fff",
            borderRadius: 18,
            boxShadow: "0 18px 55px rgba(16, 24, 40, 0.10)",
            border: "1px solid rgba(15, 23, 42, 0.06)",
            padding: "28px 26px",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: 16 }}>
            <h1
              style={{
                margin: 0,
                fontSize: 28,
                color: "#0b2a6f",
                letterSpacing: 0.2,
              }}
            >
              NILLOHIT Login
            </h1>
            <p style={{ margin: "8px 0 0", color: "#64748b", fontSize: 14 }}>
              Sign in to access tasks and your wallet.
            </p>
          </div>

          <form onSubmit={submit}>
            <label style={{ display: "block", marginBottom: 12 }}>
              <span style={{ display: "block", fontSize: 13, color: "#475569", marginBottom: 6 }}>
                Email
              </span>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                style={{
                  width: "90%",
                  padding: "14px 14px",
                  borderRadius: 12,
                  border: "1px solid rgba(15, 23, 42, 0.14)",
                  outline: "none",
                  fontSize: 15,
                }}
              />
            </label>

            <label style={{ display: "block", marginBottom: 10 }}>
              <span style={{ display: "block", fontSize: 13, color: "#475569", marginBottom: 6 }}>
                Password
              </span>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="••••••••"
                autoComplete="current-password"
                style={{
                  width: "90%",
                  padding: "14px 14px",
                  borderRadius: 12,
                  border: "1px solid rgba(15, 23, 42, 0.14)",
                  outline: "none",
                  fontSize: 15,
                }}
              />
            </label>

            {msg ? (
              <div
                style={{
                  marginTop: 10,
                  marginBottom: 10,
                  padding: "10px 12px",
                  borderRadius: 12,
                  background: "rgba(2, 132, 199, 0.08)",
                  color: "#0b2a6f",
                  border: "1px solid rgba(2, 132, 199, 0.18)",
                  fontSize: 14,
                }}
              >
                {msg}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={busy}
              style={{
                width: "100%",
                marginTop: 8,
                padding: "14px 14px",
                borderRadius: 12,
                border: "none",
                background: busy ? "#1d4ed8aa" : "#1d4ed8",
                color: "white",
                fontWeight: 700,
                fontSize: 15,
                cursor: busy ? "not-allowed" : "pointer",
              }}
            >
              {busy ? "Logging in..." : "Login"}
            </button>

            <div style={{ marginTop: 14, textAlign: "center", fontSize: 14, color: "#475569" }}>
              Don’t have an account?{" "}
              <Link to="/signup" style={{ color: "#1d4ed8", fontWeight: 700 }}>
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
