import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/actions";

const initTask = { name: "", description: "", dueDate: "", priority: "Medium" };

const AddTask = () => {
  const [task, setTask] = useState(initTask);
  const dispatch = useDispatch();

  const handleAddTask = (e) => {
    if (e) e.preventDefault();
    if (task.name.trim()) {
      dispatch(
        addTask({
          id: Date.now(),
          name: task.name.trim(),
          description: task.description.trim(),
          dueDate: task.dueDate || null,
          priority: task.priority || "Medium",
          completed: false,
        })
      );
      setTask(initTask);
    }
  };

  return (
    <form className="add-task-form card" onSubmit={handleAddTask}>
      <h2 className="form-title">➕ Create New Task</h2>

      <div className="form-grid">
        {/* Name */}
        <div className="field field-full">
          <label htmlFor="name" className="label">
            Task Name <span className="required">*</span>
          </label>
          <input
            id="name"
            type="text"
            placeholder="What needs to be done?"
            value={task.name}
            onChange={(e) => setTask({ ...task, name: e.target.value })}
            className="input"
            required
          />
        </div>

        {/* Description */}
        <div className="field field-full">
          <label htmlFor="description" className="label">
            Description
          </label>
          <textarea
            id="description"
            rows="2"
            placeholder="Add details, sub-tasks, or notes..."
            value={task.description}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
            className="textarea"
          />
        </div>

        {/* Due Date */}
        <div className="field">
          <label htmlFor="dueDate" className="label">
            📅 Due Date
          </label>
          <input
            id="dueDate"
            type="date"
            value={task.dueDate}
            onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
            className="input"
          />
        </div>

        {/* Priority */}
        <div className="field">
          <label htmlFor="priority" className="label">
            🎯 Priority
          </label>
          <select
            id="priority"
            value={task.priority}
            onChange={(e) => setTask({ ...task, priority: e.target.value })}
            className="input select-input"
          >
            <option value="High">🔴 High Priority</option>
            <option value="Medium">🟡 Medium Priority</option>
            <option value="Low">🟢 Low Priority</option>
          </select>
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-primary">
          <span>✨ Add Task</span>
        </button>
      </div>
    </form>
  );
};

export default AddTask;

