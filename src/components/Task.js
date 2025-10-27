import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { removeTask, toggleTask, editTask } from "../redux/actions";

const Task = ({ task }) => {
  const dispatch = useDispatch();
  

  // Hooks at the top
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({
    name: task?.name || "",
    description: task?.description || "",
    dueDate: task?.dueDate || "",
    priority: task?.priority || 'Medium',
  });

  // Save edits
  const handleSave = () => {
    if (editedTask.name.trim()) {
      dispatch(editTask(task.id, editedTask));
      setIsEditing(false);
    }
  };

  // Reminder popup
  const handleReminder = () => {
    if (!task.dueDate) {
      alert("No due date set for this task!");
      return;
    }

    const due = new Date(task.dueDate);
    if (isNaN(due)) {
      alert("Invalid due date!");
      return;
    }

    const now = new Date();
    const diffMs = due - now;

    if (diffMs <= 0) {
      alert(`⚠️ Task "${task.name}" is already past due!`);
      return;
    }

    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diffMs / (1000 * 60)) % 60);

    alert(`⏰ "${task.name}" is due in ${days}d ${hours}h ${minutes}m`);
  };

  return (
    <div className="task-card task-item">
  <div className="title-row">

    {/* Completed Checkbox */}
    <div className="title-container">
      <input
      type="checkbox"
      checked={task.completed}
      onChange={() => dispatch(toggleTask(task.id))}
      className="checkbox"
    />

    {/* Task Name */}
    {isEditing ? (
      <input
        value={editedTask.name}
        onChange={(e) => setEditedTask({ ...editedTask, name: e.target.value })}
        className="input editable-title"
      />
    ) : (
      <div style={{display: 'flex', alignItems: 'center', gap: '0.6rem'}}>
        <h3 className={`title ${task.completed ? 'completed' : ''}`}>{task.name}</h3>
        <span className={`priority ${task.priority ? task.priority.toLowerCase() : 'medium'}`}>{task.priority || 'Medium'}</span>
      </div>
    )}
</div>

    <div className="task-actions">
          {/* Reminder Bell */}
    <button className="notif-bell hover-scale" onClick={handleReminder}>🔔</button>

    {/* Edit / Save Buttons */}
    {isEditing ? (
      <button className="btn-icon save hover-scale" onClick={handleSave}>✅</button>
    ) : (
      <button className="btn-icon edit hover-scale" onClick={() => setIsEditing(true)}>✏️</button>
    )}

    {/* Delete Button */}
    <button className="delete hover-rotate" onClick={() => dispatch(removeTask(task.id))}>❌</button>
    </div>
      
  </div>

  <div className="content">
    {isEditing ? (
      <textarea
        value={editedTask.description}
        onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
        className="textarea editable-text"
      />
    ) : (
      <p className="muted description-text">{task.description}</p>
    )}

<div className="task-details">
      {isEditing ? (
      <input
        type="date"
        value={editedTask.dueDate}
        onChange={(e) => setEditedTask({ ...editedTask, dueDate: e.target.value })}
        className="input date-input"
      />
    ) : (
      task.dueDate && <p className="due muted">Due: {task.dueDate}</p>
    )}

    {/* Priority selector when editing, static label otherwise is above */}
    {isEditing && (
      <select value={editedTask.priority} onChange={(e) => setEditedTask({ ...editedTask, priority: e.target.value })} className="input">
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
    )}

    {/* Task Status Indicator */}
    <div className="status-indicator">
      <span className={`status-dot ${task.completed ? 'completed' : task.isOverdue ? 'overdue' : 'active'}`}></span>
      <span>{task.completed ? 'Completed' : task.isOverdue ? 'Overdue' : 'Active'}</span>
    </div>
</div>
  </div>
</div>

  );
};

export default Task;
