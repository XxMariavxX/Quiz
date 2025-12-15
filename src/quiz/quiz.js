const titleE = document.getElementById("quiz-title");
const timerDisplay = document.getElementById("timer")
const questionsEl = document.getElementById("quiz-questions");
const finishBtn = document.getElementById("finish");
const currentQuiz = JSON.parse(localStorage.getItem("currentQuiz"));

if (!currentQuiz) {
  console.error("No quiz selected!");
} else {
  titleE.textContent = currentQuiz.title;
}


let quizEndTime = localStorage.getItem(`quizEndTime_${currentQuiz.id}`)

if(!quizEndTime) {
  quizEndTime = Date.now() +  (currentQuiz.time.hours * 3600 + currentQuiz.time.minutes * 60 + currentQuiz.time.seconds) * 1000
  localStorage.setItem(`quizEndTime_${currentQuiz.id}`, quizEndTime)
}else{
  quizEndTime = Number(quizEndTime)
}

let timeLeft;

if(currentQuiz.time.hours == 0 && currentQuiz.time.minutes == 0 && currentQuiz.time.seconds == 0) {
  timerDisplay.textContent = "Time:unlimited"
  localStorage.removeItem(`quizEndTime_${currentQuiz.id}`)
}else{
function updateTime() {
  const now = Date.now()
  timeLeft = Math.max(0, Math.ceil((quizEndTime - Date.now()) / 1000));
 

  const hours = Math.floor(timeLeft / 3600).toString().padStart(2, "0")
  const minutes = Math.floor((timeLeft % 3600) / 60).toString().padStart(2, "0")
  const seconds = Math.floor(timeLeft % 60).toString().padStart(2, "0")

  timerDisplay.textContent = `${hours}:${minutes}:${seconds}`}
  updateTime()

const Interval = setInterval(() => {
  if(timeLeft <= 0) {
    clearInterval(Interval)
    alert("Час вийшов!")
    finishQuiz()
    return
  }
  updateTime()

}, 1000)
}

  currentQuiz.question.forEach((q, qIndex) => {
    let answersHTML = "";
    currentQuiz.answers[qIndex].forEach((ans, aIndex) => {
      let text = ans.answerText;
      const id = `q${qIndex}_a${aIndex}`;
      answersHTML += `<div class="answerblock">
      <input type="checkbox" name="q${qIndex}" id="${id}" value="${text}">
        <label for="${id}">${text}</label>
        <br></div>`;
  });

    const questionHTML = `
    <fieldset class="question-block">
        <div>${q}</div>
        ${answersHTML}
    </fieldset>
    `;

  questionsEl.insertAdjacentHTML("beforeend", questionHTML);
});


document
  .querySelector("#section")
  .insertAdjacentHTML(
    "beforeend",
    `<button onclick = "finishQuiz()">Finish</button>`
  );
function finishQuiz() {
  localStorage.removeItem(`quizEndTime_${currentQuiz.id}`)
  window.location.href = "../result/result.html"
  let id;
  if (!currentQuiz) return;
  if (localStorage.getItem("results") !== null) {
    id = JSON.parse(localStorage.getItem("results")).length + 1;
  } else {
    id = 1;
  }
  const fieldsets = questionsEl.querySelectorAll("fieldset");
  const result = {
    quizId: currentQuiz.id,
    resultId: id,
    questions: [],
  };
  for (let i = 0; i <= currentQuiz.question.length - 1; i++) {
    const inputs = fieldsets[i].querySelectorAll('input[type="checkbox"]');

    const question = { correct_answers: [], user_answer: [] };
    question.name = currentQuiz.question[i];
    for (let j = 0; j <= currentQuiz.correct[i].length - 1; j++) {
      question.correct_answers.push(currentQuiz.correct[i][j]);
    }
    for (let k = 0; k <= currentQuiz.answers[i].length - 1; k++) {
      const checked = inputs[k].checked;
      if (checked) {
        question.user_answer.push(currentQuiz.answers[i][k]);
      }
    }
    result.questions.push(question);
  }

  if (!localStorage.getItem("results")) {
    localStorage.setItem("results", JSON.stringify([result]));
  } else {
    const results = JSON.parse(localStorage.getItem("results"));
    results.push(result);
    localStorage.setItem("results", JSON.stringify(results));
  }
}