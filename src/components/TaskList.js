import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Task from "./Task";

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks);
  const [filter, setFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

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
    if (priorityFilter !== "all") {
      if (!task.priority) return false;
      if (task.priority.toLowerCase() !== priorityFilter) return false;
    }
    return true;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (!a.dueDate) return 1;
    if (!b.dueDate) return -1;
    return new Date(a.dueDate) - new Date(b.dueDate);
  });

  return (
    <div className="task-list container">
      <div className="task-controls center">
        <div className="filters">
          <button onClick={() => setFilter("all")} className={filter === 'all' ? 'active' : ''}>All</button>
          <button onClick={() => setFilter("active")} className={filter === 'active' ? 'active' : ''}>Active</button>
          <button onClick={() => setFilter("completed")} className={filter === 'completed' ? 'active' : ''}>Completed</button>
        </div>
        <div style={{display: 'flex', gap: '0.6rem', alignItems: 'center'}}>
          <label style={{fontSize: '0.9rem', color: '#6b7280'}}>Priority</label>
          <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)} className="search">
            <option value="all">All</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      {sortedTasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
