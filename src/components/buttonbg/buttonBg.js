import React from "react";
import "./buttonBg.css";

const buttonBgKeyboard = (props) => {
  return (
    <div
      onClick={() => props.keyboardClicked(props.content)}
      className="num-buttonBg"
    >
      <p>{props.content}</p>
    </div>
  );
};
export default buttonBgKeyboard;
