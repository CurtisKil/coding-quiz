// View Highscores page top left
// Timer top right
// Landing page with intro and start button
// On click begin questions
// Array of questions
// Each question has 4 buttons as answers
const quizData = [
  {
    question: "Which language runs in a web browser?",
    a: "Java",
    b: "C",
    c: "Python",
    d: "JavaScript",
    correct: "d",
  },
  {
    question: "What does CSS stand for?",
    a: "Cool, Sick, Sweet",
    b: "Cascading Waterfalls",
    c: "Cascading Style Sheets",
    d: "Cascading Simple Sheets",
    correct: "c",
  },
  {
    question: "How cool is Curtis?",
    a: "The coolest",
    b: "Never met anyone cooler",
    c: "Cool cant even describe how cool he is",
    d: "I am not worthy of his coolness",
    correct: "'a', 'b' 'c' 'd'",
  },
  {
    question: "What does HTML stand for?",
    a: "Hypertext Markup Language",
    b: "Hypertext Markdown Language",
    c: "Hyperkids With Candy",
    d: "Helicopters, Terminals, Motorboats",
    correct: "a",
  },
];

const quiz = document.getElementById("quiz");
const quizHeader = document.getElementById("quiz-header");
const answerEls = document.querySelectorAll(".answer");
const questionEl = document.getElementById("question");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitBtn = document.getElementById("submit");
const startBtn = document.getElementById("start-btn");
const timeLeftDisplay = document.getElementById("time-left");
const h1 = document.querySelector("h1");
const p = document.querySelector("p");

let currentQuiz = 0;
let score = 0;

const startingMinutes = 3;
let time = startingMinutes * 60;

function startGame() {
  startBtn.classList.add("hide");
  h1.classList.add("hide");
  p.classList.add("hide");
  submitBtn.classList.remove("hide");
  quizHeader.classList.remove("hide");
  loadQuiz();
  timeLeft();
}

startBtn.addEventListener("click", startGame);

function timeLeft() {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;

  seconds = seconds < 3 ? "0" + seconds : seconds;

  setInterval(function () {
    if (time <= 0) {
      clearInterval((time = 0));
    }
    timeLeftDisplay.innerHTML = `${minutes}:${seconds}`;
    time--;
  }, 1000);
}

function quizOver() {
  startBtn.classList.remove("hide");
  h1.classList.remove("hide");
  p.classList.remove("hide");
  submitBtn.classList.add("hide");
  quizHeader.classList.add("hide");
}

function loadQuiz() {
  deselectAnswers();

  const currentQuizData = quizData[currentQuiz];

  questionEl.innerText = currentQuizData.question;
  a_text.innerText = currentQuizData.a;
  b_text.innerText = currentQuizData.b;
  c_text.innerText = currentQuizData.c;
  d_text.innerText = currentQuizData.d;
}

function deselectAnswers() {
  // Removes any checked answers
  answerEls.forEach((answerEl) => (answerEl.checked = false));
}

function getSelected() {
  let answer;

  answerEls.forEach((answerEl) => {
    if (answerEl.checked) {
      answer = answerEl.id;
    }
  });

  return answer;
}

submitBtn.addEventListener("click", () => {
  const answer = getSelected();

  if (answer) {
    if (answer === quizData[currentQuiz].correct) {
      alert("Correct");
      score++;
    } else {
      alert("Wrong!");
    }

    currentQuiz++;

    if (currentQuiz < quizData.length) {
      loadQuiz();
    } else {
      quiz.innerHTML = `
          <h2> You answered ${score}/${quizData.length} questions <h2>
          
          <button onClick="location.reload()">Reload</button>
          
          `;
    }
  }
});
