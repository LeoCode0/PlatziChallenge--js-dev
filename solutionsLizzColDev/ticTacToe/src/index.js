const board = document.querySelector("#board");
const modal = document.querySelector("#modal")
const listOfSlots = [];
const rows = []
const diagonal =[] // un array de arrays con las 3 casillas
const columnas = []
let listOfMovements = [];
let currentSlot;
let ganador = false

let buttons = document.querySelectorAll(".options--button");

let player1 = {
  active: false,
  value: "",
  marcadorP1: 0
};
let player2 = {
  active: false,
  value: "",
  marcadorP2: 0
};

buttons = Array.from(buttons);

board.classList.add("disabled");

function printValue(event) {
  const target = event.target;
  currentSlot = target;
  if (player1.active) {
    target.innerText = player1.value;
    player1.active = false;
    player2.active = true;
    clearProcess()
    myEnemy()
  } else {
    target.innerText = player2.value;
    player2.active = false;
    player1.active = true;
    clearProcess()
  }
}

function clearProcess() {
  currentSlot.classList.add("disabled");
  currentSlot.removeEventListener("click", printValue);
  listOfMovements = listOfMovements.filter(elem => elem.id !== currentSlot.id)
  checkWinner()  
}

function createSlots() {
  let subArray = []
  let subColum1 = []
  let subColum2 = []
  let subColum3 = []
  let diagonal1 = []
  let diagonal2 = []
  for (let index = 0; index < 9; index++) {
    const slot = document.createElement("div");
    slot.id = `slot-${index}`
    slot.addEventListener("click", printValue);

    listOfSlots.push(slot);
    subArray.push(slot)

    switch (index) {
      case 0:subColum1.push(slot)
             diagonal1.push(slot)
        break;
      case 1:subColum2.push(slot)
             
        break;
      case 2:subColum3.push(slot)
             diagonal2.push(slot)
        break;
      case 3:subColum1.push(slot)
        break;
      case 4:subColum2.push(slot)
            diagonal1.push(slot)
            diagonal2.push(slot)
        break;
      case 5:subColum3.push(slot)
        
      break;
      case 6:subColum1.push(slot)
            diagonal2.push(slot)
        break;
      case 7:subColum2.push(slot)
            
        break;
      case 8:subColum3.push(slot)
        diagonal1.push(slot)
      break;
      default:
        break;
    }

    if(subArray.length === 3){
      rows.push(subArray)
      subArray = []
    }
  }
  columnas.push(subColum1)
  columnas.push(subColum2)
  columnas.push(subColum3)
  diagonal.push(diagonal1)
  diagonal.push(diagonal2)

  listOfMovements = [...listOfSlots]

  board.append(...listOfSlots);
}

function myEnemy() {
  if(listOfMovements.length >= 1){
    const enemySlot = listOfMovements[randomNumber(0, listOfMovements.length - 1)]
    enemySlot.click()
  }
}

function randomNumber(min, max) {

  return Math.floor(Math.random() * (max - min + 1))
}

function checkWinner(){
  const combinations = rows.map(slots => {
    return slots.map(slot => slot.textContent).join("")
  })
  const combinationsDiagonal = diagonal.map(slots => {
    return slots.map(slot => slot.textContent).join("")
  })
  const combinationsColumna = columnas.map(slots => {
    return slots.map(slot => slot.textContent).join("")
  })

  if(combinations.some(combination => combination === player1.value.repeat(3))){
    winnerProcess(player1, "Tu user") 
    ganador = true
    player1.marcadorP1 += player1.marcadorP1
  }
  if(combinationsDiagonal.some(combination => combination === player1.value.repeat(3))){
    winnerProcess(player1, "Tu user") 
    ganador = true
    player1.marcadorP1 += player1.marcadorP1
  }
  if(combinationsColumna.some(combination => combination === player1.value.repeat(3))){
    winnerProcess(player1, "Tu user")
    ganador = true 
    player1.marcadorP1 += player1.marcadorP1
  }

  if(combinations.some(combination => combination === player2.value.repeat(3))){
    winnerProcess(player2,"Computadora")
    ganador = true
    player2.marcadorP2 += player2.marcadorP2
  } 
  if(combinationsDiagonal.some(combination => combination === player2.value.repeat(3))){
    winnerProcess(player2, "Computadora")
    ganador = true 
    player2.marcadorP2 += player2.marcadorP2
  }
  if(combinationsColumna.some(combination => combination === player2.value.repeat(3))){
    winnerProcess(player2, "Computadora") 
    ganador = true
    player2.marcadorP2 += player2.marcadorP2
  }
  if(listOfMovements.length === 0 && ganador == false ){
    alert("Nadie ganó, empate")
  } 
}

function winnerProcess(player, playerName) {
  for (let i = 0; i < listOfMovements.length; i++) {
    const element = listOfMovements[i];
    element.removeEventListener("click", printValue)
  }

  listOfMovements = []
  modal.classList.remove("invisible")

  modal.innerHTML = `
    <h2>Ha ganado ${playerName} ${player.value}</h2>
  `  
}

createSlots();

buttons.map((button) => {
  button.addEventListener("click", (event) => {
    const target = event.target;
    const value = target.textContent;

    board.classList.remove("disabled");

    if (value === "⭕") {
      player1.value = value;
      player1.active = true;
      player2.value = "❌";
    } else {
      player1.value = value;
      player1.active = true
      player2.value = "⭕";
    }

    buttons.map((button) => {
      button.disabled = true;
      board.style.cursor = "pointer" 
    });
  });
});
