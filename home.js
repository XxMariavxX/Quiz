function escapeHTML(unsafe) {
  if (typeof unsafe !== "string") return "";

  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

const section = document.querySelector(".quiz-cards");
const quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];

function renderQuiz(quiz, index) {

  const hours = quiz.time.hours.toString().padStart(2, "0")
  const minutes = quiz.time.minutes.toString().padStart(2, "0")
  const seconds = quiz.time.seconds.toString().padStart(2, "0")

  if(quiz.time.hours <= 0 && quiz.time.minutes <= 0 && quiz.time.seconds <= 0) {
    timerText = "Time:unlimited"
  }else{
    timerText = `Time:${hours}:${minutes}:${seconds}`
  }

  const myCard = `
  <div class="card">
  <div class="title-container">
    <button class="delete">❌</button>
    <h2 class="title">${escapeHTML(quiz.title)}</h2>
    </div>
    
    <div class="description">
    ${escapeHTML(quiz.description)} 
    </div>
  
    <div>
    <span id = "timer">${timerText}</span>
    </div>
    <div class="action-container">
    <p class="amount">Questions:${quiz.amount}</p>
    <button data-index="${index}" class="start">Start</button>
    </div>
    </div>
  `;

  section.insertAdjacentHTML("beforeend", myCard);

  let card = section.lastElementChild;

  const deleteButton = card.querySelector(".delete");

  deleteButton.addEventListener("click", function () {
    if (confirm("Do you really want to delete quiz?")) {
      card.remove();
      quizzes.splice(index, 1);
      localStorage.setItem("quizzes", JSON.stringify(quizzes));
      section.innerHTML = "";
      quizzes.forEach(renderQuiz);
    }
  });

  const start = section.lastElementChild;
  const startButton = start.querySelector(".start");

  startButton.addEventListener("click", function (e) {
    if(quiz.hours > 0 || quiz.time.minutes > 0 || quiz.time.seconds > 0){
      const agree = confirm("Цей квіз обмежений у часі, ви впевнені що хочете розпочати?")
      if(!agree) {
        return
    }
  }
    window.location.href = "./src/quiz/quiz.html"
    const index = e.target.dataset.index;
    const selectedQuiz = quizzes[index];

    localStorage.setItem("currentQuiz", JSON.stringify(selectedQuiz));
  });
}
function quizStart(id) {
  const quizzes = JSON.parse(localStorage.getItem("quizzes") || "[]");
  const selectedQuiz = quizzes.find((quiz) => quiz.id == id);
  localStorage.setItem("currentQuiz", JSON.stringify(selectedQuiz));
  console.log(currentQuiz);
}

quizzes.forEach(renderQuiz);