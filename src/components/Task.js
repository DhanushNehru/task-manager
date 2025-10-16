import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { removeTask, toggleTask, editTask } from "../redux/actions";

const Task = ({ task }) => {
  const dispatch = useDispatch();

  // Hooks at the top
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({
    name: task?.name || "",
    description: task?.description || "",
    dueDate: task?.dueDate || "",
  });

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
      alert("No due date set for this task!");
      return;
    }

    const due = new Date(task.dueDate);
    if (isNaN(due)) {
      alert("Invalid due date!");
      return;
    }

    const now = new Date();
    const diffMs = due - now;

    if (diffMs <= 0) {
      alert(`⚠️ Task "${task.name}" is already past due!`);
      return;
    }

    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diffMs / (1000 * 60)) % 60);

    alert(`⏰ "${task.name}" is due in ${days}d ${hours}h ${minutes}m`);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        backgroundColor: "#fff",
        borderRadius: "10px",
        padding: "1rem",
        marginBottom: "1rem",
        boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
        {/* Completed Checkbox */}
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => dispatch(toggleTask(task.id))}
        />

        {/* Task Name */}
        {isEditing ? (
          <input
            value={editedTask.name}
            onChange={(e) =>
              setEditedTask({ ...editedTask, name: e.target.value })
            }
            style={{
              flex: 1,
              padding: "0.4rem",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          />
        ) : (
          <h3
            style={{
              flex: 1,
              textDecoration: task.completed ? "line-through" : "none",
              margin: 0,
            }}
          >
            {task.name}
          </h3>
        )}

        {/* Reminder Bell */}
        <button
          onClick={handleReminder}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "1.2rem",
          }}
        >
          🔔
        </button>

        {/* Edit / Save */}
        {isEditing ? (
          <button
            onClick={handleSave}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "1.2rem",
              color: "green",
            }}
          >
            ✅
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "1.2rem",
            }}
          >
            ✏️
          </button>
        )}

        {/* Delete */}
        <button
          onClick={() => dispatch(removeTask(task.id))}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "1.2rem",
            color: "red",
          }}
        >
          ❌
        </button>
      </div>

      {/* Description */}
      {isEditing ? (
        <textarea
          value={editedTask.description}
          onChange={(e) =>
            setEditedTask({ ...editedTask, description: e.target.value })
          }
          style={{
            padding: "0.5rem",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />
      ) : (
        <p style={{ margin: 0, color: "#555" }}>{task.description}</p>
      )}

      {/* Due Date */}
      {isEditing ? (
        <input
          type="date"
          value={editedTask.dueDate}
          onChange={(e) =>
            setEditedTask({ ...editedTask, dueDate: e.target.value })
          }
          style={{
            padding: "0.4rem",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />
      ) : (
        task.dueDate && (
          <p style={{ margin: 0, color: "#999", fontSize: "0.9rem" }}>
            Due: {task.dueDate}
          </p>
        )
      )}
    </div>
  );
};

export default Task;
