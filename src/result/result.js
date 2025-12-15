const quizzes = JSON.parse(localStorage.getItem("currentQuiz"));
console.log(quizzes);
let result = JSON.parse(localStorage.getItem("results"));
const section = document.querySelector(".quiz-card");
const button_tryagain = document.querySelector(".tryagain");

result = result[result.length - 1];
const questions = result.questions;
let score = 0;

let maxScore = quizzes.amount;

for (let i = 0; i <= questions.length - 1; i++) {
  const correct_answersIndex = [];
  const user_answersIndex = [];
  const user_array = questions[i].user_answer;
  const correct_array = questions[i].correct_answers;
  let correct = 0;
  let wrong = 0;

  for (let j = 0; j <= correct_array.length - 1; j++) {
    correct_answersIndex.push(correct_array[j].answerIndex);
  }

  for (let k = 0; k <= user_array.length - 1; k++) {
    user_answersIndex.push(user_array[k].answerIndex);
  }

  for (let answer of user_answersIndex) {
    if (correct_answersIndex.includes(answer)) {
      correct += 1;
    } else {
      wrong += 1;
    }
  }

  let score_question = (correct - wrong) / correct_answersIndex.length;

  if (Number.isNaN(score_question)) {
    score_question = 0;
  } else {
    score += Math.max(0, Math.min(score_question, 1));
  }
}

const userScore = Number(score.toFixed(2));

let img = "";

if (userScore === maxScore) {
  img = "<img class = 'reaction' src='../../public/rabbit.gif'>"

} else if (maxScore > userScore && userScore >= maxScore / 2) {
  img = "<img class = 'reaction' src='../../public/rabbit.gif'>"
} else {
  img = "<img class = 'reaction' src='../../public/rabbit.gif'>"
}

section.insertAdjacentHTML(
  'beforeend',
  img
)

section.insertAdjacentHTML(
  "afterbegin",
  `<div class = "score">
    Your score ♥ : ${userScore}/${maxScore}
    </div>`
);

section.insertAdjacentHTML(
  'afterend',
  `
  <a href="../quiz/quiz.html"><button type="button" class = "tryagain">Try again</button></a>
  `
)