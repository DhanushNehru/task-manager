import React from "react";

export default function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === "dark";
  const nextTheme = isDark ? "light" : "dark";

  return (
    <button
      type="button"
      className={`theme-toggle-pill ${isDark ? "dark" : "light"}`}
      onClick={onToggle}
      aria-label={`Switch to ${nextTheme} mode`}
      title={`Switch to ${nextTheme} mode`}
    >
      <span className="pill-track">
        <span className="pill-icon sun-icon" role="img" aria-label="Sun">
          ☀️
        </span>
        <span className="pill-icon moon-icon" role="img" aria-label="Moon">
          🌙
        </span>
        <span className="pill-thumb" />
      </span>
      <span className="pill-label">{isDark ? "Dark" : "Light"}</span>
    </button>
  );
}