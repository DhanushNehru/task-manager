import React from "react";

export default function TaskItem({ task, onToggle, onDelete }) {
  const now = new Date();
  const due = task.dueDate ? new Date(task.dueDate + "T23:59:59") : null; // include whole day
  const isOverdue = due && due < now && !task.completed;
  const hoursToDue = due ? (due - now) / (1000 * 60 * 60) : null;
  const isSoon = hoursToDue !== null && hoursToDue <= 24 && hoursToDue > 0;

  const urgencyClass = isOverdue ? "overdue" : isSoon ? "soon" : "";

  return (
    <li className={`task-item ${urgencyClass}`}>
      <div className="left">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          aria-label={`Mark ${task.title} as ${task.completed ? "incomplete" : "complete"}`}
        />
      </div>

      <div className="content">
        <div className="title-row">
          <span className={`title ${task.completed ? "completed" : ""}`}>{task.title}</span>
          <span className={`priority ${(task.priority || 'Medium').toLowerCase()}`}>{task.priority || 'Medium'}</span>
        </div>
        <div className="meta">
          {task.dueDate ? (
            <span className="due">Due: {new Date(task.dueDate).toLocaleDateString()}</span>
          ) : (
            <span className="due muted">No due date</span>
          )}
          {isOverdue && <span className="tag overdue-tag">Overdue</span>}
          {isSoon && <span className="tag soon-tag">Due soon</span>}
        </div>
      </div>

      <div className="right">
        <button className="delete" onClick={() => onDelete(task.id)} aria-label={`Delete ${task.title}`}>
          ✕
        </button>
      </div>
    </li>
  );
}
