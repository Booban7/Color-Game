// Get references to the HTML elements.
var colorBox = document.getElementById("color-box");
var choicesDiv = document.getElementById("choices");
var newGameButton = document.getElementById("new-game-button");
var scoreSpan = document.getElementById("score");

// Initialize the score to zero.
var score = 0;

// Generate a random color code.
function generateColor() {
  var hexDigits = "0123456789ABCDEF";
  var colorCode = "#";
  for (var i = 0; i < 6; i++) {
    colorCode += hexDigits[Math.floor(Math.random() * 16)];
  }
  return colorCode;
}

// Shuffle the elements of an array randomly.
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

// Generate a list of three color codes, one of which is the correct answer.
function generateChoices() {
  var choices = [generateColor(), generateColor(), generateColor(), generateColor()];
  var correctAnswer = choices[Math.floor(Math.random() * 4)];
  choices = shuffleArray(choices);
  return { choices: choices.slice(0, 3), correctAnswer: correctAnswer };
}

// Set up a new game.
function newGame() {
  var result = generateChoices();
  colorBox.style.backgroundColor = result.correctAnswer;
  choicesDiv.innerHTML = "";
  for (var i = 0; i < result.choices.length; i++) {
    var choiceButton = document.createElement("button");
    choiceButton.innerHTML = result.choices[i];
    (function() {
      var choice = result.choices[i];
      choiceButton.addEventListener("click", function() {
        if (choice === result.correctAnswer) {
          alert("Correct!");
          score++;
        } else {
          alert("Incorrect. Try again.");
          score = 0;
        }
        scoreSpan.innerHTML = score;
        newGame();
      });
    })();
    choicesDiv.appendChild(choiceButton);
  }
}

// Set up the event listener for the new game button.
newGameButton.addEventListener("click", function() {
  score = 0;
  scoreSpan.innerHTML = score;
  newGame();
});

// Start the first game.
newGame();
