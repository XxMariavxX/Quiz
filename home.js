const quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
const quizListContainer = document.getElementById("quiz-card");


function renderQuiz(quiz) {

  const template = document.getElementById("quiz-card-template");
  const templateClone = template.content.cloneNode(true);

  templateClone.querySelector('[data-target="title"]').textContent = quiz.title;
  templateClone.querySelector('[data-target="description"]').textContent = quiz.description;
  templateClone.querySelector('[data-target="amount"]').textContent = quiz.amount;

  const cardElement = templateClone.querySelector('.myQuiz');
  cardElement.dataset.quizId = quiz.id;

  const deleteButton = templateClone.querySelector('.delete');
  deleteButton.dataset.quizId = quiz.id;

  const startButton = templateClone.querySelector('.start');
  startButton.dataset.quizId = quiz.id;

  deleteButton.addEventListener("click", deleteFunction);

  return templateClone;
}


if (quizListContainer) {
  quizzes.forEach((quiz) => {
    const quizCard = renderQuiz(quiz);

    quizListContainer.appendChild(quizCard);
  });
} else {
  console.error("Помилка: Не знайдено контейнер для відображення квізів!");
}



deleteButton.addEventListener("click", function () {
  if (confirm("Do you really want to delete quiz?")) {
    card.remove();
    quizzes.splice(index, 1);
    localStorage.setItem("quizzes", JSON.stringify(quizzes));
    section.innerHTML = "";
    quizzes.forEach(renderQuiz);
  }
});




// function renderQuiz(quiz, index) {
//   const section = document.getElementById("quiz-card");

//   const myCard = `
//   <div class="myQuiz">
//     <div class="quiz-header">
//       <h2 class="title">${escapeHTML(quiz.title)}</h2>
//       <button class="delete">❌</button>
//     </div>
//     <p class="descroption">${escapeHTML(quiz.description)}</p>
//     <p class="amount">Questions:${quiz.amount}</p>
//     <a href="./src/quiz/quiz.html"><button data-index="${index}" class="start">Start</button></a>
//   </div>
//   `;
//   section.insertAdjacentHTML("beforeend", myCard);
//   const card = section.lastElementChild;

//   const deleteButton = card.querySelector(".delete");
//   deleteButton.addEventListener("click", function () {
//     if (confirm("Do you really want to delete quiz?")) {
//       card.remove();
//       quizzes.splice(index, 1);
//       localStorage.setItem("quizzes", JSON.stringify(quizzes));
//       section.innerHTML = "";
//       quizzes.forEach(renderQuiz);
//     }
//   });

//   const startButton = card.querySelector(".start");

//   startButton.addEventListener("click", function (e) {
//     const index = e.target.dataset.index;
//     const selectedQuiz = quizzes[index];

//     localStorage.setItem("currentQuiz", JSON.stringify(selectedQuiz));
//   });
// }
// function quizStart(id) {
//   const quizzes = JSON.parse(localStorage.getItem("quizzes"))
//   const selectedQuiz = quizzes.filter((quiz) => quiz.id == id)[0]
//   localStorage.setItem("currentQuiz", JSON.stringify(selectedQuiz))
// }