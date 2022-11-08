export function sum(num, anotherNum){
    return Number(num) + Number(anotherNum)
}

export function subtract(num, anotherNum){
    return Number(num) - Number(anotherNum)
}

export function division(num, anotherNum){
    return Number(num) / Number(anotherNum)
}

export function multiply(num, anotherNum){
    return Number(num) * Number(anotherNum)
}


export function deleteLastCharacter(screen){
  let newValue = screen.value.split("")
  newValue.pop()
  return newValue.join("")
}