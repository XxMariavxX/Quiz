function escapeHTML(unsafe) {
  if (typeof unsafe !== "string") return "";

  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

const quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];

function renderQuiz(quiz, index) {
  const section = document.getElementById("quiz-card");

  const myCard = `
  <div class="myQuiz">
    <div class="title-container">
      <h2 class="title">${escapeHTML(quiz.title)}</h2>
      <button class="delete">❌</button>
    </div>
    <p class="description">${escapeHTML(quiz.description)}</p>
    <div class="action-container">
      <a href="./src/quiz/quiz.html"><button data-index="${index}" class="start">Start</button></a>
      <p class="amount">Questions:${quiz.amount}</p>
    </div>
  </div>
  `;
  section.insertAdjacentHTML("beforeend", myCard);
  const card = section.lastElementChild;

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

  const startButton = card.querySelector(".start");

  startButton.addEventListener("click", function (e) {
    const index = e.target.dataset.index;
    const selectedQuiz = quizzes[index];

    localStorage.setItem("currentQuiz", JSON.stringify(selectedQuiz));
  });
}
function quizStart(id) {
  const quizzes = JSON.parse(localStorage.getItem("quizzes") || "[]")
  const selectedQuiz = quizzes.find((quiz) => quiz.id == id)
  localStorage.setItem("currentQuiz", JSON.stringify(selectedQuiz))
  console.log(currentQuiz);
}

quizzes.forEach(renderQuiz);