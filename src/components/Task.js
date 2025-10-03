import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { removeTask, editTask } from "../redux/actions";
import editIcn from "../Images/edit.png";
import removeIcn from "../Images/remove.png";

const Task = ({ task }) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [isExpend, setIsExpend] = useState(false);
  const dispatch = useDispatch();

  const handleRemoveTask = () => dispatch(removeTask(task.id));
  const handleOpenInput = () => setIsDisabled(false);
  const handleEditTask = (e) => {
    dispatch(editTask(task.id, e.target.value));
    if (e.keyCode === 13) setIsDisabled(true);
  };

  return (
    <div
      style={{
        padding: "1rem",
        marginBottom: "1rem",
        borderRadius: "12px",
        boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
        backgroundColor: "#fff",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          flexWrap: "wrap",
        }}
      >
        <span
          style={{
            width: "2rem",
            fontSize: "1.2rem",
            cursor: "pointer",
            transition: "transform 0.2s",
          }}
          onClick={() => setIsExpend(!isExpend)}
        >
          {isExpend ? "\u25BC" : "\u25B6"}
        </span>

        <input
          type="text"
          disabled={isDisabled}
          defaultValue={task.name}
          onKeyDown={handleEditTask}
          style={{
            flex: "1",
            padding: "0.5rem",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "1rem",
            outline: "none",
            transition: "border 0.3s, box-shadow 0.3s",
          }}
          onFocus={(e) => (e.target.style.border = "1.5px solid #4CAF50")}
          onBlur={(e) => (e.target.style.border = "1px solid #ccc")}
        />

        <button
          onClick={handleOpenInput}
          style={{
            border: "none",
            borderRadius: "50%",
            padding: "0.4rem",
            cursor: "pointer",
            backgroundColor: "#f0f0f0",
            transition: "transform 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <img src={editIcn} alt="edit" style={{ width: "1rem" }} />
        </button>

        <button
          onClick={handleRemoveTask}
          style={{
            border: "none",
            borderRadius: "50%",
            padding: "0.4rem",
            cursor: "pointer",
            backgroundColor: "#f0f0f0",
            transition: "transform 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <img src={removeIcn} alt="remove" style={{ width: "1rem" }} />
        </button>
      </div>

      <p
        style={{
          marginTop: "0.5rem",
          padding: "0.8rem",
          borderRadius: "8px",
          backgroundColor: "#f9f9f9",
          border: "1px solid #ddd",
          fontSize: "0.95rem",
          color: "#333",
          display: isExpend ? "block" : "none",
          transition: "all 0.3s",
        }}
      >
        {task.description}
      </p>
    </div>
  );
};

export default Task;
