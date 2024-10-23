import React from "react";
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";
import './App.css';
const App = () => {
  return (
    <div className="app-container">
      <div style={{
        height: "100%", width: "auto", border: "2px solid #4CAF50", backgroundColor: "rgba(249, 249, 249, 0.7)", borderRadius: "20px", padding: "3rem", 
        marginTop: "2.5rem", 
      }}>
        <h1 style={{ textAlign: "center", color : "black" , fontFamily : "'Roboto', sans-serif" }}>Task Manager</h1>
        <AddTask />
      </div>
      <TaskList />
    </div>
  );
};

export default App;
