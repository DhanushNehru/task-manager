import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Task from "./Task";

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks);
  const [filter, setFilter] = useState("all");

  // Save to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Simple notification for due tasks
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      tasks.forEach((task) => {
        if (task.dueDate && !task.completed) {
          const due = new Date(task.dueDate);
          const diffHours = (due - now) / (1000 * 60 * 60);
          if (diffHours <= 1 && diffHours > 0) {
            alert(`⏰ Task "${task.name}" is due soon!`);
          } else if (diffHours <= 0) {
            console.warn(`Task "${task.name}" is overdue!`);
          }
        }
      });
    }, 60000); // check every 1 minute

    return () => clearInterval(interval);
  }, [tasks]);

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (!a.dueDate) return 1;
    if (!b.dueDate) return -1;
    return new Date(a.dueDate) - new Date(b.dueDate);
  });

  return (
    <div
      style={{
        marginTop: "2rem",
        width: "100%",
        maxWidth: "600px",
        marginLeft: "auto",
        marginRight: "auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Filter Buttons */}
      <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginBottom: "1rem" }}>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("active")}>Active</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
      </div>

      {sortedTasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
