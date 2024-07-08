const initialState = {
  tasks: [],
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TASK":
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case "REMOVE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case "EDIT_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          console.log(task);
          return task.id == action.payload.taskId
            ? { ...task, name: action.payload.name }
            : // (task.name = action.payload.name)
              task;
        }),
      };
    default:
      return state;
  }
};

export default taskReducer;
