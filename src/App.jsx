import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import SubmitProof from "./pages/SubmitProof";
import ReviewTasks from "./pages/ReviewTasks";

import Provider from "./pages/Provider";
import Admin from "./pages/Admin";

import ProtectedRoute from "./routes/ProtectedRoute";
import RoleRoute from "./routes/RoleRoute";

export default function App() {
  return (
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Doer */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <RoleRoute role="user">
                <Dashboard />
              </RoleRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <RoleRoute role="user">
                <Tasks />
              </RoleRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/submit-proof"
          element={
            <ProtectedRoute>
              <RoleRoute role="user">
                <SubmitProof />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        {/* Provider */}
        <Route
          path="/provider"
          element={
            <ProtectedRoute>
              <RoleRoute role="provider">
                <Provider />
              </RoleRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/provider/review"
          element={
            <ProtectedRoute>
              <RoleRoute role="provider">
                <ReviewTasks />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        {/* Admin */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <RoleRoute role="admin">
                <Admin />
              </RoleRoute>
            </ProtectedRoute>
          }
        />
      </Routes>
  );
}
