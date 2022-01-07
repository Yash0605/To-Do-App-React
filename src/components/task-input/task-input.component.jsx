import React from "react";

import "./task-input.styles.scss";

const TaskInput = ({ userInput,handleChange,handleKeyDown }) => (
  <div className="input-container">
    <input
      type="text"
      className="task-input"
      placeholder="Please enter new task"
      value={userInput}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
    />
  </div>
);

export default TaskInput;
