const board = document.querySelector("#board");
const listOfSlots = [];
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
  } else {
    target.innerText = player2.value;
    player2.active = false;
    player1.active = true;
  }

  currentSlot.classList.add("disabled");
  currentSlot.removeEventListener("click", printValue);
}

function createSlots() {
  for (let index = 0; index < 9; index++) {
    const slot = document.createElement("div");

    slot.addEventListener("click", printValue);

    listOfSlots.push(slot);
  }

  board.append(...listOfSlots);
}

function myEnemy() {}

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
      player2.value = "⭕";
    }

    buttons.map((button) => {
      button.disabled = true;
    });
  });
});
