import TaskInput from "./components/task-input/task-input.component";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./App.css";
import ButtonComponent from "./components/button/button.component";
import TaskListComponent from "./components/task-list/task-list.component";
import { setCompleteAll } from "./actions/task.action";

function App() {
  const initialState = [];
  const [newListItem, setNewListItem] = useState("");
  const [todoList, setTodoList] = useState(initialState);
  const [disable, setDisable] = useState(false);
  const [disableEdit, setDisableEdit] = useState(false);
  const dispatch = useDispatch();
  const completeAllTaskSelector = useSelector((state) => state.completeAll);

  const addItem = () => {
    let updatedList = [...todoList];
    let isDuplicate = false;

    for (let taskList of updatedList) {
      if (
        taskList.name.toLowerCase() === newListItem.toLowerCase().trim() &&
        !taskList.isComplete
      ) {
        isDuplicate = true;
        break;
      }
    }
    if (!isDuplicate) {
      updatedList.push({
        name: newListItem.trim(),
        id: todoList.length + 1,
        isComplete: false,
      });
      setTodoList(updatedList);
      setNewListItem("");
    } else {
      alert(
        "The task is already added to the list. Please add a different task"
      );
    }
  };

  const deleteItem = (item) => {
    console.log("Delete item is called");
    let updatedList = [...todoList];
    updatedList = todoList.filter((currentItem) => currentItem.id !== item.id);
    setTodoList(updatedList);
  };

  const checkAllTasksCompleted = () => {
    let areAllTasksCompleted = true;

    for (const item of todoList) {
      if (!item.isComplete) {
        areAllTasksCompleted = false;
        if (disable) setDisable(false);
        break;
      }
    }

    if (areAllTasksCompleted && !disable) {
      setDisable(true);
    }
  };

  const sortFunction = (a, b) => {
    return a.id > b.id ? 1 : -1;
  };

  const updateCurrentItem = (item, flag, element) => {
    // getting the list of items that won't change so that main list can be updated
    const unChangedItems = todoList.filter((cItem) => cItem.id !== item.id);

    //fetching the current item and updating the item as completed
    const currentItem = todoList.filter((cItem) => cItem.id === item.id)[0];

    if (flag === "Complete") {
      currentItem.isComplete = !item.isComplete;
      const currentInputElement = document.getElementById(
        `list-item-${currentItem.id}`
      );
      currentItem.isComplete
        ? currentInputElement.classList.add("taskCompleted")
        : currentInputElement.classList.remove("taskCompleted");

      checkAllTasksCompleted();
    } else if (flag === "Edit") {
      currentItem.name = element.value;
    }

    setTodoList(
      [...unChangedItems, currentItem].sort((a, b) => sortFunction(a, b))
    );
  };

  // cannot add trim fun here as it won't allow to add the white space at all this is not what we want
  const handleChange = (e) => setNewListItem(e.currentTarget.value);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addItem();
    }
  };

  const clearTodoList = () => setTodoList([]);

  const completeAllTasks = () => {
    for (const item of todoList) {
      item.isComplete = item.isComplete ? !item.isComplete : item.isComplete;
      updateCurrentItem(item, "Complete");
    }
    dispatch(setCompleteAll(true));
    setDisable(true);
  };

  return (
    <div className="App">
      <TaskInput
        userInput={newListItem}
        handleChange={handleChange}
        handleKeyDown={handleKeyDown}
      ></TaskInput>
      <ButtonComponent clickFun={addItem}>ADD TASK</ButtonComponent>
      <TaskListComponent
        items={todoList}
        deleteItem={deleteItem}
        updateCurrentItem={updateCurrentItem}
      ></TaskListComponent>
      {todoList.length > 0 ? (
        <div>
          <ButtonComponent clickFun={clearTodoList} isClearButton>
            CLEAR LIST
          </ButtonComponent>
          <ButtonComponent
            clickFun={completeAllTasks}
            disable={disable}
            isCompleteButton
          >
            COMPLETE ALL
          </ButtonComponent>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
