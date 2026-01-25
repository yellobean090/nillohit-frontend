export default function Dashboard() {
  return (
    <div className="page-center">
      <div className="card">
        <h2 className="title">User Dashboard</h2>

        <p>Welcome! You are logged in as a user.</p>

        <button
          className="btn"
          style={{ background: "#64748b", marginTop: "20px" }}
          onClick={() => {
            localStorage.clear();
            window.location.href = "/";
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
