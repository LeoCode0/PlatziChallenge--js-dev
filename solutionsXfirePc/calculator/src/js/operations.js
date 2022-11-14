export function sum(num){
  return function (anotherNum){
    return Number(num) + Number(anotherNum)
  }
}

export function subtract(num){
  return function (anotherNum){
    return Number(num) - Number(anotherNum)
  }
}

export function division(num){
  return function (anotherNum){
    return Number(num) / Number(anotherNum)
  }
}

export function multiply(num){
  return function (anotherNum){
    return Number(num) * Number(anotherNum)
  }
}

export function deleteLastCharacter(screen){
  let newValue = screen.value.split("")
  newValue.pop()
  return newValue.join("")
}