function getRandomNumber() {
  return Math.floor(Math.random() * 6) + 1;
}

function rollDice() {
  const randomNumber1 = getRandomNumber();
  const randomNumber2 = getRandomNumber();

  const dice1 = document.getElementById("dice1");
  const dice2 = document.getElementById("dice2");

  dice1.setAttribute("src", `./images/dice${randomNumber1}.png`);
  dice2.setAttribute("src", `./images/dice${randomNumber2}.png`);

  const heading = document.querySelector("h1");

  if (randomNumber1 > randomNumber2) {
    heading.innerHTML = "Player 1 Wins!";
  } else if (randomNumber2 > randomNumber1) {
    heading.innerHTML = "Player 2 Wins!";
  } else {
    heading.innerHTML = "Draw!";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const dice1 = document.getElementById("dice1");
  const dice2 = document.getElementById("dice2");

  dice1.setAttribute("src", "./images/dice6.png");
  dice2.setAttribute("src", "./images/dice6.png");

  const button = document.querySelector("button");
  button.addEventListener("click", rollDice);
});
