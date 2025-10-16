import React from "react";

export default function NotificationBell({ count, onClick }) {
  return (
    <div className="notif-bell" role="button" onClick={onClick} aria-label="Notifications">
      🔔
      {count > 0 && <span className="badge">{count}</span>}
    </div>
  );
}
