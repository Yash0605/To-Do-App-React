import React, { useEffect, useState } from "react";
import { ReactComponent as EditIcon } from "../../assets/pencil.svg";
import { ReactComponent as DeleteIcon } from "../../assets/trash.svg";
import { ReactComponent as CompleteIcon } from "../../assets/check.svg";

import "./task-list-item.styles.scss";

const ListItem = ({ item, deleteItem, updateCurrentItem }) => {
  const [disableEdit, setDisableEdit] = useState(false);
  useEffect(() => {}, [item]);

  const editCurrentItem = (item) => {
    // getting the id of current item to add styles and make the item editable
    const currentInputElement = document.getElementById(`list-item-${item.id}`);
    currentInputElement.removeAttribute("readOnly");
    currentInputElement.classList.add("name-edit");
    currentInputElement.focus();
  };

  const completeTask = (item) => {
    // if the item is being marked as completed
    const currentInputElement = document.getElementById(
      `list-item-edit-${item.id}`
    );
    if (!item.isComplete) {
      setDisableEdit(true);
      currentInputElement.classList.add("disableEditIcon");
    } else {
      setDisableEdit(false);
      currentInputElement.classList.remove("disableEditIcon");
    }
    updateCurrentItem(item, "Complete");
  };

  const removeAttributes = (e) => {
    console.log(e.target);
    // e.removeAttribute("readOnly");
    e.target.classList.remove("name-edit");
    updateCurrentItem(item, "Edit", e.target);
  };

  return (
    <div className="listItem">
      <input
        className="name"
        defaultValue={item.name}
        id={`list-item-${item.id}`}
        readOnly
        onBlur={removeAttributes}
      />
      <span onClick={() => (!disableEdit ? editCurrentItem(item) : null)}>
        <EditIcon
          className="icon edit-button"
          id={`list-item-edit-${item.id}`}
        ></EditIcon>
      </span>
      <span onClick={() => deleteItem(item)}>
        <DeleteIcon className="icon delete-button"></DeleteIcon>
      </span>
      <span onClick={() => completeTask(item)}>
        <CompleteIcon
          className={`${item.isComplete ? "complete-icon" : ""} icon`}
        ></CompleteIcon>
      </span>
    </div>
  );
};

export default ListItem;
