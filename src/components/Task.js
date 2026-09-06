import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { removeTask, toggleTask, editTask } from "../redux/actions";

const Task = ({ task }) => {
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const taskTitle = task?.name || task?.title || "";
  const [editedTask, setEditedTask] = useState({
    name: taskTitle,
    description: task?.description || "",
    dueDate: task?.dueDate || "",
    priority: task?.priority || "Medium",
  });

  const now = new Date();
  const due = task.dueDate ? new Date(task.dueDate + "T23:59:59") : null;
  const isOverdue = due && due < now && !task.completed;

  // Save edits
  const handleSave = () => {
    if (editedTask.name.trim()) {
      dispatch(editTask(task.id, editedTask));
      setIsEditing(false);
    }
  };

  // Reminder popup
  const handleReminder = () => {
    if (!task.dueDate) {
      alert(`No due date set for "${taskTitle}"`);
      return;
    }

    const dueTime = new Date(task.dueDate + "T23:59:59");
    if (isNaN(dueTime)) {
      alert("Invalid due date!");
      return;
    }

    const diffMs = dueTime - now;
    if (diffMs <= 0) {
      alert(`⚠️ Task "${taskTitle}" is overdue!`);
      return;
    }

    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diffMs / (1000 * 60)) % 60);

    alert(`⏰ "${taskTitle}" is due in ${days}d ${hours}h ${minutes}m`);
  };

  const priorityKey = (task.priority || "Medium").toLowerCase();

  return (
    <div
      className={`task-card ${task.completed ? "is-completed" : ""} ${
        isOverdue ? "is-overdue" : ""
      }`}
    >
      <div className="title-row">
        {/* Checkbox & Name */}
        <div className="title-container">
          <label className="checkbox-wrapper">
            <input
              type="checkbox"
              checked={!!task.completed}
              onChange={() => dispatch(toggleTask(task.id))}
              className="checkbox-input"
            />
            <span className="custom-checkbox" />
          </label>

          {isEditing ? (
            <input
              type="text"
              value={editedTask.name}
              onChange={(e) => setEditedTask({ ...editedTask, name: e.target.value })}
              className="input editable-title"
              placeholder="Task name"
              autoFocus
            />
          ) : (
            <div className="title-heading-group">
              <h3 className={`task-title ${task.completed ? "completed" : ""}`}>
                {taskTitle}
              </h3>
              <span className={`priority-badge priority-${priorityKey}`}>
                {task.priority || "Medium"}
              </span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="task-actions">
          <button
            type="button"
            className="action-btn reminder-btn"
            onClick={handleReminder}
            title="Check time left until due date"
          >
            🔔
          </button>

          {isEditing ? (
            <button
              type="button"
              className="action-btn save-btn"
              onClick={handleSave}
              title="Save changes"
            >
              ✅
            </button>
          ) : (
            <button
              type="button"
              className="action-btn edit-btn"
              onClick={() => {
                setEditedTask({
                  name: taskTitle,
                  description: task?.description || "",
                  dueDate: task?.dueDate || "",
                  priority: task?.priority || "Medium",
                });
                setIsEditing(true);
              }}
              title="Edit task"
            >
              ✏️
            </button>
          )}

          <button
            type="button"
            className="action-btn delete-btn"
            onClick={() => dispatch(removeTask(task.id))}
            title="Delete task"
          >
            🗑️
          </button>
        </div>
      </div>

      {/* Description & Details */}
      <div className="task-body">
        {isEditing ? (
          <textarea
            rows="2"
            value={editedTask.description}
            onChange={(e) =>
              setEditedTask({ ...editedTask, description: e.target.value })
            }
            className="textarea editable-text"
            placeholder="Description..."
          />
        ) : (
          task.description && <p className="description-text">{task.description}</p>
        )}

        <div className="task-meta-bar">
          <div className="meta-left">
            {isEditing ? (
              <div className="edit-fields-row">
                <input
                  type="date"
                  value={editedTask.dueDate}
                  onChange={(e) =>
                    setEditedTask({ ...editedTask, dueDate: e.target.value })
                  }
                  className="input date-input"
                />
                <select
                  value={editedTask.priority}
                  onChange={(e) =>
                    setEditedTask({ ...editedTask, priority: e.target.value })
                  }
                  className="input priority-select-input"
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
            ) : (
              task.dueDate && (
                <span className={`due-date-tag ${isOverdue ? "overdue-tag" : ""}`}>
                  📅 Due: {task.dueDate}
                </span>
              )
            )}
          </div>

          <div className="status-indicator">
            <span
              className={`status-dot ${
                task.completed ? "completed" : isOverdue ? "overdue" : "active"
              }`}
            />
            <span className="status-text">
              {task.completed ? "Completed" : isOverdue ? "Overdue" : "Active"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task;

