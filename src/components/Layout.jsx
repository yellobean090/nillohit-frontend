import { useState } from "react";
import { Link } from "react-router-dom";

export default function Layout({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      
      {/* Sidebar */}
      <aside
        className={`fixed z-40 md:static top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="p-4 font-bold text-xl border-b">Nillohit</div>

        <nav className="p-4 space-y-2">
          <Link to="/provider" className="block p-2 rounded hover:bg-gray-200">
            Provider Dashboard
          </Link>
          <Link to="/doer" className="block p-2 rounded hover:bg-gray-200">
            Doer Dashboard
          </Link>
        </nav>
      </aside>

      {/* Main area */}
      <div className="flex-1 md:ml-64">
        
        {/* Topbar */}
        <header className="flex items-center justify-between bg-white shadow p-4">
          <button
            className="md:hidden text-xl"
            onClick={() => setOpen(!open)}
          >
            ☰
          </button>
          <h1 className="font-semibold">Dashboard</h1>
        </header>

        {/* Page content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
