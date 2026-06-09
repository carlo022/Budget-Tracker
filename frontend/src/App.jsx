import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./components/pages/Dashboard"; // Move your current App.jsx logic here
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import { ToastContainer } from "react-toastify";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <div
      className="min-h-screen w-full"
      style={{
        backgroundImage: `radial-gradient(125% 125% at 50% 90%, #ffffff 40%, #10b981 100%)`,
        backgroundSize: "100% 100%",
        backgroundAttachment: "fixed",
      }}
    >
      <Router>
          <Navbar/>
          <main className="max-w-5xl mx-auto p-4">
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              {/* Protected Routes */}
              <Route element={<PrivateRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/" element={<Dashboard replace />} /> {/* Default to dashboard for root path */}
              </Route>
              {/* Catch-all route for undefined paths */}
              <Route path="*" element={<Navigate to="/login" replace />} /> {/* Redirect to dashboard or a 404 component */}
            </Routes>
          </main>
      </Router>
      {/* ToastContainer allows the toasts to appear anywhere in the app */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
