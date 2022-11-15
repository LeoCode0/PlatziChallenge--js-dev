import * as calculator from "./operations.js";

let result = 0
let currentNumber = ""
let arrayOperation = []

numberButtons.forEach(button => {
  button.addEventListener("click", (event) => {
    printCharacter(event)
    currentNumber += event.target.textContent
  })
})

add.addEventListener("click", (event) => {

  printCharacter(event)
  arrayOperation.push(currentNumber)
    arrayOperation.push("+")
    currentNumber = ""    
})

sub.addEventListener("click", (event) => {
  printCharacter(event)
  arrayOperation.push(currentNumber)
  arrayOperation.push("-")
  currentNumber = ""
})

divider.addEventListener("click", (event) => {
  printCharacter(event)
  arrayOperation.push(currentNumber)
  arrayOperation.push("/")
  currentNumber = ""
})

multi.addEventListener("click", (event) => {
  printCharacter(event)
  arrayOperation.push(currentNumber)
  arrayOperation.push("*")
  currentNumber = ""
})

del.addEventListener("click", () => {
  let newValue = calculator.deleteLastCharacter(screen)
  currentNumber = newValue
  if(result > 0){
    result = Number(newValue)
  }
  screen.value = newValue
  arrayOperation.pop() 
})

delAll.addEventListener("click", () => {
  result = 0
  currentNumber = ""
  screen.value = ""
  arrayOperation = []
})

equal.addEventListener("click", () => {

  arrayOperation.push(currentNumber)
  console.log("[" + arrayOperation + "]" + "  array oficial")

    multiDiv(arrayOperation)
    sumSub(arrayOperation)

  screen.value = arrayOperation[0]
  currentNumber = arrayOperation[0]
  arrayOperation.pop()
})

function multiDiv() {

  const arra = arrayOperation;

  for (let i=0; i < arra.length; i++) {
    for (let i=0; i < arra.length; i++) {
        if(arra[i] == "*" || arra[i] == "/"){
          switch(arra[i]){
            case "*":
              arra[i-1] =calculator.multiply(arra[i-1], arra[i+1])
              arra.splice(i, 2)
              break;
            case "/":
              arra[i-1] = calculator.division(arra[i-1], arra[i+1])
              arra.splice(i, 2)
              break;
              default:
              break;
          }
          i = i-1;
        }
    }
  }
  return arra;
}

function sumSub() {

  const arra = arrayOperation; 

  for (let i=0; i < arra.length; i++) {
    for (let i=0; i < arra.length; i++) {
        if(arra[i] == "+" || arra[i] == "-"){
          switch(arra[i]){
            case "+":
              arra[i-1] =calculator.sum(arra[i-1], arra[i+1])
              arra.splice(i, 2)
              break;
            case "-":
              arra[i-1] = calculator.subtract(arra[i-1], arra[i+1])
              arra.splice(i, 2)
              break;
              default:
              break;
          }
          i = i-1;
        }
    }
  }
  return arra;
}



function printCharacter(event){

  const target = event.target
  
  screen.value += target.textContent
}
