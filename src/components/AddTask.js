import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/actions";

const initTask = {
  name: "",
  description: "",
};

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
        width: "20vw",
      }}
    >
      <div style={{ display: "flex", gap: "3rem" }}>
        <label for="name">Name</label>
        <input
          style={{ width: "14rem" }}
          id="name"
          type="text"
          value={task.name}
          onChange={(e) => setTask({ ...task, name: e.target.value })}
        />
      </div>
      <div style={{ display: "flex", gap: "1rem" }}>
        <label>Description</label>
        <textarea
          value={task.description}
          style={{ width: "14rem" }}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
        ></textarea>
      </div>
      6uttc
      <button
        style={{
          padding: ".5rem 0",
          border: "none",
          borderRadius: "10px",
          backgroundColor: "greenyellow",
        }}
        onClick={handleAddTask}
      >
        Add Task
      </button>
    </div>
  );
};

export default AddTask;
