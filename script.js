"use strict";

// let letters = [];
// let nums;

// for (let item of buttons) {
//   item.addEventListener("click", function (e) {
//     let buttonText = e.target.innerText;
//     letters.push(buttonText);
//     nums = letters.join("");
//     display.textContent = nums;
//   });
// }

// equals.addEventListener("click", function () {
//   (arr) => function () {};
// });

// arr.forEach(function (val) {
//   if (val === '1' || val === '2' || val === '3' || val === '4' || val === '5') {
//     console.log("abc");
//   } else {
//     console.log("not");
//   }
// });

const buttons = document.querySelectorAll("button");
const display = document.querySelector(".display-screen");
const equals = document.getElementById("equals");

const calculator = {
  displayValue: "0",
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null,
};

function inputDigit(digit) {
  const { displayValue, waitingForSecondOperand } = calculator;

  if (waitingForSecondOperand == true) {
    calculator.displayValue = digit;
    calculator.waitingForSecondOperand = false;
  } else {
    // Overwrite `displayValue` if the current value is '0' otherwise append to it

    calculator.displayValue =
      displayValue === "0" ? digit : displayValue + digit;
  }
}

function inputDecimal(dot) {
  if (calculator.waitingForSecondOperand === true) {
    console.log(calculator.displayValue);
    calculator.displayValue = "0.";
    calculator.waitingForSecondOperand = false;
    return;
  }

  if (!calculator.displayValue.includes(dot)) {
    calculator.displayValue += dot;
  }
}

function handleOperator(nextOperator) {
  const { firstOperand, displayValue, operator } = calculator;

  // ParseFloat converts string contents into floating point number
  const inputValue = parseFloat(displayValue);
  console.log(inputValue);

  if (operator && calculator.waitingForSecondOperand) {
    calculator.operator = nextOperator;
    return;
  }

  if (firstOperand == null && !isNaN(inputValue)) {
    // Update the firstOperand property
    calculator.firstOperand = inputValue;
  } else if (operator) {
    const result = calculate(firstOperand, inputValue, operator);

    calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
    // calculator.displayValue = String(result);
    calculator.firstOperand = result;
  }
  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;
  console.log(calculator);
}

function calculate(firstOperand, secondOperand, operator) {
  if (operator === "+") {
    return firstOperand + secondOperand;
  } else if (operator === "-") {
    return firstOperand - secondOperand;
  } else if (operator === "*") {
    return firstOperand * secondOperand;
  } else if (operator === "/") {
    return firstOperand / secondOperand;
  }

  return secondOperand;
}

function resetCalculator() {
  calculator.displayValue = "0";
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
}

function updateDisplay() {
  display.textContent = calculator.displayValue;
}

updateDisplay();

for (let button of buttons) {
  button.addEventListener("click", (event) => {
    // Access the clicked element

    const { target } = event;

    if (!target.matches("button")) {
      return;
    }

    if (!target.matches("button")) {
      return;
    }

    if (target.classList.contains("operator")) {
      handleOperator(target.value);
      updateDisplay();
      return;
    }

    if (target.classList.contains("decimal")) {
      console.log("hi");
      inputDecimal(target.value);
      updateDisplay();
      return;
    }

    if (target.classList.contains("clear")) {
      resetCalculator();
      updateDisplay();
      return;
    }

    inputDigit(target.textContent);
    updateDisplay();

    // switch (value) {
    //   case "+":
    //   case "-":
    //   case "*":
    //   case "/":
    //   case "=":
    //     handleOperator(value);
    //     break;
    //   case ".":
    //     inputDecimal(value);
    //   case "clear":
    //     resetCalculator();
    //     break;
    //   default:
    //     // check if key is an Integer
    //     if (Number.isInteger(parseFloat(value))) {
    //       inputDigit(value);
    //     }
    // }
  });
}

console.log(2 * 4);
