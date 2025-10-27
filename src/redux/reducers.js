import {
  ADD_TASK,
  REMOVE_TASK,
  EDIT_TASK,
  TOGGLE_TASK,
  LOAD_TASKS,
  FILTER_TASKS,
} from "./actions";

const initialState = {
  tasks: [],
  filter: "all",
};

export const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_TASKS:
      // Ensure older tasks without priority get a default
      const normalized = (action.payload || []).map((t) => ({ priority: 'Medium', ...t }));
      return { ...state, tasks: normalized };

    case ADD_TASK:
      const updatedTasks = [...state.tasks, action.payload];
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return { ...state, tasks: updatedTasks };

    case REMOVE_TASK:
      const filtered = state.tasks.filter((task) => task.id !== action.payload);
      localStorage.setItem("tasks", JSON.stringify(filtered));
      return { ...state, tasks: filtered };

    case TOGGLE_TASK:
      const toggled = state.tasks.map((task) =>
        task.id === action.payload ? { ...task, completed: !task.completed } : task
      );
      localStorage.setItem("tasks", JSON.stringify(toggled));
      return { ...state, tasks: toggled };

case EDIT_TASK:
  const edited = state.tasks.map((task) =>
    task.id === action.payload.taskId
      ? { ...task, ...action.payload.updatedTask } // merge all updated fields
      : task
  );
  localStorage.setItem("tasks", JSON.stringify(edited));
  return { ...state, tasks: edited };

    case FILTER_TASKS:
      return { ...state, filter: action.payload };

    default:
      return state;
  }
};
