import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/actions";

const initTask = { name: "", description: "", dueDate: "" };

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
          dueDate: task.dueDate || null,
          completed: false,
        })
      );
      setTask(initTask);
    }
  };

  return (
    <div className="add-task card">
      {/* Name */}
      <div className="field">
        <label htmlFor="name" className="label">
          Name
        </label>
        <input id="name" type="text" value={task.name} onChange={(e) => setTask({ ...task, name: e.target.value })} className="input" />
      </div>

      {/* Description */}
      <div className="field">
        <label htmlFor="description" className="label">
          Description
        </label>
        <textarea id="description" value={task.description} onChange={(e) => setTask({ ...task, description: e.target.value })} className="textarea" />
      </div>

      {/* Due Date */}
      <div className="field">
        <label htmlFor="dueDate" className="label">
          Due Date
        </label>
        <input id="dueDate" type="date" value={task.dueDate} onChange={(e) => setTask({ ...task, dueDate: e.target.value })} className="input" />
      </div>
      <button className="btn-primary" onClick={handleAddTask}>Add Task</button>
    </div>
  );
};

export default AddTask;
