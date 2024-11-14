fetch('questionAndAnswerKey.json')
  .then(response => response.json())
  .then(data => {
    window.questions = data;
    window.filteredQuestions = data;
    updateKeyButtons();
    displayInitialMessage();
  })
  .catch(error => console.error('Error loading questions:', error));

let currentQuestionIndex = 0;

function displayInitialMessage() {
  document.getElementById("question").innerText = "Choose a key to start the test";
}

function startQuiz() {
  currentQuestionIndex = 0;
  showRandomQuestion();
}

function filterQuestions(key) {
  window.filteredQuestions = window.questions.filter(question => question.key === key);
  document.getElementById("help-button").style.display = "inline-block";
  document.getElementById("next-button").style.display = "inline-block";
  console.log(window.filteredQuestions)
  console.log(filteredQuestions.length);
  startQuiz();
}

function showRandomQuestion() {
  if (filteredQuestions.length === 0) {
    document.getElementById("question").innerText = "No questions available for the selected key.";
    document.getElementById("answer-buttons").innerHTML = "";
    return;
  }
  const randomIndex = Math.floor(Math.random() * filteredQuestions.length);
  currentQuestionIndex = randomIndex;
  showQuestion(filteredQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  const questionElement = document.getElementById("question");
  const answerButtonsElement = document.getElementById("answer-buttons");
  const helpContainerElement = document.getElementById("help-container");

  questionElement.innerText = question.question;
  answerButtonsElement.innerHTML = "";
  helpContainerElement.style.display = "none";
  helpContainerElement.innerHTML = "";

  question.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    button.onclick = () => selectAnswer(answer);
    answerButtonsElement.appendChild(button);
  });
}

function selectAnswer(answer) {
  const helpContainerElement = document.getElementById("help-container");
  helpContainerElement.style.display = "block";
  if (answer.correct) {
    helpContainerElement.innerText = "Correct!";
  } else {
    helpContainerElement.innerText = "Wrong answer. Try again!";
  }
}

function nextQuestion() {
  const helpContainerElement = document.getElementById("help-container");
  helpContainerElement.style.display = "none";
  showRandomQuestion();
}

function showHelp() {
  const helpContainerElement = document.getElementById("help-container");
  helpContainerElement.style.display = "block";
  helpContainerElement.innerText = filteredQuestions[currentQuestionIndex].help;
}

function updateKeyButtons() {
  // Find all keys that have questions
  const keysWithQuestions = new Set(window.questions.map(question => question.key));

  const keys = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];
  keys.forEach(key => {
    const button = document.querySelector(`button[onclick="filterQuestions('${key}')"]`);
    if (!keysWithQuestions.has(key)) {
      button.classList.add('disabled');
    }
  });
}

window.onload = displayInitialMessage;