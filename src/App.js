import React from "react";
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";

const App = () => {
  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      <div>
        <h1>Task Manager</h1>
        <AddTask />
      </div>

      <TaskList />
    </div>
  );
};

export default App;
