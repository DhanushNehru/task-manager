import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { removeTask, editTask } from "../redux/actions";
import editIcn from "../Images/edit.png";
import removeIcn from "../Images/remove.png";

const Task = ({ task }) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const dispatch = useDispatch();

  const handleRemoveTask = () => {
    dispatch(removeTask(task.id));
  };

  const handleOpenInput = () => {
    setIsDisabled(false);
  };

  const handleEditTask = (e) => {
    console.log(e.keyCode);
    const taskName = e.target.value;
    console.log(taskName);

    dispatch(editTask(task.id, taskName));
    e.keyCode === 13 && setIsDisabled(true);
  };

  return (
    <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
      <input
        type="text"
        style={{ border: "none", backgroundColor: "white" }}
        disabled={isDisabled}
        defaultValue={task.name}
        onKeyDown={handleEditTask}
      />
      {/* <span>{task.name}</span> */}
      <button onClick={handleOpenInput} style={styles.editBtn}>
        <img src={editIcn} style={styles.editImg} />
      </button>
      <button onClick={handleRemoveTask} style={styles.editBtn}>
        <img src={removeIcn} style={styles.editImg} />
      </button>
    </div>
  );
};

const styles = {
  editImg: {
    width: "1.2rem",
  },
  editBtn: {
    border: "none",
    borderRadius: "10px",
  },
};
export default Task;
