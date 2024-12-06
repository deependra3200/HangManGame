const hangManImage = document.querySelector(".hangman-box img");
const keyBoardDiv = document.querySelector(".keyboard");
const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const gameModel = document.querySelector(".game-model-box");
const playAgainBtn = document.querySelector(".play-again");

let currentWord,
  wrongGuessCount = 0,
  correctLetters;

const maxGuesses = 6;

const resetGame = () => {
  correctLetters = [];
  wrongGuessCount = 0;
  wordDisplay.innerHTML = currentWord
    .split("")
    .map(() => `<li class="letter"></li>`)
    .join("");
  guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
  hangManImage.src = `images/hangman-${wrongGuessCount}.svg`;
  gameModel.classList.remove("show");
  keyBoardDiv
    .querySelectorAll("button")
    .forEach((btn) => (btn.disabled = false));
};

// Selecting a random word and hint from word list
const getRandomWord = () => {
  const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
  console.log(word);
  currentWord = word;
  document.querySelector(".hint-text b").innerText = hint;
  resetGame();
};

const gameOver = (isVictory) => {
  setTimeout(() => {
    const modelText = isVictory ? `You Found the Word` : `The correct word was`;
    gameModel.querySelector("img").src = `images/${
      isVictory ? "victory" : "lost"
    }.gif`;
    gameModel.querySelector("h4").innerText = `${
      isVictory ? "Congrats!" : "Game Over!"
    }`;
    gameModel.querySelector(
      "p"
    ).innerHTML = `${modelText} <b>${currentWord}</b>`;
    gameModel.classList.add("show");
  }, 300);
};

const initGame = (button, clickedLetter) => {
  // check if clickedLetter is exist in currentWord
  if (currentWord.includes(clickedLetter)) {
    // Showing all correct letters on the word display
    [...currentWord].forEach((letter, index) => {
      if (letter === clickedLetter) {
        correctLetters.push(letter);
        wordDisplay.querySelectorAll("li")[index].innerText = letter;
        wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
      }
    });
  } else {
    // If clickedLetter don't exist then update the wrongGuessCount and hangMan image
    wrongGuessCount++;
    hangManImage.src = `images/hangman-${wrongGuessCount}.svg`;
  }
  button.disabled = true;
  guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

  if (wrongGuessCount === maxGuesses) return gameOver(false);
  if (correctLetters.length === currentWord.length) return gameOver(true);
};

// Creating Keyboard button
for (let i = 97; i <= 122; i++) {
  const button = document.createElement("button");
  button.innerText = String.fromCharCode(i);
  keyBoardDiv.appendChild(button);
  button.addEventListener("click", (e) =>
    initGame(e.target, String.fromCharCode(i))
  );
}

getRandomWord();
playAgainBtn.addEventListener("click", getRandomWord);
