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
      <div style={{ display: "flex", gap: "3rem", alignItems: "center" }}>
        <label htmlFor="name" style={{ fontFamily: "'Roboto', sans-serif", fontWeight: "bold" }}>Name</label> {/* Fixed label closing tag */}
        <input
          style={{
            width: "14rem",
            padding: "0.5rem",
            borderRadius: "5px",
            border: "1.5px solid green",
            fontFamily: "'Roboto', sans-serif",
            fontSize: "1rem"
          }}
          id="name"
          type="text"
          value={task.name}
          onChange={(e) => setTask({ ...task, name: e.target.value })}
          />
      </div>
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <label htmlFor="description" style={{ fontFamily: "'Roboto', sans-serif", fontWeight: "bold" }}>Description</label> {/* Ensure this label is properly associated */}
        <textarea
          id="description"
          value={task.description}
          style={{
            width: "14rem",
            padding: "0.5rem",
            borderRadius: "5px",
            border: "1.5px solid green",
            fontFamily: "'Roboto', sans-serif",
            fontSize: "1rem"
          }}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
        ></textarea>
        
      </div>
      <button
        style={{
          padding: ".5rem 0",
          border: "2px solid black",
          borderRadius: "10px",
          backgroundColor: "greenyellow",
          transition: "background-color 0.3s ease, transform 0.3s ease",
          fontFamily: "'Roboto', sans-serif",
          fontSize: "1rem",
          fontWeight: "bold",
          cursor : "pointer"
        }}
        onClick={handleAddTask}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "white";
          e.currentTarget.style.border = "2px solid green";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "greenyellow";
          e.currentTarget.style.border = "2px solid black";
        }}
      >
        Add Task
      </button>
    </div>
  );
};

export default AddTask;
