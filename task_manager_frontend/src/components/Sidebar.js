import React from "react";
import "./Sidebar.css";

export default function Sidebar({ user, onLogout, selected, onSelect }) {
  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">🗂️ TaskManager</h2>
      <nav>
        <ul>
          <li
            className={selected === "tasks" ? "active" : ""}
            onClick={() => onSelect("tasks")}
          >
            📋 Tasks
          </li>
          <li
            className={selected === "account" ? "active" : ""}
            onClick={() => onSelect("account")}
          >
            👤 Account
          </li>
        </ul>
      </nav>
      {user && (
        <div className="sidebar-footer">
          <div className="sidebar-user">
            <span>{user.full_name || user.email}</span>
          </div>
          <button className="sidebar-btn" onClick={onLogout}>
            Logout
          </button>
        </div>
      )}
    </aside>
  );
}
