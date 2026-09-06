import React, { useState } from "react";
import { useSelector } from "react-redux";
import Task from "./Task";

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks || []);
  const [filter, setFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const allCount = tasks.length;
  const activeCount = tasks.filter((t) => !t.completed).length;
  const completedCount = tasks.filter((t) => t.completed).length;

  const filteredTasks = tasks.filter((task) => {
    // Status filter
    if (filter === "active" && task.completed) return false;
    if (filter === "completed" && !task.completed) return false;

    // Priority filter
    if (priorityFilter !== "all") {
      const taskPriority = (task.priority || "medium").toLowerCase();
      if (taskPriority !== priorityFilter.toLowerCase()) return false;
    }

    // Search query filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const taskName = (task.name || task.title || "").toLowerCase();
      const taskDesc = (task.description || "").toLowerCase();
      if (!taskName.includes(query) && !taskDesc.includes(query)) {
        return false;
      }
    }

    return true;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (!a.dueDate) return 1;
    if (!b.dueDate) return -1;
    return new Date(a.dueDate) - new Date(b.dueDate);
  });

  return (
    <div className="task-list-section">
      <div className="task-controls">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          {searchQuery && (
            <button
              type="button"
              className="clear-search"
              onClick={() => setSearchQuery("")}
              title="Clear search"
            >
              ✕
            </button>
          )}
        </div>

        <div className="filter-row">
          <div className="filters">
            <button
              type="button"
              onClick={() => setFilter("all")}
              className={`filter-btn ${filter === "all" ? "active" : ""}`}
            >
              All <span className="filter-badge">{allCount}</span>
            </button>
            <button
              type="button"
              onClick={() => setFilter("active")}
              className={`filter-btn ${filter === "active" ? "active" : ""}`}
            >
              Active <span className="filter-badge">{activeCount}</span>
            </button>
            <button
              type="button"
              onClick={() => setFilter("completed")}
              className={`filter-btn ${filter === "completed" ? "active" : ""}`}
            >
              Completed <span className="filter-badge">{completedCount}</span>
            </button>
          </div>

          <div className="priority-filter">
            <label htmlFor="priority-select" className="priority-label">
              Priority:
            </label>
            <select
              id="priority-select"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="priority-select"
            >
              <option value="all">All Priorities</option>
              <option value="high">🔴 High</option>
              <option value="medium">🟡 Medium</option>
              <option value="low">🟢 Low</option>
            </select>
          </div>
        </div>
      </div>

      {sortedTasks.length > 0 ? (
        <div className="task-cards-list">
          {sortedTasks.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-icon">📝</div>
          <h3>No tasks found</h3>
          <p>
            {searchQuery
              ? `No tasks matching "${searchQuery}"`
              : filter === "completed"
              ? "You haven't completed any tasks yet."
              : filter === "active"
              ? "No active tasks right now! Enjoy your day 🎉"
              : "Add your first task above to get started!"}
          </p>
        </div>
      )}
    </div>
  );
};

export default TaskList;

