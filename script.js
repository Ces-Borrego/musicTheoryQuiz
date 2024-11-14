const questions = [
  {
    question: "What is the relative minor of C Major?",
    answers: [
      { text: "A minor", correct: true },
      { text: "E minor", correct: false },
      { text: "G minor", correct: false },
      { text: "D minor", correct: false }
    ],
    help: "The relative minor of a major key is the sixth degree of the major scale. For C Major, the sixth degree is A, so the relative minor is A minor."
  },
  {
    question: "How many sharps are in the key of G Major?",
    answers: [
      { text: "1", correct: true },
      { text: "2", correct: false },
      { text: "3", correct: false },
      { text: "0", correct: false }
    ],
    help: "The key of G Major has one sharp: F#."
  }
  // Add more questions as needed
];

let currentQuestionIndex = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
  const questionElement = document.getElementById("question");
  const answerButtonsElement = document.getElementById("answer-buttons");

  questionElement.innerText = question.question;
  answerButtonsElement.innerHTML = "";

  question.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    button.onclick = () => selectAnswer(answer);
    answerButtonsElement.appendChild(button);
  });
}

function selectAnswer(answer) {
  if (answer.correct) {
    alert("Correct!");
  } else {
    alert("Wrong answer. Try again!");
  }
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion(questions[currentQuestionIndex]);
  } else {
    alert("Quiz Finished!");
    startQuiz();
  }
}

function showHelp() {
  alert(questions[currentQuestionIndex].help);
}

window.onload = startQuiz;