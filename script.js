const wordE1 = document.getElementById("word");
const wrongLettersE1 = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");
const figureParts = document.querySelectorAll(".figure-part");

let words = ["html", "css", "java", "wizard"];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];
function displayWord() {
  wordE1.innerHTML = `
    ${selectedWord
      .split("")
      .map(
        (letter) => `
        <span class="letter">
        ${correctLetters.includes(letter) ? letter : ""}
        </span>
        `
      )
      .join("")}
    `;

  const innerWord = wordE1.innerText.replace(/\n/g, "");

  if (innerWord === selectedWord) {
    finalMessage.innerText =
      "Ganaste 😃" + "\nPalabra secreta: " + selectedWord;
    popup.style.display = "flex";
    wrongLettersE1.style.display = "none";
  }
}
function updateWrongLetterE1() {
  wrongLettersE1.innerHTML = `
    ${wrongLetters.length > 0 ? "<p>Letras incorrectas</p>" : ""}
    ${wrongLetters.map((letter) => `<span>${letter}</span>`)}
    `;

  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;

    if (index < errors) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
  });

  //Check if lost
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText =
      "Perdiste. 😕" + "\nPalabra secreta:" + selectedWord;
    popup.style.display = "flex";
    wrongLettersE1.style.display = "none";
    document.getElementById("close-popUp").focus();
  }
}

//Show notification
function showNotification() {
  notification.classList.add("show");

  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
}

//Keydown letter press
window.addEventListener("keydown", (e) => {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;

    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);

        displayWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);

        updateWrongLetterE1();
      } else {
        showNotification();
      }
    }
  }
});

const closePopup = () => {
  popup.style.display = "none";
};

const playAgain = () => {
  correctLetters.splice(0);
  wrongLetters.splice(0);

  selectedWord = words[Math.floor(Math.random() * words.length)];

  displayWord();

  updateWrongLetterE1();
};

const GameOver = () =>{
  finalMessage.innerText =
      "Desististe del juego, vuelve pronto.😕";
    popup.style.display = "flex";
    wrongLettersE1.style.display = "none";
    document.getElementById("close-popUp").focus();
    playAgain();
}

displayWord();
