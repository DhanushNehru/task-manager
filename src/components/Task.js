import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { removeTask, editTask } from "../redux/actions";
import editIcn from "../Images/edit.png";
import removeIcn from "../Images/remove.png";

const Task = ({ task }) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [isExpend, setIsExpend] = useState(false);

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

  const styles = {
    tskname: {
      display: "flex",
      gap: "1rem",
      marginTop: "1rem",
    },
    editImg: {
      width: "1.2rem",
    },
    editBtn: {
      border: "none",
      borderRadius: "10px",
    },
    input: {
      border: "none",
      backgroundColor: "white",
      fontSize: "25px",
    },
    description: {
      backgroundColor: "#eee",
      padding: "1rem",
      borderRadius: "10px",
      fontFamily: "Ariel",
      fontSize: "25px",
      color: "#1c0738",
      display: isExpend ? "block" : "none",
    },
    isexpend: {
      width: "5rem",
      fontSize: "30px",
      cursor: "pointer",
    },
  };

  return (
    <>
      <div style={styles.tskname}>
        <span style={styles.isexpend} onClick={() => setIsExpend(!isExpend)}>
          {isExpend ? <span>&#8681;</span> : <span>&#8680;</span>}
        </span>
        <input
          type="text"
          style={styles.input}
          disabled={isDisabled}
          defaultValue={task.name}
          onKeyDown={handleEditTask}
        />

        <button onClick={handleOpenInput} style={Object.assign(styles.editBtn,styles.editImg)}>
          <img src={editIcn} />
        </button>
        <button onClick={handleRemoveTask}  style={Object.assign(styles.editBtn,styles.editImg)}>
          <img src={removeIcn}/>
        </button>
      </div>
      <p style={styles.description}>{task.description}</p>
    </>
  );
};

export default Task;
