import React from "react";
import "./Topbar.css";

export default function Topbar({ title, children, onThemeToggle, theme }) {
  return (
    <header className="topbar">
      <div className="topbar-title">{title}</div>
      <div className="topbar-actions">
        {children}
        {onThemeToggle && (
          <button
            className="topbar-btn"
            onClick={onThemeToggle}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        )}
      </div>
    </header>
  );
}
