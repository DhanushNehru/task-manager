// redux/actions.js

// Action Types
export const ADD_TASK = "ADD_TASK";
export const REMOVE_TASK = "REMOVE_TASK";
export const EDIT_TASK = "EDIT_TASK";
export const TOGGLE_TASK = "TOGGLE_TASK";
export const LOAD_TASKS = "LOAD_TASKS";
export const FILTER_TASKS = "FILTER_TASKS";

// Action Creators

export const addTask = (task) => ({
  type: ADD_TASK,
  payload: task,
});

export const removeTask = (taskId) => ({
  type: REMOVE_TASK,
  payload: taskId,
});

export const editTask = (taskId, updatedTask) => ({
  type: EDIT_TASK,
  payload: { taskId, updatedTask },
});

export const toggleTask = (taskId) => ({
  type: TOGGLE_TASK,
  payload: taskId,
});

export const STORAGE_KEY = "task_manager_tasks_v1";

export const loadTasks = () => {
  let savedTasks = [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY) || localStorage.getItem("tasks");
    savedTasks = raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("Failed to load tasks", e);
  }
  return {
    type: LOAD_TASKS,
    payload: savedTasks,
  };
};

export const filterTasks = (filter) => ({
  type: FILTER_TASKS,
  payload: filter, // "all" | "active" | "completed"
});

