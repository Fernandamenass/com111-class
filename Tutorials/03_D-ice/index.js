// Function to generate random number between 1 and 6
function getRandomNumber() {
  return Math.floor(Math.random() * 6) + 1;
}

// Function to update dice images and determine winner
function rollDice() {
  // Generate random numbers
  const randomNumber1 = getRandomNumber();
  const randomNumber2 = getRandomNumber();

  // Get the image elements
  const dice1 = document.getElementById("dice1");
  const dice2 = document.getElementById("dice2");

  // Update dice images - note the updated path to include ./images/
  dice1.setAttribute("src", `./images/dice${randomNumber1}.png`);
  dice2.setAttribute("src", `./images/dice${randomNumber2}.png`);

  // Update heading with winner
  const heading = document.querySelector("h1");

  // Determine winner
  if (randomNumber1 > randomNumber2) {
    heading.innerHTML = "Player 1 Wins!";
  } else if (randomNumber2 > randomNumber1) {
    heading.innerHTML = "Player 2 Wins!";
  } else {
    heading.innerHTML = "Draw!";
  }
}

// Add event listener for when the page loads
document.addEventListener("DOMContentLoaded", function () {
  // Set initial dice images
  const dice1 = document.getElementById("dice1");
  const dice2 = document.getElementById("dice2");

  dice1.setAttribute("src", "./images/dice6.png");
  dice2.setAttribute("src", "./images/dice6.png");

  // Add click event listener to the button
  const button = document.querySelector("button");
  button.addEventListener("click", rollDice);
});
