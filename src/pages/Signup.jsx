// src/pages/Signup.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../services/api";

export default function Signup() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redditLink, setRedditLink] = useState("");
  const [quoraLink, setQuoraLink] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // IMPORTANT: if your backend route is different (register), change it here
      const res = await api.post("/api/auth/signup", {
        username,
        email,
        password,
        redditLink,
        quoraLink,
      });

      console.log("✅ Signup OK:", res.data);

      alert("Signup successful! Now login.");
      navigate("/login");
    } catch (err) {
      console.error("❌ Signup failed:", err?.response?.data || err.message);
      alert(err?.response?.data?.message || "Signup failed (check console)");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24 }}>
      <div style={{ width: "100%", maxWidth: 520, background: "#fff", borderRadius: 16, padding: 28, boxShadow: "0 10px 30px rgba(0,0,0,0.08)" }}>
        <h2 style={{ textAlign: "center", marginBottom: 6 }}>Create Account</h2>
        <p style={{ textAlign: "center", marginTop: 0, color: "#666" }}>
          Join NILLOHIT and start earning
        </p>

        {/* ✅ MUST BE A FORM + button type="submit" */}
        <form onSubmit={handleSubmit}>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
            style={inputStyle}
          />

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            required
            style={inputStyle}
          />

          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            required
            style={inputStyle}
          />

          <input
            value={redditLink}
            onChange={(e) => setRedditLink(e.target.value)}
            placeholder="Reddit Profile Link"
            style={inputStyle}
          />

          <input
            value={quoraLink}
            onChange={(e) => setQuoraLink(e.target.value)}
            placeholder="Quora Profile Link (Optional)"
            style={inputStyle}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              height: 48,
              border: "none",
              borderRadius: 12,
              background: "#0b3d91",
              color: "white",
              fontSize: 16,
              cursor: "pointer",
              marginTop: 10,
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: 16 }}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  height: 46,
  padding: "0 14px",
  marginTop: 12,
  borderRadius: 12,
  border: "1px solid #d8d8d8",
  outline: "none",
};
