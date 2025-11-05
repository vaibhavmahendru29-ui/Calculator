// Get references
const buttons = document.querySelectorAll("button");
const screen = document.getElementById("screen");
let inputs = "";

// Mapping special characters to JS operators
const operators = {
  "÷": "/",
  "×": "*",
  "^": "**",
  "π": "3.1416"
};

// Add click event listeners to all buttons
buttons.forEach(button => {
  button.addEventListener("click", e => {
    handleInput(e.target.innerText);
  });
});

// Handle keyboard input
document.addEventListener("keydown", e => {
  const key = e.key;

  // Allow numeric, operator, and control keys
  if (!isNaN(key) || ["+", "-", "*", "/", ".", "(", ")", "%"].includes(key)) {
    inputs += key;
  } else if (key === "Enter") {
    calculate();
  } else if (key === "Backspace") {
    inputs = inputs.slice(0, -1);
  } else if (key === "Escape") {
    inputs = "";
  }

  screen.value = inputs;
});

// Main input handler for clicks
function handleInput(value) {
  switch (value) {
    case "C":
      inputs = "";
      break;

    case "⌫":
      inputs = inputs.slice(0, -1);
      break;

    case "=":
      calculate();
      return;

    default:
      // Replace symbols like × ÷ ^ π
      inputs += operators[value] || value;
      break;
  }

  screen.value = inputs;
}

// Calculation logic with safe evaluation
function calculate() {
  try {
    // Evaluate the expression
    const result = Function(`"use strict"; return (${inputs})`)();
    screen.value = result;
    inputs = String(result);
  } catch (err) {
    screen.value = "INVALID OPERATION";
    inputs = "";
  }
}
