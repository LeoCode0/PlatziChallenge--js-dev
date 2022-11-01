import * as calculator from "./operations.js";

let result = 0
let currentNumber = ""
let currentOperation
let last

numberButtons.forEach(button => {
  button.addEventListener("click", (event) => {
    printCharacter(event)
    currentNumber += event.target.textContent
  })
})

// ❌

add.addEventListener("click", (event) => {
  printCharacter(event)
  if(currentOperation){
    result += currentOperation(currentNumber)
    currentOperation = undefined
  }else{
    currentOperation = calculator.sum(currentNumber)
  }
  currentNumber = ""
})

sub.addEventListener("click", (event) => {
  printCharacter(event)
  if(currentOperation){
    result -= currentOperation(currentNumber)
    currentOperation = undefined
  }else{
    currentOperation = calculator.subtract(currentNumber)
  }
  currentNumber = ""
})

divider.addEventListener("click", (event) => {
  printCharacter(event)
  if(currentOperation){
    result /= currentOperation(currentNumber)
    currentOperation = undefined
  }else{
    currentOperation = calculator.division(currentNumber)
  }
  currentNumber = ""
})

multi.addEventListener("click", (event) => {
  printCharacter(event)
  if(currentOperation){
    result = 1
    result *= currentOperation(currentNumber)
    currentOperation = undefined
  }else{
    currentOperation = calculator.multiply(currentNumber)
  }
  currentNumber = ""
  last = "multi"
})

del.addEventListener("click", () => {
  let newValue = calculator.deleteLastCharacter(screen)
  currentNumber = newValue
  if(result > 0){
    result = Number(newValue)
  }
  screen.value = newValue
})

delAll.addEventListener("click", () => {
  result = 0
  currentNumber = ""
  currentOperation = undefined
  screen.value = ""
})

equal.addEventListener("click", () => {
  // ❌
  if(currentOperation){
    switch (last) {
      case "multi":
        result = currentOperation(currentNumber)
        break;
      default:
        break;
    }
    currentOperation = undefined
    currentNumber = ""
  }
  // ❌
  if(currentNumber !== ""){
    result *= Number(currentNumber)
    currentNumber = ""
  }
  screen.value = result
})

function printCharacter(event){
  // ❌
  const target = event.target
  
  screen.value += target.textContent
}
