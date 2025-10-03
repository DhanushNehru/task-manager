export const addTask = (task) => ({
  type: "ADD_TASK",
  payload: task,
});

export const removeTask = (taskId) => ({
  type: "REMOVE_TASK",
  payload: taskId,
});

export const editTask = (taskId, name) => ({
  type: "EDIT_TASK",
  payload: { taskId, name },
});

export const toggleTask = (taskId) => ({
  type: "TOGGLE_TASK",
  payload: taskId,
});
