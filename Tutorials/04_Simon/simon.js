//Cuando se llama con punto es una clase, cuendo se llama con # es un id
const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;

// Función de secuencia aleatoria
function nextSequence() {
  userClickedPattern = []; 
  level++;
  $("#level-title").text("Level " + level);

  const randomNumber = Math.floor(Math.random() * 4);
  const randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  showSequence();
}

// Secuencia completa
function showSequence() {
  let delay = 0;

  // Mostrar los patrones
  for (let i = 0; i < gamePattern.length; i++) {
    setTimeout(function () {
      const color = gamePattern[i];
      $("#" + color).fadeOut(100).fadeIn(100); // Efecto de prender y apagar
      playSound(color);
    }, delay);

    delay += 600; // Tiempo de retraso entre cada color
  }
}

$(document).ready(function () {
  //Detectar cualquier tecla para iniciar el juego
  $(document).keypress(function () {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });

  // Click en los botones
  $(".btn").click(function () {
    const userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    // Verificar la respuesta
    checkAnswer(userClickedPattern.length - 1); // Envía el último clic
  });

  // Verificar la respuesta
  function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      console.log("Success");

      // Ver si el usuario termino
      if (userClickedPattern.length === gamePattern.length) {
        setTimeout(function () {
          nextSequence(); // Hace la siguiente secuencia
        }, 1000);
      }
    } else {
      console.log("Wrong");

      playSound("wrong");

      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
  }

  // Sonido segun el color
  function playSound(name) {
    const audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
  }

  // Animar el botón presionado
  function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
  }

  // Reiniciar el juego
  function startOver() {
    level = 0; 
    gamePattern = [];
    started = false;
  }
});
