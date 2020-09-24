import React from "react";
import "./numberPd.css";
import ButtonKeypad from "../button/button";

const numberPad = (props) => {
  let num = [
    [7, 8, 9],
    [4, 5, 6],
    [1, 2, 3],
    ["00", 0, "."],
  ];
  return (
    <div className="numberPad-Wraper">
      {num.map((row) => {
        return (
          <div key={row} className="numberPad-rows">
            {row.map((col) => (
              <ButtonKeypad
                key={col}
                keyboardClicked={props.keyboardClicked}
                content={col}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
};
export default numberPad;
