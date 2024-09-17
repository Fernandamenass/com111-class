//Cuando se llama con punto es una clase, cuendo se llama con # es un id
// Variables globales
const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;

// Función para generar una secuencia aleatoria y mostrar toda la secuencia hasta el nivel actual
function nextSequence() {
  userClickedPattern = []; // Reinicia el patrón del usuario para el nuevo nivel
  level++;
  $("#level-title").text("Level " + level);

  const randomNumber = Math.floor(Math.random() * 4);
  const randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  // Mostrar toda la secuencia acumulada
  showSequence();
}

// Función para mostrar la secuencia completa hasta el nivel actual
function showSequence() {
  let delay = 0; // Variable para aumentar el retraso en cada paso

  // Recorrer el patrón del juego y mostrar cada color en secuencia
  for (let i = 0; i < gamePattern.length; i++) {
    setTimeout(function () {
      const color = gamePattern[i];
      $("#" + color).fadeOut(100).fadeIn(100); // Efecto de parpadeo
      playSound(color); // Reproducir el sonido del botón
    }, delay);

    delay += 600; // Incrementar el tiempo de retraso entre cada color
  }
}

$(document).ready(function () {
  // Listener para detectar la pulsación de una tecla para comenzar el juego
  $(document).keypress(function () {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });

  // Listener para el evento click en los botones
  $(".btn").click(function () {
    const userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    // Verificar la respuesta después de cada clic
    checkAnswer(userClickedPattern.length - 1); // Envía el índice del último clic
  });

  // Función para verificar la respuesta del usuario
  function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      console.log("Success");

      // Verificar si el usuario ha terminado de ingresar la secuencia completa
      if (userClickedPattern.length === gamePattern.length) {
        setTimeout(function () {
          nextSequence(); // Genera la siguiente secuencia
        }, 1000);
      }
    } else {
      console.log("Wrong");

      // Reproducir sonido "wrong"
      playSound("wrong");

      // Aplicar el estilo de "game-over" y cambiar el título
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      // Llamar a la función para reiniciar el juego
      startOver();
    }
  }

  // Función para reproducir sonido según el color
  function playSound(name) {
    const audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
  }

  // Función para animar el botón presionado
  function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
  }

  // Función para reiniciar el juego
  function startOver() {
    level = 0; // Reiniciar nivel
    gamePattern = []; // Vaciar el patrón del juego
    started = false; // Reiniciar el estado del juego
  }
});
