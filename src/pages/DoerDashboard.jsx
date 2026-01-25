import Sidebar from "../components/Sidebar";

export default function DoerDashboard() {
  return (
    <div className="layout">
      <Sidebar />
      <div className="content">
        <h2>Live Tasks</h2>

        <div className="card">
          <p>Task: Comment on Reddit post</p>
          <p>Reward: $0.20</p>
          <button>Claim</button>
        </div>
      </div>
    </div>
  );
}
