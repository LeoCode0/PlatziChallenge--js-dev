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
