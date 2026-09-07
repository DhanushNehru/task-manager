import {
  ADD_TASK,
  REMOVE_TASK,
  EDIT_TASK,
  TOGGLE_TASK,
  LOAD_TASKS,
  FILTER_TASKS,
} from "./actions";

export const STORAGE_KEY = "task_manager_tasks_v1";

function loadSavedTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY) || localStorage.getItem("tasks");
    const parsed = raw ? JSON.parse(raw) : [];
    return parsed.map((t) => ({ priority: "Medium", ...t }));
  } catch (e) {
    console.error("Failed to load tasks from localStorage", e);
    return [];
  }
}

function saveTasks(tasks) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (e) {
    console.error("Failed to save tasks to localStorage", e);
  }
}

const initialState = {
  tasks: loadSavedTasks(),
  filter: "all",
};

export const taskReducer = (state = initialState, action) => {
  let updatedTasks;
  switch (action.type) {
    case LOAD_TASKS: {
      const normalized = (action.payload || loadSavedTasks()).map((t) => ({
        priority: "Medium",
        ...t,
      }));
      saveTasks(normalized);
      return { ...state, tasks: normalized };
    }

    case ADD_TASK: {
      updatedTasks = [action.payload, ...state.tasks];
      saveTasks(updatedTasks);
      return { ...state, tasks: updatedTasks };
    }

    case REMOVE_TASK: {
      updatedTasks = state.tasks.filter((task) => task.id !== action.payload);
      saveTasks(updatedTasks);
      return { ...state, tasks: updatedTasks };
    }

    case TOGGLE_TASK: {
      updatedTasks = state.tasks.map((task) =>
        task.id === action.payload ? { ...task, completed: !task.completed } : task
      );
      saveTasks(updatedTasks);
      return { ...state, tasks: updatedTasks };
    }

    case EDIT_TASK: {
      updatedTasks = state.tasks.map((task) =>
        task.id === action.payload.taskId
          ? { ...task, ...action.payload.updatedTask }
          : task
      );
      saveTasks(updatedTasks);
      return { ...state, tasks: updatedTasks };
    }

    case FILTER_TASKS: {
      return { ...state, filter: action.payload };
    }

    default:
      return state;
  }
};

