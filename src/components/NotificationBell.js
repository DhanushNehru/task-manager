import React from "react";

export default function NotificationBell({ count, onClick }) {
  return (
    <button
      type="button"
      className={`notif-bell-btn ${count > 0 ? "has-unread" : ""}`}
      onClick={onClick}
      aria-label={`Notifications (${count} unread)`}
      title={count > 0 ? `Clear ${count} unread notification(s)` : "No new notifications"}
    >
      <span className="bell-icon">🔔</span>
      {count > 0 && <span className="notif-badge">{count}</span>}
    </button>
  );
}

