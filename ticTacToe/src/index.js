const board = document.querySelector("#board");
const modal = document.querySelector("#modal")
const listOfSlots = [];
const rows = []
let listOfMovements = [];
let currentSlot;

let buttons = document.querySelectorAll(".options--button");

let player1 = {
  active: false,
  value: "",
};
let player2 = {
  active: false,
  value: "",
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
  for (let index = 0; index < 9; index++) {
    const slot = document.createElement("div");
    slot.id = `slot-${index}`
    slot.addEventListener("click", printValue);

    listOfSlots.push(slot);
    subArray.push(slot)
    if(subArray.length === 3){
      rows.push(subArray)
      subArray = []
    }
  }

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

  if(listOfMovements.length === 0){
    alert("Nadie gano, empate")
  }else{
    if(combinations.some(combination => combination === player1.value.repeat(3))){
      winnerProcess(player1, "Tu user")
    }
  
    if(combinations.some(combination => combination === player2.value.repeat(3))){
      winnerProcess(player2,"Computadora")
    }
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
    <h2>Ha ganado el ${playerName} ${player.value}<h2>
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
    });
  });
});
