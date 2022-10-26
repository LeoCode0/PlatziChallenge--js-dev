import * as calculator from "./operations.js";

let result = 0
let currentNumber = ""
let currentOperation

numberButtons.forEach(button => {
  button.addEventListener("click", (event) => {
    printCharacter(event)
    currentNumber += event.target.textContent
  })
})

add.addEventListener("click", (event) => {
  printCharacter(event)
  debugger
  if(currentOperation){
    if(result > 0){
      result += currentOperation(currentNumber)
    }else{
      result = currentOperation(currentNumber)
    }
    currentOperation = undefined
  }else{
    currentOperation = calculator.sum(currentNumber)
  }
  currentNumber = ""
})

equal.addEventListener("click", () => {
  if(currentOperation){
    result = currentOperation(currentNumber)
  }
  console.log(result)
})


function printCharacter(event){
  const target = event.target
  
  screen.value += target.textContent
}
