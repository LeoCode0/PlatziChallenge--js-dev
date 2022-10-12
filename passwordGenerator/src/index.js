const paragraphPassword = document.querySelector("#password");
const form = document.querySelector("#form");

const letters = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const symbols = ["'", ":", "!", "@", "#", "$", "^", ")", "&", "*", "%", "-"];

function generatePassword(passwordLength, botonsitos) {
  const arrayOfArrays = [];

  if (botonsitos.letters) {
    arrayOfArrays.push(letters);
  }

  if (botonsitos.numbers) {
    arrayOfArrays.push(numbers);
  }

  if (botonsitos.symbols) {
    arrayOfArrays.push(symbols);
  }

  console.log(arrayOfArrays);

  let strongPassword = [];
  for (let i = 0; i < passwordLength; i++) {
    const myArr = arrayOfArrays[getRandomNumber(0, arrayOfArrays.length - 1)];
    const randomCharacter = myArr[getRandomNumber(0, myArr.length - 1)];

    strongPassword.push(randomCharacter);
  }

  strongPassword = strongPassword.join("");
  paragraphPassword.innerText = `Aquí aparecerá tu contraseña ${strongPassword}`;
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1));
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formElement = event.target;
  const passwordLength = formElement.length.value;
  const checks = {
    letters: formElement.letters.checked,
    words: formElement.words.checked,
    numbers: formElement.numbers.checked,
    symbols: formElement.symbols.checked,
  };

  generatePassword(passwordLength, checks);
});
