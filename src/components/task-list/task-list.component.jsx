import React from "react";
import ListItem from "../task-list-item/task-list-item.component";


import "./task-list.styles.scss";

const TaskListComponent = ({ items,...otherProps }) => (
  <div className="task-list">
    {items.map((item) => (
      <div key={item.id} >
        <ListItem item={item} {...otherProps}></ListItem>
      </div>
    ))}
  </div>
);

export default TaskListComponent;
