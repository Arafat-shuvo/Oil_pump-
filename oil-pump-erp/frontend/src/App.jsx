import React from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Sidebar from "./components/Sidebar.jsx";

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const logout = () => { localStorage.removeItem("token"); localStorage.removeItem("user"); navigate("/login"); };
  return (
    <div className="container">
      <div className="sidebar">
        <h2>⛽ Oil Pump ERP</h2>
        <nav className="grid">
          <Link to="/">🏠 Dashboard</Link>
          <Link to="/sales">🧾 Sales</Link>
          <Link to="/employees">👥 Employees</Link>
          <Link to="/accounting">💳 Accounting</Link>
          <Link to="/reports">📊 Reports</Link>
          <button className="button" onClick={logout}>Logout</button>
        </nav>
      </div>
      <div className="main">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
}
