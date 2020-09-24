import React from "react";
import "./calculator.css";
import ButtonKeyboard from "./button/button";
import NumberPad from "./numberPad/numberPad";
import ButtonBgKeyboard from "./buttonbg/buttonBg";
// import "./mathjs";

class Calculator extends React.Component {
  state = {
    calulations: ["5+6+6"],
    curentCalc: "",
    solution: "",
  };

  keyboardClicked = (content) => {
    if (content === "ce") {
      this.clearScreen();
    } else if (content === "⌫") {
      // console.log(" inside if c");

      this.backspace();
    } else if (content === "=") {
      this.calculate();
    } else {
      if (
        !(
          ["/", "*", "-", "+", ".", "^"].includes(content) &&
          (["/", "*", "-", "+", ".", "^"].includes(
            this.state.curentCalc.slice(-1)
          ) ||
            this.state.curentCalc.length === 0)
        )
      ) {
        let temp = this.state.curentCalc + content;
        this.setState({ curentCalc: temp });
      }
    }
    // this.calculate();
  };

  calculate = (per) => {
    try {
      this.setState({
        solution: this.evalAlternate(
          this.convertStrToArr(this.state.curentCalc)
        ),
      });
    } catch {
      this.setState({
        solution: this.state.solution,
      });
    }
  };
  clearScreen = () => {
    const temp = this.state.calulations;
    temp.push(this.state.curentCalc);
    this.setState({ curentCalc: "", solution: "", calulations: temp });
  };
  backspace = (per) => {
    // console.log("backspace called");
    this.setState({
      curentCalc: this.state.curentCalc.slice(0, -1),
      solution: "",
    });
  };

  evalAlternate = (per) => {
    /*
    this function iterates through the array for avery symbol in order of precidence ["^", "*", "/", "+", "-"] 
    if searches for "*" and fond it then found will be set to true. in next iteration 
    if condition satisfice will do the operation and sent to temp list
    
    
    
    */

    let methods = {
      "^": (a, b) => Math.pow(a, b),
      "*": (a, b) => a * b,
      "/": (a, b) => a / b,
      "+": (a, b) => a + b,
      "-": (a, b) => a - b,
    };

    let operators = ["^", "*", "/", "+", "-"];
    let strArr = per;
    let temp = [];
    let i = 0;
    let j = 0;
    let found = false;

    for (i = 0; i < operators.length; i += 1) {
      for (j = 0; j < strArr.length; j++) {
        if (strArr[j] === operators[i]) {
          // if the specific operator found in the list found = true and
          //  in next iteration else if will run
          found = true;
        } else if (found) {
          // performs the operation and asigns to temp list
          // methods is an obj of arrow functions
          temp[temp.length - 1] = methods[operators[i]](
            temp[temp.length - 1],
            strArr[j]
          );
          found = false;
        } else {
          // if not a symbol push to temp
          temp.push(strArr[j]);
        }
        // console.log("strArr,temp,i,j", strArr, temp, i, j);
      }
      // clears temp ans asigns new list to strArr
      // continues untill only one num left inside the list
      strArr = temp;
      temp = [];
    }
    return strArr[0];
  };
  convertStrToArr = (per) => {
    // converts string to array => "5+9+5*5-6/5" = [5,"+",9,"+",5,"*",etc...]
    // initially start = 0 and end = 0. on every iteration end incriments if it finds the sumbol(+-*/)
    // pushes the parseInt(num) (str[start to end] and str[end] to arr)
    // start = end+1,end++ this cycle continues O(n) times
    let str = per;
    let arr = [];
    let start = 0;
    let end = 0;
    let i = 0;
    // let j = 0;
    let symbols = ["*", "+", "-", "/", "^"];

    for (i = 0; i < str.length; i++) {
      if (symbols.includes(str[i])) {
        arr.push(parseInt(str.slice(start, end)));
        arr.push(str[end]);
        start = end + 1;
        end += 1;
        // console.log("if", start, " s----e", end, "  arr  ", arr);
      } else {
        end += 1;
        // console.log("else", start, " s----e", end);
      }
    }

    // i had to use the bello lines for situation like list ends with symbol [11,"+",2,"+"]
    arr.push(parseInt(str.slice(start)));
    if (symbols.includes(str[str.length - 1])) {
      return arr.slice(0, -1);
    } else {
      return arr;
    }
  };

  render = () => {
    return (
      <div className="calc-box-lv-1 unselectable">
        <div className="calc-screen">
          <div className="calc-screen1">
            <p>{this.state.curentCalc}</p>
          </div>
          <div className="calc-screen2">
            <h1>{this.state.solution}</h1>
          </div>
        </div>
        <div className="empty-space-bw-screen-key">
          {/* {["(", ")"].map((per) => (
            <p key={per} onClick={() => this.keyboardClicked(per)}>
              {per}
            </p>
          ))} */}
        </div>
        <div className="calc-keyboard">
          <div className="keyboard-numbers-holder">
            <div className="symbols-in-keyboard-numbers-holder">
              {["ce", "^", "⌫"].map((per) => (
                <ButtonKeyboard
                  key={per}
                  keyboardClicked={() => this.keyboardClicked(per)}
                  content={per}
                />
              ))}
            </div>
            <div className="numbers-in-keyboard-numbers-holder">
              <NumberPad keyboardClicked={this.keyboardClicked} />
            </div>
          </div>
          <div className="keyboard-symbols">
            {["/", "*", "-", "+", "="].map((per) => (
              <ButtonBgKeyboard
                key={per}
                content={per}
                keyboardClicked={this.keyboardClicked}
              />
            ))}
          </div>
        </div>
      </div>
    );
  };
}
export default Calculator;
