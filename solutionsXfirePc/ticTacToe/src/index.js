const board = document.querySelector("#board")
const modal = document.querySelector("#modal")
let buttons = document.querySelectorAll(".options--button");

let currentSlot;
const rows = []
const listOfSlots = []
let listOfMovements = []

let username = 'Player 1'
let player1 = { active: false, value: "",};
let player2 = Object.create(player1)

buttons = Array.from(buttons);
board.classList.add("disabled");

Swal.fire({
    title: 'Cual es tu nombre?',
    input: 'text',
    inputAttributes: {
      autocapitalize: 'on'
    },
    showCancelButton: true,
    confirmButtonText: 'A jugar',
    showLoaderOnConfirm: true,
    preConfirm: (name) => {
      username = name;
      document.getElementById('player-name').innerHTML = username
    },
  })


function printValue(event) {
  const target = event.target;
  currentSlot = target;

  if (player1.value == '' || player2.value == '') {
    return Swal.fire({
      icon: 'info',
      text: `${username} debes escojer una ficha para jugar`,
    })
  }

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

  const combinationsMatix = rows.map(slots => {
    return slots.map(slot => slot.textContent)
  })

  if(listOfMovements.length === 0){
    Swal.fire({ icon: 'info', text: `Empate, nadie gano!`,})
  }else{
    if(combinations.some(combination => combination === player1.value.repeat(3)) ||
      checkDiagonals(player1, combinationsMatix) || checkColumns(player1, combinationsMatix)){
      winnerProcess(player1, username)
    }
  
    if(combinations.some(combination => combination === player2.value.repeat(3)) || 
      checkDiagonals(player2, combinationsMatix) || checkColumns(player2, combinationsMatix)){
      winnerProcess(player2,"Computadora")
    }
  }
}

function checkColumns(player, matrix) {

  for (let i = 0; i < 3; i++) {
    let counter = 0;
    for (let j = 0; j < 3; j++) {
      if (player.value == matrix[j][i])
        counter++;
    }
    if (counter == 3)
      return true;
  }

  return false;
}


function checkDiagonals(player, matrix) {
  let counterMain = 0;
  let counterSecondary = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (matrix[i][j] == '') continue;
      
      if(i == j && matrix[i][j] == player.value){
        counterMain++
      }
      
      if(i+j == matrix.length-1 && matrix[i][j] == player.value){
        counterSecondary++
      }
    }
  }
  return counterMain == 3 || counterSecondary == 3;
}

function checkDiagonals(player, matrix) {
  let counterMain = 0;
  let counterSecondary = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (matrix[i][j] == '') continue;
      
      if(i == j && matrix[i][j] == player.value){
        counterMain++
      }
      
      if(i+j == matrix.length-1 && matrix[i][j] == player.value){
        counterSecondary++
      }
    }
  }
  return counterMain == 3 || counterSecondary == 3;
}

function winnerProcess(player, playerName) {
  for (let i = 0; i < listOfMovements.length; i++) {
    const element = listOfMovements[i];
    element.removeEventListener("click", printValue)
  }

  listOfMovements = []
  Swal.fire({
    icon: playerName == username ? 'success' : 'error',
    text: `${playerName} ha ganado!`,
  })
}

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


createSlots();
