import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/actions";

const initTask = { name: "", description: "", dueDate: "" };

const AddTask = () => {
  const [task, setTask] = useState(initTask);
  const dispatch = useDispatch();

  const handleAddTask = () => {
    if (task.name.trim()) {
      dispatch(
        addTask({
          id: Date.now(),
          name: task.name,
          description: task.description,
          dueDate: task.dueDate || null,
          completed: false,
        })
      );
      setTask(initTask);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        width: "100%",
        maxWidth: "400px",
        padding: "1.5rem",
        backgroundColor: "#fff",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        margin: "0 auto",
      }}
    >
      {/* Name */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <label htmlFor="name" style={{ fontWeight: "600", fontSize: "0.95rem" }}>
          Name
        </label>
        <input
          id="name"
          type="text"
          value={task.name}
          onChange={(e) => setTask({ ...task, name: e.target.value })}
          style={{
            padding: "0.7rem",
            borderRadius: "8px",
            border: "1.5px solid #ccc",
            fontSize: "1rem",
          }}
        />
      </div>

      {/* Description */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <label htmlFor="description" style={{ fontWeight: "600", fontSize: "0.95rem" }}>
          Description
        </label>
        <textarea
          id="description"
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
          style={{
            padding: "0.7rem",
            borderRadius: "8px",
            border: "1.5px solid #ccc",
            fontSize: "1rem",
            minHeight: "80px",
          }}
        />
      </div>

      {/* Due Date */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <label htmlFor="dueDate" style={{ fontWeight: "600", fontSize: "0.95rem" }}>
          Due Date
        </label>
        <input
          id="dueDate"
          type="date"
          value={task.dueDate}
          onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
          style={{
            padding: "0.7rem",
            borderRadius: "8px",
            border: "1.5px solid #ccc",
            fontSize: "1rem",
          }}
        />
      </div>

      <button
        style={{
          padding: "0.8rem 1rem",
          borderRadius: "8px",
          border: "none",
          background: "linear-gradient(135deg, #4caf50, #81c784)",
          color: "#fff",
          fontWeight: "600",
          fontSize: "1rem",
          cursor: "pointer",
        }}
        onClick={handleAddTask}
      >
        Add Task
      </button>
    </div>
  );
};

export default AddTask;
