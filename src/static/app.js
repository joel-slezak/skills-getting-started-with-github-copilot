document.addEventListener("DOMContentLoaded", () => {
  const gameForm = document.getElementById("game-form");
  const operationSelect = document.getElementById("operation");
  const problemDisplay = document.getElementById("problem");
  const answerInput = document.getElementById("answer");
  const scoreDisplay = document.getElementById("score");
  const questionCountDisplay = document.getElementById("question-count");
  const newProblemButton = document.getElementById("new-problem");
  const messageDiv = document.getElementById("message");

  const gameState = {
    score: 0,
    questionCount: 0,
    correctAnswer: 0,
  };

  function getRandomNumber() {
    return Math.floor(Math.random() * 10) + 1;
  }

  function updateScoreboard() {
    scoreDisplay.textContent = gameState.score;
    questionCountDisplay.textContent = gameState.questionCount;
  }

  function createProblem() {
    const operation = operationSelect.value;
    let firstNumber = getRandomNumber();
    let secondNumber = getRandomNumber();

    if (operation === "subtraction" && secondNumber > firstNumber) {
      [firstNumber, secondNumber] = [secondNumber, firstNumber];
    }

    gameState.correctAnswer =
      operation === "addition"
        ? firstNumber + secondNumber
        : firstNumber - secondNumber;

    const symbol = operation === "addition" ? "+" : "-";
    problemDisplay.textContent = `${firstNumber} ${symbol} ${secondNumber} = ?`;
    answerInput.value = "";
    answerInput.focus();
  }

  function showMessage(text, statusClass) {
    messageDiv.textContent = text;
    messageDiv.className = `message ${statusClass}`;
    messageDiv.classList.remove("hidden");
  }

  gameForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (answerInput.value.trim() === "") {
      showMessage("Please enter a number before checking your answer.", "error");
      return;
    }

    const submittedAnswer = Number(answerInput.value);

    gameState.questionCount += 1;

    if (submittedAnswer === gameState.correctAnswer) {
      gameState.score += 1;
      showMessage("Correct! Great job.", "success");
    } else {
      showMessage(`Not quite. The correct answer was ${gameState.correctAnswer}.`, "error");
    }

    updateScoreboard();
    createProblem();
  });

  operationSelect.addEventListener("change", () => {
    messageDiv.classList.add("hidden");
    createProblem();
  });

  newProblemButton.addEventListener("click", () => {
    messageDiv.classList.add("hidden");
    createProblem();
  });

  updateScoreboard();
  createProblem();
});
