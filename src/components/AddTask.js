import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/actions";

const initTask = { name: "", description: "" };

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
          completed: false, // default status
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
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <label
          htmlFor="name"
          style={{ fontWeight: "600", fontSize: "0.95rem", fontFamily: "'Roboto', sans-serif" }}
        >
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
            fontFamily: "'Roboto', sans-serif",
            fontSize: "1rem",
            outline: "none",
            transition: "border 0.3s",
          }}
          onFocus={(e) => (e.target.style.border = "1.5px solid #4CAF50")}
          onBlur={(e) => (e.target.style.border = "1.5px solid #ccc")}
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <label
          htmlFor="description"
          style={{ fontWeight: "600", fontSize: "0.95rem", fontFamily: "'Roboto', sans-serif" }}
        >
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
            fontFamily: "'Roboto', sans-serif",
            fontSize: "1rem",
            minHeight: "80px",
            outline: "none",
            transition: "border 0.3s",
          }}
          onFocus={(e) => (e.target.style.border = "1.5px solid #4CAF50")}
          onBlur={(e) => (e.target.style.border = "1.5px solid #ccc")}
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
          transition: "transform 0.2s ease",
        }}
        onClick={handleAddTask}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        Add Task
      </button>
    </div>
  );
};

export default AddTask;
