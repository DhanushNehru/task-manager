import React from "react";
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";
import "./App.css";

const App = () => {
  return (
    <div
      className="app-container"
      style={{
        padding: "2rem",
        minHeight: "100vh",
        backgroundColor: "#f4f4f4",
      }}
    >
      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          padding: "2rem",
          borderRadius: "20px",
          backgroundColor: "#fff",
          boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
          border: "1px solid #e0e0e0",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            fontFamily: "'Roboto', sans-serif",
            color: "#333",
            marginBottom: "2rem",
          }}
        >
          Task Manager
        </h1>
        <AddTask />
      </div>

      <TaskList />
    </div>
  );
};

export default App;
