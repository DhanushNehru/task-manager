import React from 'react';
import { useDispatch } from 'react-redux';
import { removeTask } from '../redux/actions';

const Task = ({ task }) => {
  const dispatch = useDispatch();

  const handleRemoveTask = () => {
    dispatch(removeTask(task.id));
  };

  return (
    <div>
      <span>{task.name}</span>
      <button onClick={handleRemoveTask}>Remove</button>
    </div>
  );
};

export default Task;