export const addTask = (task) => ({
    type: 'ADD_TASK',
    payload: task
  });
  
  export const removeTask = (taskId) => ({
    type: 'REMOVE_TASK',
    payload: taskId
  });  