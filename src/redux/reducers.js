const initialState = {
  tasks: JSON.parse(localStorage.getItem("tasks")) || [],
};

const taskReducer = (state = initialState, action) => {
  let updatedTasks;
  switch (action.type) {
    case "ADD_TASK":
      updatedTasks = [...state.tasks, { ...action.payload, completed: false }];
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return { ...state, tasks: updatedTasks };

    case "REMOVE_TASK":
      updatedTasks = state.tasks.filter((task) => task.id !== action.payload);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return { ...state, tasks: updatedTasks };

    case "EDIT_TASK":
      updatedTasks = state.tasks.map((task) =>
        task.id === action.payload.taskId
          ? { ...task, name: action.payload.name }
          : task
      );
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return { ...state, tasks: updatedTasks };

    case "TOGGLE_TASK":
      updatedTasks = state.tasks.map((task) =>
        task.id === action.payload ? { ...task, completed: !task.completed } : task
      );
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return { ...state, tasks: updatedTasks };

    default:
      return state;
  }
};

export default taskReducer;
