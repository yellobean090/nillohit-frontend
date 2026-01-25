import Layout from "../components/Layout";

export default function Doer() {
  // TEMP mock data (API will replace this later)
  const tasks = [
    {
      id: 1,
      title: "Follow Instagram Page",
      reward: 2,
      status: "available",
    },
    {
      id: 2,
      title: "Install App & Screenshot",
      reward: 5,
      status: "pending",
    },
    {
      id: 3,
      title: "Survey Completion",
      reward: 3,
      status: "rejected",
    },
  ];

  const statusStyle = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "approved":
        return "bg-green-100 text-green-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-blue-100 text-blue-700";
    }
  };

  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-6">Doer Dashboard</h2>

      <div className="grid gap-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="bg-white rounded-xl shadow p-5 flex flex-col md:flex-row md:items-center md:justify-between"
          >
            <div>
              <h3 className="font-semibold text-lg">{task.title}</h3>
              <p className="text-sm text-gray-500 mt-1">
                Reward: <span className="font-medium">${task.reward}</span>
              </p>
            </div>

            <div className="mt-4 md:mt-0 flex items-center gap-3">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyle(
                  task.status
                )}`}
              >
                {task.status.toUpperCase()}
              </span>

              {task.status === "available" && (
                <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                  Start Task
                </button>
              )}

              {task.status === "pending" && (
                <span className="text-sm text-gray-500">
                  Awaiting review
                </span>
              )}

              {task.status === "rejected" && (
                <button className="px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700">
                  Delete Task
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
