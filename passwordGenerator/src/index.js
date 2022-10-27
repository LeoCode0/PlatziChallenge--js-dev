const inputLength = document.querySelector(".input-length");
const passwordLength = document.querySelector(".password-length");
const form = document.querySelector(".form-container");
const password = document.querySelector(".password");
const buttonCopy = document.querySelector(".button");

const API = "https://random-word-api.herokuapp.com/all";

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
const numbers =[1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const symbols = ["'", ":", "!", "@", "#", "$", "^", ")", "&", "*", "%", "-"];
let words = [];

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1));
}

function generatePassword(passwordLengthChosen, checkBoxChosen) {

    let arrayOfArrays = [];

    if (checkBoxChosen.letters) {
        arrayOfArrays.push(letters);
      }

    if (checkBoxChosen.numbers) {
      arrayOfArrays.push(numbers);
    }

    if (checkBoxChosen.symbols) {
      arrayOfArrays.push(symbols);
    }

    if (checkBoxChosen.words) {
      arrayOfArrays = [];
      arrayOfArrays.push(words);
    }

    let strongPassword = [];
    for (let i = 0; i < passwordLengthChosen; i++) {
      const myArr = arrayOfArrays[getRandomNumber(0, arrayOfArrays.length - 1)];
      const randomCharacter = myArr[getRandomNumber(0, myArr.length - 1)];
      strongPassword.push(randomCharacter);
    }

    if (checkBoxChosen.words) {
      strongPassword = strongPassword.join("-");
    } else {
      strongPassword = strongPassword.join("");
    }


    password.innerText = strongPassword;
}

function fetchData(API) {
  fetch(API)
    .then((response) => response.json()) // convierte la api a json
    .then((data) => {
      words = data
    });
}

fetchData(API);

function CopyToClipboard(id)
{
  const r = document.createRange();
  r.selectNode(document.querySelector(id));
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(r);
  if (password.innerText == 0) {
      swal("Primero genera una contraseña");
      } else {
        window.navigator.clipboard.writeText(r);
        swal("Copiaste la contraseña");
        window.getSelection().removeAllRanges();
        
      }
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

    if (checks.words) {
      formElement.letters.checked = false;
      formElement.numbers.checked = false;
      formElement.symbols.checked = false;
      }
      
    generatePassword(passwordLength, checks);
    buttonCopy.disabled = false;
  });
  
buttonCopy.addEventListener("click", () => {
    CopyToClipboard(".password");
    return false;
  });


inputLength.addEventListener("input", (e) => {
  passwordLength.innerText = e.target.value;
});
