import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function DashboardLayout() {
  const linkClass = ({ isActive }) =>
    isActive ? "sidebar-link sidebar-link-active" : "sidebar-link";

  return (
    <div className="dashboard-layout">
      <aside className="dashboard-sidebar">
        <h2>Dashboard</h2>
        <NavLink to="/dashboard" end className={linkClass}>
          Overview
        </NavLink>
        <NavLink to="/dashboard/team" className={linkClass}>
          Team
        </NavLink>
        <NavLink to="/dashboard/settings" className={linkClass}>
          Settings
        </NavLink>
      </aside>

      <section className="dashboard-panel">
        <Outlet />
      </section>
    </div>
  );
}