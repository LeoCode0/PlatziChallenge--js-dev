const paragraphPassword = document.querySelector("#password");
const form = document.querySelector("#form");
const elInput = document.querySelector('#num_input');
const boton = document.querySelector('#copiador')

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


if(elInput){
  var etiqueta = document.querySelector('#etiqueta');
  if(etiqueta){
    etiqueta.innerHTML = elInput.value;

    elInput.addEventListener('input',function(){
      etiqueta.innerHTML = elInput.value;
    }, false)
  }
}

boton.addEventListener("click", copiarAlPortapapeles, false);

function copiarAlPortapapeles() {
  var enlace = document.getElementById("password");
  var inputFalso = document.createElement("input");
  inputFalso.setAttribute("value", enlace.innerHTML);

  document.body.appendChild(inputFalso);

  inputFalso.select();

  document.execCommand("copy");

  document.body.removeChild(inputFalso);
  alert("Copiado al portapales!");
}

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
  paragraphPassword.innerText = strongPassword;
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
