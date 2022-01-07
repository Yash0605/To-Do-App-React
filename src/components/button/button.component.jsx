import React from "react";

import "./button.styles.scss";

const ButtonComponent = ({
  children,
  clickFun,
  isClearButton,
  isCompleteButton,
  disable,
}) => {
  return (
    <button
      className={`${isClearButton ? "clear-button" : ""} ${
        isCompleteButton ? "complete-button" : ""
      } btn`}
      onClick={clickFun}
      disabled={disable}
    >
      {children}
    </button>
  );
};

export default ButtonComponent;
